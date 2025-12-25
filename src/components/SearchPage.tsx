import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, X, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { api } from '../lib/api';
import { TagOut, ProductOut, CategoryOut } from '../types/api';

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category'); // Get category from URL

  const [products, setProducts] = useState<ProductOut[]>([]);
  const [categories, setCategories] = useState<CategoryOut[]>([]);
  const [tags, setTags] = useState<TagOut[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  useEffect(() => {
    // Initialize category from URL if present
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    api.get<TagOut[]>('/catalog/tags')
      .then(data => setTags(data))
      .catch(console.error);

    api.get<CategoryOut[]>('/catalog/categories')
      .then(data => setCategories(data))
      .catch(console.error);

    api.get<ProductOut[]>('/catalog/products')
      .then(data => {
        setProducts(data);
      })
      .catch(console.error);
  }, []);

  const toggleTag = (tagId: number) => {
    setSelectedTags(prev =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedCategory('all');
    setSearchQuery('');
  };

  const filteredProducts = products.filter(product => {
    // Filter by Category
    if (selectedCategory !== 'all') {
      // Assuming selectedCategory matches category ID (if number) or name (if string)
      // The homepage links using ID. Let's handle both.
      // If selectedCategory is a number (stringified), compare with ID.
      // If it is a name, compare with name.
      // Strategy: Convert both to string for comparison or check logic.
      if (product.category_id.toString() !== selectedCategory && product.category?.name.toLowerCase() !== selectedCategory.toLowerCase()) {
        // Also check if selectedCategory corresponds to category name (homepage uses ID usually, but fallback used fallback names)
        return false;
      }
    }

    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    if (selectedTags.length > 0) {
      if (!product.tags) return false;
      const hasMatchingTag = product.tags.some(tagId => selectedTags.includes(tagId));
      if (!hasMatchingTag) return false;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl mb-6">Explore Products</h1>

        {/* Search Bar */}
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

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block mb-3 text-sm">Category</label>
              <div className="flex flex-wrap gap-3">
                <FilterTag
                  label="All"
                  active={selectedCategory === 'all'}
                  onClick={() => setSelectedCategory('all')}
                />
                {categories.map((category) => (
                  <FilterTag
                    key={category.id}
                    label={category.name}
                    active={selectedCategory === category.id.toString() || selectedCategory === category.name}
                    onClick={() => setSelectedCategory(category.id.toString())}
                  />
                ))}
              </div>
            </div>

            {/* Tags Filter */}
            <div className="mb-6">
              <label className="block mb-3 text-sm">Tags</label>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <FilterTag
                    key={tag.id}
                    label={tag.name}
                    active={selectedTags.includes(tag.id)}
                    onClick={() => toggleTag(tag.id)}
                  />
                ))}
                {tags.length === 0 && <span className="text-muted-foreground italic">No tags available</span>}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {(selectedCategory !== 'all' || selectedTags.length > 0) && (
        <div className="mb-6 flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {selectedCategory !== 'all' && (
            <ActiveFilterChip
              label={categories.find(c => c.id.toString() === selectedCategory)?.name || selectedCategory}
              onRemove={() => setSelectedCategory('all')}
            />
          )}
          {selectedTags.map((tagId) => {
            const tag = tags.find(t => t.id === tagId);
            if (!tag) return null;
            return (
              <ActiveFilterChip
                key={tagId}
                label={tag.name}
                onRemove={() => toggleTag(tagId)}
              />
            );
          })}
        </div>
      )}

      {/* Results Count */}
      <div className="mb-6 text-muted-foreground">
        Showing {filteredProducts.length} products
      </div>

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
                  src={product.image_url || 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400'} // Fallback if null
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6">
                <div className="text-xs text-muted-foreground mb-2">{product.category?.name || 'Uncategorized'}</div>
                <h4 className="mb-4">{product.name}</h4>
                <div className="flex items-center justify-between">
                  <div className="text-2xl">{product.price} VND</div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">4.8</span>
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

// Filter Tag Component
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
