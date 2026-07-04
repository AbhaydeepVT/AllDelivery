import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { toggleTheme } from '../redux/slices/uiSlice';
import { logout } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import AnimatedButton from '../components/ui/AnimatedButton';
import RatingStars from '../components/ui/RatingStars';

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector(state => state.user);
  const { theme } = useSelector(state => state.ui);

  // Dummy data
  const recentOrders = [
    { id: 1, name: 'Spice Symphony', date: '28 Jun 2026', total: 450, status: 'Delivered' },
    { id: 2, name: 'Fresh Picks Grocery', date: '27 Jun 2026', total: 320, status: 'Delivered' },
    { id: 3, name: 'Pizza Paradise', date: '25 Jun 2026', total: 280, status: 'Cancelled' },
  ];

  const wishlist = [
    { id: 1, name: 'Sushi Platter', restaurant: 'Tokyo Bay' },
    { id: 2, name: 'Organic Avocados', brand: "Nature's Best" },
  ];

const handleLogout = () => {
  localStorage.removeItem('token');    // clear stored JWT
  dispatch(logout());                  // clear Redux user state
  navigate('/');                       // go to landing page
};

  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex flex-col items-center justify-center p-8"
      >
        <span className="text-8xl">🔒</span>
        <h2 className="text-3xl font-bold mt-4">You’re not logged in</h2>
        <p className="text-gray-500 mt-2">Log in to see your profile, orders, and rewards.</p>
        <AnimatedButton
          variant="primary"
          className="mt-6"
          onClick={() => navigate('/login')}
        >
          Login / Sign Up
        </AnimatedButton>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-white/30 backdrop-blur-md p-6 md:p-10 max-w-5xl mx-auto"
    >
      <h1 className="text-5xl font-black mb-8">Your Profile</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column – User Info & Wallet */}
        <div className="space-y-6">
          <GlassCard>
            <div className="flex flex-col items-center text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-food-primary to-food-accent flex items-center justify-center text-white text-4xl font-black mb-4 shadow-lg"
              >
                {user?.name?.charAt(0) || 'U'}
              </motion.div>
              <h2 className="text-2xl font-bold">{user?.name || 'Guest User'}</h2>
              <p className="text-gray-500">{user?.email || 'guest@delivery.ai'}</p>
              <p className="text-sm text-food-primary font-bold mt-1">+91 98765 43210</p>
              <div className="mt-2 flex items-center gap-1">
                <RatingStars rating={4.5} />
                <span className="text-xs text-gray-400">4.5 (12 reviews)</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-lg font-bold mb-3">💳 Wallet</h3>
            <p className="text-3xl font-black text-food-primary">₹ 1,250.00</p>
            <p className="text-sm text-gray-500 mt-1">+ ₹200 cashback this month</p>
            <AnimatedButton variant="outline" className="mt-4 w-full">
              Add Money
            </AnimatedButton>
          </GlassCard>

          <GlassCard>
            <h3 className="text-lg font-bold mb-4">🎨 Theme</h3>
            <div className="flex items-center justify-between">
              <span>{theme === 'light' ? '☀️ Light' : '🌙 Dark'}</span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => dispatch(toggleTheme())}
                className="relative w-14 h-7 rounded-full bg-gray-200 flex items-center px-1"
              >
                <motion.div
                  animate={{ x: theme === 'dark' ? 24 : 0 }}
                  className="w-5 h-5 rounded-full bg-food-primary shadow"
                />
              </motion.button>
            </div>
          </GlassCard>

          <AnimatedButton variant="ghost" onClick={handleLogout} className="w-full">
            🚪 Logout
          </AnimatedButton>
        </div>

        {/* Right Column – Orders & Wishlist */}
        <div className="md:col-span-2 space-y-8">
          <GlassCard>
            <h3 className="text-xl font-bold mb-4">📋 Recent Orders</h3>
            <div className="space-y-4">
              {recentOrders.map(order => (
                <motion.div
                  key={order.id}
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-between p-4 bg-white/50 rounded-2xl"
                >
                  <div>
                    <p className="font-bold">{order.name}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₹{order.total}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            <AnimatedButton variant="outline" className="mt-4 w-full">
              View All Orders
            </AnimatedButton>
          </GlassCard>

          <GlassCard>
            <h3 className="text-xl font-bold mb-4">❤️ Wishlist</h3>
            <div className="space-y-4">
              {wishlist.map(item => (
                <motion.div
                  key={item.id}
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-between p-4 bg-white/50 rounded-2xl"
                >
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.restaurant || item.brand}</p>
                  </div>
                  <AnimatedButton variant="primary" className="text-sm py-2 px-4">
                    Add to Cart
                  </AnimatedButton>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-xl font-bold mb-4">🏆 Loyalty Points</h3>
            <div className="flex items-center gap-4">
              <div className="text-5xl">⭐</div>
              <div>
                <p className="text-3xl font-black text-food-accent">2,450 pts</p>
                <p className="text-sm text-gray-500">Redeem 5,000 pts for free delivery</p>
                <div className="mt-2 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '49%' }}
                    className="h-full bg-gradient-to-r from-food-primary to-food-accent rounded-full"
                  />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </motion.div>
  );
}