import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setLastSection } from '../redux/slices/uiSlice';
import RestaurantCard from '../food/RestaurantCard';
import DishCard from '../food/DishCard';
import ProductModal from '../components/ui/ProductModal';
import { restaurants } from '../data/restaurants'; // still static for now
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api';

export default function FoodHome() {
  const dispatch = useDispatch();
  const [selectedDish, setSelectedDish] = useState(null);

  useEffect(() => {
    dispatch(setLastSection('food'));
  }, [dispatch]);

  // Fetch dishes from API (type = 'dish')
  const { data: dishes = [], isLoading, error } = useQuery({
    queryKey: ['products', { type: 'dish' }],
    queryFn: () => fetchProducts({ type: 'dish' }).then(res => res.data),
  });

  return (
    <div className="bg-food-bg min-h-screen p-8">
      <motion.h1
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-6xl font-black text-food-primary mb-8"
      >
        Hungry? 🥘
      </motion.h1>

      {/* Restaurants – still static */}
      <h2 className="text-3xl font-bold mb-6">Top Restaurants</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {restaurants.map(r => (
          <RestaurantCard key={r.id} restaurant={r} />
        ))}
      </div>

      {/* Featured Dishes – now dynamic */}
      <h2 className="text-3xl font-bold mb-6">Popular Dishes</h2>

      {isLoading && (
        <div className="text-center py-10 text-gray-500">Loading delicious dishes…</div>
      )}
      {error && (
        <div className="text-center py-10 text-red-500">
          Failed to load dishes. Make sure the API server is running.
        </div>
      )}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dishes.map(dish => (
            <DishCard
              key={dish._id}
              dish={dish}
              onDishClick={() => setSelectedDish(dish)}
            />
          ))}
        </div>
      )}

      {/* Product detail modal */}
      <ProductModal
        product={selectedDish}
        isOpen={!!selectedDish}
        onClose={() => setSelectedDish(null)}
      />
    </div>
  );
}