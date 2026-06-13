import { motion } from 'framer-motion';

interface ContentCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function ContentCard({
  children,
  onClick,
  className = '',
}: ContentCardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`bg-white rounded-2xl shadow-card p-4 ${
        onClick ? 'cursor-pointer active:shadow-card-hover' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
