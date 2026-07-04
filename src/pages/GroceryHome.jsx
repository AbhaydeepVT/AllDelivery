import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroBanner from '../components/ui/HeroBanner';
import ProductCard from '../grocery/ProductCard';
import ProductModal from '../components/ui/ProductModal';
import { groceryCategories } from '../data/groceryItems';   // still used for chip names/icons
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setLastSection } from '../redux/slices/uiSlice';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api';

export default function GroceryHome() {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // remember last section for empty‑cart redirect
  useEffect(() => {
    dispatch(setLastSection('grocery'));
  }, [dispatch]);

  // fetch grocery items from API – category filters handled by backend
  const { data: groceryItems = [], isLoading, error } = useQuery({
    queryKey: ['products', { type: 'grocery', category: activeCategory === 'All' ? undefined : activeCategory }],
    queryFn: () =>
      fetchProducts({
        type: 'grocery',
        category: activeCategory === 'All' ? undefined : activeCategory,
      }).then(res => res.data),
  });

  return (
    <div className="bg-grocery-bg min-h-screen p-6 md:p-10">
      <HeroBanner type="grocery" />

      {/* Category Chips – still static */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-10 scrollbar-hide">
        {[{ name: 'All', icon: '🛒' }, ...groceryCategories].map(cat => (
          <motion.button
            key={cat.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(cat.name)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full border transition-all flex-shrink-0 ${
              activeCategory === cat.name
                ? 'bg-grocery-primary text-white border-grocery-primary shadow-lg'
                : 'bg-white/40 backdrop-blur-md border-glass-border hover:shadow-md'
            }`}
          >
            <span className="text-xl">{cat.icon}</span>
            <span className="font-medium text-sm">{cat.name}</span>
          </motion.button>
        ))}
      </div>

      <h2 className="text-4xl font-black text-grocery-primary mb-8">
        {activeCategory === 'All' ? 'Fresh Picks 🥦' : activeCategory}
      </h2>

      {/* Loading & error states */}
      {isLoading && (
        <div className="text-center py-20 text-gray-500">Loading fresh products…</div>
      )}
      {error && (
        <div className="text-center py-20 text-red-500">Failed to load products. Make sure the API server is running.</div>
      )}

      {/* Grid with animations */}
      {!isLoading && !error && (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {groceryItems.map(item => (
              <motion.div
                key={item._id}                             // ← MongoDB _id
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard
                  product={item}
                  onProductClick={() => setSelectedProduct(item)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}