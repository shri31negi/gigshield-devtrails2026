# GigShield - AI-Powered Parametric Insurance Platform

A production-quality web application UI for India's gig economy delivery workers (Zomato/Swiggy personas). GigShield protects workers from **income loss** caused by external disruptions like extreme weather, floods, curfews, and strikes.

## 🚀 Features

### Worker Screens
- **Mobile-First Onboarding**: Registration → Risk Profile → AI Risk Score → Premium Quote → Payment
- **Worker Dashboard**: Active policy status, earnings protected, live disruption alerts, claim tracker
- **Live Disruption Monitor**: Real-time city map with disruption overlays, trigger thresholds, zone status
- **Zero-Touch Claims**: Auto-triggered claims with AI verification steps, payout breakdown, claim history
- **Policy Management**: Coverage tier selector, parametric trigger definitions, coverage calendar, auto-renewal toggle

### Admin/Insurer Screens
- **Insurer Dashboard**: KPI cards (policies, claims, loss ratio, fraud flags), charts (premium vs payout, claims trend, zone performance)
- **Fraud Detection Panel**: AI-scored suspicious claims, GPS anomaly detection, duplicate claim alerts, manual review workflow

## 📦 Project Structure

```
gigshield/
├── src/
│   ├── App.jsx                 # Main app with routing & role switcher
│   ├── main.jsx               # React entry point
│   ├── index.css              # Global styles & animations
│   ├── mockData.js            # All mock data (workers, claims, disruptions)
│   └── screens/
│       ├── WorkerOnboarding.jsx
│       ├── WorkerDashboard.jsx
│       ├── DisruptionMonitor.jsx
│       ├── ClaimsFlow.jsx
│       ├── PolicyManagement.jsx
│       ├── AdminDashboard.jsx
│       └── FraudDetection.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

## 🛠️ Tech Stack

- **React 18** - UI components with hooks
- **Tailwind CSS** - Utility-first CSS styling
- **Recharts** - Data visualizations & charts
- **Lucide React** - Icons
- **Vite** - Build tool & dev server
- **Mock Data** - No external API calls

## 🎨 Design System

**Color Palette:**
- Primary: `#0D1B2A` (Deep Blue)
- Secondary: `#FF6B35` (Orange Accent)
- Success: `#22C55E` (Green)
- Warning: `#F59E0B` (Yellow)
- Error: `#EF4444` (Red)

**Typography:**
- Display: Poppins (headings)
- Body: Inter (content)

**Responsive:**
- Mobile-first design
- Worker screens: Mobile optimized
- Admin screens: Desktop focused

## 💾 Mock Data Included

- **3 sample workers** with different risk profiles (Low/Medium/High)
- **5 sample claims** with varied statuses (Completed, Processing, Fraud-flagged, Pending)
- **5 disruptions** (Heavy Rain, AQI Alert, Curfew, Flood, Strike)
- **Weekly data** for trend charts
- **Zone performance** metrics
- **3 policy tiers** (Basic ₹29 | Standard ₹49 | Premium ₹79)

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd "Guidewire project"

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 🔄 Navigation

- **Header**: GigShield logo, worker selector dropdown, role toggle (Worker ↔ Admin)
- **Sidebar**: Navigation between screens with active indicator
- **Worker Screens**:
  - Home → Dashboard
  - Policy → Policy Management
  - Claims → Claims Flow
  - Disruptions → Live Monitor
- **Admin Screens**:
  - Dashboard → KPIs & Analytics
  - Fraud Detection → Claims Review

## 📱 Key Interactions

### Worker Onboarding (4 Steps)
1. Basic Info (Name, Phone OTP, City, Platform)
2. Risk Profile (Working hours, Bike type)
3. Risk Score Display (Animated meter)
4. Premium Quote & Payment

### Claims Flow
- Auto-triggered when disruption detected
- AI verification progress: Weather ✓ → Location ✓ → Fraud ✓ → Payout ✓
- Payout breakdown (hours × rate)
- UPI transfer mock confirmation

### Admin Controls
- Real-time claims feed with fraud scores
- GPS location validation
- Fraud approval/rejection workflow
- Predictive disruption probability chart

## 🎯 UX Principles

✅ **Less than 2 taps** for critical actions
✅ **Localized for India**: ₹ currency, Hindi/English labels
✅ **Semi-literate friendly**: Large text, clear icons, minimal jargon
✅ **Premium feel**: Gradients, smooth animations, modern cards
✅ **Trustworthy**: Green checkmarks, verification steps, clear coverage details

## 📊 Charts & Visualizations

- **Line Chart**: Weekly earnings, claims trend
- **Bar Chart**: Premium vs payout, disruption probability
- **Pie Chart**: Zone distribution
- **Scatter Chart**: GPS anomaly distance vs fraud score
- **Progress Bars**: Risk meter, verification steps, fraud score

## 🔐 Security Features (UI/UX)

- OTP verification flow for phone
- Fraud detection with AI scoring
- GPS anomaly flagging
- Duplicate claim detection
- Manual review workflow for suspicious claims

## 🎬 Animations

- Fade-in on page load
- Pulse effect on alerts
- Smooth transitions on hover
- Progress bar fill animations
- Gradient shifts on cards

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🤝 Component Structure

Each screen component includes:
- Proper React hooks (useState, useEffect)
- Responsive grid layouts
- Tailwind utility classes only
- Mock data integration
- Interactive elements with hover/active states

## 📝 Notes

- All data is mocked (weather, claims, payouts)
- No backend API calls
- Smooth animations throughout
- Dark mode for admin dashboard
- Light mode for worker screens
- Fully accessible color contrasts

## 📄 License

MIT License - Built for demonstration & learning purposes

---

**Built with ❤️ for India's gig workers** 🚀

For questions or customization, refer to the component files in `src/screens/`
