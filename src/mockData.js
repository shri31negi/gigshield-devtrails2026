export const mockWorkers = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    city: 'Bangalore',
    zone: 'Indiranagar',
    platform: 'Zomato',
    avgWeeklyEarnings: 3500,
    riskScore: 65, // Medium risk
    riskLevel: 'Medium',
    workingHours: '9AM-11PM',
    bikeType: 'Electric Scooter',
    policies: {
      active: true,
      tier: 'Standard',
      premium: 49,
      coverage: 3000,
      startDate: '2024-04-01',
      renewalDate: '2024-04-08'
    },
    earningsProtected: 2450
  },
  {
    id: 2,
    name: 'Priya Singh',
    phone: '+91 97123 45678',
    city: 'Delhi',
    zone: 'Connaught Place',
    platform: 'Swiggy',
    avgWeeklyEarnings: 2800,
    riskScore: 72, // High risk
    riskLevel: 'High',
    workingHours: '10AM-10PM',
    bikeType: 'Petrol Bike',
    policies: {
      active: true,
      tier: 'Premium',
      premium: 79,
      coverage: 5000,
      startDate: '2024-04-01',
      renewalDate: '2024-04-08'
    },
    earningsProtected: 1680
  },
  {
    id: 3,
    name: 'Amit Patel',
    phone: '+91 99456 12345',
    city: 'Mumbai',
    zone: 'Dadar',
    platform: 'Zomato',
    avgWeeklyEarnings: 4200,
    riskScore: 42, // Low risk
    riskLevel: 'Low',
    workingHours: '11AM-9PM',
    bikeType: 'Electric Bike',
    policies: {
      active: true,
      tier: 'Basic',
      premium: 29,
      coverage: 1500,
      startDate: '2024-04-01',
      renewalDate: '2024-04-08'
    },
    earningsProtected: 945
  }
];

export const mockClaims = [
  {
    id: 'CLM001',
    workerId: 1,
    workerName: 'Rajesh Kumar',
    type: 'Heavy Rain',
    trigger: 'Rain > 50mm/hr',
    amount: 450,
    status: 'Completed',
    date: '2024-03-28',
    location: 'Indiranagar, Bangalore',
    hoursLost: 3,
    hourlyRate: 150,
    fraudScore: 2,
    verified: true,
    payoutDate: '2024-03-29'
  },
  {
    id: 'CLM002',
    workerId: 2,
    workerName: 'Priya Singh',
    type: 'Curfew Alert',
    trigger: 'Curfew detected',
    amount: 700,
    status: 'Completed',
    date: '2024-03-25',
    location: 'Connaught Place, Delhi',
    hoursLost: 5,
    hourlyRate: 140,
    fraudScore: 1,
    verified: true,
    payoutDate: '2024-03-26'
  },
  {
    id: 'CLM003',
    workerId: 1,
    workerName: 'Rajesh Kumar',
    type: 'AQI Alert',
    trigger: 'AQI > 300',
    amount: 300,
    status: 'Processing',
    date: '2024-04-01',
    location: 'Koramangala, Bangalore',
    hoursLost: 2,
    hourlyRate: 150,
    fraudScore: 3,
    verified: true,
    payoutDate: null
  },
  {
    id: 'CLM004',
    workerId: 3,
    workerName: 'Amit Patel',
    type: 'Flood Alert',
    trigger: 'Flood detected',
    amount: 800,
    status: 'Flagged - Fraud Review',
    date: '2024-03-22',
    location: 'Dadar, Mumbai',
    hoursLost: 6,
    hourlyRate: 150,
    fraudScore: 85,
    verified: false,
    gpsAnomaly: true,
    duplicateAlert: 'Similar claim filed within 2 days',
    payoutDate: null
  },
  {
    id: 'CLM005',
    workerId: 2,
    workerName: 'Priya Singh',
    type: 'Extreme Heat',
    trigger: 'Temperature > 45°C',
    amount: 250,
    status: 'Pending Verification',
    date: '2024-04-02',
    location: 'Connaught Place, Delhi',
    hoursLost: 1.5,
    hourlyRate: 150,
    fraudScore: 12,
    verified: false,
    payoutDate: null
  }
];

export const mockDisruptions = [
  {
    id: 'DISR001',
    city: 'Bangalore',
    zone: 'Indiranagar',
    type: 'Heavy Rain',
    severity: 'High',
    trigger: 'Rain > 50mm/hr',
    startTime: '2024-04-02T10:30:00',
    endTime: '2024-04-02T13:45:00',
    affectedWorkers: 342,
    isActive: false,
    color: '#3B82F6'
  },
  {
    id: 'DISR002',
    city: 'Delhi',
    zone: 'Connaught Place',
    type: 'Curfew Alert',
    severity: 'Critical',
    trigger: 'Curfew detected',
    startTime: '2024-03-24T18:00:00',
    endTime: '2024-03-25T06:00:00',
    affectedWorkers: 567,
    isActive: false,
    color: '#DC2626'
  },
  {
    id: 'DISR003',
    city: 'Delhi',
    zone: 'Lajpat Nagar',
    type: 'AQI Alert',
    severity: 'Medium',
    trigger: 'AQI > 300',
    startTime: '2024-04-01T00:00:00',
    endTime: '2024-04-02T18:00:00',
    affectedWorkers: 234,
    isActive: true,
    color: '#F59E0B'
  },
  {
    id: 'DISR004',
    city: 'Mumbai',
    zone: 'Dadar',
    type: 'Flood Alert',
    severity: 'High',
    trigger: 'Flood detected',
    startTime: '2024-03-22T08:00:00',
    endTime: '2024-03-22T16:00:00',
    affectedWorkers: 189,
    isActive: false,
    color: '#1E40AF'
  },
  {
    id: 'DISR005',
    city: 'Delhi',
    zone: 'Rajouri Garden',
    type: 'Strike Alert',
    severity: 'Medium',
    trigger: 'Public strike detected',
    startTime: '2024-04-02T09:00:00',
    endTime: '2024-04-02T17:00:00',
    affectedWorkers: 412,
    isActive: true,
    color: '#9333EA'
  }
];

export const mockWeeklyData = [
  { week: 'Week 1', activePolicies: 1240, claims: 45, payouts: 18500, premiums: 52600 },
  { week: 'Week 2', activePolicies: 1356, claims: 52, payouts: 21200, premiums: 58900 },
  { week: 'Week 3', activePolicies: 1489, claims: 38, payouts: 15800, premiums: 64700 },
  { week: 'Week 4', activePolicies: 1623, claims: 61, payouts: 24500, premiums: 71200 }
];

export const mockZoneData = [
  { name: 'Indiranagar', policies: 245, disruptions: 3, losses: 12500 },
  { name: 'Connaught Place', policies: 189, disruptions: 2, losses: 8900 },
  { name: 'Dadar', policies: 156, disruptions: 2, losses: 10200 },
  { name: 'Lajpat Nagar', policies: 198, disruptions: 1, losses: 5600 },
  { name: 'Rajouri Garden', policies: 234, disruptions: 3, losses: 14300 }
];

export const policyTiers = [
  { name: 'Basic', premium: 29, coverage: 1500, description: 'Essential coverage' },
  { name: 'Standard', premium: 49, coverage: 3000, description: 'Most popular' },
  { name: 'Premium', premium: 79, coverage: 5000, description: 'Maximum coverage' }
];

export const triggerDefinitions = [
  { condition: 'Heavy Rain', threshold: '> 50mm/hr', payout: 'Auto-triggered' },
  { condition: 'AQI Level', threshold: '> 300', payout: 'Auto-triggered' },
  { condition: 'Curfew', threshold: 'Detected', payout: 'Auto-triggered' },
  { condition: 'Flood', threshold: 'Detected', payout: 'Auto-triggered' },
  { condition: 'Extreme Heat', threshold: '> 45°C', payout: 'Auto-triggered' }
];
