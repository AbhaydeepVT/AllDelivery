import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/userSlice';
import { registerUser, loginUser, fetchUserCart } from '../api';   // added fetchUserCart
import { setCart } from '../redux/slices/cartSlice';                // added setCart
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      // 1. Create the user
      await registerUser({ name, email, password });

      // 2. Auto-login to get the token
      const res = await loginUser({ email, password });

      // 3. Persist token and update Redux
      localStorage.setItem('token', res.data.token);
      dispatch(loginSuccess(res.data.user));

      // 4. Load the (empty) cart from the backend to reset any stale local cart
      const cartRes = await fetchUserCart();
      if (cartRes.data.length > 0) {
        // New users usually have an empty cart, but handle just in case
        const serverItems = cartRes.data.map(item => ({
          ...item.product,
          _id: item.product._id,
          id: item.product._id,
          quantity: item.quantity,
        }));
        const totalQty = serverItems.reduce((sum, i) => sum + i.quantity, 0);
        const totalAmt = serverItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
        dispatch(setCart({ items: serverItems, totalQuantity: totalQty, totalAmount: totalAmt }));
      } else {
        // Clear local cart for a fresh start
        dispatch(setCart({ items: [], totalQuantity: 0, totalAmount: 0 }));
      }

      navigate('/profile');
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.error || 'Registration failed'));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center p-4 bg-white/30 backdrop-blur-md"
    >
      <form onSubmit={handleSubmit} className="bg-glass-bg backdrop-blur-lg rounded-3xl p-8 shadow-2xl max-w-md w-full space-y-6">
        <h2 className="text-4xl font-black text-center">Create Account</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="password"
          placeholder="Password (min. 6 characters)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="input-field"
          required
          minLength={6}
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-food-primary to-food-accent text-white rounded-xl font-bold shadow-lg disabled:opacity-50"
        >
          {loading ? 'Creating account...' : 'Register'}
        </motion.button>
        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-food-primary font-bold">Login</Link>
        </p>
      </form>
    </motion.div>
  );
}