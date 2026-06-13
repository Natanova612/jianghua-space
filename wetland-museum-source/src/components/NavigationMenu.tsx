import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Map, BookOpen, Leaf, Feather, Mic, Search, X, Menu } from 'lucide-react';

const navItems = [
  { label: '首页', path: '/', icon: Home },
  { label: '展厅导览', path: '/halls', icon: Map },
  { label: '知识卡片', path: '/cards', icon: BookOpen },
  { label: '动植物百科', path: '/encyclopedia', icon: Leaf },
  { label: '科普故事', path: '/stories', icon: Feather },
  { label: '讲解助手', path: '/assistant', icon: Mic },
  { label: '搜索', path: '/search', icon: Search },
];

export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div ref={menuRef} className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute bottom-[72px] right-0 w-[200px] bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <nav className="flex flex-col py-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    className={`flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      isActive
                        ? 'bg-[#4A7C6F]/10 text-[#4A7C6F]'
                        : 'text-[#2D3B36] hover:bg-[#4A7C6F]/5 hover:text-[#4A7C6F]'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
        className="w-[56px] h-[56px] rounded-full flex items-center justify-center shadow-lg transition-colors"
        style={{
          backgroundColor: '#4A7C6F',
          color: '#FFFFFF',
        }}
        aria-label={isOpen ? '关闭导航' : '打开导航'}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.div>
      </motion.button>
    </div>
  );
}
