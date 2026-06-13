import { useLocation, useNavigate } from 'react-router';
import { Home, Map, BookOpen, Feather, User } from 'lucide-react';
import { motion } from 'framer-motion';

const tabs = [
  { label: '首页', icon: Home, path: '/' },
  { label: '展厅', icon: Map, path: '/halls' },
  { label: '百科', icon: BookOpen, path: '/encyclopedia' },
  { label: '故事', icon: Feather, path: '/stories' },
  { label: '我的', icon: User, path: '/profile' },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#F5F2ED] border-t border-[#E8E4DE] shadow-top-glow">
      <div className="max-w-[430px] mx-auto flex items-center justify-around h-16 pb-[env(safe-area-inset-bottom)]">
        {tabs.map((tab) => {
          const isActive =
            tab.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(tab.path);
          return (
            <motion.button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center justify-center gap-1 w-16 h-14"
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <tab.icon
                size={24}
                strokeWidth={isActive ? 2.5 : 1.5}
                className={isActive ? 'text-[#3A6B5F]' : 'text-[#2A3D3566]'}
              />
              <span
                className={`text-[10px] leading-none ${
                  isActive ? 'text-[#3A6B5F] font-medium' : 'text-[#2A3D3566]'
                }`}
              >
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
