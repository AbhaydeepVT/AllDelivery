import { motion } from 'framer-motion';

export default function AnimatedButton({ children, onClick, className = '', variant = 'primary' }) {
  const variants = {
    primary: 'bg-gradient-to-r from-food-primary to-food-accent text-white shadow-lg shadow-food-primary/30',
    grocery: 'bg-gradient-to-r from-grocery-primary to-grocery-accent text-white shadow-lg shadow-grocery-primary/30',
    outline: 'border-2 border-food-primary text-food-primary bg-transparent',
    ghost: 'bg-white/20 backdrop-blur-md text-white border border-white/30',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-6 py-3 rounded-full font-bold text-sm tracking-wide transition-all ${variants[variant] || variants.primary} ${className}`}
    >
      {children}
    </motion.button>
  );
}