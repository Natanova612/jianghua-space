import { useNavigate } from 'react-router';
import { Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FloatingAssistantButton() {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate('/assistant')}
      className="fixed right-4 z-40 w-14 h-14 rounded-full bg-[#3A6B5F] flex items-center justify-center shadow-float"
      style={{ bottom: 'calc(64px + env(safe-area-inset-bottom) + 16px)' }}
      whileTap={{ scale: 0.85 }}
      animate={{
        y: [0, -4, 0],
      }}
      transition={{
        y: {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        scale: {
          type: 'spring',
          stiffness: 400,
          damping: 15,
        },
      }}
    >
      <Zap size={24} className="text-white" />
    </motion.button>
  );
}
