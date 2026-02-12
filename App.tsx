import React, { useState, useEffect } from 'react';
import { ViewState, User, ScheduledNotification } from './types';

// لاحظ الحرف الكبير في بداية أسماء المجلدات والملفات (حسب الصورة الأولى)
import { Navbar } from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Reports from './pages/Reports';
import UsersPage from './pages/Users';
import Settings from './pages/Settings';
import AIAssistant from './pages/AIAssistant';
import FollowUp from './pages/FollowUp';
import Store from './pages/Store';
import Activities from './pages/Activities';
import Login from './pages/Login';

import { 
  seedData, 
  getCurrentUser, 
  getScheduledNotifications, 
  saveScheduledNotification, 
  saveAnnouncement 
} from './utils/storage';

import { Bell, X } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [user, setUser] = useState<User | null>(null);
  const [activeNotification, setActiveNotification] = useState<ScheduledNotification | null>(null);

  useEffect(() => {
    seedData();
    const storedUser = getCurrentUser();
    setUser(storedUser);
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentView(ViewState.DASHBOARD);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView(ViewState.LOGIN);
  };

  const renderContent = () => {
    if (!user) return <Login onLogin={handleLogin} />;
    switch (currentView) {
      case ViewState.DASHBOARD: return <Dashboard />;
      case ViewState.MEMBERS: return <Members />;
      case ViewState.STORE: return <Store />;
      case ViewState.FOLLOW_UP: return <FollowUp />;
      case ViewState.ACTIVITIES: return <Activities />;
      case ViewState.REPORTS: return <Reports />;
      case ViewState.AI_ASSISTANT: return <AIAssistant />;
      case ViewState.USERS: return user.role === 'ADMIN' ? <UsersPage /> : <Dashboard />;
      case ViewState.SETTINGS: return user.role === 'ADMIN' ? <Settings /> : <Dashboard />;
      default: return <Dashboard />;
    }
  };

  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <div className="min-h-[100dvh] bg-slate-50 text-slate-900 font-cairo flex flex-col">
      <main className="flex-1 w-full max-w-lg mx-auto md:max-w-4xl relative">
        {renderContent()}
      </main>
      <Navbar currentView={currentView} setView={setCurrentView} onLogout={handleLogout} />
    </div>
  );
};

export default App;
