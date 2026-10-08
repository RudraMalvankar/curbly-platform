# CURBLY — Smart Urban Parking & Space Sharing Platform

> **Find parking before you arrive.**  
> A university-level ENTP project & full-stack urban mobility web application connecting drivers with underutilized private parking spaces.

---

## 🌟 Overview & Architecture

CURBLY is a bidirectional marketplace built to eliminate urban parking congestion, cruising delays, and unauthorized parking by converting vacant residential and commercial driveways into an accessible, searchable, and reservable parking network.

- **Frontend**: **React.js (Vite)** + **Tailwind / Modern Design System** + **Lucide Icons**
- **Backend**: **Node.js** + **Express.js** REST API + **JWT Authentication** + **Bcrypt Hashing**
- **Database**: **Neon Serverless PostgreSQL** (ACID Relational Schema, Cloud Hosted)
- **Payment Processing**: **Razorpay** Gateway (HMAC-SHA256 signature verification)
- **Presentation Deck**: Includes the 25-slide university ENTP project presentation (`CURBLY_ENTP_Project_Presentation.pptx`)

---

## 📁 Repository Structure

```
Aishwarya/
├── CURBLY_ENTP_Project_Presentation.pptx  # 25-Slide University ENTP Deck
├── generate_presentation.py               # Slide generation engine
├── backend/                               # Node.js + Express.js API
│   ├── src/
│   │   ├── server.js                      # Express REST endpoints & auth middleware
│   │   └── db.js                          # Neon Serverless PostgreSQL connection pool
│   ├── .env                               # Database URI & JWT secrets
│   └── package.json
└── frontend/                              # React.js SPA Application
    ├── src/
    │   ├── App.jsx                        # Complete interactive UI: Map, Booking, Dashboard
    │   ├── main.jsx                       # React entrypoint
    │   └── index.css                      # Modern smart-city design system
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Running the Project Locally

### 1. Prerequisites
- **Node.js**: v18+ or v22+
- **Internet Access**: Required for connecting to the live cloud Neon PostgreSQL instance.

### 2. Start the Backend API
```powershell
cd backend
npm install
node src/server.js
```
The REST API starts on `http://localhost:5000`.  
- Health check: `http://localhost:5000/api/health`
- Live spots endpoint: `http://localhost:5000/api/parking/spaces`

### 3. Start the Frontend React Client
```powershell
cd frontend
npm install
npm run dev
```
Open your browser at `http://localhost:5173`.

---

## 🗄️ Database Architecture (Neon PostgreSQL)

Connected to live cloud cluster: `winter-bar-92591731` on **Neon Serverless PostgreSQL**.

### 1. `users` Table
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR)
- `email` (VARCHAR UNIQUE)
- `password_hash` (VARCHAR BCRYPT)
- `phone` (VARCHAR)
- `role` (ENUM: `'driver'`, `'owner'`, `'admin'`)

### 2. `parking_spaces` Table
- `id` (SERIAL PRIMARY KEY)
- `owner_id` (FK -> users.id)
- `title` (VARCHAR)
- `description` (TEXT)
- `address` (TEXT)
- `city` (VARCHAR)
- `latitude` / `longitude` (DECIMAL)
- `price_per_hour` (DECIMAL)
- `vehicle_type` (VARCHAR)
- `amenities` (TEXT[])
- `is_active` (BOOLEAN)

### 3. `bookings` Table
- `id` (SERIAL PRIMARY KEY)
- `user_id` (FK -> users.id)
- `space_id` (FK -> parking_spaces.id)
- `start_time` / `end_time` (TIMESTAMP)
- `hours` (INTEGER)
- `total_amount` (DECIMAL)
- `host_earning` (DECIMAL - 80% split)
- `platform_fee` (DECIMAL - 20% split)
- `status` (VARCHAR: `'confirmed'`)
- `vehicle_number` (VARCHAR)

### 4. `payments` Table
- `id` (SERIAL PRIMARY KEY)
- `booking_id` (FK -> bookings.id)
- `razorpay_order_id` (VARCHAR)
- `razorpay_payment_id` (VARCHAR)
- `razorpay_signature` (VARCHAR)
- `amount` (DECIMAL)
- `status` (VARCHAR)

---

## 💰 Unit Economics & Commission Model
- **Booking Example**: ₹60.00
- **Space Host (80%)**: ₹48.00 credited to host payout balance
- **Curbly Platform Fee (20%)**: ₹12.00 retained for infrastructure & operations

---

## 🎓 University Viva Presentation Deck
The 25-slide deck is located at:
`CURBLY_ENTP_Project_Presentation.pptx`
Follows clean smart-mobility styling with zero AI-hype visuals, featuring system diagrams, ER data models, unit economics, QA test matrices, and cloud deployment architecture.
