import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, ShoppingCart, Heart, Share2, Sparkles, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { fetchProductDetail, fetchProductVariants, productDetailsDictionary, productVariantsDictionary, ProductDetailDisplay, Variant } from '../hooks/Product_hooks';

const DICTIONARY_CHECK_INTERVAL = 300;

const DEFAULT_PRODUCT: ProductDetailDisplay = {
  id: 0,
  name: 'Product',
  category: 'Uncategorized',
  price: 0,
  rating: 4.5,
  reviews: 0,
  image: 'https://images.unsplash.com/photo-1553678324-f84674bd7b24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwZm9vZCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY0MzMwMDcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  description: 'No description available',
  highlights: [
    'Customizable ingredients',
    'Zero food waste production',
    'Optimized nutrition',
    'Fresh ingredients daily',
  ],
  nutrition: null,
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [product, setProduct] = useState<ProductDetailDisplay>(DEFAULT_PRODUCT);
  const [loading, setLoading] = useState(true);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  const productId = parseInt(id || '0');
  
  const displayPrice = selectedVariant ? selectedVariant.price : product.price;
  const displayStock = selectedVariant ? selectedVariant.stock : 0;

  useEffect(() => {
    const loadProductDetail = async () => {
      if (productId === 0) {
        setLoading(false);
        return;
      }

      const cachedProduct = productDetailsDictionary.get(productId);
      if (cachedProduct) {
        setProduct(cachedProduct);
        setLoading(false);
        return;
      }

      const fetchedProduct = await fetchProductDetail(productId);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
      }
      setLoading(false);
    };

    loadProductDetail();

    const interval = setInterval(() => {
      const cachedProduct = productDetailsDictionary.get(productId);
      if (cachedProduct) {
        setProduct(cachedProduct);
        clearInterval(interval);
        setLoading(false);
      }
    }, DICTIONARY_CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, [productId]);

  useEffect(() => {
    const loadVariants = async () => {
      if (productId === 0) {
        return;
      }

      const cachedVariants = productVariantsDictionary.get(productId);
      if (cachedVariants && cachedVariants.length > 0) {
        setVariants(cachedVariants);
        if (!selectedVariant && cachedVariants.length > 0) {
          setSelectedVariant(cachedVariants[0]);
        }
        return;
      }

      const fetchedVariants = await fetchProductVariants(productId);
      if (fetchedVariants && fetchedVariants.length > 0) {
        setVariants(fetchedVariants);
        setSelectedVariant(fetchedVariants[0]);
      }
    };

    loadVariants();

    const interval = setInterval(() => {
      const cachedVariants = productVariantsDictionary.get(productId);
      if (cachedVariants && cachedVariants.length > 0) {
        setVariants(cachedVariants);
        if (!selectedVariant && cachedVariants.length > 0) {
          setSelectedVariant(cachedVariants[0]);
        }
        clearInterval(interval);
      }
    }, DICTIONARY_CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, [productId, selectedVariant]);

  const handleVariantSelect = (variant: Variant) => {
    setSelectedVariant(variant);
    setQuantity(1);
  };

  const addToCart = () => {
    // Mock add to cart - có thể lưu selectedVariant.id vào cart
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-20">
          <div className="text-4xl mb-4">⏳</div>
          <h3 className="mb-2">Loading product...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb - Gestalt: Continuity */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <button onClick={() => navigate('/')} className="hover:text-foreground">Home</button>
        <ChevronRight className="w-4 h-4" />
        <button onClick={() => navigate('/search')} className="hover:text-foreground">Products</button>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Left: Product Image - Gestalt: Figure/Ground */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div
            className="rounded-3xl overflow-hidden aspect-square"
            style={{
              boxShadow: '20px 20px 60px rgba(163, 177, 198, 0.3), -20px -20px 60px rgba(255, 255, 255, 0.8)',
            }}
          >
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Action Buttons */}
          <div className="absolute top-6 right-6 flex flex-col gap-3">
            <motion.button
              onClick={() => setLiked(!liked)}
              className="w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart
                className={`w-6 h-6 ${liked ? 'fill-red-500 text-red-500' : 'text-foreground'}`}
              />
            </motion.button>
            <motion.button
              className="w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>

        {/* Right: Product Info - Gestalt: Proximity & Alignment */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-sm text-muted-foreground mb-2">{product.category}</div>
          <h1 className="text-4xl mb-4">{product.name}</h1>

          {/* Rating - Gestalt: Proximity */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-muted-foreground">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="text-4xl mb-2">${displayPrice.toFixed(2)}</div>
          {selectedVariant && (
            <div className="text-sm text-muted-foreground mb-6">
              Stock: {displayStock} available
            </div>
          )}

          {/* Variants Selection */}
          {variants.length > 0 && (
            <div className="mb-6">
              <label className="block mb-3 text-sm font-medium">Select Variant</label>
              <div className="flex flex-wrap gap-3">
                {variants.map((variant) => (
                  <motion.button
                    key={variant.id}
                    onClick={() => handleVariantSelect(variant)}
                    className="px-5 py-3 rounded-xl text-sm transition-all"
                    style={{
                      background: selectedVariant?.id === variant.id
                        ? 'linear-gradient(135deg, #a18cd1 0%, #c9a9e9 100%)'
                        : '#f5f7fa',
                      color: selectedVariant?.id === variant.id ? '#ffffff' : '#2d3142',
                      boxShadow: selectedVariant?.id === variant.id
                        ? '0 4px 16px rgba(161, 140, 209, 0.3)'
                        : 'inset 2px 2px 4px rgba(163, 177, 198, 0.15)',
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={variant.stock === 0}
                  >
                    <div className="flex flex-col items-start">
                      <span>{variant.name}</span>
                      <span className="text-xs opacity-80">
                        ${variant.price.toFixed(2)} {variant.stock === 0 && '(Out of stock)'}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Highlights - Gestalt: Common Region */}
          <div
            className="p-6 rounded-2xl mb-8"
            style={{
              background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
            }}
          >
            <h4 className="mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Product Highlights
            </h4>
            <ul className="space-y-3">
              {product.highlights.map((highlight, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: 'linear-gradient(135deg, #a18cd1 0%, #c9a9e9 100%)' }}
                  />
                  <span>{highlight}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Quantity & Add to Cart - Gestalt: Proximity */}
          <div className="flex gap-4 mb-6">
            <div
              className="flex items-center gap-4 px-6 py-4 rounded-2xl"
              style={{
                background: '#ffffff',
                boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
              }}
            >
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                -
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>

            <motion.button
              onClick={addToCart}
              className="flex-1 py-4 rounded-2xl text-white flex items-center justify-center gap-2 group"
              style={{
                background: 'linear-gradient(135deg, #a18cd1 0%, #c9a9e9 100%)',
                boxShadow: '0 8px 32px rgba(161, 140, 209, 0.4)',
              }}
              whileHover={{ scale: 1.02, boxShadow: '0 12px 40px rgba(161, 140, 209, 0.5)' }}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </motion.button>
          </div>

          {/* Customize Button */}
          <motion.button
            onClick={() => navigate(`/configurator/${product.id}`)}
            className="w-full py-4 rounded-2xl flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, rgb(48, 218, 207) 0%, #a8e6cf 100%)',
              color: 'white',
              boxShadow: '0 8px 32px rgba(137, 212, 207, 0.4)',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Sparkles className="w-5 h-5" />
            Customize This Product
          </motion.button>
        </motion.div>
      </div>

      {/* Nutrition Information - Gestalt: Common Region & Alignment */}
      {product.nutrition && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-8 rounded-3xl"
          style={{
            background: '#ffffff',
            boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
          }}
        >
          <h2 className="text-2xl mb-6">Nutrition Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {Object.entries(product.nutrition).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="text-center p-6 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
                }}
              >
                <div className="text-3xl mb-2">{value}</div>
                <div className="text-sm text-muted-foreground capitalize">
                  {key === 'carbs' ? 'Carbs' : key}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {key === 'calories' ? 'kcal' : 'g'}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
