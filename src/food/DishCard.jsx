import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/slices/cartSlice';

export default function DishCard({ dish, onDishClick }) {
  const dispatch = useDispatch();

  return (
    <motion.div
      whileHover={{ scale: 1.03, rotateY: 3 }}
      whileTap={{ scale: 0.98 }}
      className="bg-glass-bg backdrop-blur-md rounded-3xl border border-glass-border shadow-xl overflow-hidden group"
    >
      {/* Card body – opens modal */}
      <div onClick={onDishClick} className="cursor-pointer">
        <div className="relative">
          <img
            crossOrigin="anonymous"
            src={dish.image}
            alt={dish.name}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {dish.popular && (
            <span className="absolute top-3 left-3 bg-food-accent text-white text-xs px-3 py-1 rounded-full font-bold shadow">
              Popular
            </span>
          )}
          {dish.chefRecommendation && (
            <span className="absolute top-3 right-3 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-bold shadow">
              Chef’s Pick
            </span>
          )}
        </div>
        <div className="p-4 pb-2">
          <h3 className="text-lg font-bold truncate">{dish.name}</h3>
          <p className="text-sm text-gray-500 truncate">{dish.description}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xl font-black text-food-primary">₹{dish.price}</span>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span>⏱️ {dish.preparationTime} min</span>
            </div>
          </div>
          {dish.nutrition && (
            <div className="flex gap-2 mt-2 text-xs text-gray-400">
              <span>🔥 {dish.nutrition.calories} kcal</span>
              <span>🍗 {dish.nutrition.protein}g protein</span>
            </div>
          )}
        </div>
      </div>

      {/* Add to Cart button – outside modal trigger, full-width & prominent */}
      <div className="px-4 pb-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={(e) => {
            e.stopPropagation();
            // map _id to id so the cart slice can track items correctly
            dispatch(addItem({ ...dish, id: dish._id }));
          }}
          className="w-full py-3 bg-gradient-to-r from-food-primary to-food-accent text-white rounded-xl font-bold text-base shadow-md"
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}