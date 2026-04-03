import React, { useState } from 'react';
import { AlertTriangle, MapPin, Clock, CheckCircle2, XCircle, Eye } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { mockClaims } from '../mockData';

const fraudulentClaims = mockClaims.filter(c => c.fraudScore > 70);

// GPS anomaly data for visualization
const gpsAnomalyData = [
  { claimedLat: 12.9352, claimedLon: 77.6245, actualLat: 12.9400, actualLon: 77.6300, distance: 0.8, fraud: true },
  { claimedLat: 12.9716, claimedLon: 77.5946, actualLat: 12.9715, actualLon: 77.5947, distance: 0.01, fraud: false },
  { claimedLat: 13.0827, claimedLon: 80.2707, actualLat: 12.0, actualLon: 79.0, distance: 142, fraud: true },
  { claimedLat: 12.9352, claimedLon: 77.6245, actualLat: 12.9353, actualLon: 77.6246, distance: 0.02, fraud: false },
];

export default function FraudDetection() {
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [filterLevel, setFilterLevel] = useState('high');

  const filteredClaims = mockClaims.filter(c => {
    if (filterLevel === 'high') return c.fraudScore > 70;
    if (filterLevel === 'medium') return c.fraudScore > 40 && c.fraudScore <= 70;
    return c.fraudScore <= 40;
  });

  const getFraudReasons = (claim) => {
    const reasons = [];
    if (claim.duplicateAlert) reasons.push(`Duplicate: ${claim.duplicateAlert}`);
    if (claim.gpsAnomaly) reasons.push('GPS location anomaly detected');
    if (claim.fraudScore > 70) reasons.push('High fraud probability');
    return reasons;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Fraud Detection & Prevention</h1>
          <p className="text-slate-400">AI-powered suspicious claim detection & manual review</p>
        </div>

        {/* Fraud Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Total Flagged', value: fraudulentClaims.length, color: 'from-red-500 to-red-600' },
            { label: 'Under Review', value: fraudulentClaims.filter(c => c.status.includes('Fraud')).length, color: 'from-orange-500 to-orange-600' },
            { label: 'Approved Despite Flags', value: '0', color: 'from-green-500 to-green-600' }
          ].map((stat, idx) => (
            <div key={idx} className={`bg-gradient-to-br ${stat.color} text-white rounded-xl p-6 shadow-lg`}>
              <p className="text-sm opacity-80 mb-2">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filter & Controls */}
        <div className="flex gap-3 flex-wrap">
          {[
            { id: 'high', label: '🔴 High Risk' },
            { id: 'medium', label: '🟡 Medium Risk' },
            { id: 'low', label: '🟢 Low Risk' }
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setFilterLevel(filter.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filterLevel === filter.id
                  ? 'bg-white text-slate-900'
                  : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Suspicious Claims List */}
        <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-6">Flagged Claims</h2>

          <div className="space-y-3">
            {filteredClaims.map(claim => {
              const reasons = getFraudReasons(claim);
              const isSelected = selectedClaim?.id === claim.id;
              
              return (
                <div
                  key={claim.id}
                  onClick={() => setSelectedClaim(isSelected ? null : claim)}
                  className={`rounded-lg border-2 p-4 cursor-pointer transition transform hover:scale-102 ${
                    claim.fraudScore > 70
                      ? 'bg-red-900/30 border-red-500/50'
                      : claim.fraudScore > 40
                      ? 'bg-yellow-900/30 border-yellow-500/50'
                      : 'bg-green-900/30 border-green-500/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle className={`flex-shrink-0 ${
                          claim.fraudScore > 70 ? 'text-red-400' :
                          claim.fraudScore > 40 ? 'text-yellow-400' :
                          'text-green-400'
                        }`} size={20} />
                        <h3 className="text-lg font-bold text-white">{claim.id}</h3>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                          claim.fraudScore > 70 ? 'bg-red-500/40 text-red-300' :
                          claim.fraudScore > 40 ? 'bg-yellow-500/40 text-yellow-300' :
                          'bg-green-500/40 text-green-300'
                        }`}>
                          {claim.fraudScore} score
                        </span>
                      </div>
                      <p className="text-slate-300 mb-2">{claim.workerName} • {claim.type}</p>
                      
                      {reasons.length > 0 && (
                        <div className="space-y-1">
                          {reasons.map((reason, idx) => (
                            <p key={idx} className="text-xs text-slate-400">⚠️ {reason}</p>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="text-2xl font-bold text-slate-200">₹{claim.amount}</p>
                      <p className="text-xs text-slate-400 mt-1">{new Date(claim.date).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Expanded View */}
                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-slate-700 space-y-4">
                      {/* Claim Details */}
                      <div className="bg-slate-700/50 rounded-lg p-4">
                        <h4 className="font-bold text-white mb-3">Claim Details</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-slate-400">Location</p>
                            <p className="text-white font-semibold mt-1">{claim.location}</p>
                          </div>
                          <div>
                            <p className="text-slate-400">Hours Lost</p>
                            <p className="text-white font-semibold mt-1">{claim.hoursLost}h</p>
                          </div>
                          <div>
                            <p className="text-slate-400">Hourly Rate</p>
                            <p className="text-white font-semibold mt-1">₹{claim.hourlyRate}</p>
                          </div>
                          <div>
                            <p className="text-slate-400">Filed On</p>
                            <p className="text-white font-semibold mt-1">{new Date(claim.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>

                      {/* Fraud Analysis */}
                      <div className="bg-slate-700/50 rounded-lg p-4">
                        <h4 className="font-bold text-white mb-3">🔍 Fraud Analysis</h4>
                        <div className="space-y-3">
                          {claim.gpsAnomaly && (
                            <div className="flex gap-3">
                              <MapPin className="text-red-400 flex-shrink-0" size={18} />
                              <div>
                                <p className="text-white font-semibold text-sm">GPS Location Anomaly</p>
                                <p className="text-xs text-slate-300 mt-1">Claimed location differs from actual delivery zone by ~500m</p>
                              </div>
                            </div>
                          )}
                          
                          {claim.duplicateAlert && (
                            <div className="flex gap-3">
                              <Clock className="text-orange-400 flex-shrink-0" size={18} />
                              <div>
                                <p className="text-white font-semibold text-sm">Duplicate Claim Pattern</p>
                                <p className="text-xs text-slate-300 mt-1">{claim.duplicateAlert}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Fraud Score Breakdown */}
                      <div className="bg-slate-700/50 rounded-lg p-4">
                        <h4 className="font-bold text-white mb-3">Risk Score: {claim.fraudScore}/100</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-300">GPS Anomaly</span>
                            <span className={`font-bold ${claim.gpsAnomaly ? 'text-red-400' : 'text-green-400'}`}>
                              {claim.gpsAnomaly ? '+45' : '+5'}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-300">Duplicate Pattern</span>
                            <span className={`font-bold ${claim.duplicateAlert ? 'text-red-400' : 'text-green-400'}`}>
                              {claim.duplicateAlert ? '+25' : '+5'}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-300">Behavioral Anomaly</span>
                            <span className="font-bold text-yellow-400">+10</span>
                          </div>
                          <div className="flex justify-between items-center text-sm border-t border-slate-600 pt-2 mt-2">
                            <span className="text-white font-bold">Total Risk Score</span>
                            <span className={`text-lg font-bold ${
                              claim.fraudScore > 70 ? 'text-red-400' :
                              claim.fraudScore > 40 ? 'text-yellow-400' :
                              'text-green-400'
                            }`}>
                              {claim.fraudScore}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-2">
                        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition">
                          <CheckCircle2 size={18} />
                          Approve Claim
                        </button>
                        <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition">
                          <XCircle size={18} />
                          Reject Claim
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* GPS Validation Map */}
        <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-6">GPS Location Validation</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
              <h3 className="text-lg font-semibold text-white mb-4">Distance Anomalies</h3>
              <ResponsiveContainer width="100%" height={250}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#404854" />
                  <XAxis dataKey="distance" type="number" stroke="#94a3b8" label={{value: 'Distance (km)', position: 'insideBottomRight', offset: -5, fill: '#94a3b8'}} />
                  <YAxis dataKey="fraud" type="number" stroke="#94a3b8" label={{value: 'Fraud Risk', angle: -90, position: 'insideLeft', fill: '#94a3b8'}} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #404854', borderRadius: '8px', color: '#fff' }}
                    cursor={{ strokeDasharray: '3 3' }}
                  />
                  <Scatter name="Flagged" data={gpsAnomalyData.filter(d => d.fraud)} fill="#EF4444" />
                  <Scatter name="Normal" data={gpsAnomalyData.filter(d => !d.fraud)} fill="#22C55E" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-700/50 rounded-lg p=4 border border-slate-600">
              <h3 className="text-lg font-semibold text-white mb-4">Detection Rules</h3>
              <div className="space-y-3 text-sm">
                {[
                  { rule: 'GPS Drift > 1km', severity: 'High', color: 'text-red-400' },
                  { rule: 'Duplicate claim within 7 days', severity: 'High', color: 'text-red-400' },
                  { rule: 'Same claim from multiple workers', severity: 'Critical', color: 'text-red-500' },
                  { rule: 'Claim outside working hours', severity: 'Medium', color: 'text-yellow-400' },
                  { rule: 'Multiple claims same hour', severity: 'Medium', color: 'text-yellow-400' }
                ].map((detection, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-slate-600/50 rounded">
                    <span className="text-slate-300">{detection.rule}</span>
                    <span className={`font-bold text-xs px-3 py-1 rounded ${detection.color}`}>{detection.severity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Manual Review Queue */}
        <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-6">Manual Review Queue</h2>
          
          <div className="bg-slate-700/50 rounded-lg p-6 border border-slate-600 text-center">
            <Eye className="mx-auto text-slate-400 mb-3" size={32} />
            <p className="text-slate-300 font-semibold">Claims awaiting manual review: <span className="text-orange-400">{fraudulentClaims.length}</span></p>
            <p className="text-slate-500 text-sm mt-2">Average review time: 2-4 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}
