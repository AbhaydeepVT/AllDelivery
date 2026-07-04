import { motion } from 'framer-motion';

const types = {
  pizza: '🍕',
  sushi: '🍣',
  burger: '🍔',
};

export default function FloatingDish({ type = 'pizza' }) {
  return (
    <motion.div
      className="absolute text-6xl opacity-40 pointer-events-none"
      animate={{
        y: [0, -20, 0],
        rotate: [0, 10, -10, 0],
      }}
      transition={{ repeat: Infinity, duration: 6 }}
      style={{ top: '20%', left: '15%' }}
    >
      {types[type] || '🍕'}
    </motion.div>
  );
}