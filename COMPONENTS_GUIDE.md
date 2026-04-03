# GigShield Component Documentation

## Overview

GigShield is a React-based insurance platform UI with 7 main screens and comprehensive mock data integration. All components use Tailwind CSS for styling and Recharts for data visualization.

---

## 🏗️ Architecture

### App.jsx (Main Application)
**Location**: `src/App.jsx`

Main component that manages:
- Role switching (Worker ↔ Admin)
- Screen navigation
- Worker selection dropdown
- Sidebar navigation
- Header with branding

**Key Props**: None (manages own state)

**State**:
- `currentRole`: 'worker' or 'admin'
- `currentScreen`: Current screen name
- `workerId`: Selected worker ID (1-3)
- `sidebarOpen`: Sidebar visibility toggle

**Features**:
- Fixed header with logo and controls
- Responsive sidebar
- Role-based navigation menu
- Worker selector in header

---

## 👷 Worker Screens

### 1. WorkerOnboarding.jsx
**Purpose**: 4-step mobile-first registration flow

**Screens**:
1. **Step 1**: Basic Info
   - Name input
   - Phone with OTP verification
   - City selection (Bangalore/Delhi/Mumbai)
   - Zone input
   - Platform selection (Zomato/Swiggy)
   - Weekly earnings input

2. **Step 2**: Risk Profile Quiz
   - Working hours selector
   - Bike type selector
   - Info alert about risk calculation

3. **Step 3**: AI Risk Score
   - Animated circular progress meter
   - Risk level display (Low/Medium/High)
   - Premium quote card with coverage amount
   - Policy benefits list

4. **Step 4**: Activation & Payment
   - Policy summary
   - Payment method selection (UPI)
   - Terms & conditions checkbox
   - Payment button with amount

**Key Features**:
- Step indicator at top
- Animated risk score meter
- Form validation
- Responsive mobile-first design

**Mock Data Used**:
- Worker profile data
- Policy tiers (Basic/Standard/Premium)

---

### 2. WorkerDashboard.jsx
**Purpose**: Home screen showing active policies and earnings

**Components**:
- **Live Disruption Alert Banner**: Animated orange banner showing weather alerts
- **Policy Status Card**: Green card with coverage details
- **Earnings Protected**: Blue card showing monthly protection amount
- **Quick Stats**: Active hours and zone display
- **Weekly Earnings Chart**: LineChart showing day-by-day earnings
- **Quick Stats Cards**: Pending, completed claims, total payouts
- **Action Buttons**: View policies, report disruption

**Charts**:
- LineChart: 7-day earnings trend with custom colors

**Key Features**:
- Alert banner with countdown timer
- Responsive two-column layout on desktop
- Chart with custom tooltip
- Color-coded status indicators

**Mock Data Used**:
- Worker profile
- Claims data
- Earnings data for chart

---

### 3. DisruptionMonitor.jsx
**Purpose**: Real-time disruption monitoring and alerts

**Components**:
- **Trigger Status Cards**: Show real-time trigger status (Rain, AQI, Curfew)
- **Interactive Map Placeholder**: Shows legend for severity levels
- **Disruption List**: Expandable cards showing active/recent disruptions
- **Trigger Thresholds**: Animated progress bars showing current conditions
- **Zone Status**: Green confirmation that zone is safe

**Expandable Sections**:
- Disruption details (start/end time)
- Auto-claim status

**Charts**:
- Progress bars for Rain, AQI, Temperature

**Key Features**:
- Severity color coding (Red/Orange/Yellow/Blue)
- Expandable disruption cards
- Real-time metric displays
- Threshold indicator bars

**Mock Data Used**:
- Disruption list
- Real-time trigger metrics
- Severity levels

---

### 4. ClaimsFlow.jsx
**Purpose**: Zero-touch auto-triggered claims and verification

**Components**:
- **Claims Summary**: Total claims, completed, total payouts
- **Active Claim Alert**: Blue banner for processing claims
- **Claims List**: Expandable cards for each claim
- **Status Badges**: Completed/Processing/Flagged statuses
- **Verification Steps**: 4-step AI verification progress
- **Fraud Alert**: Red section for flagged claims
- **Payout Breakdown**: Hours lost × hourly rate calculation
- **Fraud Score Meter**: Visual representation of fraud risk
- **Action Buttons**: Download receipt, approve/reject

**Expandable Sections Per Claim**:
- AI verification progress
- Fraud analysis details
- Payout breakdown
- Fraud detection score

**Key Features**:
- Status-based color coding
- Expandable claim details
- Fraud score visualization
- Clear payout calculation
- Download & action buttons

**Mock Data Used**:
- Claims data
- Fraud scores
- Verification steps

---

### 5. PolicyManagement.jsx
**Purpose**: Policy selection, coverage details, and renewal

**Components**:
- **Current Week Details**: Blue gradient card with coverage info
- **Tier Selector**: 3 policy cards (Basic/Standard/Premium)
- **Coverage Trigger Definitions**: Expandable definitions for each trigger
- **Coverage Calendar**: 7-day grid showing active/disrupted days
- **Auto-Renewal Toggle**: Switch for auto-renewal preference
- **Action Buttons**: Download certificate, renew/upgrade

**Tier Cards**:
- Premium amount
- Coverage amount
- Feature list (auto-triggered, zero manual, AI fraud protection)
- Upgrade button

**Expandable Triggers**:
- Condition name
- Threshold details
- How it works explanation
- Payout information

**Key Features**:
- Interactive tier selection
- Animated tier selector
- Expandable trigger definitions
- Coverage calendar visualization
- Auto-renewal toggle

**Mock Data Used**:
- Policy tiers
- Trigger definitions
- Coverage calendar data

---

## 🛡️ Admin Screens

### 6. AdminDashboard.jsx
**Purpose**: Insurer dashboard with KPIs and analytics

**Components**:
- **KPI Cards**: Active policies, claims, loss ratio, fraud flagged
- **Premium vs Payout Chart**: BarChart comparing weekly data
- **Zone Distribution**: PieChart showing policy distribution
- **Disruption Probability**: Horizontal BarChart predicting next week
- **Claims Trend**: LineChart showing weekly claims
- **Claims Feed Table**: Real-time claims with fraud scores
- **Zone Performance**: Summary cards for each zone

**Charts**:
- BarChart: Premium vs Payout with dual bars
- PieChart: Zone distribution with color-coded slices
- BarChart (Horizontal): Disruption probability by zone
- LineChart: Weekly claims trend

**Key Features**:
- Dark theme for insurer dashboard
- Real-time claims table
- Multiple data visualizations
- Zone performance metrics
- Color-coded KPI cards

**Mock Data Used**:
- Weekly data
- Zone data
- Claims data with fraud scores
- Disruption probability data

---

### 7. FraudDetection.jsx
**Purpose**: Fraud detection, claims review, and GPS validation

**Components**:
- **Fraud Summary Cards**: Total flagged, under review, approved
- **Filter Buttons**: High/Medium/Low risk filtering
- **Flagged Claims List**: Expandable cards with fraud details
- **Reasons Section**: Duplicate alerts, GPS anomalies
- **Fraud Analysis**: Detailed reasons and alerts
- **Fraud Score Breakdown**: Component breakdown
- **GPS Validation Chart**: ScatterChart showing distance anomalies
- **Detection Rules**: Grid of fraud detection rules
- **Manual Review Queue**: Status indicator

**Expandable Sections Per Claim**:
- Claim details
- Fraud analysis with icons
- Fraud score breakdown
- Approve/Reject buttons

**Charts**:
- ScatterChart: GPS distance vs fraud probability

**Key Features**:
- Risk-based filtering
- Detailed fraud analysis
- GPS anomaly detection
- Fraud score components
- Manual approval workflow

**Mock Data Used**:
- Flagged claims
- GPS anomaly data
- Fraud scores
- Detection rules

---

## 📊 Data Structure (mockData.js)

### mockWorkers
```javascript
{
  id: 1,
  name: string,
  phone: string,
  city: string,
  zone: string,
  platform: 'Zomato' | 'Swiggy',
  avgWeeklyEarnings: number,
  riskScore: number (0-100),
  riskLevel: 'Low' | 'Medium' | 'High',
  policies: {
    active: boolean,
    tier: 'Basic' | 'Standard' | 'Premium',
    premium: number,
    coverage: number,
    startDate: string,
    renewalDate: string
  },
  earningsProtected: number
}
```

### mockClaims
```javascript
{
  id: string,
  workerId: number,
  workerName: string,
  type: string,
  trigger: string,
  amount: number,
  status: 'Completed' | 'Processing' | 'Pending Verification' | 'Flagged - Fraud Review',
  date: string,
  location: string,
  hoursLost: number,
  hourlyRate: number,
  fraudScore: number (0-100),
  verified: boolean,
  payoutDate?: string,
  gpsAnomaly?: boolean,
  duplicateAlert?: string
}
```

### mockDisruptions
```javascript
{
  id: string,
  city: string,
  zone: string,
  type: string,
  severity: 'Low' | 'Medium' | 'High' | 'Critical',
  trigger: string,
  startTime: string (ISO),
  endTime: string (ISO),
  affectedWorkers: number,
  isActive: boolean,
  color: string (hex)
}
```

---

## 🎨 Styling Conventions

### Tailwind Classes Used
- **Colors**: `from-blue-500`, `to-orange-600`, `text-white`, `bg-slate-50`
- **Spacing**: `p-6`, `mb-4`, `gap-3` (4px units)
- **Typography**: `text-2xl`, `font-bold`, `text-center`
- **Layouts**: `grid`, `flex`, `grid-cols-1 md:grid-cols-2`
- **Borders**: `border-2`, `rounded-lg`, `border-orange-500`
- **Shadows**: `shadow-lg`, `shadow-xl`
- **Transitions**: `transition`, `hover:bg-blue-700`

### Custom CSS (index.css)
- `@keyframes fadeIn`: Fade-in entrance animation
- `@keyframes slideInLeft/Right`: Slide animations
- `@keyframes pulse`: Pulsing animation for alerts
- `@keyframes shimmer`: Shimmer effect
- `animate-fadeIn`: Apply fadeIn animation
- `text-gradient`: Gradient text effect
- `scale-102`: Scale transform utility

---

## 🔌 Integration Points

### Component Communication
- **App.jsx** → All screens via props
- **Screen components** → Mock data via imports
- **Recharts** → Data arrays from mockData.js

### Mock Data Flow
```
mockData.js
    ↓
Screen component imports
    ↓
Data mapped to UI
    ↓
User interactions (clicks, input)
    ↓
State updates
    ↓
Re-render
```

---

## 📱 Responsive Design

### Breakpoints
- **sm**: 640px (tablet)
- **md**: 768px (larger tablet)
- **lg**: 1024px (desktop)
- **xl**: 1280px (large desktop)

### Component Patterns
- `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`: Responsive grid
- `hidden lg:block`: Hide on mobile, show on desktop
- `max-w-5xl mx-auto`: Container with max-width
- `p-4 md:p-8`: Responsive padding

---

## 🎬 Animation Usage

### Alerts & Notifications
- `.animate-pulse`: Disruption alert banner
- `.animate-fadeIn`: Page entrance
- Custom gradients: Card backgrounds

### Transitions
- `transition transform hover:scale-105`: Card hover effects
- Smooth color transitions on status badges
- Progress bar fill animations

---

## 🔐 Security & Trust Features

- **OTP Verification**: Phone verification flow
- **AI Risk Score**: Animated display of worker risk
- **Fraud Detection**: Visual fraud score indicators
- **GPS Validation**: Anomaly detection visualization
- **Verification Steps**: Clear progression indicators
- **Approved Indicators**: Green checkmarks for verified claims

---

## 🚀 Performance Optimizations

- React hooks (useState, useEffect)
- Memoized components where applicable
- Lazy rendering of expanded sections
- Efficient Recharts rendering
- CSS transitions (GPU-accelerated)

---

## 📖 Code Structure Patterns

All components follow this pattern:

```javascript
import React, { useState } from 'react';
import { IconName } from 'lucide-react';
import { ChartType, ... } from 'recharts';
import { mockData } from '../mockData';

export default function ComponentName({ props }) {
  const [state, setState] = useState(initialValue);
  
  const helperFunction = () => { /* logic */ };
  
  const statusStyles = (value) => { /* return styles */ };
  
  return (
    <div className="min-h-screen bg-gradient...">
      {/* Content */}
    </div>
  );
}
```

---

## 🔮 Extensibility

### Adding New Screens
1. Create `src/screens/NewScreen.jsx`
2. Import in `App.jsx`
3. Add to `workerScreens` or `adminScreens` object
4. Add NavButton in sidebar

### Adding New Mock Data
1. Add to `mockData.js`
2. Import in component: `import { mockNewData } from '../mockData'`
3. Use in component: `mockNewData.map(...)`

### Customizing Colors
Edit `tailwind.config.js` theme.colors or use inline Tailwind classes

---

**All components are production-ready and fully functional with mock data!** ✨
