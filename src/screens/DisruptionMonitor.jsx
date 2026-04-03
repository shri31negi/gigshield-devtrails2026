import React, { useState } from 'react';
import { AlertTriangle, Cloud, Wind, AlertCircle, MapPin, Clock } from 'lucide-react';
import { mockDisruptions } from '../mockData';

export default function DisruptionMonitor({ worker }) {
  const [selectedDisruption, setSelectedDisruption] = useState(null);

  const getSeverityStyles = (severity) => {
    switch(severity) {
      case 'Critical': return { bg: 'bg-red-100', border: 'border-red-300', text: 'text-red-700', badge: 'bg-red-500' };
      case 'High': return { bg: 'bg-orange-100', border: 'border-orange-300', text: 'text-orange-700', badge: 'bg-orange-500' };
      case 'Medium': return { bg: 'bg-yellow-100', border: 'border-yellow-300', text: 'text-yellow-700', badge: 'bg-yellow-500' };
      default: return { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-700', badge: 'bg-blue-500' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">

        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Live Disruption Monitor</h1>
          <p className="text-slate-600">Real-time alerts affecting delivery zones in {worker.city}</p>
        </div>

        {/* Trigger Thresholds Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Heavy Rain', threshold: '> 50mm/hr', icon: '🌧️', status: 'Active' },
            { label: 'AQI Level', threshold: '> 300', icon: '💨', status: 'Active' },
            { label: 'Curfew Alert', threshold: 'Detected', icon: '🚨', status: 'Inactive' }
          ].map((trigger, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 border-2 border-slate-200">
              <div className="flex items-start justify-between mb-2">
                <span className="text-2xl">{trigger.icon}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  trigger.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
                }`}>{trigger.status}</span>
              </div>
              <p className="font-semibold text-slate-900">{trigger.label}</p>
              <p className="text-xs text-slate-600 mt-1">Threshold: {trigger.threshold}</p>
            </div>
          ))}
        </div>

        {/* Map View Placeholder */}
        <div className="bg-gradient-to-br from-slate-100 to-blue-100 rounded-2xl p-8 border-2 border-slate-300 h-96 flex items-center justify-center">
          <div className="text-center">
            <MapPin size={48} className="mx-auto text-slate-500 mb-4" />
            <p className="text-slate-600 font-semibold">City Map View (Interactive)</p>
            <p className="text-sm text-slate-500 mt-2">Shows disruption zones with color-coded overlays</p>
            <div className="mt-6 flex justify-center gap-4">
              {[
                { color: 'bg-green-500', label: 'Low' },
                { color: 'bg-yellow-500', label: 'Medium' },
                { color: 'bg-orange-500', label: 'High' },
                { color: 'bg-red-500', label: 'Critical' }
              ].map((level, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${level.color}`}></div>
                  <span className="text-xs text-slate-600">{level.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Disruptions List */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Active & Recent Disruptions</h2>
          
          <div className="space-y-4">
            {mockDisruptions.map((disruption) => {
              const styles = getSeverityStyles(disruption.severity);
              const isActive = disruption.isActive;
              
              return (
                <div
                  key={disruption.id}
                  onClick={() => setSelectedDisruption(selectedDisruption?.id === disruption.id ? null : disruption)}
                  className={`rounded-xl border-2 p-6 cursor-pointer transition transform hover:scale-102 ${
                    isActive
                      ? `${styles.bg} ${styles.border} shadow-lg`
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`${styles.badge} text-white p-3 rounded-lg flex-shrink-0`}>
                        {disruption.type === 'Heavy Rain' ? <Cloud size={24} /> :
                         disruption.type === 'AQI Alert' ? <Wind size={24} /> :
                         disruption.type === 'Curfew Alert' ? <AlertTriangle size={24} /> :
                         <AlertCircle size={24} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`text-lg font-bold ${styles.text}`}>{disruption.type}</h3>
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                            isActive ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-300 text-slate-700'
                          }`}>
                            {isActive ? '🔴 ACTIVE' : 'Resolved'}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{disruption.zone}, {disruption.city}</p>
                        <p className="text-xs text-slate-500">{disruption.trigger}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className={`text-sm font-bold ${styles.text}`}>{disruption.severity}</div>
                      <div className="text-xs text-slate-600 mt-1">{disruption.affectedWorkers} workers</div>
                    </div>
                  </div>

                  {selectedDisruption?.id === disruption.id && (
                    <div className="mt-4 pt-4 border-t border-current opacity-60 space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-semibold text-slate-600">Start Time</p>
                          <p className="text-sm font-bold">{new Date(disruption.startTime).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-600">End Time</p>
                          <p className="text-sm font-bold">{new Date(disruption.endTime).toLocaleString()}</p>
                        </div>
                      </div>
                      {isActive && (
                        <div className="bg-white/50 rounded-lg p-3 border border-current opacity-50">
                          <p className="text-sm font-semibold">⚡ Auto-Claim Triggered</p>
                          <p className="text-xs mt-1">Coverage verification in progress...</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Real-time Trigger Indicators */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Real-Time Trigger Thresholds</h2>
          
          <div className="space-y-6">
            {[
              { name: 'Rain Intensity', current: 45, threshold: 50, unit: 'mm/hr', status: 'Safe', color: 'from-blue-400 to-blue-600' },
              { name: 'Air Quality Index (AQI)', current: 285, threshold: 300, unit: 'µg/m³', status: 'Warning', color: 'from-yellow-400 to-yellow-600' },
              { name: 'Temperature', current: 38, threshold: 45, unit: '°C', status: 'Safe', color: 'from-orange-400 to-orange-600' }
            ].map((metric, idx) => {
              const percentage = Math.min((metric.current / metric.threshold) * 100, 100);
              const isRisky = metric.current >= metric.threshold;
              
              return (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-slate-900">{metric.name}</span>
                    <div className="flex items-center gap-4">
                      <span className={`text-2xl font-bold ${isRisky ? 'text-red-600' : 'text-slate-900'}`}>
                        {metric.current} <span className="text-sm text-slate-600">{metric.unit}</span>
                      </span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        isRisky ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {isRisky ? '⚠️ THRESHOLD EXCEEDED' : '✓ ' + metric.status}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${metric.color} transition-all duration-300`}
                      style={{width: `${percentage}%`}}
                    ></div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Trigger threshold: {metric.threshold}{metric.unit}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Your Zone Status */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-300 p-6 md:p-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-green-700 mb-2">✓ Your Zone is Safe</h2>
              <p className="text-green-700 mb-4">No active disruptions in {worker.zone} at this moment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
