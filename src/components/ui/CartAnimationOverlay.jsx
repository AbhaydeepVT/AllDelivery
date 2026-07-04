import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { clearLastAdded } from '../../redux/slices/cartSlice';

export default function CartAnimationOverlay() {
  const lastAdded = useSelector(state => state.cart.lastAddedItem);
  const dispatch = useDispatch();

  if (!lastAdded) return null;

  const startX = window.innerWidth - 100;
  const startY = window.innerHeight - 100;
  const endX = window.innerWidth - 60;
  const endY = 20;

  return (
    <AnimatePresence>
      <motion.div
        key={lastAdded.id}
        initial={{ x: startX, y: startY, scale: 0.5, opacity: 0 }}
        animate={{ x: endX, y: endY, scale: 0.2, opacity: 0.8 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        onAnimationComplete={() => dispatch(clearLastAdded())}
        className="fixed z-[100] pointer-events-none"
      >
        <img
            crossOrigin="anonymous"
          src={lastAdded.image}
          alt=""
          className="w-12 h-12 object-cover rounded-full shadow-2xl border-2 border-white"
        />
      </motion.div>
    </AnimatePresence>
  );
}