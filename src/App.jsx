import React, { useState, createContext, useContext } from 'react';
import { Menu, X, LogOut, Home, FileText, AlertCircle, TrendingDown, User, Shield } from 'lucide-react';
import Login from './screens/Login';
import WorkerOnboarding from './screens/WorkerOnboarding';
import WorkerDashboard from './screens/WorkerDashboard';
import DisruptionMonitor from './screens/DisruptionMonitor';
import ClaimsFlow from './screens/ClaimsFlow';
import PolicyManagement from './screens/PolicyManagement';
import AdminDashboard from './screens/AdminDashboard';
import FraudDetection from './screens/FraudDetection';
import { mockWorkers } from './mockData';

const RoleContext = createContext();

const useRole = () => useContext(RoleContext);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('login');
  const [currentRole, setCurrentRole] = useState('worker');
  const [workerId, setWorkerId] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogin = (phoneNumber, role) => {
    setIsLoggedIn(true);
    setCurrentRole(role);
    setCurrentScreen(role === 'admin' ? 'admin' : 'dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentRole('worker');
    setCurrentScreen('login');
  };

  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
  };

  const currentWorker = mockWorkers.find(w => w.id === workerId);

  // Pre-login screens
  if (!isLoggedIn) {
    if (currentScreen === 'register') {
      return <WorkerOnboarding onNavigate={handleNavigate} onSuccess={() => {
        setIsLoggedIn(true);
        setCurrentRole('worker');
        setCurrentScreen('dashboard');
      }} />;
    }
    return <Login 
      onNavigate={handleNavigate} 
      onLogin={handleLogin}
      currentRole={currentRole}
      onRoleChange={setCurrentRole}
    />;
  }

  // Determine current screen component
  let screenComponent;
  
  if (currentRole === 'admin') {
    if (currentScreen === 'fraud') {
      screenComponent = <FraudDetection />;
    } else {
      screenComponent = <AdminDashboard />;
    }
  } else {
    switch (currentScreen) {
      case 'policy':
        screenComponent = <PolicyManagement worker={currentWorker} />;
        break;
      case 'claims':
        screenComponent = <ClaimsFlow worker={currentWorker} />;
        break;
      case 'disruption':
        screenComponent = <DisruptionMonitor worker={currentWorker} />;
        break;
      case 'profile':
        screenComponent = (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
            <div className="max-w-2xl mx-auto bg-slate-800 rounded-2xl border border-slate-700 p-8">
              <h1 className="text-3xl font-bold text-white mb-6">Profile</h1>
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-400 text-sm font-medium mb-2">Name</label>
                  <p className="text-white">{currentWorker?.name || 'Worker'}</p>
                </div>
                <div>
                  <label className="block text-slate-400 text-sm font-medium mb-2">Phone</label>
                  <p className="text-white">{currentWorker?.phone || '9876543210'}</p>
                </div>
                <div>
                  <label className="block text-slate-400 text-sm font-medium mb-2">Location</label>
                  <p className="text-white">{currentWorker?.location || 'Koramangala'}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="mt-8 w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
              >
                Logout
              </button>
            </div>
          </div>
        );
        break;
      default:
        screenComponent = <WorkerDashboard worker={currentWorker} />;
    }
  }

  return (
    <RoleContext.Provider value={currentRole}>
      <div className="flex flex-col h-screen w-screen bg-slate-900 overflow-hidden">
        {/* Mobile Overlay when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Header */}
        <header className="flex-shrink-0 h-16 bg-slate-900 border-b border-slate-700 shadow-lg z-50">
          <div className="flex items-center justify-between h-full px-6">
            <div className="flex items-center gap-2 sm:gap-3 flex-1">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-slate-700 rounded-lg transition text-white flex-shrink-0"
                title={sidebarOpen ? 'Close menu' : 'Open menu'}
              >
                {sidebarOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-white font-bold text-lg sm:text-xl">GigShield</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              {currentRole === 'worker' && (
                <select
                  value={workerId}
                  onChange={(e) => setWorkerId(parseInt(e.target.value))}
                  className="px-2 sm:px-3 py-2 rounded-lg bg-slate-700 text-white text-xs sm:text-sm cursor-pointer border border-slate-600 hidden sm:block"
                >
                  {mockWorkers.map(w => (
                    <option key={w.id} value={w.id}>{w.name}</option>
                  ))}
                </select>
              )}
              
              <span className="text-slate-400 text-xs sm:text-sm hidden sm:inline">{currentRole === 'admin' ? 'Admin' : 'Worker'}</span>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition text-xs sm:text-sm"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="flex flex-1 overflow-hidden relative">
          {/* Sidebar Navigation - Worker */}
          {currentRole === 'worker' && (
            <>
              {/* Sidebar - toggles on all sizes */}
              <aside className={`fixed left-0 bottom-0 w-64 bg-slate-800 border-r border-slate-700 text-white transition-all duration-300 z-30 ${
                sidebarOpen ? 'translate-x-0 top-16' : '-translate-x-full top-16'
              }`}>
                <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-64px)] pb-20">
                  <NavButton
                    onClick={() => { handleNavigate('dashboard'); setSidebarOpen(false); }}
                    active={currentScreen === 'dashboard'}
                    icon={<Home size={20} />}
                    label="Dashboard"
                  />
                  <NavButton
                    onClick={() => { handleNavigate('policy'); setSidebarOpen(false); }}
                    active={currentScreen === 'policy'}
                    icon={<FileText size={20} />}
                    label="My Policy"
                  />
                  <NavButton
                    onClick={() => { handleNavigate('claims'); setSidebarOpen(false); }}
                    active={currentScreen === 'claims'}
                    icon={<AlertCircle size={20} />}
                    label="Claims"
                  />
                  <NavButton
                    onClick={() => { handleNavigate('disruption'); setSidebarOpen(false); }}
                    active={currentScreen === 'disruption'}
                    icon={<TrendingDown size={20} />}
                    label="Disruptions"
                  />
                  <NavButton
                    onClick={() => { handleNavigate('profile'); setSidebarOpen(false); }}
                    active={currentScreen === 'profile'}
                    icon={<User size={20} />}
                    label="Profile"
                  />
                </nav>
              </aside>
            </>
          )}

          {/* Admin Sidebar */}
          {currentRole === 'admin' && (
            <>
              {/* Sidebar - toggles on all sizes */}
              <aside className={`fixed left-0 bottom-0 w-64 bg-slate-800 border-r border-slate-700 text-white transition-all duration-300 z-30 ${
                sidebarOpen ? 'translate-x-0 top-16' : '-translate-x-full top-16'
              }`}>
                <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-64px)] pb-20">
                  <NavButton
                    onClick={() => { handleNavigate('admin'); setSidebarOpen(false); }}
                    active={currentScreen === 'admin'}
                    icon={<Home size={20} />}
                    label="Dashboard"
                  />
                  <NavButton
                    onClick={() => { handleNavigate('fraud'); setSidebarOpen(false); }}
                    active={currentScreen === 'fraud'}
                    icon={<AlertCircle size={20} />}
                    label="Fraud Detection"
                  />
                </nav>
              </aside>
            </>
          )}

          {/* Main Content */}
          <main className={`flex-1 overflow-auto w-full transition-all duration-300`}>
            {screenComponent}
          </main>
        </div>
      </div>
    </RoleContext.Provider>
  );
}

function NavButton({ onClick, active, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
        active
          ? 'bg-blue-500 text-white'
          : 'text-slate-400 hover:text-white hover:bg-slate-700'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
