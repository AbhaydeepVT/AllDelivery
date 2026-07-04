import { motion } from 'framer-motion';

export default function RestaurantCard({ restaurant }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, rotateY: 5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}
      className="bg-glass-bg backdrop-blur-md rounded-3xl border border-glass-border p-6 shadow-xl cursor-pointer"
    >
      <img crossOrigin="anonymous" src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover rounded-2xl" />
      <h3 className="text-2xl font-bold mt-4">{restaurant.name}</h3>
      <p className="text-gray-600">{restaurant.cuisine}</p>
      <div className="flex items-center mt-2">
        <span className="text-yellow-500">⭐ {restaurant.rating}</span>
        <span className="ml-2 text-sm text-gray-500">{restaurant.deliveryTime} min</span>
      </div>
      {restaurant.popular && (
        <span className="inline-block mt-2 bg-food-accent text-white text-xs px-3 py-1 rounded-full">Popular</span>
      )}
    </motion.div>
  );
}