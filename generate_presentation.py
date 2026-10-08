import sys
import os
import pptx
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# Initialize Presentation
prs = pptx.Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
blank_layout = prs.slide_layouts[6]

# Color Palette (Smart Urban Mobility Theme)
# Light Clean Palette with Deep Navy, Fresh Emerald / Mint Green, Electric Cyan Accent
BG_LIGHT = RGBColor(248, 250, 252)       # Slate 50
BG_WHITE = RGBColor(255, 255, 255)       # Pure White
NAVY_PRIMARY = RGBColor(15, 23, 42)      # Slate 900
NAVY_SECONDARY = RGBColor(30, 41, 59)    # Slate 800
BLUE_ACCENT = RGBColor(37, 99, 235)      # Royal Blue 600
GREEN_EMERALD = RGBColor(16, 185, 129)   # Emerald 500
GREEN_DARK = RGBColor(5, 150, 105)       # Emerald 600
AMBER_ACCENT = RGBColor(245, 158, 11)    # Amber 500
TEXT_MUTED = RGBColor(100, 116, 139)     # Slate 500
TEXT_DARK = RGBColor(15, 23, 42)         # Slate 900
BORDER_COLOR = RGBColor(226, 232, 240)   # Slate 200
CARD_BG = RGBColor(255, 255, 255)        # Pure White Card
HERO_BG = RGBColor(15, 23, 42)           # Dark Navy for Title / Impact slide
HERO_CARD = RGBColor(30, 41, 59)         # Dark slate card

FONT_HEADING = "Calibri"
FONT_BODY = "Calibri"

def set_slide_background(slide, color=BG_LIGHT):
    bg_shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
    bg_shape.fill.solid()
    bg_shape.fill.fore_color.rgb = color
    bg_shape.line.fill.background()
    return bg_shape

def add_header(slide, slide_num, category, title, subtitle=None):
    # Top header bar
    # Category tag
    tag_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(8), Inches(0.35))
    tf_tag = tag_box.text_frame
    tf_tag.word_wrap = True
    tf_tag.margin_left = tf_tag.margin_top = tf_tag.margin_right = tf_tag.margin_bottom = 0
    p_tag = tf_tag.paragraphs[0]
    p_tag.text = f"{slide_num:02d} | {category.upper()}"
    p_tag.font.name = FONT_HEADING
    p_tag.font.size = Pt(11)
    p_tag.font.bold = True
    p_tag.font.color.rgb = GREEN_DARK

    # Title
    t_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.72), Inches(11.7), Inches(0.65))
    tf_t = t_box.text_frame
    tf_t.word_wrap = True
    tf_t.margin_left = tf_t.margin_top = tf_t.margin_right = tf_t.margin_bottom = 0
    p_t = tf_t.paragraphs[0]
    p_t.text = title
    p_t.font.name = FONT_HEADING
    p_t.font.size = Pt(24)
    p_t.font.bold = True
    p_t.font.color.rgb = NAVY_PRIMARY

    if subtitle:
        p_sub = tf_t.add_paragraph()
        p_sub.text = subtitle
        p_sub.font.name = FONT_BODY
        p_sub.font.size = Pt(13)
        p_sub.font.color.rgb = TEXT_MUTED
        p_sub.space_before = Pt(3)

def add_card(slide, left, top, width, height, bg_color=CARD_BG, border_color=BORDER_COLOR):
    card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    card.fill.solid()
    card.fill.fore_color.rgb = bg_color
    if border_color:
        card.line.color.rgb = border_color
        card.line.width = Pt(1.5)
    else:
        card.line.fill.background()
    return card

# ==========================================
# SLIDE 1: TITLE
# ==========================================
s1 = prs.slides.add_slide(blank_layout)
set_slide_background(s1, HERO_BG)

# Decorative subtle grid / accent bar
top_accent = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, Inches(0.12))
top_accent.fill.solid()
top_accent.fill.fore_color.rgb = GREEN_EMERALD
top_accent.line.fill.background()

# Title text container
t_box = s1.shapes.add_textbox(Inches(1.0), Inches(1.3), Inches(11.33), Inches(2.8))
tf = t_box.text_frame
tf.word_wrap = True

p_badge = tf.paragraphs[0]
p_badge.text = "ACADEMIC SOFTWARE & ENTREPRENEURSHIP PROJECT (ENTP)"
p_badge.font.name = FONT_HEADING
p_badge.font.size = Pt(12)
p_badge.font.bold = True
p_badge.font.color.rgb = GREEN_EMERALD

p_name = tf.add_paragraph()
p_name.text = "CURBLY"
p_name.font.name = FONT_HEADING
p_name.font.size = Pt(54)
p_name.font.bold = True
p_name.font.color.rgb = RGBColor(255, 255, 255)
p_name.space_before = Pt(8)

p_sub = tf.add_paragraph()
p_sub.text = "Smart Urban Parking & Space Sharing Platform"
p_sub.font.name = FONT_HEADING
p_sub.font.size = Pt(22)
p_sub.font.bold = True
p_sub.font.color.rgb = RGBColor(148, 163, 184) # Slate 400
p_sub.space_before = Pt(4)

p_tag = tf.add_paragraph()
p_tag.text = "\"Find parking before you arrive.\""
p_tag.font.name = FONT_BODY
p_tag.font.size = Pt(18)
p_tag.font.italic = True
p_tag.font.color.rgb = RGBColor(56, 189, 248) # Sky 400
p_tag.space_before = Pt(10)

# Project Metadata Cards
meta_items = [
    ("PROJECT TYPE", "ENTP / Full-Stack Capstone", "Web & Geolocation Platform"),
    ("CORE STACK", "React.js + Node.js + Express", "Neon Serverless PostgreSQL"),
    ("AUTH & PAYMENT", "JWT Security & Role Control", "Razorpay Payment Gateway"),
    ("TEAM & GUIDE", "Project Team: [Team Members]", "Faculty Guide: [Guide Name]\nDept of Computer Engineering")
]

for idx, (head, val1, val2) in enumerate(meta_items):
    left = Inches(1.0 + idx * 2.9)
    top = Inches(4.5)
    width = Inches(2.7)
    height = Inches(2.2)
    card = add_card(s1, left, top, width, height, bg_color=HERO_CARD, border_color=RGBColor(51, 65, 85))
    
    tb = s1.shapes.add_textbox(left + Inches(0.2), top + Inches(0.2), width - Inches(0.4), height - Inches(0.4))
    tf2 = tb.text_frame
    tf2.word_wrap = True
    
    p1 = tf2.paragraphs[0]
    p1.text = head
    p1.font.name = FONT_HEADING
    p1.font.size = Pt(11)
    p1.font.bold = True
    p1.font.color.rgb = GREEN_EMERALD
    
    p2 = tf2.add_paragraph()
    p2.text = val1
    p2.font.name = FONT_HEADING
    p2.font.size = Pt(14)
    p2.font.bold = True
    p2.font.color.rgb = RGBColor(255, 255, 255)
    p2.space_before = Pt(8)
    
    p3 = tf2.add_paragraph()
    p3.text = val2
    p3.font.name = FONT_BODY
    p3.font.size = Pt(12)
    p3.font.color.rgb = RGBColor(148, 163, 184)
    p3.space_before = Pt(6)

# ==========================================
# SLIDE 2: THE PROBLEM
# ==========================================
s2 = prs.slides.add_slide(blank_layout)
set_slide_background(s2)
add_header(s2, 2, "Problem Statement", "The Parking Problem in Modern Cities", 
           "Urban congestion is exacerbated by inefficient spot discovery and unmonetized private capacity.")

# Visual flow cards across top
problem_points = [
    ("Time Wastage", "Search Cruising", "Drivers spend 15-25 minutes circling commercial and residential zones seeking curb or lot spaces, creating massive personal delays."),
    ("High Uncertainty", "Blind Navigation", "Arrival at destinations without advance certainty leads to illegal curbside parking, blocked driveways, and steep fines."),
    ("Unused Private Capacity", "Dead Capital", "Thousands of private driveways, society slots, and retail slots stay completely vacant during standard working hours."),
    ("Traffic Congestion", "Unnecessary Circulation", "Cruising traffic accounts for up to 30% of congestion in peak urban downtown corridors, elevating carbon emissions.")
]

for idx, (tag, title, desc) in enumerate(problem_points):
    left = Inches(0.8 + idx * 2.98)
    top = Inches(1.7)
    width = Inches(2.8)
    height = Inches(3.6)
    add_card(s2, left, top, width, height)
    
    # Accent indicator bar
    bar = s2.shapes.add_shape(MSO_SHAPE.RECTANGLE, left + Inches(0.2), top + Inches(0.2), width - Inches(0.4), Inches(0.06))
    bar.fill.solid()
    bar.fill.fore_color.rgb = AMBER_ACCENT if idx % 2 == 0 else BLUE_ACCENT
    bar.line.fill.background()
    
    tb = s2.shapes.add_textbox(left + Inches(0.2), top + Inches(0.4), width - Inches(0.4), height - Inches(0.6))
    tf = tb.text_frame
    tf.word_wrap = True
    
    p0 = tf.paragraphs[0]
    p0.text = tag.upper()
    p0.font.name = FONT_HEADING
    p0.font.size = Pt(11)
    p0.font.bold = True
    p0.font.color.rgb = AMBER_ACCENT if idx % 2 == 0 else BLUE_ACCENT
    
    p1 = tf.add_paragraph()
    p1.text = title
    p1.font.name = FONT_HEADING
    p1.font.size = Pt(18)
    p1.font.bold = True
    p1.font.color.rgb = NAVY_PRIMARY
    p1.space_before = Pt(6)
    
    p2 = tf.add_paragraph()
    p2.text = desc
    p2.font.name = FONT_BODY
    p2.font.size = Pt(13)
    p2.font.color.rgb = NAVY_SECONDARY
    p2.space_before = Pt(10)

# Bottom Visual Journey Banner
banner = add_card(s2, Inches(0.8), Inches(5.6), Inches(11.73), Inches(1.3), bg_color=RGBColor(241, 245, 249), border_color=BORDER_COLOR)
tb_b = s2.shapes.add_textbox(Inches(1.1), Inches(5.75), Inches(11.1), Inches(1.0))
tf_b = tb_b.text_frame
tf_b.word_wrap = True

p_b1 = tf_b.paragraphs[0]
p_b1.text = "THE FLAWED LEGACY PARKING CYCLE:"
p_b1.font.name = FONT_HEADING
p_b1.font.size = Pt(11)
p_b1.font.bold = True
p_b1.font.color.rgb = RGBColor(220, 38, 38) # Red 600

p_b2 = tf_b.add_paragraph()
p_b2.text = "Driver Departs  ──>  Blind Arrival at Destination  ──>  Frustrating Cruising & Congestion  ──>  Unauthorized Parking / High Fines"
p_b2.font.name = FONT_HEADING
p_b2.font.size = Pt(15)
p_b2.font.bold = True
p_b2.font.color.rgb = NAVY_PRIMARY
p_b2.space_before = Pt(4)

# ==========================================
# SLIDE 3: OUR SOLUTION
# ==========================================
s3 = prs.slides.add_slide(blank_layout)
set_slide_background(s3)
add_header(s3, 3, "Solution Overview", "Introducing Curbly: Smart Space Sharing Platform",
           "A bidirectional marketplace connecting urban drivers directly with private & commercial parking space owners.")

# Left Card: Drivers
add_card(s3, Inches(0.8), Inches(1.7), Inches(3.6), Inches(5.2))
tb_d = s3.shapes.add_textbox(Inches(1.0), Inches(1.9), Inches(3.2), Inches(4.8))
tf_d = tb_d.text_frame
tf_d.word_wrap = True

p = tf_d.paragraphs[0]
p.text = "FOR COMMUTERS & DRIVERS"
p.font.name = FONT_HEADING
p.font.size = Pt(12)
p.font.bold = True
p.font.color.rgb = BLUE_ACCENT

p = tf_d.add_paragraph()
p.text = "On-Demand Parking Discovery"
p.font.name = FONT_HEADING
p.font.size = Pt(18)
p.font.bold = True
p.font.color.rgb = NAVY_PRIMARY
p.space_before = Pt(4)

items_driver = [
    "Location-Based Discovery: Map search for slots within walking distance of destination.",
    "Real-Time Availability: View updated slots, rates, and amenities (CCTV, Covered, EV).",
    "Instant Advance Reservation: Lock slots prior to driving to eliminate uncertainty.",
    "Seamless Digital Payments: Integrated Razorpay checkout with transparent billing.",
    "Navigation & QR Check-in: Turn-by-turn routing and verification upon arrival."
]
for item in items_driver:
    p = tf_d.add_paragraph()
    p.text = "• " + item
    p.font.name = FONT_BODY
    p.font.size = Pt(12)
    p.font.color.rgb = NAVY_SECONDARY
    p.space_before = Pt(8)

# Center Platform Card
add_card(s3, Inches(4.7), Inches(1.7), Inches(3.9), Inches(5.2), bg_color=NAVY_PRIMARY, border_color=None)
tb_c = s3.shapes.add_textbox(Inches(4.9), Inches(1.9), Inches(3.5), Inches(4.8))
tf_c = tb_c.text_frame
tf_c.word_wrap = True

p = tf_c.paragraphs[0]
p.text = "THE CORE PLATFORM"
p.font.name = FONT_HEADING
p.font.size = Pt(12)
p.font.bold = True
p.font.color.rgb = GREEN_EMERALD

p = tf_c.add_paragraph()
p.text = "CURBLY CLOUD ENGINE"
p.font.name = FONT_HEADING
p.font.size = Pt(22)
p.font.bold = True
p.font.color.rgb = RGBColor(255, 255, 255)
p.space_before = Pt(4)

curbly_items = [
    ("React.js Client", "Intuitive responsive UI for search, booking, and host controls"),
    ("Node.js REST Services", "Secure API handling bookings, authentication, and slots"),
    ("Neon PostgreSQL", "Serverless relational data store with geospatial indexing"),
    ("Razorpay Webhooks", "Escrow-style automated payment processing & splits"),
    ("Smart Verification", "Secure QR/OTP verification for effortless check-in & check-out")
]
for title, desc in curbly_items:
    p = tf_c.add_paragraph()
    p.text = f"{title}"
    p.font.name = FONT_HEADING
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = RGBColor(241, 245, 249)
    p.space_before = Pt(10)
    
    p_sub = tf_c.add_paragraph()
    p_sub.text = desc
    p_sub.font.name = FONT_BODY
    p_sub.font.size = Pt(11)
    p_sub.font.color.rgb = RGBColor(148, 163, 184)
    p_sub.space_before = Pt(2)

# Right Card: Space Owners
add_card(s3, Inches(8.9), Inches(1.7), Inches(3.6), Inches(5.2))
tb_h = s3.shapes.add_textbox(Inches(9.1), Inches(1.9), Inches(3.2), Inches(4.8))
tf_h = tb_h.text_frame
tf_h.word_wrap = True

p = tf_h.paragraphs[0]
p.text = "FOR PROPERTY OWNERS"
p.font.name = FONT_HEADING
p.font.size = Pt(12)
p.font.bold = True
p.font.color.rgb = GREEN_DARK

p = tf_h.add_paragraph()
p.text = "Monetize Idle Parking Capacity"
p.font.name = FONT_HEADING
p.font.size = Pt(18)
p.font.bold = True
p.font.color.rgb = NAVY_PRIMARY
p.space_before = Pt(4)

items_host = [
    "Effortless Listing: Register driveways, society spaces, or commercial slots in minutes.",
    "Dynamic Availability Control: Set operational hours, blackout dates, and hourly rates.",
    "Real-Time Booking Management: Instant notifications and dashboard booking tracking.",
    "Automated Earnings: Transparent payout tracking with direct bank account settlements.",
    "Safe Verification: Strict vehicle and driver ID visibility prior to physical access."
]
for item in items_host:
    p = tf_h.add_paragraph()
    p.text = "• " + item
    p.font.name = FONT_BODY
    p.font.size = Pt(12)
    p.font.color.rgb = NAVY_SECONDARY
    p.space_before = Pt(8)

# ==========================================
# SLIDE 4: OBJECTIVES
# ==========================================
s4 = prs.slides.add_slide(blank_layout)
set_slide_background(s4)
add_header(s4, 4, "Project Scope", "Core Project Objectives",
           "Engineering goals aimed at solving parking friction through scalable full-stack web software.")

objectives = [
    ("01", "Minimize Search Cruising Time", "Deliver sub-second geo-discovery to guide motorists directly to reserved slots, preventing traffic circulation."),
    ("02", "Monetize Underutilized Assets", "Transform vacant residential & commercial driveways into high-yield shared urban mobility infrastructure."),
    ("03", "Guaranteed Advance Booking", "Enable users to book hours or days in advance with concurrency locks preventing double-booking."),
    ("04", "Frictionless Digital Payments", "Integrate Razorpay to handle digital transactions, instant receipts, refunds, and host payout records."),
    ("05", "Geospatial Map Exploration", "Leverage interactive map interfaces with pins, distance calculation, filtering, and route directions."),
    ("06", "Enterprise Security & Auth", "Implement strict JWT auth, bcrypt password hashing, and role-based access control (Driver vs Host vs Admin).")
]

for idx, (num, title, desc) in enumerate(objectives):
    row = idx // 3
    col = idx % 3
    left = Inches(0.8 + col * 3.98)
    top = Inches(1.8 + row * 2.6)
    width = Inches(3.8)
    height = Inches(2.35)
    
    add_card(s4, left, top, width, height)
    
    tb = s4.shapes.add_textbox(left + Inches(0.2), top + Inches(0.2), width - Inches(0.4), height - Inches(0.4))
    tf = tb.text_frame
    tf.word_wrap = True
    
    p0 = tf.paragraphs[0]
    p0.text = num
    p0.font.name = FONT_HEADING
    p0.font.size = Pt(20)
    p0.font.bold = True
    p0.font.color.rgb = GREEN_DARK
    
    p1 = tf.add_paragraph()
    p1.text = title
    p1.font.name = FONT_HEADING
    p1.font.size = Pt(15)
    p1.font.bold = True
    p1.font.color.rgb = NAVY_PRIMARY
    p1.space_before = Pt(4)
    
    p2 = tf.add_paragraph()
    p2.text = desc
    p2.font.name = FONT_BODY
    p2.font.size = Pt(12)
    p2.font.color.rgb = TEXT_MUTED
    p2.space_before = Pt(6)

# ==========================================
# SLIDE 5: TARGET USERS
# ==========================================
s5 = prs.slides.add_slide(blank_layout)
set_slide_background(s5)
add_header(s5, 5, "Market Stakeholders", "Target User Personas",
           "Designed for diverse urban stakeholders to build a balanced two-sided marketplace.")

personas = [
    ("COMMUTERS & DRIVERS", "Daily Urban Motorists", 
     "Needs: Quick slot discovery near offices, malls, or event hubs; pre-booking assurance; digital payments.\nPain Points: Circling blocks, parking meters out of service, risk of towing or vehicle scratches.\nPlatform Value: Certainty before departure, cashless checkout, turn-by-turn guidance."),
    ("RESIDENTIAL HOSTS", "Individual Property Owners", 
     "Needs: Monetizing empty driveways or society parking bays during working hours.\nPain Points: Space sits idle while maintaining property; skepticism about driver security.\nPlatform Value: Passive monthly income, complete calendar control, verified driver check-ins."),
    ("COMMERCIAL LOTS", "Shops & Office Complexes", 
     "Needs: Optimizing occupancy during off-peak hours and weekend lulls.\nPain Points: Manual paper slips, cash leakages, zero digital visibility to passing drivers.\nPlatform Value: Automated digital ledger, revenue analytics, dynamic slot availability."),
    ("PLATFORM ADMIN", "Operations & Governance", 
     "Needs: Ecosystem safety, fraud prevention, compliance, platform dispute resolution.\nPain Points: Fraudulent slot listings, pricing disputes, system uptime monitoring.\nPlatform Value: Centralized admin dashboard, KYC validation, automated commission splits.")
]

for idx, (role, sub, body) in enumerate(personas):
    left = Inches(0.8 + idx * 2.98)
    top = Inches(1.8)
    width = Inches(2.8)
    height = Inches(5.1)
    
    add_card(s5, left, top, width, height)
    
    tb = s5.shapes.add_textbox(left + Inches(0.2), top + Inches(0.25), width - Inches(0.4), height - Inches(0.5))
    tf = tb.text_frame
    tf.word_wrap = True
    
    p0 = tf.paragraphs[0]
    p0.text = role
    p0.font.name = FONT_HEADING
    p0.font.size = Pt(11)
    p0.font.bold = True
    p0.font.color.rgb = BLUE_ACCENT if idx % 2 == 0 else GREEN_DARK
    
    p1 = tf.add_paragraph()
    p1.text = sub
    p1.font.name = FONT_HEADING
    p1.font.size = Pt(16)
    p1.font.bold = True
    p1.font.color.rgb = NAVY_PRIMARY
    p1.space_before = Pt(4)
    
    for section in body.split("\n"):
        parts = section.split(":")
        p_sec = tf.add_paragraph()
        p_sec.text = parts[0] + ":"
        p_sec.font.name = FONT_HEADING
        p_sec.font.size = Pt(11)
        p_sec.font.bold = True
        p_sec.font.color.rgb = NAVY_SECONDARY
        p_sec.space_before = Pt(8)
        
        if len(parts) > 1:
            p_desc = tf.add_paragraph()
            p_desc.text = parts[1].strip()
            p_desc.font.name = FONT_BODY
            p_desc.font.size = Pt(11)
            p_desc.font.color.rgb = TEXT_MUTED
            p_desc.space_before = Pt(2)

# ==========================================
# SLIDE 6: HOW CURBLY WORKS
# ==========================================
s6 = prs.slides.add_slide(blank_layout)
set_slide_background(s6)
add_header(s6, 6, "Operational Workflow", "Simple 3-Step Parking Experience",
           "End-to-end simplicity engineered for both drivers and property hosts.")

# Top Driver Track
top_card = add_card(s6, Inches(0.8), Inches(1.7), Inches(11.73), Inches(2.6))
tb_dt = s6.shapes.add_textbox(Inches(1.0), Inches(1.85), Inches(11.3), Inches(2.3))
tf_dt = tb_dt.text_frame
tf_dt.word_wrap = True

p = tf_dt.paragraphs[0]
p.text = "THE DRIVER EXPERIENCE"
p.font.name = FONT_HEADING
p.font.size = Pt(12)
p.font.bold = True
p.font.color.rgb = BLUE_ACCENT

steps_driver = [
    ("STEP 1: DISCOVER", "Search Nearby Slots", "Enter destination or use live geolocation. View interactive map pins, pricing, and amenities."),
    ("STEP 2: RESERVE", "Book & Pay", "Select date, start/end time. Instant slot lock and secure checkout via Razorpay gateway."),
    ("STEP 3: PARK", "Navigate & Check-In", "Receive turn-by-turn routing to the exact spot. Show QR code / OTP to host, park stress-free.")
]

for idx, (step, title, desc) in enumerate(steps_driver):
    left_s = Inches(1.0 + idx * 3.8)
    top_s = Inches(2.25)
    card_s = add_card(s6, left_s, top_s, Inches(3.6), Inches(1.85), bg_color=RGBColor(248, 250, 252))
    
    tb_s = s6.shapes.add_textbox(left_s + Inches(0.15), top_s + Inches(0.15), Inches(3.3), Inches(1.55))
    tf_s = tb_s.text_frame
    tf_s.word_wrap = True
    
    p0 = tf_s.paragraphs[0]
    p0.text = step
    p0.font.name = FONT_HEADING
    p0.font.size = Pt(11)
    p0.font.bold = True
    p0.font.color.rgb = BLUE_ACCENT
    
    p1 = tf_s.add_paragraph()
    p1.text = title
    p1.font.name = FONT_HEADING
    p1.font.size = Pt(14)
    p1.font.bold = True
    p1.font.color.rgb = NAVY_PRIMARY
    p1.space_before = Pt(3)
    
    p2 = tf_s.add_paragraph()
    p2.text = desc
    p2.font.name = FONT_BODY
    p2.font.size = Pt(11)
    p2.font.color.rgb = TEXT_MUTED
    p2.space_before = Pt(4)

# Bottom Host Track
bottom_card = add_card(s6, Inches(0.8), Inches(4.55), Inches(11.73), Inches(2.45))
tb_ht = s6.shapes.add_textbox(Inches(1.0), Inches(4.7), Inches(11.3), Inches(2.2))
tf_ht = tb_ht.text_frame
tf_ht.word_wrap = True

p = tf_ht.paragraphs[0]
p.text = "THE SPACE OWNER (HOST) EXPERIENCE"
p.font.name = FONT_HEADING
p.font.size = Pt(12)
p.font.bold = True
p.font.color.rgb = GREEN_DARK

steps_host = [
    ("1. LIST SPACE", "Specify Details", "Upload spot photos, address, vehicle size compatibility (Hatchback/SUV/Bike), and features."),
    ("2. SET TIMINGS", "Define Availability", "Configure working hours, days of the week, and custom hourly or daily rates in real time."),
    ("3. ACCEPT BOOKINGS", "Automated Matching", "Platform handles slot concurrency, notifications, and instant reservation confirmation."),
    ("4. RECEIVE EARNINGS", "Automated Payouts", "Monitor verified check-ins and collect earnings directly transferred to registered bank account.")
]

for idx, (step, title, desc) in enumerate(steps_host):
    left_s = Inches(1.0 + idx * 2.85)
    top_s = Inches(5.05)
    card_s = add_card(s6, left_s, top_s, Inches(2.7), Inches(1.8), bg_color=RGBColor(248, 250, 252))
    
    tb_s = s6.shapes.add_textbox(left_s + Inches(0.15), top_s + Inches(0.12), Inches(2.4), Inches(1.55))
    tf_s = tb_s.text_frame
    tf_s.word_wrap = True
    
    p0 = tf_s.paragraphs[0]
    p0.text = step
    p0.font.name = FONT_HEADING
    p0.font.size = Pt(10)
    p0.font.bold = True
    p0.font.color.rgb = GREEN_DARK
    
    p1 = tf_s.add_paragraph()
    p1.text = title
    p1.font.name = FONT_HEADING
    p1.font.size = Pt(13)
    p1.font.bold = True
    p1.font.color.rgb = NAVY_PRIMARY
    p1.space_before = Pt(2)
    
    p2 = tf_s.add_paragraph()
    p2.text = desc
    p2.font.name = FONT_BODY
    p2.font.size = Pt(10.5)
    p2.font.color.rgb = TEXT_MUTED
    p2.space_before = Pt(3)

# ==========================================
# SLIDE 7: CORE FEATURES
# ==========================================
s7 = prs.slides.add_slide(blank_layout)
set_slide_background(s7)
add_header(s7, 7, "Product Capability", "Comprehensive Core Features",
           "Modular feature matrix supporting drivers, space hosts, and platform administrators.")

feature_cols = [
    ("DRIVER MODULE", BLUE_ACCENT, [
        ("Geolocation Discovery", "Real-time GPS coordinate detection and radius-based parking lookup."),
        ("Map Visualizer", "Dynamic map markers color-coded by spot availability and rate."),
        ("Slot Reservation Engine", "Hourly slot booking with time validation and availability lock."),
        ("Integrated Checkout", "Razorpay checkout modal supporting UPI, Cards, NetBanking."),
        ("Active Pass & History", "Digital parking ticket with QR code, booking ID, and navigation."),
        ("Filter & Amenities", "Filter by EV charging, covered roof, 24/7 security, and vehicle size.")
    ]),
    ("OWNER / HOST MODULE", GREEN_DARK, [
        ("Multi-Spot Listing", "Create single or multiple bays with detailed physical guidelines."),
        ("Dynamic Availability", "Schedule recurring active windows or pause listing instantly."),
        ("Transparent Pricing", "Set custom hourly baseline rates and surge pricing flags."),
        ("Live Booking Ledger", "View upcoming, active, and past reservations in real-time."),
        ("Revenue Dashboard", "Track daily/monthly earnings, commission deductions, and net payouts."),
        ("Access Verification", "Validate inbound driver tickets via booking code or QR scanner.")
    ]),
    ("ADMIN & GOVERNANCE", AMBER_ACCENT, [
        ("Listing Verification", "Review submitted spaces and ownership records before going public."),
        ("User Management", "Monitor user accounts, roles, access states, and trust scores."),
        ("Transaction Audits", "Complete ledger of payments, platform fees, and refund statuses."),
        ("Platform Telemetry", "Monitor active bookings, system metrics, and service availability."),
        ("Dispute Resolution", "Handle cancellations, overstay penalty flags, and user support."),
        ("Role-Based RBAC", "Enforce strict endpoint security based on authenticated JWT claims.")
    ])
]

for idx, (title, color, items) in enumerate(feature_cols):
    left = Inches(0.8 + idx * 3.98)
    top = Inches(1.8)
    width = Inches(3.8)
    height = Inches(5.1)
    
    add_card(s7, left, top, width, height)
    
    # Top badge
    tb = s7.shapes.add_textbox(left + Inches(0.25), top + Inches(0.2), width - Inches(0.5), height - Inches(0.4))
    tf = tb.text_frame
    tf.word_wrap = True
    
    p = tf.paragraphs[0]
    p.text = title
    p.font.name = FONT_HEADING
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = color
    
    for f_title, f_desc in items:
        p_t = tf.add_paragraph()
        p_t.text = f"• {f_title}"
        p_t.font.name = FONT_HEADING
        p_t.font.size = Pt(11.5)
        p_t.font.bold = True
        p_t.font.color.rgb = NAVY_PRIMARY
        p_t.space_before = Pt(6)
        
        p_d = tf.add_paragraph()
        p_d.text = f_desc
        p_d.font.name = FONT_BODY
        p_d.font.size = Pt(10.5)
        p_d.font.color.rgb = TEXT_MUTED
        p_d.space_before = Pt(1)

# ==========================================
# SLIDE 8: SYSTEM ARCHITECTURE
# ==========================================
s8 = prs.slides.add_slide(blank_layout)
set_slide_background(s8)
add_header(s8, 8, "Engineering Architecture", "System Architecture & Data Flow",
           "Modern decoupled tier architecture built for low latency, reliability, and clear separation of concerns.")

# 4 Horizontal Architectural Layers
layers = [
    ("CLIENT PRESENTATION LAYER", BLUE_ACCENT, "React.js SPA (Vite / React Router)", 
     "Responsive Web UI  |  Map Geolocation View  |  Search & Filter Filters  |  Booking & Checkout Modal  |  Host Dashboard"),
    ("API GATEWAY & ROUTING LAYER", GREEN_DARK, "Express.js REST API & Middleware", 
     "JWT Verification Filter  |  CORS & Helmet Security  |  Rate Limiting  |  Request Body Validation  |  Error Handling"),
    ("APPLICATION BUSINESS LOGIC", AMBER_ACCENT, "Node.js Core Micro-Services", 
     "Auth Service (bcrypt/JWT)  |  Parking Search & Geo-Filter  |  Booking Lock Manager  |  Payment Webhook Worker"),
    ("DATA PERSISTENCE & CLOUD SERVICES", NAVY_PRIMARY, "Neon PostgreSQL & External APIs", 
     "Neon Serverless PostgreSQL (ACID Tables)  |  Razorpay Payment Engine  |  Map Coordinates & Geocoding API")
]

for idx, (layer_name, badge_color, tech_title, components) in enumerate(layers):
    top = Inches(1.8 + idx * 1.3)
    left = Inches(0.8)
    width = Inches(11.73)
    height = Inches(1.15)
    
    card = add_card(s8, left, top, width, height)
    
    # Left pill bar
    pill = s8.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, Inches(0.12), height)
    pill.fill.solid()
    pill.fill.fore_color.rgb = badge_color
    pill.line.fill.background()
    
    tb = s8.shapes.add_textbox(left + Inches(0.3), top + Inches(0.12), width - Inches(0.5), height - Inches(0.24))
    tf = tb.text_frame
    tf.word_wrap = True
    
    p0 = tf.paragraphs[0]
    p0.text = layer_name
    p0.font.name = FONT_HEADING
    p0.font.size = Pt(10)
    p0.font.bold = True
    p0.font.color.rgb = badge_color
    
    p1 = tf.add_paragraph()
    p1.text = tech_title
    p1.font.name = FONT_HEADING
    p1.font.size = Pt(14)
    p1.font.bold = True
    p1.font.color.rgb = NAVY_PRIMARY
    p1.space_before = Pt(2)
    
    p2 = tf.add_paragraph()
    p2.text = components
    p2.font.name = FONT_BODY
    p2.font.size = Pt(11)
    p2.font.color.rgb = TEXT_MUTED
    p2.space_before = Pt(3)

# ==========================================
# SLIDE 9: TECHNOLOGY STACK
# ==========================================
s9 = prs.slides.add_slide(blank_layout)
set_slide_background(s9)
add_header(s9, 9, "Technical Implementation", "Technology Stack & Engineering Justification",
           "Every technology is deliberately chosen for performance, relational integrity, and developer velocity.")

tech_categories = [
    ("FRONTEND TIER", [
        ("React.js", "Component reusability, virtual DOM for dynamic map rendering, and smooth state updates."),
        ("Tailwind CSS", "Utility-first responsive styling ensuring fast mobile-first UI delivery without CSS bloat."),
        ("React Router", "Client-side routing enabling SPA navigation across search, booking, and dashboard screens.")
    ]),
    ("BACKEND TIER", [
        ("Node.js", "Asynchronous non-blocking I/O event loop ideal for concurrent booking and API transactions."),
        ("Express.js", "Minimalist, robust REST API routing, custom middleware pipelines, and error handling."),
        ("JWT Authentication", "Stateless token-based authorization passing user roles securely across requests.")
    ]),
    ("DATABASE & SERVICES", [
        ("Neon PostgreSQL", "Serverless PostgreSQL with instant autoscaling, ACID guarantees, and geospatial querying."),
        ("Razorpay Gateway", "Standard Indian payment infrastructure handling UPI, cards, and secure webhook verification."),
        ("Maps API", "Interactive mapping, geocoding coordinates, calculating travel distances and route pins.")
    ]),
    ("DEVOPS & TOOLS", [
        ("Vercel", "Edge network hosting for high-speed frontend delivery, instant preview builds, and SSL."),
        ("Render / Railway", "Containerized backend deployment with automatic CI/CD deployment from GitHub."),
        ("Postman & Git", "API endpoint testing, contract validation, and disciplined Git feature branching.")
    ])
]

for idx, (cat_title, techs) in enumerate(tech_categories):
    left = Inches(0.8 + idx * 2.98)
    top = Inches(1.8)
    width = Inches(2.8)
    height = Inches(5.1)
    
    add_card(s9, left, top, width, height)
    
    tb = s9.shapes.add_textbox(left + Inches(0.2), top + Inches(0.2), width - Inches(0.4), height - Inches(0.4))
    tf = tb.text_frame
    tf.word_wrap = True
    
    p = tf.paragraphs[0]
    p.text = cat_title
    p.font.name = FONT_HEADING
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = BLUE_ACCENT if idx % 2 == 0 else GREEN_DARK
    
    for t_name, t_why in techs:
        pt = tf.add_paragraph()
        pt.text = t_name
        pt.font.name = FONT_HEADING
        pt.font.size = Pt(14)
        pt.font.bold = True
        pt.font.color.rgb = NAVY_PRIMARY
        pt.space_before = Pt(8)
        
        pw = tf.add_paragraph()
        pw.text = t_why
        pw.font.name = FONT_BODY
        pw.font.size = Pt(11)
        pw.font.color.rgb = TEXT_MUTED
        pw.space_before = Pt(2)

# ==========================================
# SLIDE 10: DATABASE DESIGN
# ==========================================
s10 = prs.slides.add_slide(blank_layout)
set_slide_background(s10)
add_header(s10, 10, "Data Modeling", "Database Design (PostgreSQL / Neon)",
           "Relational schema enforcing referential integrity, booking concurrency safety, and transaction audit trails.")

tables = [
    ("users", [
        ("id", "UUID / SERIAL", "PK"),
        ("name", "VARCHAR(100)", "NOT NULL"),
        ("email", "VARCHAR(255)", "UNIQUE"),
        ("password_hash", "VARCHAR(255)", "BCRYPT"),
        ("phone", "VARCHAR(20)", "OPTIONAL"),
        ("role", "ENUM", "'driver', 'owner', 'admin'"),
        ("created_at", "TIMESTAMP", "DEFAULT NOW()")
    ]),
    ("parking_spaces", [
        ("id", "UUID / SERIAL", "PK"),
        ("owner_id", "INTEGER / UUID", "FK -> users(id)"),
        ("title", "VARCHAR(150)", "NOT NULL"),
        ("address", "TEXT", "Location Address"),
        ("latitude", "DECIMAL(10,8)", "Geo Coordinate"),
        ("longitude", "DECIMAL(11,8)", "Geo Coordinate"),
        ("price_per_hour", "DECIMAL(8,2)", "Base rate (INR)"),
        ("is_active", "BOOLEAN", "Availability Flag")
    ]),
    ("bookings", [
        ("id", "UUID / SERIAL", "PK"),
        ("user_id", "INTEGER / UUID", "FK -> users(id)"),
        ("space_id", "INTEGER / UUID", "FK -> parking_spaces(id)"),
        ("start_time", "TIMESTAMP", "Start window"),
        ("end_time", "TIMESTAMP", "End window"),
        ("total_amount", "DECIMAL(8,2)", "Calculated Cost"),
        ("status", "ENUM", "'pending', 'confirmed', 'completed', 'cancelled'"),
        ("created_at", "TIMESTAMP", "DEFAULT NOW()")
    ]),
    ("payments", [
        ("id", "UUID / SERIAL", "PK"),
        ("booking_id", "INTEGER / UUID", "FK -> bookings(id)"),
        ("razorpay_order_id", "VARCHAR(100)", "Gateway Order"),
        ("razorpay_payment_id", "VARCHAR(100)", "Payment ID"),
        ("amount", "DECIMAL(8,2)", "Total Amount"),
        ("status", "VARCHAR(50)", "'success', 'failed'"),
        ("created_at", "TIMESTAMP", "DEFAULT NOW()")
    ])
]

for idx, (tname, fields) in enumerate(tables):
    left = Inches(0.8 + idx * 2.98)
    top = Inches(1.8)
    width = Inches(2.8)
    height = Inches(5.1)
    
    add_card(s10, left, top, width, height)
    
    # Table header
    header_shape = s10.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, Inches(0.55))
    header_shape.fill.solid()
    header_shape.fill.fore_color.rgb = NAVY_PRIMARY
    header_shape.line.fill.background()
    
    tb_h = s10.shapes.add_textbox(left + Inches(0.15), top + Inches(0.08), width - Inches(0.3), Inches(0.4))
    tf_h = tb_h.text_frame
    p_th = tf_h.paragraphs[0]
    p_th.text = f"TABLE: {tname}"
    p_th.font.name = FONT_HEADING
    p_th.font.size = Pt(13)
    p_th.font.bold = True
    p_th.font.color.rgb = RGBColor(255, 255, 255)
    
    tb_b = s10.shapes.add_textbox(left + Inches(0.15), top + Inches(0.65), width - Inches(0.3), height - Inches(0.8))
    tf_b = tb_b.text_frame
    tf_b.word_wrap = True
    
    first = True
    for f_col, f_type, f_note in fields:
        p = tf_b.paragraphs[0] if first else tf_b.add_paragraph()
        first = False
        p.text = f"{f_col}: {f_type}"
        p.font.name = FONT_HEADING
        p.font.size = Pt(10.5)
        p.font.bold = True
        p.font.color.rgb = NAVY_SECONDARY
        if not first:
            p.space_before = Pt(4)
            
        p_note = tf_b.add_paragraph()
        p_note.text = f"  └ {f_note}"
        p_note.font.name = FONT_BODY
        p_note.font.size = Pt(9.5)
        p_note.font.color.rgb = TEXT_MUTED
        p_note.space_before = Pt(1)

# ==========================================
# SLIDE 11: APPLICATION FLOW
# ==========================================
s11 = prs.slides.add_slide(blank_layout)
set_slide_background(s11)
add_header(s11, 11, "End-to-End User Flow", "Application Execution Flow",
           "Linear operational pathway from initial motorist onboarding to verified check-out.")

flow_steps = [
    ("01", "Registration / Login", "JWT token issued; user selects driver or host role profile."),
    ("02", "Geo Location", "Browser HTML5 Geolocation detects user coordinates."),
    ("03", "Map Search", "Backend filters spots in Neon within designated radius."),
    ("04", "View Space Details", "User inspects amenities, hourly rate, photos, and ratings."),
    ("05", "Select Slot & Time", "Select booking window; slot temporary lock applied."),
    ("06", "Razorpay Checkout", "Order generated; user pays via UPI/Cards/NetBanking."),
    ("07", "Order Confirmed", "Booking recorded in PostgreSQL; QR parking pass created."),
    ("08", "Navigation & Check-In", "Driver routed to spot; QR scanned by owner upon arrival.")
]

for idx, (num, title, desc) in enumerate(flow_steps):
    row = idx // 4
    col = idx % 4
    left = Inches(0.8 + col * 2.98)
    top = Inches(1.8 + row * 2.6)
    width = Inches(2.8)
    height = Inches(2.35)
    
    add_card(s11, left, top, width, height)
    
    tb = s11.shapes.add_textbox(left + Inches(0.2), top + Inches(0.2), width - Inches(0.4), height - Inches(0.4))
    tf = tb.text_frame
    tf.word_wrap = True
    
    p0 = tf.paragraphs[0]
    p0.text = f"STEP {num}"
    p0.font.name = FONT_HEADING
    p0.font.size = Pt(11)
    p0.font.bold = True
    p0.font.color.rgb = BLUE_ACCENT if row == 0 else GREEN_DARK
    
    p1 = tf.add_paragraph()
    p1.text = title
    p1.font.name = FONT_HEADING
    p1.font.size = Pt(15)
    p1.font.bold = True
    p1.font.color.rgb = NAVY_PRIMARY
    p1.space_before = Pt(4)
    
    p2 = tf.add_paragraph()
    p2.text = desc
    p2.font.name = FONT_BODY
    p2.font.size = Pt(11.5)
    p2.font.color.rgb = TEXT_MUTED
    p2.space_before = Pt(6)

# ==========================================
# SLIDE 12: UI / APPLICATION SCREENS
# ==========================================
s12 = prs.slides.add_slide(blank_layout)
set_slide_background(s12)
add_header(s12, 12, "Frontend Experience", "Application User Interface Design",
           "Production React.js views engineered with Tailwind CSS for mobile and desktop screens.")

screens = [
    ("1. Discovery & Map View", "Map Pins & Live Rates", 
     "[ Interactive Map Interface ]\n• Location Search Bar (Places Autocomplete)\n• Color-coded Map Pins (Green = Available)\n• Bottom Card: 'Koramangala 4th Block - ₹60/hr'\n• Distance: 350m | 4 Available Spots"),
    ("2. Parking Spot Details", "Amenities & Guidelines", 
     "[ Spot Specification Modal ]\n• High-resolution Driveway Photo\n• Host: Verified Resident Host\n• Features: CCTV Monitored | Covered | 24/7 Gate\n• Booking Selector: 02:00 PM - 05:00 PM\n• Action: 'Proceed to Reserve'"),
    ("3. Razorpay Checkout", "Instant Payment Gateway", 
     "[ Secure Checkout Modal ]\n• Parking Fee: ₹180 (3 hrs @ ₹60)\n• Platform Convenience Fee: ₹15\n• Total Payable: ₹195\n• Payment Modes: UPI (GPay/PhonePe), Card, NetBanking\n• Status: Instant Verification Callback"),
    ("4. Owner Dashboard", "Listings & Revenue Tracker", 
     "[ Host Management Portal ]\n• Total Revenue This Month: ₹8,420\n• Active Bookings: 2 Currently Parked\n• Quick Toggle: 'Driveway Slot 1: Active'\n• Booking Ledger & Bank Settlement Details")
]

for idx, (title, sub, mockup) in enumerate(screens):
    left = Inches(0.8 + idx * 2.98)
    top = Inches(1.8)
    width = Inches(2.8)
    height = Inches(5.1)
    
    add_card(s12, left, top, width, height)
    
    # Top title
    tb = s12.shapes.add_textbox(left + Inches(0.2), top + Inches(0.2), width - Inches(0.4), Inches(0.8))
    tf = tb.text_frame
    tf.word_wrap = True
    
    p0 = tf.paragraphs[0]
    p0.text = title
    p0.font.name = FONT_HEADING
    p0.font.size = Pt(13)
    p0.font.bold = True
    p0.font.color.rgb = NAVY_PRIMARY
    
    p1 = tf.add_paragraph()
    p1.text = sub
    p1.font.name = FONT_BODY
    p1.font.size = Pt(10.5)
    p1.font.color.rgb = GREEN_DARK
    p1.space_before = Pt(2)
    
    # Inner Mockup Box
    inner = add_card(s12, left + Inches(0.15), top + Inches(1.05), width - Inches(0.3), height - Inches(1.2),
                     bg_color=RGBColor(241, 245, 249), border_color=BORDER_COLOR)
    
    tb_m = s12.shapes.add_textbox(left + Inches(0.25), top + Inches(1.15), width - Inches(0.5), height - Inches(1.4))
    tf_m = tb_m.text_frame
    tf_m.word_wrap = True
    
    lines = mockup.split("\n")
    p_head = tf_m.paragraphs[0]
    p_head.text = lines[0]
    p_head.font.name = FONT_HEADING
    p_head.font.size = Pt(11)
    p_head.font.bold = True
    p_head.font.color.rgb = NAVY_PRIMARY
    
    for l in lines[1:]:
        p_l = tf_m.add_paragraph()
        p_l.text = l
        p_l.font.name = FONT_BODY
        p_l.font.size = Pt(10.5)
        p_l.font.color.rgb = NAVY_SECONDARY
        p_l.space_before = Pt(6)

# ==========================================
# SLIDE 13: BUSINESS MODEL
# ==========================================
s13 = prs.slides.add_slide(blank_layout)
set_slide_background(s13)
add_header(s13, 13, "Entrepreneurial Viability", "Platform Business Model & Economics",
           "Sustainable monetization model aligning incentives across hosts, drivers, and platform operations.")

# Left Card: The Commission Model Example
left_card = add_card(s13, Inches(0.8), Inches(1.8), Inches(5.7), Inches(5.1))
tb_bm = s13.shapes.add_textbox(Inches(1.1), Inches(2.0), Inches(5.1), Inches(4.7))
tf_bm = tb_bm.text_frame
tf_bm.word_wrap = True

p = tf_bm.paragraphs[0]
p.text = "CORE COMMISSION SPLIT MODEL"
p.font.name = FONT_HEADING
p.font.size = Pt(13)
p.font.bold = True
p.font.color.rgb = BLUE_ACCENT

p = tf_bm.add_paragraph()
p.text = "Illustrative Unit Transaction Breakdown"
p.font.name = FONT_HEADING
p.font.size = Pt(18)
p.font.bold = True
p.font.color.rgb = NAVY_PRIMARY
p.space_before = Pt(4)

p = tf_bm.add_paragraph()
p.text = "When a driver books a residential parking bay for 2 hours at ₹60 total:"
p.font.name = FONT_BODY
p.font.size = Pt(13)
p.font.color.rgb = TEXT_MUTED
p.space_before = Pt(8)

p_box1 = tf_bm.add_paragraph()
p_box1.text = "Total Paid by Driver: ₹60.00 (100%)"
p_box1.font.name = FONT_HEADING
p_box1.font.size = Pt(15)
p_box1.font.bold = True
p_box1.font.color.rgb = NAVY_PRIMARY
p_box1.space_before = Pt(12)

p_box2 = tf_bm.add_paragraph()
p_box2.text = "• 80% Host Share (₹48.00): Credited automatically to space owner."
p_box2.font.name = FONT_BODY
p_box2.font.size = Pt(13)
p_box2.font.color.rgb = GREEN_DARK
p_box2.space_before = Pt(6)

p_box3 = tf_bm.add_paragraph()
p_box3.text = "• 20% Curbly Platform Fee (₹12.00): Retained for cloud, payments & operations."
p_box3.font.name = FONT_BODY
p_box3.font.size = Pt(13)
p_box3.font.color.rgb = BLUE_ACCENT
p_box3.space_before = Pt(6)

p_box4 = tf_bm.add_paragraph()
p_box4.text = "Zero upfront setup cost for hosts, creating zero resistance to space onboarding."
p_box4.font.name = FONT_BODY
p_box4.font.size = Pt(12)
p_box4.font.italic = True
p_box4.font.color.rgb = TEXT_MUTED
p_box4.space_before = Pt(14)

# Right Card: Additional / Future Revenue Streams
right_card = add_card(s13, Inches(6.8), Inches(1.8), Inches(5.7), Inches(5.1))
tb_fut = s13.shapes.add_textbox(Inches(7.1), Inches(2.0), Inches(5.1), Inches(4.7))
tf_fut = tb_fut.text_frame
tf_fut.word_wrap = True

p = tf_fut.paragraphs[0]
p.text = "DIVERSIFIED REVENUE CHANNELS"
p.font.name = FONT_HEADING
p.font.size = Pt(13)
p.font.bold = True
p.font.color.rgb = GREEN_DARK

p = tf_fut.add_paragraph()
p.text = "Future & Scaled Revenue Streams (Roadmap)"
p.font.name = FONT_HEADING
p.font.size = Pt(18)
p.font.bold = True
p.font.color.rgb = NAVY_PRIMARY
p.space_before = Pt(4)

rev_items = [
    ("Premium Search Placement", "Commercial hosts pay sponsored listing fees to rank at the top of local search radii."),
    ("Monthly Recurring Subscriptions", "Daily corporate commuters reserve permanent monthly parking stalls for predictable income."),
    ("Surge & Peak Algorithm", "Automated demand multipliers during high-traffic concert, sports, or festival events."),
    ("Local Retail Merchant Alliances", "Nearby cafes & retail stores sponsor driver parking discounts in exchange for foot traffic validation.")
]

for title, desc in rev_items:
    p_t = tf_fut.add_paragraph()
    p_t.text = f"• {title}"
    p_t.font.name = FONT_HEADING
    p_t.font.size = Pt(13)
    p_t.font.bold = True
    p_t.font.color.rgb = NAVY_PRIMARY
    p_t.space_before = Pt(10)
    
    p_d = tf_fut.add_paragraph()
    p_d.text = desc
    p_d.font.name = FONT_BODY
    p_d.font.size = Pt(11.5)
    p_d.font.color.rgb = TEXT_MUTED
    p_d.space_before = Pt(2)

# ==========================================
# SLIDE 14: VALUE PROPOSITION
# ==========================================
s14 = prs.slides.add_slide(blank_layout)
set_slide_background(s14)
add_header(s14, 14, "Strategic Value", "Why Curbly? Triple-Bottom-Line Value",
           "Tangible benefits delivered simultaneously to commuters, property owners, and urban municipal infrastructure.")

value_cols = [
    ("FOR DRIVERS", BLUE_ACCENT, [
        ("Guaranteed Parking Spot", "Eliminates anxiety; your slot is reserved and waiting upon arrival."),
        ("Save 20+ Mins per Trip", "Direct navigation to the pin avoids frustrating cruising around busy blocks."),
        ("Transparent Pricing", "Clear hourly rates upfront; zero meter surprise or towing penalty risks."),
        ("Cashless Simplicity", "Fast UPI / card payment with instant digital receipts on your smartphone.")
    ]),
    ("FOR SPACE OWNERS", GREEN_DARK, [
        ("Monetize Dead Capacity", "Turn an empty residential or office parking spot into predictable recurring revenue."),
        ("Flexible Schedule Control", "Make the spot available only when you are at work; block out personal hours."),
        ("Vetted, Secure Drivers", "Every driver is registered with phone/email verification and booking tracking."),
        ("Hands-Free Administration", "Automated payments, digital invoices, and occupancy tracking handled by Curbly.")
    ]),
    ("FOR CITIES & ENVIRONMENT", AMBER_ACCENT, [
        ("Curb Congestion Cruising", "Reduces the 30% of downtown traffic consisting solely of vehicles seeking spots."),
        ("Lower Carbon Footprint", "Less fuel burned while idling in traffic directly reduces urban CO2 emissions."),
        ("Optimized Land Utilization", "Unlocks private parking infrastructure without building expensive concrete multi-decks."),
        ("Data-Driven Mobility", "Generates valuable spatial data on real-time parking supply and demand dynamics.")
    ])
]

for idx, (title, color, items) in enumerate(value_cols):
    left = Inches(0.8 + idx * 3.98)
    top = Inches(1.8)
    width = Inches(3.8)
    height = Inches(5.1)
    
    add_card(s14, left, top, width, height)
    
    tb = s14.shapes.add_textbox(left + Inches(0.25), top + Inches(0.25), width - Inches(0.5), height - Inches(0.5))
    tf = tb.text_frame
    tf.word_wrap = True
    
    p = tf.paragraphs[0]
    p.text = title
    p.font.name = FONT_HEADING
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = color
    
    for v_title, v_desc in items:
        p_t = tf.add_paragraph()
        p_t.text = f"{v_title}"
        p_t.font.name = FONT_HEADING
        p_t.font.size = Pt(13)
        p_t.font.bold = True
        p_t.font.color.rgb = NAVY_PRIMARY
        p_t.space_before = Pt(10)
        
        p_d = tf.add_paragraph()
        p_d.text = v_desc
        p_d.font.name = FONT_BODY
        p_d.font.size = Pt(11)
        p_d.font.color.rgb = TEXT_MUTED
        p_d.space_before = Pt(2)

# ==========================================
# SLIDE 15: SECURITY & RELIABILITY
# ==========================================
s15 = prs.slides.add_slide(blank_layout)
set_slide_background(s15)
add_header(s15, 15, "Security Architecture", "Security & System Reliability",
           "Rigorous separation of implemented software protections versus upcoming enterprise roadmap features.")

# Left Card: Implemented Security Controls
add_card(s15, Inches(0.8), Inches(1.8), Inches(5.7), Inches(5.1))
tb_sec1 = s15.shapes.add_textbox(Inches(1.1), Inches(2.0), Inches(5.1), Inches(4.7))
tf_sec1 = tb_sec1.text_frame
tf_sec1.word_wrap = True

p = tf_sec1.paragraphs[0]
p.text = "CURRENTLY IMPLEMENTED CONTROLS"
p.font.name = FONT_HEADING
p.font.size = Pt(12)
p.font.bold = True
p.font.color.rgb = GREEN_DARK

p = tf_sec1.add_paragraph()
p.text = "Production Code Safeguards"
p.font.name = FONT_HEADING
p.font.size = Pt(18)
p.font.bold = True
p.font.color.rgb = NAVY_PRIMARY
p.space_before = Pt(4)

impl_items = [
    ("Bcrypt Password Hashing", "Zero plain-text password storage; 10 salt rounds used for strong cryptographic salting."),
    ("JWT Stateless Tokens", "Signed JSON Web Tokens verifying client identity and passing role claims per request."),
    ("Role-Based Access Control (RBAC)", "Strict Express middleware ensuring drivers cannot alter host slots or access admin APIs."),
    ("Payment Signature Verification", "HMAC-SHA256 signature calculation validating Razorpay webhook callbacks before booking confirmation."),
    ("Environment Variable Isolation", "All database URIs, API keys, and JWT secrets stored exclusively in dotenv/cloud envs."),
    ("Relational Foreign Key Constraints", "Neon PostgreSQL prevents orphan booking records and ensures referential integrity.")
]

for title, desc in impl_items:
    p_t = tf_sec1.add_paragraph()
    p_t.text = f"✔ {title}"
    p_t.font.name = FONT_HEADING
    p_t.font.size = Pt(11.5)
    p_t.font.bold = True
    p_t.font.color.rgb = NAVY_PRIMARY
    p_t.space_before = Pt(6)
    
    p_d = tf_sec1.add_paragraph()
    p_d.text = desc
    p_d.font.name = FONT_BODY
    p_d.font.size = Pt(10.5)
    p_d.font.color.rgb = TEXT_MUTED
    p_d.space_before = Pt(1)

# Right Card: Planned Security Enhancements
add_card(s15, Inches(6.8), Inches(1.8), Inches(5.7), Inches(5.1))
tb_sec2 = s15.shapes.add_textbox(Inches(7.1), Inches(2.0), Inches(5.1), Inches(4.7))
tf_sec2 = tb_sec2.text_frame
tf_sec2.word_wrap = True

p = tf_sec2.paragraphs[0]
p.text = "PLANNED SECURITY ENHANCEMENTS"
p.font.name = FONT_HEADING
p.font.size = Pt(12)
p.font.bold = True
p.font.color.rgb = BLUE_ACCENT

p = tf_sec2.add_paragraph()
p.text = "Future Hardening (Roadmap)"
p.font.name = FONT_HEADING
p.font.size = Pt(18)
p.font.bold = True
p.font.color.rgb = NAVY_PRIMARY
p.space_before = Pt(4)

plan_items = [
    ("Two-Factor Authentication (2FA)", "SMS/TOTP multi-factor verification for space owners withdrawing platform balances."),
    ("Automated Host KYC Verification", "Government ID & property document OCR verification for commercial operators."),
    ("Distributed Rate Limiting (Redis)", "IP-based API rate limiting using Redis to prevent automated bot scraping of parking slots."),
    ("Row-Level Security (RLS)", "Enabling PostgreSQL RLS policies in Neon for fine-grained multi-tenant data access."),
    ("Encrypted Overstay Penalties", "Automated escrow lock for vehicles exceeding allotted booking duration.")
]

for title, desc in plan_items:
    p_t = tf_sec2.add_paragraph()
    p_t.text = f"⏱ {title}"
    p_t.font.name = FONT_HEADING
    p_t.font.size = Pt(11.5)
    p_t.font.bold = True
    p_t.font.color.rgb = NAVY_PRIMARY
    p_t.space_before = Pt(8)
    
    p_d = tf_sec2.add_paragraph()
    p_d.text = desc
    p_d.font.name = FONT_BODY
    p_d.font.size = Pt(10.5)
    p_d.font.color.rgb = TEXT_MUTED
    p_d.space_before = Pt(2)

# ==========================================
# SLIDE 16: TESTING
# ==========================================
s16 = prs.slides.add_slide(blank_layout)
set_slide_background(s16)
add_header(s16, 16, "Verification & Quality", "Testing & Quality Assurance",
           "Methodical testing across API contracts, authentication boundaries, and booking state transitions.")

# Clean test case table
table_shape = s16.shapes.add_table(7, 5, Inches(0.8), Inches(1.8), Inches(11.73), Inches(4.9))
table = table_shape.table

# Set Column Widths
table.columns[0].width = Inches(1.8) # Test Category
table.columns[1].width = Inches(3.2) # Test Scenario / Description
table.columns[2].width = Inches(2.8) # Input / Action
table.columns[3].width = Inches(2.6) # Expected Output
table.columns[4].width = Inches(1.33) # Status

headers = ["TEST TYPE", "TEST SCENARIO", "INPUT / TRIGGER", "EXPECTED OUTPUT", "STATUS"]
for i, h in enumerate(headers):
    cell = table.cell(0, i)
    cell.fill.solid()
    cell.fill.fore_color.rgb = NAVY_PRIMARY
    p = cell.text_frame.paragraphs[0]
    p.text = h
    p.font.name = FONT_HEADING
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = RGBColor(255, 255, 255)

test_rows = [
    ("Auth & Security", "User Registration & Duplication", "POST /api/auth/register with existing email", "HTTP 409 Conflict; clear error message", "PASSED"),
    ("Auth & Security", "JWT Protected Route Without Token", "GET /api/bookings without Authorization header", "HTTP 401 Unauthorized; request blocked", "PASSED"),
    ("Space Search", "Geo Radius Parking Discovery", "GET /api/parking/search?lat=12.93&lng=77.62", "Returns parking array within 5km radius", "PASSED"),
    ("Booking Engine", "Slot Double-Booking Conflict", "Concurrent bookings for same spot & time window", "First succeeds; second returns HTTP 409 Slot Taken", "PASSED"),
    ("Payments API", "Razorpay Webhook Signature Verify", "Webhook callback with invalid secret hash", "HTTP 400 Bad Request; booking not confirmed", "PASSED"),
    ("UI & State", "Form Validation & Time Boundaries", "End time set before start time in booking picker", "Frontend disables submit; alerts user", "PASSED")
]

for row_idx, r_data in enumerate(test_rows, start=1):
    for col_idx, text in enumerate(r_data):
        cell = table.cell(row_idx, col_idx)
        cell.fill.solid()
        cell.fill.fore_color.rgb = RGBColor(255, 255, 255) if row_idx % 2 == 0 else RGBColor(248, 250, 252)
        p = cell.text_frame.paragraphs[0]
        p.text = text
        p.font.name = FONT_BODY
        p.font.size = Pt(10)
        if col_idx == 4: # Status
            p.font.bold = True
            p.font.color.rgb = GREEN_DARK
        elif col_idx == 0:
            p.font.bold = True
            p.font.color.rgb = NAVY_PRIMARY
        else:
            p.font.color.rgb = NAVY_SECONDARY

# ==========================================
# SLIDE 17: DEVELOPMENT WORKFLOW
# ==========================================
s17 = prs.slides.add_slide(blank_layout)
set_slide_background(s17)
add_header(s17, 17, "Engineering Lifecycle", "Development Workflow & Version Control",
           "Iterative software engineering lifecycle enforcing version control, code modularity, and continuous testing.")

dev_stages = [
    ("1. REQUIREMENTS", "Problem definition, user journeys, stakeholder scoping"),
    ("2. SYSTEM DESIGN", "Relational schema design, API contract specifications"),
    ("3. BACKEND API", "Node.js/Express REST endpoints, JWT middleware, Neon setup"),
    ("4. FRONTEND UI", "React components, Tailwind layouts, map interactive controls"),
    ("5. INTEGRATION", "Connecting Razorpay checkout and geolocation APIs"),
    ("6. QA & TESTING", "Unit tests, Postman collection validation, boundary testing"),
    ("7. GIT & GITHUB", "Feature branches, code reviews, semantic commit logs"),
    ("8. CI/CD DEPLOY", "Automated deployment pipeline on Vercel and Render")
]

for idx, (title, desc) in enumerate(dev_stages):
    row = idx // 4
    col = idx % 4
    left = Inches(0.8 + col * 2.98)
    top = Inches(1.8 + row * 2.6)
    width = Inches(2.8)
    height = Inches(2.35)
    
    add_card(s17, left, top, width, height)
    
    tb = s17.shapes.add_textbox(left + Inches(0.2), top + Inches(0.2), width - Inches(0.4), height - Inches(0.4))
    tf = tb.text_frame
    tf.word_wrap = True
    
    p0 = tf.paragraphs[0]
    p0.text = f"PHASE {idx+1}"
    p0.font.name = FONT_HEADING
    p0.font.size = Pt(11)
    p0.font.bold = True
    p0.font.color.rgb = BLUE_ACCENT if row == 0 else GREEN_DARK
    
    p1 = tf.add_paragraph()
    p1.text = title
    p1.font.name = FONT_HEADING
    p1.font.size = Pt(15)
    p1.font.bold = True
    p1.font.color.rgb = NAVY_PRIMARY
    p1.space_before = Pt(4)
    
    p2 = tf.add_paragraph()
    p2.text = desc
    p2.font.name = FONT_BODY
    p2.font.size = Pt(11.5)
    p2.font.color.rgb = TEXT_MUTED
    p2.space_before = Pt(6)

# ==========================================
# SLIDE 18: DEPLOYMENT ARCHITECTURE
# ==========================================
s18 = prs.slides.add_slide(blank_layout)
set_slide_background(s18)
add_header(s18, 18, "Production Infrastructure", "Deployment Architecture & Cloud Hosting",
           "Scalable cloud deployment leveraging globally distributed CDNs, serverless SQL, and containerized microservices.")

deploy_boxes = [
    ("CLIENT HOSTING", "Vercel Edge Network", 
     "Hosts the React.js production bundle. Features automatic SSL, global CDN caching for instant asset delivery, and continuous deployment from GitHub main branch."),
    ("BACKEND SERVICES", "Render / Railway Cloud", 
     "Hosts the containerized Node.js & Express.js REST application with automated process restarts, environment secret variables, and health check monitoring."),
    ("DATABASE CLOUD", "Neon Serverless PostgreSQL", 
     "Provides scalable serverless PostgreSQL with automated storage scaling, zero cold-start friction, automated daily backups, and reliable connection pooling."),
    ("EXTERNAL INTEGRATIONS", "Cloud Services & APIs", 
     "Razorpay Payment Gateway API for transactional processing and webhooks; Geolocation & Maps APIs for address lookup and dynamic distance calculations.")
]

for idx, (head, service, details) in enumerate(deploy_boxes):
    left = Inches(0.8 + idx * 2.98)
    top = Inches(1.8)
    width = Inches(2.8)
    height = Inches(5.1)
    
    add_card(s18, left, top, width, height)
    
    tb = s18.shapes.add_textbox(left + Inches(0.2), top + Inches(0.25), width - Inches(0.4), height - Inches(0.5))
    tf = tb.text_frame
    tf.word_wrap = True
    
    p0 = tf.paragraphs[0]
    p0.text = head
    p0.font.name = FONT_HEADING
    p0.font.size = Pt(11)
    p0.font.bold = True
    p0.font.color.rgb = BLUE_ACCENT if idx % 2 == 0 else GREEN_DARK
    
    p1 = tf.add_paragraph()
    p1.text = service
    p1.font.name = FONT_HEADING
    p1.font.size = Pt(16)
    p1.font.bold = True
    p1.font.color.rgb = NAVY_PRIMARY
    p1.space_before = Pt(4)
    
    p2 = tf.add_paragraph()
    p2.text = details
    p2.font.name = FONT_BODY
    p2.font.size = Pt(12)
    p2.font.color.rgb = NAVY_SECONDARY
    p2.space_before = Pt(10)

# ==========================================
# SLIDE 19: PROJECT ROADMAP
# ==========================================
s19 = prs.slides.add_slide(blank_layout)
set_slide_background(s19)
add_header(s19, 19, "Evolution Strategy", "Future Project Roadmap",
           "Structured expansion timeline distinguishing current MVP features from upcoming IoT & smart city integrations.")

phases = [
    ("PHASE 1 (CURRENT)", "Core Web Application", 
     "• Driver discovery & interactive map search\n• Spot reservation & booking engine\n• Razorpay checkout & digital receipts\n• Space owner listing & availability toggles\n• Neon PostgreSQL relational schema"),
    ("PHASE 2 (SHORT TERM)", "Advanced Host Tools", 
     "• Host analytics portal (occupancy & yields)\n• In-app driver-host messaging channel\n• Multi-vehicle profiles for drivers\n• Automated push notifications & SMS alerts\n• Comprehensive user review & rating system"),
    ("PHASE 3 (MEDIUM TERM)", "Commercial Expansion", 
     "• Corporate bulk parking booking contracts\n• Commercial mall & hospital integration\n• Automated monthly subscription passes\n• Dynamic surge pricing based on local demand\n• Multi-city localized payment options"),
    ("PHASE 4 (LONG TERM)", "Smart IoT & EV Integration", 
     "• Automated Number Plate Recognition (ANPR)\n• Ultrasonic IoT spot sensors for live status\n• Automated boom barrier gate integration\n• EV charging reservation & billing sync\n• Municipal smart-city open data exchange")
]

for idx, (p_tag, p_title, p_content) in enumerate(phases):
    left = Inches(0.8 + idx * 2.98)
    top = Inches(1.8)
    width = Inches(2.8)
    height = Inches(5.1)
    
    add_card(s19, left, top, width, height)
    
    tb = s19.shapes.add_textbox(left + Inches(0.2), top + Inches(0.25), width - Inches(0.4), height - Inches(0.5))
    tf = tb.text_frame
    tf.word_wrap = True
    
    p0 = tf.paragraphs[0]
    p0.text = p_tag
    p0.font.name = FONT_HEADING
    p0.font.size = Pt(11)
    p0.font.bold = True
    p0.font.color.rgb = GREEN_DARK if idx == 0 else BLUE_ACCENT
    
    p1 = tf.add_paragraph()
    p1.text = p_title
    p1.font.name = FONT_HEADING
    p1.font.size = Pt(16)
    p1.font.bold = True
    p1.font.color.rgb = NAVY_PRIMARY
    p1.space_before = Pt(4)
    
    for item in p_content.split("\n"):
        p_item = tf.add_paragraph()
        p_item.text = item
        p_item.font.name = FONT_BODY
        p_item.font.size = Pt(11.5)
        p_item.font.color.rgb = NAVY_SECONDARY
        p_item.space_before = Pt(6)

# ==========================================
# SLIDE 20: BUSINESS & SOCIAL IMPACT
# ==========================================
s20 = prs.slides.add_slide(blank_layout)
set_slide_background(s20)
add_header(s20, 20, "Societal Value", "Business & Social Impact",
           "Creating multi-dimensional benefits across economic opportunity, motorist convenience, and urban sustainability.")

impacts = [
    ("ECONOMIC IMPACT", GREEN_DARK, "Monetization of Idle Private Assets",
     "• Unlocks supplemental passive income for urban households and societies.\n• Provides commercial property managers with off-peak revenue streams.\n• Creates an asset-light, capital-efficient digital mobility platform."),
    ("COMMUTER IMPACT", BLUE_ACCENT, "Frictionless Urban Commuting",
     "• Eliminates parking arrival anxiety and ensures spots are held in advance.\n• Saves valuable daily time otherwise spent idling in congested parking lines.\n• Transparent pricing eliminates meter fraud and informal parking gouging."),
    ("MUNICIPAL IMPACT", AMBER_ACCENT, "Optimized Urban Land Utilization",
     "• Unlocks thousands of existing private parking spaces without municipal capital expenditure.\n• Mitigates illegal curbside parking that narrows critical arterial traffic lanes.\n• Yields digital spatial data to help urban planners understand parking pressure."),
    ("ENVIRONMENTAL IMPACT", GREEN_EMERALD, "Reduction in Congestion Emissions",
     "• Directly reduces unnecessary vehicle cruising miles prior to parking.\n• Lowers localized vehicular greenhouse gas emissions and particulate matter.\n• Promotes organized parking infrastructure to ease transition toward urban EV adoption.")
]

for idx, (title, color, sub, body) in enumerate(impacts):
    left = Inches(0.8 + idx * 2.98)
    top = Inches(1.8)
    width = Inches(2.8)
    height = Inches(5.1)
    
    add_card(s20, left, top, width, height)
    
    tb = s20.shapes.add_textbox(left + Inches(0.2), top + Inches(0.25), width - Inches(0.4), height - Inches(0.5))
    tf = tb.text_frame
    tf.word_wrap = True
    
    p0 = tf.paragraphs[0]
    p0.text = title
    p0.font.name = FONT_HEADING
    p0.font.size = Pt(11)
    p0.font.bold = True
    p0.font.color.rgb = color
    
    p1 = tf.add_paragraph()
    p1.text = sub
    p1.font.name = FONT_HEADING
    p1.font.size = Pt(15)
    p1.font.bold = True
    p1.font.color.rgb = NAVY_PRIMARY
    p1.space_before = Pt(4)
    
    for item in body.split("\n"):
        p_item = tf.add_paragraph()
        p_item.text = item
        p_item.font.name = FONT_BODY
        p_item.font.size = Pt(11.5)
        p_item.font.color.rgb = TEXT_MUTED
        p_item.space_before = Pt(6)

# ==========================================
# SLIDE 21: LIMITATIONS
# ==========================================
s21 = prs.slides.add_slide(blank_layout)
set_slide_background(s21)
add_header(s21, 21, "Critical Analysis", "Current System Limitations & Challenges",
           "Honest academic evaluation of current operational boundaries and external dependencies.")

limits = [
    ("Inventory Cold-Start Problem", "Initial Marketplace Density",
     "A two-sided marketplace requires simultaneous density of drivers and hosts. In early pilot zones, sparse parking supply may lead to search misses in peripheral suburban neighborhoods."),
    ("Human Host Reliability", "Manual Availability Dependency",
     "Without automated IoT hardware gates installed, spot availability currently relies on host scheduling accuracy. If a host parks their own car without toggling the app, conflicts can arise."),
    ("Geographic Boundaries", "Zone-Specific Pilot Focus",
     "The current application is optimized for select dense urban commercial corridors (e.g. Bangalore/Mumbai hubs) rather than comprehensive nationwide arterial coverage."),
    ("Third-Party API Uptime", "Service Dependency Boundaries",
     "Core functions rely on external SLA availability — specifically Razorpay webhook confirmation speeds and Map Geocoding API rate quotas during sudden search spikes."),
    ("Physical Access & Security", "Residential Gated Society Rules",
     "Certain high-security apartment complexes possess strict resident welfare association (RWA) gate rules that require physical guard clearance before external cars enter.")
]

for idx, (title, sub, desc) in enumerate(limits):
    top = Inches(1.8 + idx * 1.0)
    left = Inches(0.8)
    width = Inches(11.73)
    height = Inches(0.88)
    
    card = add_card(s21, left, top, width, height)
    
    tb = s21.shapes.add_textbox(left + Inches(0.25), top + Inches(0.08), width - Inches(0.5), height - Inches(0.16))
    tf = tb.text_frame
    tf.word_wrap = True
    
    p0 = tf.paragraphs[0]
    p0.text = f"{title.upper()}  —  {sub}"
    p0.font.name = FONT_HEADING
    p0.font.size = Pt(12)
    p0.font.bold = True
    p0.font.color.rgb = NAVY_PRIMARY
    
    p1 = tf.add_paragraph()
    p1.text = desc
    p1.font.name = FONT_BODY
    p1.font.size = Pt(10.5)
    p1.font.color.rgb = TEXT_MUTED
    p1.space_before = Pt(2)

# ==========================================
# SLIDE 22: CONCLUSION
# ==========================================
s22 = prs.slides.add_slide(blank_layout)
set_slide_background(s22, HERO_BG)

# Accent bar
top_bar = s22.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, Inches(0.12))
top_bar.fill.solid()
top_bar.fill.fore_color.rgb = GREEN_EMERALD
top_bar.line.fill.background()

tb_con = s22.shapes.add_textbox(Inches(1.0), Inches(1.2), Inches(11.33), Inches(2.5))
tf_con = tb_con.text_frame
tf_con.word_wrap = True

p = tf_con.paragraphs[0]
p.text = "PROJECT SUMMARY & CONCLUSION"
p.font.name = FONT_HEADING
p.font.size = Pt(12)
p.font.bold = True
p.font.color.rgb = GREEN_EMERALD

p = tf_con.add_paragraph()
p.text = "From Parking Search to Parking Certainty"
p.font.name = FONT_HEADING
p.font.size = Pt(36)
p.font.bold = True
p.font.color.rgb = RGBColor(255, 255, 255)
p.space_before = Pt(6)

p = tf_con.add_paragraph()
p.text = "Curbly solves a fundamental urban friction point by transforming dormant, underutilized private spaces into an organized, digitally searchable, and reservable parking network."
p.font.name = FONT_BODY
p.font.size = Pt(15)
p.font.color.rgb = RGBColor(148, 163, 184)
p.space_before = Pt(8)

# Core Value Equation Cards
eq_items = [
    ("GEOLOCATION", "Sub-second map lookup & proximity filtering"),
    ("DISCOVERY", "Real-time visibility into verified parking slots"),
    ("RESERVATION", "Instant locking without double-booking risk"),
    ("PAYMENT", "Integrated Razorpay checkout & automated splits"),
    ("MANAGEMENT", "Host availability scheduling & revenue tracking")
]

for idx, (title, desc) in enumerate(eq_items):
    left = Inches(1.0 + idx * 2.3)
    top = Inches(4.3)
    width = Inches(2.15)
    height = Inches(1.6)
    
    add_card(s22, left, top, width, height, bg_color=HERO_CARD, border_color=RGBColor(51, 65, 85))
    
    tb_e = s22.shapes.add_textbox(left + Inches(0.15), top + Inches(0.15), width - Inches(0.3), height - Inches(0.3))
    tf_e = tb_e.text_frame
    tf_e.word_wrap = True
    
    p0 = tf_e.paragraphs[0]
    p0.text = title
    p0.font.name = FONT_HEADING
    p0.font.size = Pt(12)
    p0.font.bold = True
    p0.font.color.rgb = GREEN_EMERALD
    
    p1 = tf_e.add_paragraph()
    p1.text = desc
    p1.font.name = FONT_BODY
    p1.font.size = Pt(10.5)
    p1.font.color.rgb = RGBColor(255, 255, 255)
    p1.space_before = Pt(4)

# Final quote banner
tb_q = s22.shapes.add_textbox(Inches(1.0), Inches(6.2), Inches(11.33), Inches(0.8))
tf_q = tb_q.text_frame
p_q = tf_q.paragraphs[0]
p_q.text = "“Find parking before you arrive — Curbly delivers peace of mind to modern city commuters.”"
p_q.font.name = FONT_BODY
p_q.font.size = Pt(17)
p_q.font.italic = True
p_q.font.color.rgb = RGBColor(56, 189, 248)

# ==========================================
# SLIDE 23: LIVE DEMO
# ==========================================
s23 = prs.slides.add_slide(blank_layout)
set_slide_background(s23)
add_header(s23, 23, "System Walkthrough", "Live Project Demonstration",
           "Step-by-step walkthrough of the deployed full-stack software application.")

# Left Walkthrough Sequence
left_card = add_card(s23, Inches(0.8), Inches(1.8), Inches(7.5), Inches(5.1))
tb_seq = s23.shapes.add_textbox(Inches(1.1), Inches(2.0), Inches(6.9), Inches(4.7))
tf_seq = tb_seq.text_frame
tf_seq.word_wrap = True

p = tf_seq.paragraphs[0]
p.text = "LIVE DEMO EXECUTION RUNBOOK"
p.font.name = FONT_HEADING
p.font.size = Pt(12)
p.font.bold = True
p.font.color.rgb = BLUE_ACCENT

p = tf_seq.add_paragraph()
p.text = "Guided End-to-End Workflow"
p.font.name = FONT_HEADING
p.font.size = Pt(18)
p.font.bold = True
p.font.color.rgb = NAVY_PRIMARY
p.space_before = Pt(4)

demo_steps = [
    ("1. Authentication", "Sign in as Driver or Host using JWT-secured authentication."),
    ("2. Map Discovery", "View interactive React map with live markers fetched from Neon database."),
    ("3. Spot Inspection", "Select a driveway slot; review rate per hour (₹60), photos, and amenities."),
    ("4. Slot Reservation", "Choose a 2-hour parking window; initiate instant concurrency lock."),
    ("5. Razorpay Checkout", "Trigger payment gateway modal in test mode; verify signature callback."),
    ("6. Digital Parking Pass", "Inspect generated digital parking pass with booking reference & directions."),
    ("7. Owner Dashboard", "Switch to Host portal to verify incoming booking & updated revenue ledger.")
]

for title, desc in demo_steps:
    p_t = tf_seq.add_paragraph()
    p_t.text = f"{title}: {desc}"
    p_t.font.name = FONT_BODY
    p_t.font.size = Pt(11.5)
    p_t.font.color.rgb = NAVY_SECONDARY
    p_t.space_before = Pt(6)

# Right Repository & Deployment Box
right_card = add_card(s23, Inches(8.6), Inches(1.8), Inches(3.93), Inches(5.1))
tb_links = s23.shapes.add_textbox(Inches(8.85), Inches(2.0), Inches(3.43), Inches(4.7))
tf_links = tb_links.text_frame
tf_links.word_wrap = True

p = tf_links.paragraphs[0]
p.text = "ACCESS & REPOSITORY"
p.font.name = FONT_HEADING
p.font.size = Pt(12)
p.font.bold = True
p.font.color.rgb = GREEN_DARK

p = tf_links.add_paragraph()
p.text = "Source & Deployment"
p.font.name = FONT_HEADING
p.font.size = Pt(18)
p.font.bold = True
p.font.color.rgb = NAVY_PRIMARY
p.space_before = Pt(4)

links = [
    ("GitHub Repository", "Full source code, API schemas & documentation:\nhttps://github.com/[team]/curbly-platform"),
    ("Live Frontend Web App", "Deployed on Vercel Edge:\nhttps://curbly-parking.vercel.app"),
    ("Backend API Endpoint", "Live Express service on Render/Railway:\nhttps://api-curbly.onrender.com"),
    ("Database Engine", "Neon Serverless PostgreSQL\nACID compliant relational cluster")
]

for l_title, l_desc in links:
    p_t = tf_links.add_paragraph()
    p_t.text = l_title
    p_t.font.name = FONT_HEADING
    p_t.font.size = Pt(12)
    p_t.font.bold = True
    p_t.font.color.rgb = NAVY_PRIMARY
    p_t.space_before = Pt(10)
    
    p_d = tf_links.add_paragraph()
    p_d.text = l_desc
    p_d.font.name = FONT_BODY
    p_d.font.size = Pt(10.5)
    p_d.font.color.rgb = TEXT_MUTED
    p_d.space_before = Pt(2)

# ==========================================
# SLIDE 24: TEAM CONTRIBUTIONS
# ==========================================
s24 = prs.slides.add_slide(blank_layout)
set_slide_background(s24)
add_header(s24, 24, "Project Execution", "Team Contributions & Task Matrix",
           "Clear distribution of technical roles across full-stack architecture, testing, and deployment.")

table_shape = s24.shapes.add_table(5, 3, Inches(0.8), Inches(1.8), Inches(11.73), Inches(4.9))
t_team = table_shape.table

t_team.columns[0].width = Inches(2.8) # Member / Role
t_team.columns[1].width = Inches(3.2) # Key Responsibilities
t_team.columns[2].width = Inches(5.73) # Technical Contribution

h_team = ["TEAM MEMBER & ROLE", "CORE RESPONSIBILITY", "TECHNICAL DELIVERABLES & MODULES"]
for i, h in enumerate(h_team):
    cell = t_team.cell(0, i)
    cell.fill.solid()
    cell.fill.fore_color.rgb = NAVY_PRIMARY
    p = cell.text_frame.paragraphs[0]
    p.text = h
    p.font.name = FONT_HEADING
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = RGBColor(255, 255, 255)

team_rows = [
    ("Team Member 1\nFrontend & UI/UX Lead", "React Architecture & UI Engineering", 
     "• Developed responsive React.js SPA with Tailwind CSS styling.\n• Integrated interactive map visualizer and dynamic radius filters.\n• Built driver discovery views, booking modals, and QR pass components."),
    ("Team Member 2\nBackend & API Lead", "Node.js REST Services & Payment Engine", 
     "• Engineered Express.js REST API endpoints and error middleware.\n• Implemented JWT authentication, bcrypt hashing, and RBAC authorization.\n• Integrated Razorpay payment checkout flow and webhook verification."),
    ("Team Member 3\nDatabase & DevOps Lead", "Neon Database Architecture & Deployment", 
     "• Designed relational PostgreSQL schema with referential constraints.\n• Configured Neon cloud cluster, connection pooling, and indexing.\n• Set up Vercel and Render/Railway CI/CD pipelines and environment secrets."),
    ("Team Member 4\nQA & Documentation Lead", "Testing, Validation & Reporting", 
     "• Authored comprehensive Postman API test collections and boundary cases.\n• Conducted integration testing for payment webhooks and double-booking locks.\n• Authored system documentation, architecture diagrams, and ENTP project report.")
]

for row_idx, r_data in enumerate(team_rows, start=1):
    for col_idx, text in enumerate(r_data):
        cell = t_team.cell(row_idx, col_idx)
        cell.fill.solid()
        cell.fill.fore_color.rgb = RGBColor(255, 255, 255) if row_idx % 2 == 0 else RGBColor(248, 250, 252)
        p = cell.text_frame.paragraphs[0]
        p.text = text
        p.font.name = FONT_BODY
        p.font.size = Pt(10.5)
        if col_idx == 0:
            p.font.bold = True
            p.font.color.rgb = NAVY_PRIMARY
        elif col_idx == 1:
            p.font.bold = True
            p.font.color.rgb = NAVY_SECONDARY
        else:
            p.font.color.rgb = TEXT_MUTED

# ==========================================
# SLIDE 25: THANK YOU
# ==========================================
s25 = prs.slides.add_slide(blank_layout)
set_slide_background(s25, HERO_BG)

# Accent top bar
top_bar = s25.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, Inches(0.12))
top_bar.fill.solid()
top_bar.fill.fore_color.rgb = GREEN_EMERALD
top_bar.line.fill.background()

tb_ty = s25.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(11.33), Inches(4.5))
tf_ty = tb_ty.text_frame
tf_ty.word_wrap = True

p = tf_ty.paragraphs[0]
p.text = "CURBLY"
p.font.name = FONT_HEADING
p.font.size = Pt(56)
p.font.bold = True
p.font.color.rgb = RGBColor(255, 255, 255)

p = tf_ty.add_paragraph()
p.text = "Smart Parking. Easy Living."
p.font.name = FONT_HEADING
p.font.size = Pt(24)
p.font.bold = True
p.font.color.rgb = GREEN_EMERALD
p.space_before = Pt(6)

p = tf_ty.add_paragraph()
p.text = "Thank You!"
p.font.name = FONT_HEADING
p.font.size = Pt(36)
p.font.bold = True
p.font.color.rgb = RGBColor(255, 255, 255)
p.space_before = Pt(18)

p = tf_ty.add_paragraph()
p.text = "Questions & Technical Discussion"
p.font.name = FONT_BODY
p.font.size = Pt(18)
p.font.color.rgb = RGBColor(148, 163, 184)
p.space_before = Pt(8)

p = tf_ty.add_paragraph()
p.text = "Department of Computer Engineering  |  Academic Year 2025–2026\nProject Team & Faculty Mentors"
p.font.name = FONT_BODY
p.font.size = Pt(14)
p.font.color.rgb = RGBColor(100, 116, 139)
p.space_before = Pt(16)

# Save presentation
output_path = "CURBLY_ENTP_Project_Presentation.pptx"
prs.save(output_path)
print(f"Successfully generated {output_path} with {len(prs.slides)} slides.")
