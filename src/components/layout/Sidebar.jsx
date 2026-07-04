import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { setSideMenu } from '../../redux/slices/uiSlice';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.ui.sideMenuOpen);

  const menuItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Food', path: '/food', icon: '🍕' },
    { name: 'Groceries', path: '/grocery', icon: '🛒' },
    { name: 'Cart', path: '/cart', icon: '🛍️' },
    { name: 'Profile', path: '/profile', icon: '👤' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(setSideMenu(false))}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-full w-72 bg-glass-bg backdrop-blur-xl border-r border-glass-border shadow-2xl z-50 p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black tracking-tight">
                delivery<span className="text-food-primary">.</span>ai
              </h2>
              <button
                onClick={() => dispatch(setSideMenu(false))}
                className="text-2xl hover:text-food-primary"
              >
                ✕
              </button>
            </div>

            <nav className="flex-1 space-y-2">
              {menuItems.map(item => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => dispatch(setSideMenu(false))}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/30 transition-colors font-medium"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-white/20">
              <p className="text-xs text-gray-500">Delightful Delivery Experience</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}