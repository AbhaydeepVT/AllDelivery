import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';

export default function ProductModal({ product, isOpen, onClose }) {
  const dispatch = useDispatch();

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col md:flex-row"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl z-10"
            >
              ✕
            </button>
            <div className="md:w-1/2">
              <img crossOrigin="anonymous" src={product.image} alt={product.name} className="w-full h-64 md:h-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none" />
            </div>
            <div className="p-6 md:w-1/2">
              <h2 className="text-3xl font-black">{product.name}</h2>
              {product.brand && <p className="text-gray-500">{product.brand} · {product.weight}</p>}
              {product.nutrition && (
                <div className="mt-4 bg-green-50 rounded-2xl p-4">
                  <h3 className="font-bold mb-2">🥗 Nutrition</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">Calories</span> <strong>{product.nutrition.calories} kcal</strong></div>
                    <div><span className="text-gray-500">Protein</span> <strong>{product.nutrition.protein}g</strong></div>
                    <div><span className="text-gray-500">Carbs</span> <strong>{product.nutrition.carbs}g</strong></div>
                    <div><span className="text-gray-500">Fat</span> <strong>{product.nutrition.fat}g</strong></div>
                  </div>
                </div>
              )}
              <div className="mt-6 flex items-center justify-between">
                <span className="text-3xl font-black text-food-primary">₹{product.price}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => dispatch(addItem(product))}
                  className="px-6 py-3 bg-gradient-to-r from-food-primary to-food-accent text-white rounded-full font-bold shadow-lg"
                >
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}