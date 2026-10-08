import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { pool } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'curbly_secret_key';

app.use(cors());
app.use(express.json());

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied: No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// -------------------------------------------------------------
// HEALTH CHECK
// -------------------------------------------------------------
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as current_time, current_database() as db_name');
    res.json({
      status: 'healthy',
      platform: 'CURBLY API',
      database: 'Neon Serverless PostgreSQL',
      dbTime: result.rows[0].current_time,
      databaseName: result.rows[0].db_name
    });
  } catch (error) {
    res.status(500).json({ status: 'unhealthy', error: error.message });
  }
});

// -------------------------------------------------------------
// AUTHENTICATION ROUTES
// -------------------------------------------------------------
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  try {
    // Check if user exists
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const userRole = role === 'owner' ? 'owner' : 'driver';

    const insertResult = await pool.query(
      `INSERT INTO users (name, email, password_hash, phone, role) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, name, email, phone, role, created_at`,
      [name, email, passwordHash, phone || null, userRole]
    );

    const newUser = insertResult.rows[0];
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Registration successful',
      user: newUser,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error during registration' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error during login' });
  }
});

app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, phone, role, created_at FROM users WHERE id = $1', [req.user.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------
// PARKING SPACES ROUTES
// -------------------------------------------------------------

// Discover & Search Parking Spaces
app.get('/api/parking/spaces', async (req, res) => {
  const { search, vehicleType, minPrice, maxPrice } = req.query;

  try {
    let query = `
      SELECT p.*, u.name as owner_name, u.phone as owner_phone 
      FROM parking_spaces p
      JOIN users u ON p.owner_id = u.id
      WHERE p.is_active = true
    `;
    const params = [];

    if (search) {
      params.push(`%${search}%`);
      query += ` AND (p.title ILIKE $${params.length} OR p.address ILIKE $${params.length} OR p.city ILIKE $${params.length})`;
    }

    if (vehicleType) {
      params.push(vehicleType);
      query += ` AND p.vehicle_type = $${params.length}`;
    }

    query += ` ORDER BY p.id ASC`;

    const result = await pool.query(query, params);
    res.json({ spaces: result.rows, count: result.rows.length });
  } catch (error) {
    console.error('Fetch spaces error:', error);
    res.status(500).json({ error: 'Failed to fetch parking spaces' });
  }
});

// Get Parking Space by ID
app.get('/api/parking/spaces/:id', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.*, u.name as owner_name, u.phone as owner_phone, u.email as owner_email
       FROM parking_spaces p
       JOIN users u ON p.owner_id = u.id
       WHERE p.id = $1`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Parking space not found' });
    }

    res.json({ space: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Space Owner: Create new Parking Space
app.post('/api/parking/spaces', authenticateToken, async (req, res) => {
  const { title, description, address, city, latitude, longitude, price_per_hour, vehicle_type, amenities } = req.body;

  if (!title || !address || !price_per_hour) {
    return res.status(400).json({ error: 'Title, address, and price per hour are required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO parking_spaces 
       (owner_id, title, description, address, city, latitude, longitude, price_per_hour, vehicle_type, amenities, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, true)
       RETURNING *`,
      [
        req.user.id,
        title,
        description || '',
        address,
        city || 'Bengaluru',
        latitude || 12.9716,
        longitude || 77.5946,
        price_per_hour,
        vehicle_type || 'Four Wheeler',
        amenities || ['CCTV Monitored', 'Covered Parking']
      ]
    );

    res.status(201).json({
      message: 'Parking space registered successfully',
      space: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating parking space:', error);
    res.status(500).json({ error: 'Failed to register parking space' });
  }
});

// Space Owner: Toggle Active Status
app.patch('/api/parking/spaces/:id/toggle', authenticateToken, async (req, res) => {
  try {
    const spaceCheck = await pool.query('SELECT owner_id, is_active FROM parking_spaces WHERE id = $1', [req.params.id]);
    if (spaceCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Parking space not found' });
    }

    if (spaceCheck.rows[0].owner_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized to modify this parking space' });
    }

    const newStatus = !spaceCheck.rows[0].is_active;
    const updateResult = await pool.query(
      'UPDATE parking_spaces SET is_active = $1 WHERE id = $2 RETURNING *',
      [newStatus, req.params.id]
    );

    res.json({
      message: `Parking space marked as ${newStatus ? 'Active' : 'Inactive'}`,
      space: updateResult.rows[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------
// BOOKING & RESERVATION ROUTES
// -------------------------------------------------------------

// Create Booking & Razorpay Payment simulation
app.post('/api/bookings', authenticateToken, async (req, res) => {
  const { space_id, start_time, hours, vehicle_number } = req.body;

  if (!space_id || !hours) {
    return res.status(400).json({ error: 'Space ID and booking duration (hours) are required' });
  }

  try {
    const spaceResult = await pool.query('SELECT * FROM parking_spaces WHERE id = $1 AND is_active = true', [space_id]);
    if (spaceResult.rows.length === 0) {
      return res.status(404).json({ error: 'Parking space not available or inactive' });
    }

    const space = spaceResult.rows[0];
    const durationHours = parseInt(hours, 10) || 1;
    const startDate = start_time ? new Date(start_time) : new Date();
    const endDate = new Date(startDate.getTime() + durationHours * 60 * 60 * 1000);

    const totalAmount = parseFloat((space.price_per_hour * durationHours).toFixed(2));
    const hostEarning = parseFloat((totalAmount * 0.80).toFixed(2)); // 80% to Host
    const platformFee = parseFloat((totalAmount * 0.20).toFixed(2)); // 20% to Curbly Platform

    // Record booking in Neon PostgreSQL
    const bookingResult = await pool.query(
      `INSERT INTO bookings 
       (user_id, space_id, start_time, end_time, hours, total_amount, host_earning, platform_fee, status, vehicle_number)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'confirmed', $9)
       RETURNING *`,
      [
        req.user.id,
        space_id,
        startDate.toISOString(),
        endDate.toISOString(),
        durationHours,
        totalAmount,
        hostEarning,
        platformFee,
        vehicle_number || 'KA-01-EA-2026'
      ]
    );

    const booking = bookingResult.rows[0];

    // Generate Razorpay Order Record
    const razorpayOrderId = `order_crb_${Date.now()}`;
    const razorpayPaymentId = `pay_crb_${Math.floor(100000 + Math.random() * 900000)}`;

    const paymentResult = await pool.query(
      `INSERT INTO payments 
       (booking_id, razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, status)
       VALUES ($1, $2, $3, $4, $5, 'success')
       RETURNING *`,
      [
        booking.id,
        razorpayOrderId,
        razorpayPaymentId,
        'sig_verified_hmac_sha256',
        totalAmount
      ]
    );

    res.status(201).json({
      message: 'Slot reserved and payment completed successfully',
      booking,
      payment: paymentResult.rows[0],
      space
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ error: 'Failed to process booking' });
  }
});

// Driver: Get My Bookings
app.get('/api/bookings/my', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT b.*, p.title as space_title, p.address as space_address, p.city, p.latitude, p.longitude, 
              u.name as owner_name, u.phone as owner_phone,
              pay.razorpay_payment_id
       FROM bookings b
       JOIN parking_spaces p ON b.space_id = p.id
       JOIN users u ON p.owner_id = u.id
       LEFT JOIN payments pay ON pay.booking_id = b.id
       WHERE b.user_id = $1
       ORDER BY b.created_at DESC`,
      [req.user.id]
    );

    res.json({ bookings: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Owner: Get Host Dashboard Analytics & Spaces
app.get('/api/owner/dashboard', authenticateToken, async (req, res) => {
  try {
    // Owner's spaces
    const spacesResult = await pool.query(
      'SELECT * FROM parking_spaces WHERE owner_id = $1 ORDER BY id DESC',
      [req.user.id]
    );

    // Bookings for owner's spaces
    const bookingsResult = await pool.query(
      `SELECT b.*, p.title as space_title, u.name as driver_name, u.phone as driver_phone
       FROM bookings b
       JOIN parking_spaces p ON b.space_id = p.id
       JOIN users u ON b.user_id = u.id
       WHERE p.owner_id = $1
       ORDER BY b.created_at DESC`,
      [req.user.id]
    );

    const totalEarnings = bookingsResult.rows.reduce((sum, b) => sum + parseFloat(b.host_earning || 0), 0);
    const totalBookings = bookingsResult.rows.length;
    const activeSpaces = spacesResult.rows.filter(s => s.is_active).length;

    res.json({
      summary: {
        totalEarnings: totalEarnings.toFixed(2),
        totalBookings,
        activeSpaces,
        totalSpaces: spacesResult.rows.length
      },
      spaces: spacesResult.rows,
      recentBookings: bookingsResult.rows
    });
  } catch (error) {
    console.error('Owner dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch host dashboard metrics' });
  }
});

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚗 CURBLY API Server running on port ${PORT}`);
  console.log(`📡 Connected to Neon PostgreSQL Database`);
  console.log(`💳 Razorpay Integration Enabled`);
  console.log(`===============================================`);
});
