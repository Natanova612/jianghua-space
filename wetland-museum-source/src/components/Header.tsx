import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, Search, Zap } from 'lucide-react';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  showSearch?: boolean;
  showAssistant?: boolean;
}

export default function Header({
  title,
  showBack = false,
  onBack,
  showSearch = true,
  showAssistant = true,
}: HeaderProps) {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > 60 && currentY > lastScrollY.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-[#F5F2ED] transition-transform duration-250 ease-out ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${window.scrollY > 60 ? 'shadow-sm' : ''}`}
    >
      <div className="max-w-[430px] mx-auto h-14 flex items-center px-5">
        {showBack ? (
          <button
            onClick={onBack || (() => navigate(-1))}
            className="w-10 h-10 flex items-center justify-center -ml-2"
          >
            <ChevronLeft size={24} className="text-deep-marsh" />
          </button>
        ) : null}
        <h1 className="text-lg font-bold text-deep-marsh flex-1 truncate">
          {title}
        </h1>
        <div className="flex items-center gap-1">
          {showSearch && (
            <button
              onClick={() => navigate('/search')}
              className="w-10 h-10 flex items-center justify-center"
            >
              <Search size={20} className="text-deep-marsh" />
            </button>
          )}
          {showAssistant && (
            <button
              onClick={() => navigate('/assistant')}
              className="w-10 h-10 flex items-center justify-center"
            >
              <Zap size={20} className="text-deep-marsh" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
