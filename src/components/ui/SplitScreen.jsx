import { motion } from 'framer-motion';

export default function SplitScreen({
  left,
  right,
  onLeftClick,
  onRightClick,
  activeSide = null,
}) {
  return (
    <div className="relative h-screen w-screen overflow-hidden flex">
      {/* Left Side */}
      <motion.div
        className="flex-1 relative cursor-pointer flex items-center justify-center"
        style={{
          background:
            activeSide === 'left'
              ? 'linear-gradient(135deg, #FF6B35, #FFD166)'
              : 'rgba(255,107,53,0.08)',
        }}
        onMouseEnter={onLeftClick?.activate}
        onMouseLeave={onLeftClick?.deactivate}
        onClick={onLeftClick?.navigate}
        animate={{ scale: activeSide === 'left' ? 1.05 : 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        {left}
      </motion.div>

      {/* Right Side */}
      <motion.div
        className="flex-1 relative cursor-pointer flex items-center justify-center"
        style={{
          background:
            activeSide === 'right'
              ? 'linear-gradient(135deg, #06D6A0, #118AB2)'
              : 'rgba(6,214,160,0.08)',
        }}
        onMouseEnter={onRightClick?.activate}
        onMouseLeave={onRightClick?.deactivate}
        onClick={onRightClick?.navigate}
        animate={{ scale: activeSide === 'right' ? 1.05 : 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        {right}
      </motion.div>

      {/* Animated blobs background */}
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