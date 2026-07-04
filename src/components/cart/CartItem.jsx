import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addItem, removeItem } from '../../redux/slices/cartSlice';

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="flex items-center gap-4 bg-glass-bg backdrop-blur-md rounded-2xl p-4 border border-glass-border shadow-lg"
    >
      <img
      crossOrigin="anonymous"
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-xl"
      />
      <div className="flex-1">
        <h3 className="font-bold text-lg">{item.name}</h3>
        <p className="text-gray-500">₹{item.price}</p>
      </div>
      <div className="flex items-center gap-3">
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => dispatch(removeItem(item.id))}
          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold"
        >
          –
        </motion.button>
        <motion.span
          key={item.quantity}
          initial={{ scale: 1.5 }}
          animate={{ scale: 1 }}
          className="text-lg font-bold w-6 text-center"
        >
          {item.quantity}
        </motion.span>
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => dispatch(addItem(item))}
          className="w-8 h-8 rounded-full bg-food-primary text-white flex items-center justify-center font-bold"
        >
          +
        </motion.button>
      </div>
    </motion.div>
  );
}