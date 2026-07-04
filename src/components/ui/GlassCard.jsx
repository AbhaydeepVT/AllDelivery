import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hover = true, onClick }) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      onClick={onClick}
      className={`bg-glass-bg backdrop-blur-md rounded-3xl border border-glass-border shadow-xl p-6 transition-all ${className}`}
    >
      {children}
    </motion.div>
  );
}