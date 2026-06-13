import { useEffect } from 'react';
import { useLocation } from 'react-router';
import Header from './Header';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  showSearch?: boolean;
  showAssistant?: boolean;
  showNav?: boolean;
  showHeader?: boolean;
}

export default function Layout({
  children,
  title,
  showBack = false,
  onBack,
  showSearch = true,
  showAssistant = true,
  showNav = true,
  showHeader = true,
}: LayoutProps) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-[100dvh] bg-mist-white">
      {showHeader && title && (
        <Header
          title={title}
          showBack={showBack}
          onBack={onBack}
          showSearch={showSearch}
          showAssistant={showAssistant}
        />
      )}
      <main className={showHeader ? 'pt-14' : ''}>
        {children}
      </main>
      {showNav && <div className="h-24" />}
      {showNav && <Navbar />}
    </div>
  );
}
