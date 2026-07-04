import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { clearCart } from '../redux/slices/cartSlice';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';   // useEffect removed

const steps = ['Address', 'Payment', 'Review', 'Success'];

export default function CheckoutModal({ isOpen, onClose }) {
  const { items, totalQuantity, totalAmount } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [currentStep, setCurrentStep] = useState(0);

  // Reset step when modal closes (via onClose)
  const handleClose = () => {
    setCurrentStep(0);
    onClose();
  };

  const onSubmit = () => {
    if (currentStep === 0) setCurrentStep(1);
    else if (currentStep === 1) setCurrentStep(2);
    else if (currentStep === 2) {
      setCurrentStep(3);
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 }, colors: ['#06D6A0', '#FF6B35', '#FFD166'] });
      dispatch(clearCart());
      setTimeout(() => {
        handleClose();
        navigate('/tracking');
      }, 3000);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register('address', { required: 'Address is required' })}
                placeholder="Street address"
                className="input-field"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
            </div>
            <div>
              <input
                {...register('city', { required: 'City is required' })}
                placeholder="City"
                className="input-field"
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
            </div>
            <div>
              <input
                {...register('pincode', { required: 'Pincode is required' })}
                placeholder="Pincode"
                className="input-field"
              />
              {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode.message}</p>}
            </div>
            <motion.button whileTap={{ scale: 0.95 }} type="submit" className="btn-primary w-full mt-4">
              Continue to Payment
            </motion.button>
          </form>
        );
      case 1:
        return (
          <div className="space-y-4">
            <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-white/50">
              <input type="radio" name="payment" value="card" defaultChecked className="accent-food-primary" />
              💳 Credit/Debit Card
            </label>
            <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-white/50">
              <input type="radio" name="payment" value="upi" className="accent-food-primary" />
              📱 UPI
            </label>
            <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-white/50">
              <input type="radio" name="payment" value="cod" className="accent-food-primary" />
              💵 Cash on Delivery
            </label>
            <motion.button whileTap={{ scale: 0.95 }} onClick={handleSubmit(onSubmit)} className="btn-primary w-full mt-6">
              Review Order
            </motion.button>
          </div>
        );
      case 2:
        return (
          <div>
            <div className="space-y-2 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total ({totalQuantity} items)</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>
            <motion.button whileTap={{ scale: 0.95 }} onClick={handleSubmit(onSubmit)} className="btn-primary w-full">
              Place Order 🎉
            </motion.button>
          </div>
        );
      case 3:
        return (
          <div className="text-center py-10">
            <span className="text-8xl">🎉</span>
            <h2 className="text-4xl font-black mt-4">Order Placed!</h2>
            <p className="text-gray-500 mt-2">Redirecting to live tracking...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Full‑screen blurred backdrop (separate layer) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-xl"
          onClick={handleClose}
        />

        {/* The actual modal card – no blur here, just the pop‑up */}
        <motion.div
          key="checkout-modal"
          initial={{ scale: 0.9, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 40 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 m-4"
        >
          {/* Steps indicator (connected) */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, idx) => (
              <div key={step} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm z-10 ${
                    idx <= currentStep ? 'bg-food-primary' : 'bg-gray-300'
                  }`}
                >
                  {idx + 1}
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-1 rounded transition-colors ${
                      idx < currentStep ? 'bg-food-primary' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {renderStep()}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);
}