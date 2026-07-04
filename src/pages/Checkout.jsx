// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useForm } from 'react-hook-form';
// import { useSelector } from 'react-redux';
// import confetti from 'canvas-confetti';
// import { useNavigate } from 'react-router-dom';

// const steps = ['Address', 'Payment', 'Review', 'Success'];

// export default function Checkout() {
//   const [currentStep, setCurrentStep] = useState(0);
//   const cart = useSelector(state => state.cart);
//   const navigate = useNavigate();
//   const { register, handleSubmit, watch, formState: { errors } } = useForm();

//   const onSubmit = data => {
//     if (currentStep === 0) {
//       setCurrentStep(1);
//     } else if (currentStep === 1) {
//       setCurrentStep(2);
//     } else if (currentStep === 2) {
//       // Final submit
//       setCurrentStep(3);
//       confetti({
//         particleCount: 200,
//         spread: 100,
//         origin: { y: 0.6 },
//         colors: ['#06D6A0', '#FF6B35', '#FFD166'],
//       });
//       // In a real app, post order to backend
//       setTimeout(() => navigate('/tracking'), 3000);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white/40 backdrop-blur-md p-6 md:p-10 max-w-2xl mx-auto">
//       {/* Progress Steps */}
//       <div className="flex justify-between mb-10">
//         {steps.map((step, index) => (
//           <div key={step} className="flex items-center">
//             <motion.div
//               animate={{
//                 scale: index === currentStep ? 1.2 : 1,
//                 backgroundColor: index <= currentStep ? '#FF6B35' : '#E5E7EB',
//               }}
//               className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
//             >
//               {index + 1}
//             </motion.div>
//             <span className={`ml-2 text-sm ${index <= currentStep ? 'text-food-primary font-bold' : 'text-gray-400'}`}>
//               {step}
//             </span>
//             {index < steps.length - 1 && (
//               <div className={`w-12 h-1 mx-2 rounded ${index < currentStep ? 'bg-food-primary' : 'bg-gray-200'}`} />
//             )}
//           </div>
//         ))}
//       </div>

//       <AnimatePresence mode="wait">
//         {currentStep === 0 && (
//           <motion.div
//             key="address"
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 50 }}
//             className="bg-glass-bg backdrop-blur-md rounded-3xl p-8 border border-glass-border shadow-xl"
//           >
//             <h2 className="text-2xl font-bold mb-6">Delivery Address</h2>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <input {...register('address', { required: true })} placeholder="Street address" className="input-field" />
//               <input {...register('city', { required: true })} placeholder="City" className="input-field" />
//               <input {...register('pincode', { required: true })} placeholder="Pincode" className="input-field" />
//               <motion.button whileTap={{ scale: 0.95 }} type="submit" className="btn-primary w-full mt-4">
//                 Continue to Payment
//               </motion.button>
//             </form>
//           </motion.div>
//         )}

//         {currentStep === 1 && (
//           <motion.div
//             key="payment"
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -50 }}
//             className="bg-glass-bg backdrop-blur-md rounded-3xl p-8 border border-glass-border shadow-xl"
//           >
//             <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
//             <div className="space-y-4">
//               <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-white/50">
//                 <input type="radio" name="payment" value="card" defaultChecked className="accent-food-primary" />
//                 💳 Credit/Debit Card
//               </label>
//               <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-white/50">
//                 <input type="radio" name="payment" value="upi" className="accent-food-primary" />
//                 📱 UPI
//               </label>
//               <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:bg-white/50">
//                 <input type="radio" name="payment" value="cod" className="accent-food-primary" />
//                 💵 Cash on Delivery
//               </label>
//             </div>
//             <motion.button whileTap={{ scale: 0.95 }} onClick={handleSubmit(onSubmit)} className="btn-primary w-full mt-6">
//               Review Order
//             </motion.button>
//           </motion.div>
//         )}

//         {currentStep === 2 && (
//           <motion.div
//             key="review"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0 }}
//             className="bg-glass-bg backdrop-blur-md rounded-3xl p-8 border border-glass-border shadow-xl"
//           >
//             <h2 className="text-2xl font-bold mb-6">Order Review</h2>
//             <div className="space-y-2 mb-6">
//               {cart.items.map(item => (
//                 <div key={item.id} className="flex justify-between">
//                   <span>{item.name} x {item.quantity}</span>
//                   <span>₹{item.price * item.quantity}</span>
//                 </div>
//               ))}
//               <hr className="my-2" />
//               <div className="flex justify-between font-bold text-lg">
//                 <span>Total</span>
//                 <span>₹{cart.totalAmount}</span>
//               </div>
//             </div>
//             <motion.button whileTap={{ scale: 0.95 }} onClick={handleSubmit(onSubmit)} className="btn-primary w-full">
//               Place Order 🎉
//             </motion.button>
//           </motion.div>
//         )}

//         {currentStep === 3 && (
//           <motion.div
//             key="success"
//             initial={{ opacity: 0, scale: 0.5 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="text-center py-20"
//           >
//             <span className="text-8xl">🎉</span>
//             <h2 className="text-4xl font-black mt-4">Order Placed!</h2>
//             <p className="text-gray-500 mt-2">Redirecting to live tracking...</p>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <style jsx>{`
//         .input-field {
//           width: 100%;
//           padding: 12px 16px;
//           border: 1px solid #e2e8f0;
//           border-radius: 12px;
//           outline: none;
//           transition: 0.2s;
//         }
//         .input-field:focus {
//           border-color: #FF6B35;
//           box-shadow: 0 0 0 3px rgba(255,107,53,0.2);
//         }
//         .btn-primary {
//           padding: 14px;
//           background: linear-gradient(135deg, #FF6B35, #FFD166);
//           color: white;
//           border: none;
//           border-radius: 16px;
//           font-weight: 800;
//           font-size: 1.1rem;
//           cursor: pointer;
//           box-shadow: 0 10px 20px rgba(255,107,53,0.3);
//         }
//       `}</style>
//     </div>
//   );
// }
import { useSelector, useDispatch } from 'react-redux';   // both used now
import { motion, AnimatePresence } from 'framer-motion';
import { clearCart } from '../redux/slices/cartSlice';    // used to empty cart after order
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const steps = ['Address', 'Payment', 'Review', 'Success'];

export default function Checkout() {
  const { items, totalQuantity, totalAmount } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [currentStep, setCurrentStep] = useState(0);

  // ✅ useEffect used – updates tab title with current step
  useEffect(() => {
    document.title = `Checkout - Step ${currentStep + 1} of 4`;
  }, [currentStep]);

  const onSubmit = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
    } else if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#06D6A0', '#FF6B35', '#FFD166'],
      });
      // ✅ dispatch used – clear the cart after successful order
      dispatch(clearCart());
      setTimeout(() => navigate('/tracking'), 3000);
    }
  };

  // ✅ totalQuantity used – shown in review step
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            key="address"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="bg-glass-bg backdrop-blur-md rounded-3xl p-8 border border-glass-border shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6">Delivery Address</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
  <div>
    <input
      {...register('address', { required: 'Address is required' })}
      placeholder="Street address"
      className="input-field"
    />
    {errors.address && (
      <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
    )}
  </div>

  <div>
    <input
      {...register('city', { required: 'City is required' })}
      placeholder="City"
      className="input-field"
    />
    {errors.city && (
      <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
    )}
  </div>

  <div>
    <input
      {...register('pincode', { required: 'Pincode is required' })}
      placeholder="Pincode"
      className="input-field"
    />
    {errors.pincode && (
      <p className="text-red-500 text-sm mt-1">{errors.pincode.message}</p>
    )}
  </div>

  <motion.button whileTap={{ scale: 0.95 }} type="submit" className="btn-primary w-full mt-4">
    Continue to Payment
  </motion.button>
</form>
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            key="payment"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-glass-bg backdrop-blur-md rounded-3xl p-8 border border-glass-border shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
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
            </div>
            <motion.button whileTap={{ scale: 0.95 }} onClick={handleSubmit(onSubmit)} className="btn-primary w-full mt-6">
              Review Order
            </motion.button>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="review"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-glass-bg backdrop-blur-md rounded-3xl p-8 border border-glass-border shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6">Order Review</h2>
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
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <span className="text-8xl">🎉</span>
            <h2 className="text-4xl font-black mt-4">Order Placed!</h2>
            <p className="text-gray-500 mt-2">Redirecting to live tracking...</p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white/40 backdrop-blur-md p-6 md:p-10 max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="flex justify-between mb-10">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <motion.div
              animate={{
                scale: index === currentStep ? 1.2 : 1,
                backgroundColor: index <= currentStep ? '#FF6B35' : '#E5E7EB',
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
            >
              {index + 1}
            </motion.div>
            <span className={`ml-2 text-sm ${index <= currentStep ? 'text-food-primary font-bold' : 'text-gray-400'}`}>
              {step}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-12 h-1 mx-2 rounded ${index < currentStep ? 'bg-food-primary' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {renderStepContent()}
      </AnimatePresence>

      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          outline: none;
          transition: 0.2s;
        }
        .input-field:focus {
          border-color: #FF6B35;
          box-shadow: 0 0 0 3px rgba(255,107,53,0.2);
        }
        .btn-primary {
          padding: 14px;
          background: linear-gradient(135deg, #FF6B35, #FFD166);
          color: white;
          border: none;
          border-radius: 16px;
          font-weight: 800;
          font-size: 1.1rem;
          cursor: pointer;
          box-shadow: 0 10px 20px rgba(255,107,53,0.3);
        }
      `}</style>
    </div>
  );
}