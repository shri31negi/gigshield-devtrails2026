# GigShield Project Setup & Run Guide

## 📋 Quick Start

### 1. Install Dependencies

Open a terminal in the project directory and run:

```bash
npm install
```

This will install all required packages:
- react (UI framework)
- react-dom (React DOM rendering)
- recharts (Charts & visualizations)
- lucide-react (Icons)
- tailwindcss (CSS framework)
- vite (Build tool)

### 2. Start Development Server

```bash
npm run dev
```

The application will automatically open at `http://localhost:3000` in your default browser.

### 3. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### 4. Preview Production Build

```bash
npm run preview
```

## 🎮 Using the Application

### First Time Setup

1. **Choose Your Role**
   - Click the **[Admin]** button in the top right to toggle between Worker and Admin views
   - Start in **Worker** view (default)

2. **Select a Test Worker**
   - Use the dropdown in the header to switch between 3 sample workers:
     - Rajesh Kumar (Bangalore)
     - Priya Singh (Delhi)
     - Amit Patel (Mumbai)

3. **Navigate Screens**
   - Use the sidebar (left) to navigate between different screens
   - Each screen is fully interactive with mock data

### Worker View Walkthrough

**Home Dashboard**
- See active policy status
- View earnings protected this month
- Check live disruption alerts
- See weekly earnings chart

**Policy Management**
- View current coverage tier
- Upgrade to different tiers (Basic/Standard/Premium)
- See coverage calendar
- Toggle auto-renewal

**Claims**
- View all claims with auto-triggered status
- Check AI verification progress
- See payout breakdown for each claim
- Fraud detection scores for suspicious claims

**Disruptions**
- Real-time disruption monitor
- Active triggers (Rain, AQI, Curfew, etc.)
- Zone-specific status
- Disruption history

### Admin View Walkthrough

**Insurer Dashboard**
- KPI Cards: Active policies, claims, loss ratio, fraud flags
- Charts showing trends:
  - Premium vs Payout comparison
  - Active policies by zone
  - Claims trend over weeks
  - Disruption probability prediction
- Zone performance metrics

**Fraud Detection**
- List of flagged claims with fraud scores
- GPS location validation
- Duplicate claim detection
- Manual review interface for suspicious claims

## 🗂️ File Structure Explanation

```
src/
├── App.jsx
│   └── Main component with routing, role switching, sidebar navigation
├── screens/
│   ├── WorkerOnboarding.jsx (4-step registration flow)
│   ├── WorkerDashboard.jsx (Home screen with policy & earnings)
│   ├── DisruptionMonitor.jsx (Real-time alerts & triggers)
│   ├── ClaimsFlow.jsx (Auto-triggered claims & payouts)
│   ├── PolicyManagement.jsx (Coverage options & renewal)
│   ├── AdminDashboard.jsx (Insurer KPIs & charts)
│   └── FraudDetection.jsx (Fraud review & detection)
├── mockData.js (All sample data: workers, claims, disruptions)
├── main.jsx (React app entry point)
└── index.css (Global styles + Tailwind + animations)

Configuration Files:
├── package.json (Dependencies & scripts)
├── tailwind.config.js (Tailwind CSS configuration)
├── postcss.config.js (PostCSS setup)
├── vite.config.js (Vite build configuration)
└── index.html (HTML entry point)
```

## 🔧 Key Dependencies

| Package | Purpose |
|---------|---------|
| `react` | UI library |
| `react-dom` | React DOM rendering |
| `recharts` | Charts & graphs |
| `lucide-react` | Icons library |
| `tailwindcss` | CSS utility framework |
| `vite` | Build tool & dev server |

## 📊 Mock Data Overview

All data is in `src/mockData.js`:

### Workers (3 samples)
- Rajesh Kumar: Bangalore, Zomato, Medium risk
- Priya Singh: Delhi, Swiggy, High risk
- Amit Patel: Mumbai, Zomato, Low risk

### Claims (5 samples)
- 2 Completed claims with payouts
- 1 Processing claim
- 1 Fraud-flagged claim
- 1 Pending verification claim

### Disruptions (5 samples)
- Heavy Rain in Bangalore
- Curfew in Delhi
- AQI Alert in Delhi
- Flood in Mumbai
- Strike in Delhi

### Policy Tiers
- Basic: ₹29/week, ₹1,500 coverage
- Standard: ₹49/week, ₹3,000 coverage
- Premium: ₹79/week, ₹5,000 coverage

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js` in the `colors` section:
```javascript
colors: {
  primary: '#0D1B2A',     // Deep blue
  secondary: '#FF6B35',   // Orange
  success: '#22C55E',     // Green
}
```

### Add More Workers
Edit `src/mockData.js` and add to `mockWorkers` array

### Modify Premium Tiers
Update `policyTiers` array in `src/mockData.js`

### Change Animations
Edit `src/index.css` keyframes or `tailwind.config.js` animation config

## 🚨 Troubleshooting

### Port 3000 Already in Use
```bash
# Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# For Windows, edit vite.config.js to use different port:
server: {
  port: 3001,
}
```

### Tailwind Not Loading
```bash
# Ensure PostCSS is configured
npm install tailwindcss postcss autoprefixer

# Rebuild
npm run dev
```

### Missing Packages
```bash
# Clean reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📱 Testing Responsive Design

1. Open DevTools:
   - Chrome/Edge: F12 or Ctrl+Shift+I
   - Firefox: F12
   - Safari: Cmd+Option+I

2. Click Device Toolbar (Toggle device toolbar)

3. Test breakpoints:
   - Mobile (320px - 640px)
   - Tablet (640px - 1024px)
   - Desktop (>1024px)

## 🎯 Key Interactive Elements

- **Role Toggle**: Top-right corner button switches Worker ↔ Admin
- **Worker Selector**: Dropdown in header to switch between 3 workers
- **Cards**: Click to expand/collapse sections
- **Forms**: Fill inputs and click buttons
- **Charts**: Hover to see tooltips
- **Buttons**: Trigger alerts and state changes

## 💡 Tips

✅ Use the browser DevTools to inspect elements and styles
✅ Check the console (F12 → Console) for any JavaScript errors
✅ All data is mocked - no backend calls are made
✅ Animations are smooth - check `index.css` for animation definitions
✅ Cards have hover effects - try hovering over elements

## 📞 Support

For issues:
1. Check that `npm install` completed successfully
2. Verify `node_modules/` folder exists
3. Clear terminal and restart `npm run dev`
4. Check browser console for errors

## 🚀 Production Deployment

```bash
# Build optimized version
npm run build

# This creates 'dist/' folder with:
# - Minified JS/CSS
# - Optimized assets
# - Ready for hosting on Vercel, Netlify, etc.
```

---

**Happy coding!** 🎉

For detailed component documentation, see inline comments in `src/screens/` files.
