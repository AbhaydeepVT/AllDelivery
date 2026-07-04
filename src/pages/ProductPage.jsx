import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/slices/cartSlice';

export default function ProductPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = location.state?.product;

  if (!product) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center p-8"
      >
        <span className="text-8xl">🔍</span>
        <h2 className="text-3xl font-bold mt-4">Product not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-8 py-3 bg-food-primary text-white rounded-full font-bold"
        >
          Go Back
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-white/30 backdrop-blur-md p-6 md:p-10 max-w-4xl mx-auto"
    >
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-gray-500 hover:text-food-primary transition"
      >
        ← Back
      </button>

      <div className="bg-glass-bg backdrop-blur-md rounded-3xl border border-glass-border shadow-2xl overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          <div className="p-6 md:w-1/2">
            <h1 className="text-4xl font-black">{product.name}</h1>
            {product.brand && <p className="text-gray-500 mt-1">{product.brand}</p>}
            {product.weight && (
              <p className="text-sm text-gray-400 mt-1">{product.weight}</p>
            )}
            {product.description && (
              <p className="text-gray-600 mt-4">{product.description}</p>
            )}

            {/* Premium Nutrition Panel */}
            {product.nutrition && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/40 shadow-inner"
              >
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  🥗 Nutrition Facts
                  {product.freshnessScore && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Freshness {product.freshnessScore}%
                    </span>
                  )}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🔥</span>
                    <div>
                      <p className="text-xs text-gray-500">Calories</p>
                      <p className="font-bold">{product.nutrition.calories} kcal</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🍗</span>
                    <div>
                      <p className="text-xs text-gray-500">Protein</p>
                      <p className="font-bold">{product.nutrition.protein}g</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🌾</span>
                    <div>
                      <p className="text-xs text-gray-500">Carbs</p>
                      <p className="font-bold">{product.nutrition.carbs}g</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🧈</span>
                    <div>
                      <p className="text-xs text-gray-500">Fat</p>
                      <p className="font-bold">{product.nutrition.fat}g</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {product.preparationTime && (
              <p className="mt-4 text-sm">⏱️ Preparation: {product.preparationTime} min</p>
            )}

            <div className="mt-6">
              <span className="text-4xl font-black text-food-primary">₹{product.price}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch(addItem(product))}
              className="mt-6 w-full py-4 bg-gradient-to-r from-food-primary to-food-accent text-white rounded-2xl text-xl font-black shadow-lg"
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}