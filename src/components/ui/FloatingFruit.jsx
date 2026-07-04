import { motion } from 'framer-motion';

const types = {
  apple: '🍎',
  broccoli: '🥦',
  banana: '🍌',
  carrot: '🥕',
};

export default function FloatingFruit({ type = 'apple' }) {
  return (
    <motion.div
      className="absolute text-6xl opacity-40 pointer-events-none"
      animate={{
        y: [0, -25, 0],
        rotate: [0, -10, 10, 0],
      }}
      transition={{ repeat: Infinity, duration: 7 }}
      style={{ top: '15%', right: '20%' }}
    >
      {types[type] || '🍎'}
    </motion.div>
  );
}