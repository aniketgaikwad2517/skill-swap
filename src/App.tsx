import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { DashboardView } from './components/dashboard/DashboardView';
import { DiscoveryView } from './components/discovery/DiscoveryView';
import { RequestsView } from './components/requests/RequestsView';
import { MessagingView } from './components/messaging/MessagingView';
import { CommunityView } from './components/community/CommunityView';
import { ProfileView } from './components/profile/ProfileView';
import { PricingView } from './components/pricing/PricingView';
import { AdminView } from './components/admin/AdminView';
import { AuthPage } from './components/auth/AuthPage';

// Modals
import { AuthModal } from './components/auth/AuthModal';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { ExchangeRequestModal } from './components/discovery/ExchangeRequestModal';
import { ScheduleSessionModal } from './components/sessions/ScheduleSessionModal';
import { Toast } from './components/common/Toast';

const MainContent: React.FC = () => {
  const { currentRoute, isAuthenticated, navigateTo } = useApp();

  // Render view corresponding to active route
  const renderView = () => {
    switch (currentRoute) {
      case 'landing':
        return <LandingPage />;

      case 'login':
        if (isAuthenticated) {
          return <DashboardView />;
        }
        return <AuthPage initialMode="login" />;

      case 'signup':
        if (isAuthenticated) {
          return <DashboardView />;
        }
        return <AuthPage initialMode="signup" />;

      case 'forgot-password':
        return <AuthPage initialMode="forgot" />;

      case 'dashboard':
        if (!isAuthenticated) {
          return <AuthPage initialMode="login" />;
        }
        return <DashboardView />;

      case 'discovery':
        return <DiscoveryView />;

      case 'requests':
        if (!isAuthenticated) {
          return <AuthPage initialMode="login" />;
        }
        return <RequestsView />;

      case 'messages':
        if (!isAuthenticated) {
          return <AuthPage initialMode="login" />;
        }
        return <MessagingView />;

      case 'community':
        return <CommunityView />;

      case 'profile':
        return <ProfileView />;

      case 'pricing':
        return <PricingView />;

      case 'admin':
        return <AdminView />;

      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090A10] text-slate-100 selection:bg-violet-600 selection:text-white relative">
      <Navbar />
      
      <main className="flex-1 w-full">
        {renderView()}
      </main>

      <Footer />

      {/* Global Modals & Overlays */}
      <AuthModal />
      <OnboardingWizard />
      <ExchangeRequestModal />
      <ScheduleSessionModal />
      <Toast />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
