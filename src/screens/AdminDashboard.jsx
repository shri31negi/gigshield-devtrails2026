import React from 'react';
import { TrendingUp, AlertTriangle, Users, DollarSign } from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { mockWeeklyData, mockZoneData, mockClaims } from '../mockData';

const disruptionProbability = [
  { zone: 'Indiranagar', probability: 45 },
  { zone: 'Connaught Place', probability: 62 },
  { zone: 'Dadar', probability: 38 },
  { zone: 'Lajpat Nagar', probability: 58 },
  { zone: 'Rajouri Garden', probability: 71 }
];

const COLORS = ['#22C55E', '#F97316', '#EF4444'];

export default function AdminDashboard() {
  const activeThisWeek = 1623;
  const claimsThisWeek = 61;
  const totalPayouts = mockWeeklyData.reduce((sum, w) => sum + w.payouts, 0);
  const totalPremiums = mockWeeklyData.reduce((sum, w) => sum + w.premiums, 0);
  const lossRatio = ((totalPayouts / totalPremiums) * 100).toFixed(1);
  const fraudFlagged = mockClaims.filter(c => c.fraudScore > 70).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Insurer Dashboard</h1>
          <p className="text-slate-400">Real-time claims & risk analytics</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Active Policies', value: activeThisWeek.toLocaleString(), icon: Users, color: 'from-blue-500 to-blue-600' },
            { label: 'Claims This Week', value: claimsThisWeek, icon: AlertTriangle, color: 'from-orange-500 to-orange-600' },
            { label: 'Loss Ratio', value: `${lossRatio}%`, icon: TrendingUp, color: 'from-red-500 to-red-600' },
            { label: 'Fraud Flagged', value: fraudFlagged, icon: AlertTriangle, color: 'from-purple-500 to-purple-600' }
          ].map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div key={idx} className={`bg-gradient-to-br ${kpi.color} text-white rounded-xl p-6 shadow-lg`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm opacity-80 mb-2">{kpi.label}</p>
                    <p className="text-3xl font-bold">{kpi.value}</p>
                  </div>
                  <Icon size={32} opacity={0.5} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Premium vs Payout */}
          <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-6">Premium vs Payout Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockWeeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#404854" />
                <XAxis dataKey="week" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #404854', borderRadius: '8px', color: '#fff' }}
                  formatter={(value) => `₹${value.toLocaleString()}`}
                />
                <Legend />
                <Bar dataKey="premiums" fill="#22C55E" name="Premiums Collected" />
                <Bar dataKey="payouts" fill="#EF4444" name="Claims Paid" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Distribution by Zone */}
          <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-6">Active Policies by Zone</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockZoneData}
                  dataKey="policies"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => value.toLocaleString()} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Disruption Probability */}
          <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-6">Next Week Disruption Probability</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={disruptionProbability} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#404854" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="zone" type="category" stroke="#94a3b8" width={120} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #404854', borderRadius: '8px', color: '#fff' }}
                  formatter={(value) => `${value}%`}
                />
                <Bar dataKey="probability" fill="#F59E0B" name="Probability" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly Claims Trend */}
          <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-6">Weekly Claims Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockWeeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#404854" />
                <XAxis dataKey="week" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #404854', borderRadius: '8px', color: '#fff' }}
                />
                <Line type="monotone" dataKey="claims" stroke="#F97316" strokeWidth={3} dot={{fill: '#F97316', r: 5}} name="Claims" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Real-time Claims Feed */}
        <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-6">Recent Claims with Fraud Scores</h2>
          
          <div className="space-y-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-400 font-semibold">Claim ID</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-semibold">Worker</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-semibold">Type</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-semibold">Amount</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-semibold">Fraud Score</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockClaims.map(claim => (
                  <tr key={claim.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
                    <td className="py-3 px-4 text-white font-mono text-xs">{claim.id}</td>
                    <td className="py-3 px-4 text-slate-200">{claim.workerName}</td>
                    <td className="py-3 px-4 text-slate-300">{claim.type}</td>
                    <td className="py-3 px-4 text-green-400 font-bold">₹{claim.amount}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                          <span className={`text-xs font-bold ${
                            claim.fraudScore > 70 ? 'text-red-400' :
                            claim.fraudScore > 40 ? 'text-yellow-400' :
                            'text-green-400'
                          }`}>
                            {claim.fraudScore}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        claim.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                        claim.status === 'Processing' ? 'bg-blue-500/20 text-blue-400' :
                        claim.status.includes('Fraud') ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {claim.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Zone Summary */}
        <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-6">Zone Performance Summary</h2>
          
          <div className="space-y-3">
            {mockZoneData.map((zone, idx) => {
              const avgLossPerPolicy = Math.round(zone.losses / zone.policies);
              return (
                <div key={idx} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-white">{zone.name}</h3>
                    <span className="text-xs bg-slate-600 text-slate-200 px-3 py-1 rounded-full">
                      {zone.disruptions} disruptions
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-slate-400 mb-1">Active Policies</p>
                      <p className="text-2xl font-bold text-white">{zone.policies}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 mb-1">Total Losses</p>
                      <p className="text-2xl font-bold text-red-400">₹{zone.losses.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 mb-1">Avg Loss/Policy</p>
                      <p className="text-2xl font-bold text-orange-400">₹{avgLossPerPolicy}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
