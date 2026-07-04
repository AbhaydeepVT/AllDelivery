import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FloatingDish from '../components/ui/FloatingDish';
import FloatingFruit from '../components/ui/FloatingFruit';

export default function LandingPage() {
  const [activeSide, setActiveSide] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-screen overflow-hidden flex">
      {/* Food Side */}
      <motion.div
        className="flex-1 relative cursor-pointer flex items-center justify-center"
        style={{
          background: activeSide === 'food'
            ? 'linear-gradient(135deg, #FF6B35, #FFD166)'
            : 'rgba(255,107,53,0.08)',
        }}
        onMouseEnter={() => setActiveSide('food')}
        onMouseLeave={() => setActiveSide(null)}
        onClick={() => navigate('/food')}
        animate={{ scale: activeSide === 'food' ? 1.05 : 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        {/* Floating food elements */}
        <FloatingDish type="pizza" />
        <FloatingDish type="sushi" />
        <div className="text-center z-10">
          <motion.h1
            className="text-8xl font-bold text-food-primary"
            animate={{ scale: activeSide === 'food' ? 1.1 : 1 }}
          >
            🍕
          </motion.h1>
          <h2 className="text-4xl font-extrabold mt-4">Food Delivery</h2>
          <p className="text-xl opacity-80 mt-2">Explore restaurants & cuisines</p>
        </div>
      </motion.div>

      {/* Grocery Side */}
      <motion.div
        className="flex-1 relative cursor-pointer flex items-center justify-center"
        style={{
          background: activeSide === 'grocery'
            ? 'linear-gradient(135deg, #06D6A0, #118AB2)'
            : 'rgba(6,214,160,0.08)',
        }}
        onMouseEnter={() => setActiveSide('grocery')}
        onMouseLeave={() => setActiveSide(null)}
        onClick={() => navigate('/grocery')}
        animate={{ scale: activeSide === 'grocery' ? 1.05 : 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <FloatingFruit type="apple" />
        <FloatingFruit type="broccoli" />
        <div className="text-center z-10">
          <motion.h1
            className="text-8xl font-bold text-grocery-primary"
            animate={{ scale: activeSide === 'grocery' ? 1.1 : 1 }}
          >
            🛒
          </motion.h1>
          <h2 className="text-4xl font-extrabold mt-4">Groceries</h2>
          <p className="text-xl opacity-80 mt-2">Fresh produce & daily essentials</p>
        </div>
      </motion.div>

      {/* Animated blob background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 bg-food-primary/30 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 10 }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-grocery-primary/30 rounded-full blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 12 }}
        />
      </div>
    </div>
  );
}