# 🛡️ GigShield — AI-Powered Parametric Income Insurance for Food Delivery Partners

> **Guidewire DEVTrails 2026** | University Hackathon Submission
> 
> *Protecting the earnings of India's gig economy from uncontrollable disruptions*

---

## 📌 Table of Contents

1. [Problem Context & Persona](#1-problem-context--persona)
2. [Persona-Based Scenarios & Workflow](#2-persona-based-scenarios--workflow)
3. [Weekly Premium Model](#3-weekly-premium-model)
4. [Parametric Triggers](#4-parametric-triggers)
5. [Platform Choice — Web App](#5-platform-choice--web-app)
6. [AI/ML Integration Plan](#6-aiml-integration-plan)
7. [Tech Stack & Architecture](#7-tech-stack--architecture)
8. [Development Plan](#8-development-plan)
9. [What's Out of Scope](#9-whats-out-of-scope)

---

## 1. Problem Context & Persona

### Primary Persona: Food Delivery Partner (Zomato / Swiggy)

**Name:** Raju Verma, 27, Delhi NCR  
**Platform:** Zomato & Swiggy (dual registered)  
**Earnings:** ₹600–₹900/day | ₹4,000–₹6,000/week  
**Working Hours:** 10–14 hours/day, 6–7 days/week  
**Device:** Android smartphone, limited data plan  
**Pain Point:** On days with heavy rain, extreme heat (>42°C), or civic disruptions, Raju loses 50–100% of his daily income. He has no savings buffer and no insurance product designed for him.

> *The architecture is persona-agnostic and extensible to E-commerce (Amazon/Flipkart) and Grocery/Q-Commerce (Zepto/Blinkit) delivery partners with minor configuration changes.*

---

## 2. Persona-Based Scenarios & Workflow

### Scenario A — Heavy Rainfall Disruption

| Step | Actor | Action |
|------|-------|--------|
| 1 | System | Weather API detects rainfall > 50mm/hr in Raju's operational zone |
| 2 | System | Parametric trigger fires automatically — no manual claim needed |
| 3 | GigShield | Computes eligible lost hours based on disruption window |
| 4 | System | AI fraud engine validates: GPS history, platform login data, zone overlap |
| 5 | System | Payout of ₹X initiated to Raju's UPI within 15 minutes |
| 6 | Raju | Receives notification: "₹320 credited for 4 hours of rain disruption" |

### Scenario B — Local Curfew / Strike

| Step | Actor | Action |
|------|-------|--------|
| 1 | Admin | Insurer admin logs a verified civic disruption event for a specific pin-code zone |
| 2 | System | All active policyholders in affected zones are identified |
| 3 | System | Disruption hours calculated (e.g., 10am–6pm = 8 hours) |
| 4 | AI Engine | Cross-checks worker's typical earnings profile for that time window |
| 5 | System | Proportional payout released automatically |

### Scenario C — Extreme Heat (AQI / Temperature Trigger)

| Step | Actor | Action |
|------|-------|--------|
| 1 | System | Temperature API logs >42°C sustained for >3 hours in city zone |
| 2 | System | Heat advisory parametric trigger activated |
| 3 | GigShield | Calculates partial income loss (workers can operate limited hours) |
| 4 | System | Partial payout (e.g., 50% daily rate for reduced capacity window) |

### Application Workflow

```
[Worker Onboarding]
    → KYC Lite (Phone + Aadhaar last 4 + Platform ID)
    → AI Risk Profiling (zone, earnings history, platform tenure)
    → Weekly Plan Selection (Basic / Standard / Premium)
    → Premium Deducted Weekly via UPI AutoPay

[Active Coverage Week]
    → Real-time monitoring of weather, AQI, civic disruption APIs
    → Disruption detected → Trigger evaluated against threshold
    → Automatic claim created (zero-touch)
    → Fraud validation engine runs in parallel
    → Payout released → Worker notified via SMS + App

[Dashboard]
    → Worker: Weekly coverage status, payouts received, active plan
    → Admin/Insurer: Live disruption map, claim volume, loss ratio, fraud flags
```

---

## 3. Weekly Premium Model

### Why Weekly?

Gig workers receive platform payouts weekly (Zomato/Swiggy settle T+2 to T+7). Monthly premiums create affordability friction. Weekly premiums of ₹30–₹80 are mentally comparable to a single missed delivery.

### Premium Tiers

| Plan | Weekly Premium | Coverage Cap/Week | Max Payout/Day | Best For |
|------|---------------|-------------------|----------------|----------|
| **Basic** | ₹29 | ₹1,200 | ₹400 | Part-time workers (<4 hrs/day) |
| **Standard** | ₹49 | ₹2,500 | ₹700 | Full-time workers (6–8 hrs/day) |
| **Premium** | ₹79 | ₹4,000 | ₹1,100 | Power workers (10+ hrs/day, high-risk zones) |

### Dynamic Pricing Factors (AI-Adjusted Weekly)

The base premium is adjusted each week by the AI pricing engine using:

- **Zone Risk Score** — Historical disruption frequency of the worker's primary delivery zone (±15%)
- **Seasonal Risk Multiplier** — Monsoon season (June–September) raises base premium by up to 20%
- **Worker Tenure Discount** — >6 months on platform = up to 10% discount (lower risk of fraud)
- **Claim History** — Workers with zero claims in prior 4 weeks receive a 5% loyalty discount
- **Predicted Weather Risk** — 7-day forecast feeds into next week's premium calculation

**Formula:**

```
Weekly Premium = Base Tier Premium
              × Zone Risk Multiplier
              × Seasonal Multiplier
              × (1 - Tenure Discount)
              × (1 - Loyalty Discount)
              + Predicted Weather Surcharge
```

### Payout Calculation

```
Disruption Payout = (Daily Avg Earnings ÷ Active Hours/Day) × Disrupted Hours × Coverage %
```

Where `Coverage %` = plan-defined (Basic: 70%, Standard: 80%, Premium: 90%)

---

## 4. Parametric Triggers

Parametric insurance pays out automatically when a pre-defined measurable event occurs — **no manual claim submission needed**.

### Trigger Table

| Trigger ID | Event | Data Source | Threshold | Payout Type |
|------------|-------|-------------|-----------|-------------|
| T1 | Heavy Rainfall | OpenWeatherMap API | > 50 mm/hr for ≥ 1 hr | Full hourly rate for disruption window |
| T2 | Extreme Heat | OpenWeatherMap + IMD | Temp > 42°C for ≥ 3 hrs | 50% hourly rate (partial capacity) |
| T3 | Severe Air Pollution | WAQI API (AQI index) | AQI > 400 (Hazardous) for ≥ 2 hrs | Full hourly rate |
| T4 | Flash Flood / Waterlogging | Flood sensor API / civic alerts | Zone declared flooded | Full daily rate |
| T5 | Civic Disruption (Curfew/Strike) | Admin-verified event entry | Admin toggle + geofence confirmation | Full hourly rate for declared window |

### Trigger Validation Logic

Each trigger goes through a 3-step validation before payout is released:

1. **Event Confirmation** — API data meets threshold criteria
2. **Geographic Overlap** — Worker's registered zone intersects the disruption zone (geofence check)
3. **Activity Baseline Check** — Worker had active login/GPS pings on the platform in the 2 hours before disruption (anti-fraud: prevents claims from workers not actually working)

---

## 5. Platform Choice — Web App

**Choice: Progressive Web App (PWA) using React**

### Justification

| Factor | Reasoning |
|--------|-----------|
| **No App Store dependency** | Workers can access via browser link shared on WhatsApp — zero install friction |
| **Offline capability** | PWA service workers cache the dashboard for low-connectivity areas |
| **Low data usage** | Lighter than native apps; important for workers on limited data plans |
| **Admin panel ease** | Web-first is natural for insurer admin dashboard |
| **Development speed** | Single codebase for worker + admin using React Router |
| **Future extensibility** | React Native shares component logic for a native app in Phase 4+ |

**Target devices:** Android Chrome (primary), any modern mobile browser

---

## 6. AI/ML Integration Plan

### 6.1 Dynamic Premium Calculation (ML Model)

**Model Type:** Gradient Boosted Regression (XGBoost)

**Input Features:**
- Worker's historical earnings (last 4 weeks)
- Zone's historical disruption frequency
- Seasonal calendar features (monsoon flag, festival flag)
- 7-day weather forecast data
- Worker tenure and claim history

**Output:** Adjusted weekly premium for next coverage week

**Training Data:** Synthetic dataset generated from historical IMD weather records + simulated worker earnings profiles (real data integration in later phases)

**Integration:** Model served as a REST API endpoint (`/api/premium/calculate`) called during weekly renewal flow

### 6.2 Fraud Detection Engine

**Model Type:** Isolation Forest + Rule-Based Anomaly Detector (hybrid)

**Fraud Signals Monitored:**
- GPS location mismatch (worker claims disruption in Zone A but GPS shows Zone B)
- Duplicate claims across multiple policies for same event
- Claim submitted by worker with zero platform activity before disruption
- Unusual claim frequency spike (>3 claims in 1 week)
- Claims filed for disruption events that occurred outside working hours

**Integration:** Runs asynchronously after trigger fires; flags suspicious claims for manual review while releasing clean claims automatically

### 6.3 Risk Profiling at Onboarding

**Model Type:** Rule-based scoring with ML refinement (Phase 2+)

**Factors:**
- City tier (Tier 1 vs Tier 2 — different weather risk profiles)
- Delivery zone (flood-prone, heat island, historically disruption-heavy areas)
- Platform tenure (longer = lower fraud risk)
- Declared working hours (cross-validated against platform API in Phase 2)

**Output:** Risk tier (Low / Medium / High) → maps to premium multiplier

---

## 7. Tech Stack & Architecture

### Stack Overview

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 + Vite + Tailwind CSS | Worker PWA + Admin Dashboard |
| **Backend** | Node.js + Express.js | REST API, business logic, trigger engine |
| **Database** | MongoDB Atlas | Worker profiles, policies, claims, payouts |
| **ML Service** | Python + FastAPI + scikit-learn/XGBoost | Premium calculation, fraud detection |
| **External APIs** | OpenWeatherMap, WAQI (Air Quality), IMD mock | Disruption trigger monitoring |
| **Payment Mock** | Razorpay Test Mode / UPI Simulator | Payout simulation |
| **Auth** | JWT + OTP via Twilio (mock in Phase 1) | Worker authentication |
| **Deployment** | Vercel (Frontend) + Railway/Render (Backend) | CI/CD pipeline |

### System Architecture

```
┌─────────────────────────────────────────────────────┐
│                    GIGSHIELD PLATFORM                │
│                                                     │
│  ┌─────────────┐        ┌──────────────────────┐   │
│  │  Worker PWA │        │   Admin Dashboard    │   │
│  │  (React)    │        │   (React)            │   │
│  └──────┬──────┘        └──────────┬───────────┘   │
│         │                          │               │
│         └──────────┬───────────────┘               │
│                    ▼                               │
│         ┌──────────────────┐                      │
│         │   Node.js API    │                      │
│         │   (Express)      │                      │
│         └────┬──────┬──────┘                      │
│              │      │                             │
│    ┌─────────┘      └──────────┐                 │
│    ▼                           ▼                 │
│ ┌──────────┐          ┌────────────────┐         │
│ │ MongoDB  │          │  ML Service    │         │
│ │ Atlas    │          │  (Python/      │         │
│ │          │          │   FastAPI)     │         │
│ └──────────┘          └────────────────┘         │
│                                                   │
│  ┌────────────────────────────────────────┐       │
│  │         TRIGGER ENGINE (Cron)          │       │
│  │  OpenWeatherMap → AQI API → IMD Mock   │       │
│  │  → Civic Disruption → Evaluator        │       │
│  └────────────────────────────────────────┘       │
└─────────────────────────────────────────────────┘
```

### Key Data Models (MongoDB)

```javascript
// Worker Profile
{
  workerId, name, phone, aadhaar_last4,
  platform: "zomato" | "swiggy",
  zone: { pincode, city, lat, lng },
  riskTier: "LOW" | "MEDIUM" | "HIGH",
  avgDailyEarnings, avgWorkHours,
  tenureMonths, activePolicyId
}

// Policy
{
  policyId, workerId, planType: "BASIC"|"STANDARD"|"PREMIUM",
  weekStartDate, weekEndDate,
  weeklyPremium, coverageCap, dailyLimit,
  status: "ACTIVE" | "EXPIRED" | "CLAIMED"
}

// Claim
{
  claimId, policyId, workerId,
  triggerId, triggerType, triggerData,
  disruptionZone, disruptionHours,
  claimedAmount, fraudScore,
  status: "PROCESSING" | "APPROVED" | "FLAGGED" | "PAID",
  payoutTimestamp
}
```

---

## 8. Development Plan

### Phase 1 (March 4–20): Ideation & Foundation ✅
- [x] Problem research and persona definition
- [x] README documentation
- [x] System architecture design
- [x] Data model design
- [x] Tech stack finalization
- [x] GitHub repository setup
- [ ] 2-minute strategy video

### Phase 2 (March 21 – April 4): Automation & Protection
- [ ] Worker registration + KYC onboarding flow
- [ ] Policy creation with weekly premium calculation
- [ ] Basic ML premium model (v1 — rule-based with ML hooks)
- [ ] 3–5 parametric trigger implementations using mock/real APIs
- [ ] Zero-touch automated claim flow
- [ ] Basic claims management UI
- [ ] Fraud detection v1 (rule-based anomaly checks)

### Phase 3 (April 5–17): Scale & Optimise
- [ ] Advanced ML fraud detection (Isolation Forest model)
- [ ] Razorpay test mode payout integration
- [ ] Worker dashboard (earnings protected, active coverage)
- [ ] Admin/Insurer dashboard (loss ratios, disruption map, fraud flags)
- [ ] Predictive analytics for next-week disruption likelihood
- [ ] Final demo video + pitch deck

---

|----------|------|
