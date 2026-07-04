import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/userSlice';
import { loginUser, fetchUserCart } from '../api';            // added fetchUserCart
import { setCart } from '../redux/slices/cartSlice';          // added setCart
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      // 1. Authenticate
      const res = await loginUser({ email, password });
      localStorage.setItem('token', res.data.token);
      dispatch(loginSuccess(res.data.user));

      // 2. Load user's cart from backend and replace local cart
      const cartRes = await fetchUserCart();
      if (cartRes.data.length > 0) {
        const serverItems = cartRes.data.map(item => ({
          ...item.product,                  // spread product details
          _id: item.product._id,
          id: item.product._id,             // map to id for cart logic
          quantity: item.quantity,
        }));
        const totalQty = serverItems.reduce((sum, i) => sum + i.quantity, 0);
        const totalAmt = serverItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
        dispatch(setCart({ items: serverItems, totalQuantity: totalQty, totalAmount: totalAmt }));
      } else {
        // If server cart is empty, we can optionally clear the local cart
        dispatch(setCart({ items: [], totalQuantity: 0, totalAmount: 0 }));
      }

      navigate('/profile');
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.error || 'Login failed'));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center p-4 bg-white/30 backdrop-blur-md"
    >
      <form onSubmit={handleSubmit} className="bg-glass-bg backdrop-blur-lg rounded-3xl p-8 shadow-2xl max-w-md w-full space-y-6">
        <h2 className="text-4xl font-black text-center">Welcome back</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
          className="input-field" required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
          className="input-field" required />
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          type="submit" disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-food-primary to-food-accent text-white rounded-xl font-bold shadow-lg disabled:opacity-50">
          {loading ? 'Logging in...' : 'Login'}
        </motion.button>
        <p className="text-center text-sm text-gray-500">
          Don't have an account? <Link to="/register" className="text-food-primary font-bold">Register</Link>
        </p>
      </form>
    </motion.div>
  );
}