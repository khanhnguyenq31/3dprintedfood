import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Save, ShoppingCart, RotateCcw, Sparkles, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { api } from '../lib/api';
import { ProductOut, CartItemCreate } from '../types/api';

export default function ConfiguratorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductOut | null>(null);
  const [loading, setLoading] = useState(true);

  // State for customization
  const [meatRatio, setMeatRatio] = useState(60);
  const [vegetableRatio, setVegetableRatio] = useState(30);
  const [sauceAmount, setSauceAmount] = useState(10);
  const [thickness, setThickness] = useState(2.5);
  const [diameter, setDiameter] = useState(12);

  // Calculate price based on customization
  const [basePrice, setBasePrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);

  useEffect(() => {
    if (!id) return;
    api.get<ProductOut>(`/catalog/products/${id}`)
      .then(data => {
        setProduct(data);
        setBasePrice(data.price);
        setCurrentPrice(data.price);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    // Real-time price calculation based on sliders
    // Assuming base price includes default config. Extra changes add cost.
    // Simplifying: Just adding cost for "extra" dimensions or ratios for demo
    // Ideally this logic would be more complex or fetched, but "search google run that" implies simulated.

    // Deviation from default (arbitrary numbers for simulation)
    const meatCost = ((meatRatio - 50) / 100) * 5; // + for more meat
    const vegCost = ((vegetableRatio - 30) / 100) * 2;
    const sizeFactor = (thickness * diameter) / (2.5 * 12); // Ratio to default size

    let newPrice = basePrice * sizeFactor + Math.max(0, meatCost) + Math.max(0, vegCost);

    // Ensure price doesn't go below base (or minimal reasonable price)
    if (newPrice < basePrice * 0.8) newPrice = basePrice * 0.8;

    setCurrentPrice(parseFloat(newPrice));
  }, [meatRatio, vegetableRatio, sauceAmount, thickness, diameter, basePrice]);

  const resetToDefaults = () => {
    setMeatRatio(60);
    setVegetableRatio(30);
    setSauceAmount(10);
    setThickness(2.5);
    setDiameter(12);
  };

  const addToCart = async () => {
    if (!product) return;

    // Calculate nutrition
    const nutrition = {
      calories: Math.round(350 + meatRatio * 2),
      protein: Math.round(20 + meatRatio * 0.3),
      carbs: Math.round(25 + vegetableRatio * 0.2),
      fat: Math.round(12 + sauceAmount * 0.15),
    };

    const customConfig = {
      meatRatio,
      vegetableRatio,
      sauceAmount,
      thickness,
      diameter,
      nutrition: nutrition,
      finalPrice: currentPrice // Passing price might not be secure in real app, but for this demo ok. 
      // Real app would recalculate on backend.
    };

    try {
      await api.post('/cart/items', {
        product_id: product.id,
        quantity: 1,
        custom_configuration: customConfig
      });
      navigate('/cart');
    } catch (e) {
      console.error("Failed to add to cart", e);
      alert("Failed to add to cart");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-6"
          style={{
            background: 'linear-gradient(135deg, rgb(88, 35, 212) 0%, #c9a9e9 100%)',
            boxShadow: '0 8px 32px rgba(161, 140, 209, 0.25)',
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <Sparkles className="w-5 h-5 text-white" />
          <span className="text-white">Food Configurator</span>
        </motion.div>
        <h1 className="text-5xl mb-4">Design Your Perfect {product.name}</h1>
        <p className="text-xl text-muted-foreground">
          Customize every aspect and watch your creation come to life
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Controls - Gestalt: Common Region & Proximity */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Ingredient Ratios Section */}
          <div
            className="p-8 rounded-3xl"
            style={{
              background: '#ffffff',
              boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
            }}
          >
            <h2 className="text-2xl mb-6">Ingredient Ratios</h2>

            {/* Meat Ratio Slider */}
            <SliderControl
              label="Meat Ratio"
              value={meatRatio}
              onChange={setMeatRatio}
              min={0}
              max={100}
              unit="%"
              color="#ffa8b5"
              icon="🥩"
            />

            {/* Vegetable Ratio Slider */}
            <SliderControl
              label="Vegetable Ratio"
              value={vegetableRatio}
              onChange={setVegetableRatio}
              min={0}
              max={100}
              unit="%"
              color="#89d4cf"
              icon="🥬"
            />

            {/* Sauce Amount Slider */}
            <SliderControl
              label="Sauce Amount"
              value={sauceAmount}
              onChange={setSauceAmount}
              min={0}
              max={100}
              unit="%"
              color="#a18cd1"
              icon="🍯"
            />
          </div>

          {/* Size & Dimensions Section */}
          <div
            className="p-8 rounded-3xl"
            style={{
              background: '#ffffff',
              boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
            }}
          >
            <h2 className="text-2xl mb-6">Size & Dimensions</h2>

            {/* Thickness Slider */}
            <SliderControl
              label="Thickness"
              value={thickness}
              onChange={setThickness}
              min={1}
              max={5}
              step={0.1}
              unit="cm"
              color="#ffd89b"
              icon="📏"
            />

            {/* Diameter Slider */}
            <SliderControl
              label="Diameter"
              value={diameter}
              onChange={setDiameter}
              min={8}
              max={20}
              step={0.5}
              unit="cm"
              color="#c9a9e9"
              icon="⭕"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <motion.button
              onClick={resetToDefaults}
              className="flex-1 px-6 py-4 rounded-2xl flex items-center justify-center gap-2"
              style={{
                background: '#ffffff',
                boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </motion.button>

            <motion.button
              onClick={() => alert('Saved as template! (Mock)')}
              className="px-6 py-4 rounded-2xl flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, rgb(48, 218, 207) 0%, #a8e6cf 100%)',
                color: 'white',
                boxShadow: '0 8px 32px rgba(137, 212, 207, 0.4)',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Save className="w-5 h-5" />
              Save
            </motion.button>
          </div>
        </motion.div>

        {/* Right: Preview & Price - Gestalt: Figure/Ground & Proximity */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="sticky top-24 h-fit"
        >
          {/* Preview Image */}
          <div
            className="rounded-3xl overflow-hidden mb-6 relative"
            style={{
              boxShadow: '20px 20px 60px rgba(163, 177, 198, 0.3), -20px -20px 60px rgba(255, 255, 255, 0.8)',
            }}
          >
            <div className="aspect-square relative">
              <ImageWithFallback
                src={product.image_url || 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* Overlay with configuration info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Real-time Preview Indicators */}
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <PreviewBar label="Meat" percentage={meatRatio} color="#ffa8b5" />
                <PreviewBar label="Veggies" percentage={vegetableRatio} color="#89d4cf" />
                <PreviewBar label="Sauce" percentage={sauceAmount} color="#a18cd1" />
              </div>

              {/* Size Indicator */}
              <motion.div
                className="absolute top-6 right-6 px-4 py-2 rounded-xl backdrop-blur-lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="text-sm">
                  {diameter}cm × {thickness}cm
                </div>
              </motion.div>
            </div>
          </div>

          {/* Price Display - Gestalt: Common Region */}
          <motion.div
            className="p-8 rounded-3xl"
            style={{
              background: '#ffffff',
              boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
            }}
            animate={{ scale: currentPrice !== basePrice ? [1, 1.02, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Total Price</div>
                <motion.div
                  className="text-5xl"
                  key={currentPrice}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                >
                  ${currentPrice}
                </motion.div>
              </div>
              {Math.abs(currentPrice - basePrice) > 0.01 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, #ffa8b5 0%, #ffc4d6 100%)',
                  }}
                >
                  <TrendingUp className="w-4 h-4 text-white" />
                  <span className="text-sm text-white">
                    {currentPrice > basePrice ? '+' : ''}${(currentPrice - basePrice)}
                  </span>
                </motion.div>
              )}
            </div>

            {/* Nutrition Estimate */}
            <div className="grid grid-cols-4 gap-3 mb-6 p-4 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
              }}
            >
              <div className="text-center">
                <div className="text-xl mb-1">{Math.round(350 + meatRatio * 2)}</div>
                <div className="text-xs text-muted-foreground">Cal</div>
              </div>
              <div className="text-center">
                <div className="text-xl mb-1">{Math.round(20 + meatRatio * 0.3)}g</div>
                <div className="text-xs text-muted-foreground">Protein</div>
              </div>
              <div className="text-center">
                <div className="text-xl mb-1">{Math.round(25 + vegetableRatio * 0.2)}g</div>
                <div className="text-xs text-muted-foreground">Carbs</div>
              </div>
              <div className="text-center">
                <div className="text-xl mb-1">{Math.round(12 + sauceAmount * 0.15)}g</div>
                <div className="text-xs text-muted-foreground">Fat</div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              onClick={addToCart}
              className="w-full py-5 rounded-2xl text-white flex items-center justify-center gap-3 group"
              style={{
                background: 'linear-gradient(135deg, rgb(88, 35, 212) 0%, #c9a9e9 100%)',
                boxShadow: '0 8px 32px rgba(161, 140, 209, 0.4)',
              }}
              whileHover={{ scale: 1.02, boxShadow: '0 12px 40px rgba(161, 140, 209, 0.5)' }}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="text-lg">Add to Cart - ${currentPrice}</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// Slider Control Component - Gestalt: Similarity & Alignment
function SliderControl({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
  color,
  icon,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit: string;
  color: string;
  icon: string;
}) {
  return (
    <div className="mb-8 last:mb-0">
      <div className="flex items-center justify-between mb-4">
        <label className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <span>{label}</span>
        </label>
        <motion.div
          className="px-4 py-2 rounded-xl"
          style={{
            background: `${color}15`,
            color: color,
          }}
          key={value}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.2 }}
        >
          {value}{unit}
        </motion.div>
      </div>

      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-3 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${color} 0%, ${color} ${((value - min) / (max - min)) * 100}%, #e8eef5 ${((value - min) / (max - min)) * 100}%, #e8eef5 100%)`,
            boxShadow: 'inset 2px 2px 4px rgba(163, 177, 198, 0.2)',
          }}
        />
      </div>

      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

// Preview Bar Component
function PreviewBar({ label, percentage, color }: { label: string; percentage: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-white text-sm w-16">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-white/20 backdrop-blur-sm overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <span className="text-white text-sm w-12">{percentage}%</span>
    </div>
  );
}
