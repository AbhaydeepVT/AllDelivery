import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-8"
    >
      <span className="text-8xl">🌌</span>
      <h1 className="text-6xl font-black mt-4">404</h1>
      <p className="text-xl text-gray-500 mt-2">This page drifted into space...</p>
      <Link
        to="/"
        className="mt-8 px-8 py-3 bg-food-primary text-white rounded-full font-bold shadow-lg hover:shadow-xl transition"
      >
        Take me home
      </Link>
    </motion.div>
  );
}