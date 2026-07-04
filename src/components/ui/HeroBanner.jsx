import { motion } from 'framer-motion';
import AnimatedButton from './AnimatedButton';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

export default function HeroBanner({ type = 'food' }) {
  const isFood = type === 'food';
  const navigate = useNavigate();

  const handleExplore = () => {
    confetti({
      particleCount: 80,
      spread: 360,
      origin: { y: 0.5 },
      colors: isFood ? ['#FF6B35', '#FFD166'] : ['#06D6A0', '#118AB2'],
      scalar: 1.5,
      ticks: 50,
    });
    setTimeout(() => navigate(isFood ? '/food' : '/grocery'), 300);
  };

  const handleLearnMore = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-8 md:p-12 mb-10 ${
        isFood
          ? 'bg-gradient-to-br from-food-primary/20 via-food-accent/10 to-food-bg'
          : 'bg-gradient-to-br from-grocery-primary/20 via-grocery-accent/10 to-grocery-bg'
      }`}
    >
      {/* Animated blobs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className={`absolute -top-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-40 ${
          isFood ? 'bg-food-primary' : 'bg-grocery-primary'
        }`}
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
        className={`absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-30 ${
          isFood ? 'bg-food-accent' : 'bg-grocery-accent'
        }`}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black leading-tight"
          >
            {isFood ? 'Craving something delicious?' : 'Fresh groceries, delivered fast'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 mt-4 max-w-md"
          >
            {isFood
              ? 'Discover restaurants, explore menus, and get food delivered in minutes.'
              : 'Farm-fresh produce, daily essentials, and more at your doorstep.'}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex gap-4"
          >
            <AnimatedButton variant={isFood ? 'primary' : 'grocery'} onClick={handleExplore}>
              Explore Now
            </AnimatedButton>
            <AnimatedButton variant="outline" onClick={handleLearnMore}>
              Learn More
            </AnimatedButton>
          </motion.div>
        </div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="flex-shrink-0"
        >
          <span className="text-8xl md:text-9xl">{isFood ? '🍕' : '🥦'}</span>
        </motion.div>
      </div>
    </div>
  );
}