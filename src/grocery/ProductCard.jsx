import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/slices/cartSlice';

export default function ProductCard({ product, onProductClick }) {
  const dispatch = useDispatch();

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="bg-glass-bg backdrop-blur-md rounded-3xl border border-glass-border shadow-lg overflow-hidden group"
    >
      {/* Card body – opens modal */}
      <div onClick={onProductClick} className="cursor-pointer">
        <div className="relative">
          <img
            crossOrigin="anonymous"
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {product.freshnessScore >= 90 && (
            <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow">
              Super Fresh
            </span>
          )}
        </div>
        <div className="p-4 pb-2">
          <h3 className="font-bold text-lg truncate">{product.name}</h3>
          <p className="text-sm text-gray-500">
            {product.brand} · {product.weight}
          </p>
        </div>
      </div>

      {/* Price & add button – outside modal trigger */}
      <div className="px-4 pb-4 flex items-center justify-between">
        <span className="text-xl font-black text-grocery-primary">₹{product.price}</span>
        <motion.button
          whileHover={{ scale: 1.15, boxShadow: '0 0 15px rgba(6,214,160,0.6)' }}
          whileTap={{ scale: 0.85, rotate: 15 }}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addItem({ ...product, id: product._id }));   // map _id to id
          }}
          className="bg-gradient-to-r from-grocery-primary to-grocery-accent text-white rounded-full w-12 h-12 flex items-center justify-center font-bold shadow-lg text-xl"
        >
          +
        </motion.button>
      </div>
    </motion.div>
  );
}