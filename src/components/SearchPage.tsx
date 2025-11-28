import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, X, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [selectedNutrition, setSelectedNutrition] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Burger', 'Cake', 'Candy'];
  const flavors = ['Sweet', 'Savory', 'Spicy', 'Sour', 'Umami'];
  const nutritionFilters = ['High Protein', 'Low Carb', 'Vegan', 'Gluten-Free', 'Keto'];

  const products = [
    { id: 1, name: 'Classic 3D Burger', category: 'Burger', price: 12.99, rating: 4.8, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400' },
    { id: 2, name: 'Rainbow Layer Cake', category: 'Cake', price: 24.99, rating: 4.9, image: 'https://images.unsplash.com/photo-1635822161882-b82ffacd8278?w=400' },
    { id: 3, name: 'Gourmet Gummy Mix', category: 'Candy', price: 8.99, rating: 4.7, image: 'https://images.unsplash.com/photo-1720924109595-161e675c792f?w=400' },
    { id: 4, name: 'Protein Power Burger', category: 'Burger', price: 15.99, rating: 4.9, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400' },
    { id: 5, name: 'Chocolate Dream Cake', category: 'Cake', price: 22.99, rating: 4.8, image: 'https://images.unsplash.com/photo-1635822161882-b82ffacd8278?w=400' },
    { id: 6, name: 'Fruit Burst Candy', category: 'Candy', price: 7.99, rating: 4.6, image: 'https://images.unsplash.com/photo-1720924109595-161e675c792f?w=400' },
  ];

  const toggleFlavor = (flavor: string) => {
    setSelectedFlavors(prev =>
      prev.includes(flavor) ? prev.filter(f => f !== flavor) : [...prev, flavor]
    );
  };

  const toggleNutrition = (nutrition: string) => {
    setSelectedNutrition(prev =>
      prev.includes(nutrition) ? prev.filter(n => n !== nutrition) : [...prev, nutrition]
    );
  };

  const clearFilters = () => {
    setSelectedFlavors([]);
    setSelectedNutrition([]);
    setSelectedCategory('all');
    setSearchQuery('');
  };

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'all' && product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Search Header - Gestalt: Proximity */}
      <div className="mb-12">
        <h1 className="text-4xl mb-6">Explore Products</h1>
        
        {/* Search Bar - Large, Prominent */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for 3D printed foods..."
              className="w-full pl-16 pr-6 py-5 rounded-2xl border-0 outline-none text-lg"
              style={{
                background: '#ffffff',
                boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
              }}
            />
          </div>
          
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-5 rounded-2xl flex items-center gap-3"
            style={{
              background: showFilters
                ? 'linear-gradient(135deg, #a18cd1 0%, #c9a9e9 100%)'
                : '#ffffff',
              boxShadow: showFilters
                ? '0 8px 32px rgba(161, 140, 209, 0.4)'
                : '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
              color: showFilters ? '#ffffff' : 'inherit',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filters</span>
          </motion.button>
        </div>
      </div>

      {/* Filters Panel - Gestalt: Common Region & Proximity */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-8 rounded-3xl overflow-hidden"
            style={{
              background: '#ffffff',
              boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3>Filter Options</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear All
              </button>
            </div>

            {/* Category Filter - Gestalt: Similarity */}
            <div className="mb-6">
              <label className="block mb-3 text-sm">Category</label>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <FilterTag
                    key={category}
                    label={category}
                    active={selectedCategory === category.toLowerCase()}
                    onClick={() => setSelectedCategory(category.toLowerCase())}
                  />
                ))}
              </div>
            </div>

            {/* Flavor Filter */}
            <div className="mb-6">
              <label className="block mb-3 text-sm">Flavor Profile</label>
              <div className="flex flex-wrap gap-3">
                {flavors.map((flavor) => (
                  <FilterTag
                    key={flavor}
                    label={flavor}
                    active={selectedFlavors.includes(flavor)}
                    onClick={() => toggleFlavor(flavor)}
                  />
                ))}
              </div>
            </div>

            {/* Nutrition Filter */}
            <div>
              <label className="block mb-3 text-sm">Nutrition</label>
              <div className="flex flex-wrap gap-3">
                {nutritionFilters.map((nutrition) => (
                  <FilterTag
                    key={nutrition}
                    label={nutrition}
                    active={selectedNutrition.includes(nutrition)}
                    onClick={() => toggleNutrition(nutrition)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Display - Gestalt: Proximity */}
      {(selectedFlavors.length > 0 || selectedNutrition.length > 0 || selectedCategory !== 'all') && (
        <div className="mb-6 flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {selectedCategory !== 'all' && (
            <ActiveFilterChip
              label={selectedCategory}
              onRemove={() => setSelectedCategory('all')}
            />
          )}
          {selectedFlavors.map((flavor) => (
            <ActiveFilterChip
              key={flavor}
              label={flavor}
              onRemove={() => toggleFlavor(flavor)}
            />
          ))}
          {selectedNutrition.map((nutrition) => (
            <ActiveFilterChip
              key={nutrition}
              label={nutrition}
              onRemove={() => toggleNutrition(nutrition)}
            />
          ))}
        </div>
      )}

      {/* Results Count */}
      <div className="mb-6 text-muted-foreground">
        Showing {filteredProducts.length} products
      </div>

      {/* Product Grid - Gestalt: Alignment & Similarity */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
      >
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => navigate(`/product/${product.id}`)}
            className="group cursor-pointer"
            layout
          >
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                background: '#ffffff',
                boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
              }}
            >
              <div className="relative h-56 overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6">
                <div className="text-xs text-muted-foreground mb-2">{product.category}</div>
                <h4 className="mb-4">{product.name}</h4>
                <div className="flex items-center justify-between">
                  <div className="text-2xl">${product.price}</div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{product.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="mb-2">No products found</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your filters</p>
          <button
            onClick={clearFilters}
            className="px-6 py-3 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, #a18cd1 0%, #c9a9e9 100%)',
              color: 'white',
              boxShadow: '0 8px 32px rgba(161, 140, 209, 0.4)',
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

// Filter Tag Component - Gestalt: Similarity
function FilterTag({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="px-5 py-2.5 rounded-xl transition-all text-sm"
      style={{
        background: active
          ? 'linear-gradient(135deg, #a18cd1 0%, #c9a9e9 100%)'
          : '#f5f7fa',
        color: active ? '#ffffff' : '#2d3142',
        boxShadow: active
          ? '0 4px 16px rgba(161, 140, 209, 0.3)'
          : 'inset 2px 2px 4px rgba(163, 177, 198, 0.15)',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.button>
  );
}

// Active Filter Chip
function ActiveFilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white"
      style={{
        background: 'linear-gradient(135deg, #89d4cf 0%, #a8e6cf 100%)',
      }}
    >
      {label}
      <button onClick={onRemove} className="hover:scale-110 transition-transform">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
