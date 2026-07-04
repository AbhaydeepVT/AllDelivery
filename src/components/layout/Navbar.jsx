import { Link } from 'react-router-dom';
import SearchBar from '../ui/SearchBar';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

export default function Navbar() {
  const cartCount = useSelector(state => state.cart.totalQuantity);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-glass-bg border-b border-glass-border shadow-lg">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="text-2xl font-black tracking-tighter">
          delivery<span className="text-food-primary">.</span>ai
        </Link>
        <SearchBar />
        <div className="flex gap-4 items-center">
          <Link to="/cart" className="relative">
            🛒
            {cartCount > 0 && (
              <motion.span
  key={cartCount}
  initial={{ scale: 1 }}
  animate={{ scale: [1, 1.8, 1], rotate: [0, 10, -10, 0] }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
  className="absolute -top-2 -right-2 bg-food-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
  {cartCount}
</motion.span>
            )}
          </Link>
          <Link to="/profile">👤</Link>
        </div>
      </div>
    </nav>
  );
}