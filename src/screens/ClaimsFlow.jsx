import React, { useState } from 'react';
import { CheckCircle2, Clock, AlertTriangle, Download, Eye } from 'lucide-react';
import { mockClaims } from '../mockData';

const verificationSteps = [
  { label: 'Weather Verified', icon: '🌦️' },
  { label: 'Location Validated', icon: '📍' },
  { label: 'Fraud Check', icon: '🔍' },
  { label: 'Payout Initiated', icon: '💰' }
];

export default function ClaimsFlow({ worker }) {
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const getStatusStyles = (status) => {
    switch(status) {
      case 'Completed':
        return { bg: 'bg-green-100', border: 'border-green-300', badge: 'bg-green-500/20 text-green-700' };
      case 'Processing':
        return { bg: 'bg-blue-100', border: 'border-blue-300', badge: 'bg-blue-500/20 text-blue-700' };
      case 'Pending Verification':
        return { bg: 'bg-yellow-100', border: 'border-yellow-300', badge: 'bg-yellow-500/20 text-yellow-700' };
      case 'Flagged - Fraud Review':
        return { bg: 'bg-red-100', border: 'border-red-300', badge: 'bg-red-500/20 text-red-700' };
      default:
        return { bg: 'bg-slate-100', border: 'border-slate-300', badge: 'bg-slate-500/20 text-slate-700' };
    }
  };

  const getStatusIcon = (status) => {
    if (status === 'Completed') return <CheckCircle2 className="text-green-600" size={24} />;
    if (status === 'Processing') return <Clock className="text-blue-600" size={24} />;
    if (status.includes('Flagged')) return <AlertTriangle className="text-red-600" size={24} />;
    return <Clock className="text-yellow-600" size={24} />;
  };

  const workerClaims = mockClaims;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">

        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Claims & Payouts</h1>
          <p className="text-slate-600">Zero-touch claims verified by AI in real-time</p>
        </div>

        {/* Claims Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Total Claims', value: '5', color: 'from-blue-500 to-blue-600' },
            { label: 'Completed', value: '2', color: 'from-green-500 to-green-600' },
            { label: 'Total Payouts', value: '₹1,950', color: 'from-purple-500 to-purple-600' }
          ].map((stat, idx) => (
            <div key={idx} className={`bg-gradient-to-br ${stat.color} text-white rounded-xl p-6 shadow-lg`}>
              <p className="text-sm opacity-90 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Active Claim Alert */}
        {workerClaims.some(c => c.status === 'Processing') && (
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-6 md:p-8 shadow-lg">
            <div className="flex gap-4">
              <Clock size={28} className="flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2">Claim Processing in Progress</h3>
                <p className="text-sm opacity-90 mb-3">Your AQI disruption claim is being verified. Expected completion: 2-4 hours</p>
                <div className="bg-white/20 rounded-full h-2 w-full">
                  <div className="bg-white h-full rounded-full" style={{width: '65%'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Claims List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Your Claims</h2>
          
          {workerClaims.map((claim) => {
            const styles = getStatusStyles(claim.status);
            const isSelected = selectedClaim?.id === claim.id;
            
            return (
              <div key={claim.id} className={`rounded-xl border-2 transition transform ${styles.bg} ${styles.border}`}>
                <button
                  onClick={() => setSelectedClaim(isSelected ? null : claim)}
                  className="w-full text-left p-6 flex items-start justify-between hover:bg-black/5 transition"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(claim.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-slate-900">{claim.type}</h3>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${styles.badge}`}>
                          {claim.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{claim.location}</p>
                      <p className="text-xs text-slate-500">{claim.trigger} • {new Date(claim.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-2xl font-bold text-slate-900">₹{claim.amount}</p>
                    <p className="text-xs text-slate-600 mt-1">{claim.hoursLost}h lost</p>
                  </div>
                </button>

                {isSelected && (
                  <div className="border-t p-6 bg-white/50">
                    {/* Verification Steps */}
                    {claim.status === 'Processing' && (
                      <div className="mb-6">
                        <h4 className="font-bold text-slate-900 mb-4">AI Verification Progress</h4>
                        <div className="space-y-3">
                          {verificationSteps.map((step, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-white text-sm ${
                                idx < 2 ? 'bg-green-500' : idx === 2 ? 'bg-blue-500' : 'bg-slate-300'
                              }`}>
                                {idx < 2 ? '✓' : (idx === 2 ? '⏳' : '')}
                              </div>
                              <span className="font-semibold text-slate-900">{step.label}</span>
                              {idx < 2 && <span className="text-xs text-green-600 ml-auto">Verified</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {claim.status === 'Completed' && (
                      <div className="mb-6 bg-green-50 border border-green-300 rounded-lg p-4">
                        <div className="flex items-start gap-3 mb-3">
                          <CheckCircle2 className="text-green-600 flex-shrink-0" size={20} />
                          <div>
                            <p className="font-bold text-green-700">Claim Verified & Approved</p>
                            <p className="text-sm text-green-600">Payout completed on {claim.payoutDate}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {claim.status === 'Flagged - Fraud Review' && (
                      <div className="mb-6 bg-red-50 border border-red-300 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="text-red-600 flex-shrink-0" size={20} />
                          <div>
                            <p className="font-bold text-red-700">Under Fraud Review</p>
                            <p className="text-sm text-red-600 mt-1">Reason: {claim.duplicateAlert}</p>
                            <p className="text-sm text-red-600">Fraud Score: {claim.fraudScore}/100</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Payout Breakdown */}
                    <div className="mb-6 bg-white rounded-lg p-4 border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-3">Payout Breakdown</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-700">Hours Lost</span>
                          <span className="font-semibold">{claim.hoursLost}h</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-700">Avg Hourly Rate</span>
                          <span className="font-semibold">₹{claim.hourlyRate}</span>
                        </div>
                        <div className="flex justify-between py-2 border-t border-slate-200 pt-2">
                          <span className="font-bold text-slate-900">Total Coverage Payout</span>
                          <span className="text-xl font-bold text-green-600">₹{claim.amount}</span>
                        </div>
                      </div>
                    </div>

                    {/* Fraud Score (if flagged) */}
                    {claim.fraudScore > 30 && (
                      <div className="mb-6 bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <h4 className="font-bold text-slate-900 mb-3">Fraud Detection Score</h4>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="w-full bg-slate-300 rounded-full h-3 overflow-hidden">
                              <div
                                className={`h-full ${claim.fraudScore > 70 ? 'bg-red-500' : claim.fraudScore > 40 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                style={{width: `${claim.fraudScore}%`}}
                              ></div>
                            </div>
                          </div>
                          <span className={`text-lg font-bold ${
                            claim.fraudScore > 70 ? 'text-red-600' : claim.fraudScore > 40 ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {claim.fraudScore}%
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {claim.status === 'Completed' && (
                        <>
                          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition">
                            <Download size={18} />
                            Download Receipt
                          </button>
                          <button className="flex-1 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-lg font-semibold transition">
                            View Details
                          </button>
                        </>
                      )}
                      {claim.status === 'Processing' && (
                        <button className="flex-1 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-lg font-semibold transition">
                          <Clock size={18} className="inline mr-2" />
                          Processing...
                        </button>
                      )}
                      {claim.status === 'Flagged - Fraud Review' && (
                        <button className="flex-1 bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 py-3 rounded-lg font-semibold transition">
                          <Eye size={18} className="inline mr-2" />
                          Under Review
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Payout Methods */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Payout Method</h2>
          <p className="text-slate-600 mb-4">All approved payouts are sent to your registered UPI</p>
          
          <div className="flex items-center justify-between p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
            <div>
              <p className="font-semibold text-slate-900">UPI Payment</p>
              <p className="text-sm text-slate-600">9876543210@paytm</p>
            </div>
            <CheckCircle2 className="text-green-600" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}
