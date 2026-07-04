import { motion } from 'framer-motion';

export default function SavingsCounter({ originalAmount, finalAmount }) {
  const saved = originalAmount - finalAmount;
  if (saved <= 0) return null;
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="bg-green-100 text-green-800 px-4 py-2 rounded-xl text-center font-bold"
    >
      You save ₹{saved.toFixed(0)} 🎉
    </motion.div>
  );
}