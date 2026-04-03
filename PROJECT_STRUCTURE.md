# Project File Tree

```
Guidewire project/
│
├── 📄 package.json                    # Dependencies & npm scripts
├── 📄 index.html                      # HTML entry point
├── 📄 tailwind.config.js              # Tailwind CSS configuration
├── 📄 postcss.config.js               # PostCSS configuration
├── 📄 vite.config.js                  # Vite build configuration
├── 📄 .gitignore                      # Git ignore patterns
│
├── 📄 README.md                       # Main project documentation
├── 📄 SETUP_GUIDE.md                  # Installation & setup instructions
├── 📄 COMPONENTS_GUIDE.md             # Detailed component documentation
│
└── 📁 src/                            # Source code directory
    ├── 📄 main.jsx                    # React app entry point
    ├── 📄 index.css                   # Global styles & animations
    ├── 📄 mockData.js                 # All mock data (workers, claims, disruptions)
    ├── 📄 App.jsx                     # Main app component (navigation, role switcher)
    │
    └── 📁 screens/                    # Screen components
        ├── 👷 WorkerOnboarding.jsx    # 4-step onboarding flow
        ├── 📊 WorkerDashboard.jsx     # Home screen with policies & earnings
        ├── 🚨 DisruptionMonitor.jsx   # Real-time disruption alerts
        ├── ✅ ClaimsFlow.jsx           # Auto-triggered claims & verification
        ├── 🛡️  PolicyManagement.jsx    # Policy selection & renewal
        ├── 📈 AdminDashboard.jsx      # Insurer KPIs & analytics
        └── 🔍 FraudDetection.jsx      # Fraud detection & claims review


COMPONENT HIERARCHY
═══════════════════════════════════════════════════════════════

App.jsx (Main Navigation & Role Switcher)
│
├─── WORKER SCREENS
│    ├─── WorkerOnboarding.jsx (New worker registration)
│    ├─── WorkerDashboard.jsx (Home screen)
│    ├─── DisruptionMonitor.jsx (Live alerts)
│    ├─── ClaimsFlow.jsx (Claims management)
│    └─── PolicyManagement.jsx (Coverage options)
│
└─── ADMIN SCREENS
     ├─── AdminDashboard.jsx (KPIs & analytics)
     └─── FraudDetection.jsx (Claims review)


DATA FLOW
═══════════════════════════════════════════════════════════════

mockData.js (Central Data)
│
├─── mockWorkers (3 sample workers)
├─── mockClaims (5 sample claims)
├─── mockDisruptions (5 disruptions)
├─── mockWeeklyData (Weekly trends)
├─── mockZoneData (Zone performance)
├─── policyTiers (3 tier options)
└─── triggerDefinitions (5 triggers)
     │
     └─── Used by all screen components


FILE SIZES & COMPONENT COUNTS
═══════════════════════════════════════════════════════════════

Total Components: 9
- 1 Main App
- 7 Screen components
- 1 Mock data file
- 1+ custom utilities

React Components: ~3,500 lines
Styling: ~500 lines (Tailwind + custom CSS)
Mock Data: ~200 lines
Config Files: ~150 lines


KEY FEATURES BY SCREEN
═══════════════════════════════════════════════════════════════

WorkerOnboarding.jsx
├─ Step 1: Basic Info (Name, Phone, City, Platform)
├─ Step 2: Risk Profile (Hours, Bike Type)
├─ Step 3: Risk Score Display (Animated Meter)
└─ Step 4: Premium Quote & Payment

WorkerDashboard.jsx
├─ Policy Status (Green Card)
├─ Earnings Protected (Monthly)
├─ Live Disruption Alert (Animated Banner)
├─ Weekly Earnings Chart
└─ Quick Stats & Actions

DisruptionMonitor.jsx
├─ Real-time Trigger Status (Rain, AQI, Curfew)
├─ City Map View (Placeholder)
├─ Active Disruptions List (Expandable)
├─ Threshold Indicators (Progress Bars)
└─ Zone Safe Confirmation

ClaimsFlow.jsx
├─ Claims Summary (Total, Completed, Payouts)
├─ Claims List (Expandable)
├─ AI Verification Steps
├─ Fraud Detection Scores
└─ Payout Breakdown

PolicyManagement.jsx
├─ Coverage Tiers (Basic/Standard/Premium)
├─ Trigger Definitions (Expandable)
├─ Coverage Calendar (7-day grid)
└─ Auto-Renewal Toggle

AdminDashboard.jsx
├─ KPI Cards (Policies, Claims, Loss Ratio, Fraud)
├─ Premium vs Payout Chart (BarChart)
├─ Zone Distribution Chart (PieChart)
├─ Disruption Probability (BarChart)
├─ Claims Trend Chart (LineChart)
├─ Claims Feed Table
└─ Zone Performance Cards

FraudDetection.jsx
├─ Fraud Summary Cards
├─ Risk Status Filtering
├─ Flagged Claims List (Expandable)
├─ Fraud Analysis Details
├─ GPS Validation Chart (ScatterChart)
├─ Detection Rules Grid
└─ Manual Review Queue


COLOR SCHEME
═══════════════════════════════════════════════════════════════

Primary (Worker):      #0D1B2A (Deep Blue)
Secondary:             #FF6B35 (Orange)
Success:               #22C55E (Green)
Warning:               #F59E0B (Yellow)
Danger:                #EF4444 (Red)
Info:                  #3B82F6 (Light Blue)

Admin Theme:
- Dark Background:     #1e293b / #0f172a
- Cards:               #374151 / #4b5563
- Text:                #e2e8f0 / #f1f5f9


TYPOGRAPHY STACK
═══════════════════════════════════════════════════════════════

Display Font:   Poppins (Headings h1-h6)
Body Font:      Inter (Body text, paragraphs)
Mono Font:      System monospace (Code snippets)


ANIMATIONS INCLUDED
═══════════════════════════════════════════════════════════════

✨ fadeIn          - Page entrance animation
✨ slideInLeft      - Sidebar animation
✨ slideInRight     - Content entrance
✨ pulse            - Alert notifications
✨ shimmer          - Shimmer effect
✨ bounce           - Bouncing elements
✨ gradientShift    - Animated gradients

Plus:
- Hover transitions
- Color transitions
- Transform scales
- Progress bar fills


```

## Quick Reference

**To start development:**
```bash
npm install
npm run dev
```

**To build for production:**
```bash
npm run build
npm run preview
```

**Project Structure:**
- All React components in `src/`
- Screen components in `src/screens/`
- Mock data centralized in `mockData.js`
- Global styles in `index.css`
- Tailwind config in `tailwind.config.js`

**Documentation:**
- `README.md` - Main overview
- `SETUP_GUIDE.md` - Installation & usage
- `COMPONENTS_GUIDE.md` - Component details

---

**Total Files Created: 23**
- 9 Component files (.jsx)
- 5 Configuration files (.js, .json)
- 3 Documentation files (.md)
- 1 CSS file
- 1 HTML file
- 1 Gitignore file
- 3 Folders

Ready for development! 🚀
