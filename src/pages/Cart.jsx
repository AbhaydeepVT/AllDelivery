import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { addItem, removeItem, clearCart } from '../redux/slices/cartSlice';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Link } from 'react-router-dom';
import CartItem from '../components/cart/CartItem';
import SavingsCounter from '../components/cart/SavingsCounter';
import DeliveryTimer from '../components/cart/DeliveryTimer';
import CheckoutModal from './CheckoutModal';

export default function Cart() {
  const { items, totalQuantity, totalAmount } = useSelector(state => state.cart);
  const lastSection = useSelector(state => state.ui.lastSection);   // ← NEW
  const dispatch = useDispatch();

  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [lastRemoved, setLastRemoved] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    document.title = `Cart (${totalQuantity} items)`;
  }, [totalQuantity]);

  const validCoupons = {
    FRESH10: 10,
    WELCOME20: 20,
    FIRSTPROJECT: 15,
    TEACHER: 25,
    STUDENT: 18,
  };

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    const discountPercent = validCoupons[code];
    if (discountPercent) {
      setDiscount(discountPercent);
      setCouponApplied(true);
      setCouponError('');
      if (code === 'FIRSTPROJECT') {
        confetti({
          particleCount: 150,
          spread: 100,
          colors: ['#FF6B35', '#06D6A0', '#FFD166'],
          shapes: ['star'],
        });
      } else if (code === 'TEACHER') {
        confetti({
          particleCount: 200,
          spread: 80,
          colors: ['#FFD700', '#FF6B35'],
          shapes: ['circle'],
        });
      } else if (code === 'STUDENT') {
        confetti({
          particleCount: 100,
          spread: 90,
          colors: ['#06D6A0', '#118AB2'],
          shapes: ['square'],
        });
      } else {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF6B35', '#06D6A0', '#FFD166'],
        });
      }
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  const finalAmount = totalAmount - (totalAmount * discount) / 100;

  const handleUndoRemove = () => {
    if (lastRemoved) {
      dispatch(addItem(lastRemoved));
      setLastRemoved(null);
    }
  };

  const handleRemoveWithUndo = (item) => {
    setLastRemoved(item);
    dispatch(removeItem(item.id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    setLastRemoved(null);
  };

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex flex-col items-center justify-center p-8"
      >
        <span className="text-8xl">🛒</span>
        <h2 className="text-3xl font-bold mt-4">Your cart is empty</h2>
        <Link
          to={lastSection ? `/${lastSection}` : '/'}   // ← SMART REDIRECT
          className="mt-6 px-8 py-3 bg-food-primary text-white rounded-full text-lg font-bold"
        >
          Start Ordering
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white/30 backdrop-blur-md p-6 md:p-10 max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-5xl font-black">Your Cart</h1>
        <div className="flex items-center gap-4">
          <span className="bg-food-primary/10 text-food-primary px-4 py-2 rounded-full font-bold text-sm">
            {totalQuantity} items
          </span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleClearCart}
            className="text-red-500 text-sm underline"
          >
            Clear all
          </motion.button>
        </div>
      </div>

      {/* Undo banner */}
      <AnimatePresence>
        {lastRemoved && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-xl mb-4 flex items-center justify-between"
          >
            <span>Removed {lastRemoved.name}</span>
            <button onClick={handleUndoRemove} className="font-bold underline">
              Undo
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Items */}
      <div className="space-y-6">
        <AnimatePresence>
          {items.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={() => handleRemoveWithUndo(item)}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-8">
        {/* Coupon Section */}
        <div className="bg-glass-bg backdrop-blur-md rounded-3xl p-6 border border-glass-border shadow-xl">
          <h3 className="text-xl font-bold mb-4">Have a coupon?</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={coupon}
              onChange={e => setCoupon(e.target.value)}
              placeholder="Enter code (e.g. FIRSTPROJECT)"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-food-primary"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={applyCoupon}
              className="px-6 py-3 bg-food-primary text-white rounded-xl font-bold"
            >
              Apply
            </motion.button>
          </div>
          {couponError && <p className="text-red-500 mt-2">{couponError}</p>}
          {couponApplied && (
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-green-500 mt-2 font-bold"
            >
              {discount}% off applied!
            </motion.p>
          )}
          <p className="text-xs text-gray-400 mt-3">
            Try: FIRSTPROJECT · TEACHER · STUDENT
          </p>
        </div>

        {/* Summary Section */}
        <div className="bg-glass-bg backdrop-blur-md rounded-3xl p-6 border border-glass-border shadow-xl space-y-4">
          <SavingsCounter originalAmount={totalAmount} finalAmount={finalAmount} />
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>₹{finalAmount.toFixed(0)}</span>
          </div>
          <DeliveryTimer />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsCheckoutOpen(true)}
            className="w-full py-4 bg-gradient-to-r from-food-primary to-food-accent text-white rounded-2xl text-xl font-black shadow-lg"
          >
            Proceed to Checkout
          </motion.button>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </motion.div>
  );
}