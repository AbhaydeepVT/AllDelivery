import { Outlet, useLocation } from 'react-router-dom';   // added useLocation
import Navbar from './Navbar';
import Footer from './Footer';
import { motion, AnimatePresence } from 'framer-motion';
import CartAnimationOverlay from '../ui/CartAnimationOverlay';
import CartSync from '../cart/CartSync';
import { useEffect } from 'react';

const pageTitles = {
  '/food': 'Food Delivery | delivery.ai',
  '/grocery': 'Groceries | delivery.ai',
  '/cart': 'Cart | delivery.ai',
  '/checkout': 'Checkout | delivery.ai',
  '/tracking': 'Tracking Order | delivery.ai',
  '/profile': 'Profile | delivery.ai',
  '/product': 'Product Details | delivery.ai',
};

export default function Layout() {
  const location = useLocation();   // now available

  // Update page title instantly when route changes
  useEffect(() => {
    document.title = pageTitles[location.pathname] || 'delivery.ai';
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Cart overlay stays outside so it persists across pages */}
        <CartAnimationOverlay />
        <CartSync />  {/* Sync cart with backend on every page */}

        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}