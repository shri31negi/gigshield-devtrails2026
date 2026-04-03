import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Zap, ChevronRight } from 'lucide-react';

export default function WorkerOnboarding({ onNavigate, onSuccess }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    zone: '',
    platform: '',
    weeklyEarnings: '',
    workingHours: '',
    bikeType: ''
  });
  const [otpVerified, setOtpVerified] = useState(false);
  const [riskScore, setRiskScore] = useState(null);

  const handleNext = () => {
    if (step === 1) {
      // Simulate OTP verification
      setOtpVerified(true);
      setStep(2);
    } else if (step === 2) {
      // Calculate risk score
      const calculateRisk = () => {
        let score = 50;
        if (formData.workingHours.includes('11PM') || formData.workingHours.includes('9PM')) score += 15;
        if (formData.bikeType === 'Petrol Bike') score += 10;
        if (parseInt(formData.weeklyEarnings) > 4000) score += 5;
        return Math.min(score, 95);
      };
      setRiskScore(calculateRisk());
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const getRiskLevel = (score) => {
    if (score < 45) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-50' };
    if (score < 65) return { level: 'Medium', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { level: 'High', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const getRiskLevelColors = (score) => {
    if (score < 45) return 'from-green-400 to-green-600';
    if (score < 65) return 'from-orange-400 to-orange-600';
    return 'from-red-400 to-red-600';
  };

  const handlePayment = () => {
    alert('Payment initiated via UPI!\nMock transaction: ₹49 debited successfully');
    // Auto-redirect to dashboard after registration
    if (onSuccess) {
      setTimeout(() => onSuccess(), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">

        {/* Step Indicator */}
        <div className="mb-12">
          <div className="flex justify-between items-center">
            {['Basic Info', 'Risk Profile', 'Premium Quote', 'Activate'].map((label, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white transition ${
                  step > idx + 1 ? 'bg-green-500' :
                  step === idx + 1 ? 'bg-orange-500 scale-110' :
                  'bg-slate-300'
                }`}>
                  {step > idx + 1 ? <CheckCircle2 size={24} /> : idx + 1}
                </div>
                <p className="text-xs md:text-sm mt-2 text-center font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Welcome to GigShield 👋</h2>
            <p className="text-slate-600 mb-6">Let's get you protected in just 4 steps</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {formData.phone && !otpVerified && (
                  <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition">
                    Send OTP
                  </button>
                )}
                {otpVerified && (
                  <div className="flex items-center gap-2 mt-3 text-green-600">
                    <CheckCircle2 size={20} />
                    <span className="font-semibold">Phone verified ✓</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select City</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Zone</label>
                  <input
                    type="text"
                    placeholder="e.g., Indiranagar"
                    value={formData.zone}
                    onChange={(e) => setFormData({...formData, zone: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Platform</label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({...formData, platform: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select Platform</option>
                    <option value="Zomato">Zomato</option>
                    <option value="Swiggy">Swiggy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Weekly Earnings (₹)</label>
                  <input
                    type="number"
                    placeholder="3000"
                    value={formData.weeklyEarnings}
                    onChange={(e) => setFormData({...formData, weeklyEarnings: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={!otpVerified || !formData.city}
              className="w-full mt-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg disabled:opacity-50 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition"
            >
              Continue <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* Step 2: Risk Profile */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Tell us about your work</h2>
            <p className="text-slate-600 mb-6">This helps us calculate your personalized risk profile</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Working Hours</label>
                <div className="grid grid-cols-2 gap-3">
                  {['9AM-11PM', '10AM-10PM', '11AM-9PM', '6AM-6PM'].map(hours => (
                    <button
                      key={hours}
                      onClick={() => setFormData({...formData, workingHours: hours})}
                      className={`px-4 py-3 rounded-lg font-semibold border-2 transition ${
                        formData.workingHours === hours
                          ? 'bg-orange-50 border-orange-500 text-orange-600'
                          : 'border-slate-200 hover:border-orange-300'
                      }`}
                    >
                      {hours}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Bike Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Electric Scooter', 'Petrol Bike', 'Electric Bike', 'Bicycle'].map(type => (
                    <button
                      key={type}
                      onClick={() => setFormData({...formData, bikeType: type})}
                      className={`px-4 py-3 rounded-lg font-semibold border-2 transition ${
                        formData.bikeType === type
                          ? 'bg-orange-50 border-orange-500 text-orange-600'
                          : 'border-slate-200 hover:border-orange-300'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
                <p className="text-sm text-blue-800">Your risk profile helps us offer the right coverage at the best premium for you.</p>
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={!formData.workingHours || !formData.bikeType}
              className="w-full mt-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg disabled:opacity-50 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition"
            >
              Calculate Risk Score <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* Step 3: Risk Score & Premium Quote */}
        {step === 3 && riskScore !== null && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 animate-fadeIn space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Risk Profile</h2>
              <p className="text-slate-600">AI-powered analysis based on your work patterns</p>
            </div>

            {/* Risk Score Meter */}
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48">
                <svg className="transform -rotate-90 w-48 h-48" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="90" fill="none" stroke="#e2e8f0" strokeWidth="20" />
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke={riskScore < 45 ? '#22c55e' : riskScore < 65 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="20"
                    strokeDasharray={`${(riskScore / 100) * 565} 565`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className={`text-5xl font-bold ${getRiskLevel(riskScore).color}`}>{riskScore}</div>
                  <div className={`text-lg font-semibold ${getRiskLevel(riskScore).color}`}>{getRiskLevel(riskScore).level}</div>
                </div>
              </div>
            </div>

            {/* Premium Quote Card */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-semibold mb-4">Your Weekly Premium Quote</h3>
              
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-sm opacity-75 mb-1">Coverage Amount</p>
                  <p className="text-3xl font-bold">₹3,000</p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-75 mb-1">Weekly Premium</p>
                  <p className="text-4xl font-bold">₹49</p>
                </div>
              </div>

              <div className="space-y-3 text-sm opacity-90">
                <p>✓ Auto-triggered payouts for extreme weather</p>
                <p>✓ AQI alerts & curfew coverage included</p>
                <p>✓ Zero manual claims — instant verification</p>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition"
            >
              Activate Policy <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* Step 4: Activate & Payment */}
        {step === 4 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 animate-fadeIn space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">You're Almost There! 🎉</h2>
              <p className="text-slate-600">One tap to get covered</p>
            </div>

            {/* Policy Summary */}
            <div className="bg-slate-50 rounded-lg p-6 space-y-4">
              <div className="flex justify-between py-3 border-b border-slate-200">
                <span className="font-semibold text-slate-700">Coverage Amount</span>
                <span className="text-2xl font-bold text-blue-600">₹3,000</span>
              </div>
              <div className="flex justify-between py-3 border-b border-slate-200">
                <span className="font-semibold text-slate-700">Weekly Premium</span>
                <span className="text-2xl font-bold text-orange-600">₹49</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="font-semibold text-slate-700">Valid Until</span>
                <span className="text-lg text-slate-600">Apr 8, 2024</span>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Payment Method</label>
              <button className="w-full p-4 border-2 border-orange-500 bg-orange-50 rounded-lg font-semibold text-orange-600">
                UPI Payment (Recommended)
              </button>
            </div>

            {/* T&C */}
            <div className="flex gap-3 bg-blue-50 p-4 rounded-lg">
              <input type="checkbox" className="mt-1" defaultChecked />
              <p className="text-sm text-slate-700">I agree to the Terms & Conditions and Privacy Policy</p>
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg text-white py-4 rounded-lg font-bold text-lg transition"
            >
              Activate & Pay ₹49
            </button>

            <p className="text-xs text-center text-slate-500">
              By activating, you'll be covered for extreme weather, floods, strikes & curfews
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
