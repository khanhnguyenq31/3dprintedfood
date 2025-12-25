import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useDiscounts } from '../hooks/useDiscounts';
import { api } from '../lib/api';
import { CartOut } from '../types/api';

export default function CartPage() {

  const navigate = useNavigate();
  const [cart, setCart] = useState<CartOut | null>(null);
  const [loadingCart, setLoadingCart] = useState(true);

  const { discounts, loading: loadingDiscounts } = useDiscounts();
  const [promoInput, setPromoInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<any>(null);
  const [discountError, setDiscountError] = useState('');

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    setLoadingCart(true);
    api.get<CartOut>('/cart')
      .then(data => {
        setCart(data);
        setLoadingCart(false);
      })
      .catch(err => {
        console.error("Error fetching cart", err);
        setLoadingCart(false);
      });
  };

  const updateQuantity = async (itemId: number, delta: number) => {
    const item = cart?.items.find(i => i.id === itemId);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty < 1) return;

    // Optimistic update could be done here, but for safety lets wait for API
    try {
      await api.put(`/cart/items/${itemId}`, { quantity: newQty });
      fetchCart();
    } catch (error) {
      console.error("Update quantity failed", error);
    }
  };

  const removeItem = async (itemId: number) => {
    try {
      await api.delete(`/cart/items/${itemId}`);
      fetchCart();
    } catch (error) {
      console.error("Remove item failed", error);
    }
  };

  const cartItems = cart?.items || [];

  const subtotal = cartItems.reduce((sum, item) => {
    // Use price from custom_configuration if available (for variants), else product price
    const price = item.custom_configuration?.price || item.product?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  const tax = subtotal * 0.08;
  const shipping = 4.99;

  function handleApplyDiscount() {
    setDiscountError('');
    const now = new Date();

    if (!discounts || discounts.length === 0) {
      setDiscountError('Đang tải dữ liệu mã giảm giá, vui lòng thử lại...');
      return;
    }

    const found = discounts.find(d => {
      const isCodeMatch = d.code.trim().toLowerCase() === promoInput.trim().toLowerCase();
      const isActive = d.is_active;
      const start = new Date(d.start_date);
      const end = new Date(d.end_date);
      return isCodeMatch && isActive && now >= start && now <= end;
    });

    if (found) {
      setAppliedDiscount(found);
      setDiscountError('');
    } else {
      setAppliedDiscount(null);
      setDiscountError('Mã không hợp lệ hoặc đã hết hạn');
    }
  }

  let discountValue = 0;
  if (appliedDiscount) {
    if (appliedDiscount.discount_type === 'percent') {
      discountValue = subtotal * (appliedDiscount.value / 100);
    } else {
      discountValue = appliedDiscount.value;
    }
  }
  const totalWithDiscount = Math.max(0, subtotal - discountValue + tax + shipping);
  const total = subtotal + tax + shipping;

  if (loadingCart) return <div className="min-h-screen pt-24 flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      {cartItems.length === 0 ? (
        <EmptyCart navigate={navigate} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items - Gestalt: Common Region */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => {
              const price = item.custom_configuration?.price || item.product?.price || 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-3xl"
                  style={{
                    background: '#ffffff',
                    boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
                  }}
                >
                  <div className="flex gap-6">
                    {/* Image */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden">
                        <ImageWithFallback
                          src={item.product?.image_url || 'https://via.placeholder.com/150'}
                          alt={item.product?.name || 'Product'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Info - Gestalt: Proximity & Alignment */}
                    <div className="flex-1">
                      <h3 className="mb-2 font-medium">{item.product?.name}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.custom_configuration && Object.entries(item.custom_configuration).map(([k, v], i) => {
                          if (k === 'price') return null; // Don't show price int config
                          return (
                            <span
                              key={i}
                              className="text-xs px-3 py-1 rounded-full text-muted-foreground border"
                              style={{
                                background: '#f5f7fa',
                              }}
                            >
                              {k === 'variant_name' ? String(v) : `${k}: ${v}`}
                            </span>
                          );
                        })}
                      </div>
                      <div className="text-2xl">{price}</div>
                    </div>

                    {/* Quantity Controls - Gestalt: Proximity */}
                    <div className="flex flex-col items-end justify-between">
                      <motion.button
                        onClick={() => removeItem(item.id)}
                        className="p-2 rounded-xl text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>

                      <div
                        className="flex items-center gap-3 px-4 py-2 rounded-xl"
                        style={{
                          background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-lg hover:bg-white transition-colors flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-lg hover:bg-white transition-colors flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Order Summary - Gestalt: Common Region & Alignment */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24 p-8 rounded-3xl"
              style={{
                background: '#ffffff',
                boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
              }}
            >
              <h2 className="text-2xl mb-6">Order Summary</h2>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm mb-2">Promo Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={e => setPromoInput(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-3 rounded-xl border-0 outline-none"
                    style={{
                      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
                      boxShadow: 'inset 2px 2px 4px rgba(163, 177, 198, 0.15)',
                    }}
                  />
                  <motion.button
                    disabled={loadingDiscounts}
                    onClick={handleApplyDiscount}
                    className="px-4 py-3 rounded-xl opacity-80 disabled:opacity-50"
                    style={{
                      background: 'linear-gradient(135deg, #89d4cf 0%, #a8e6cf 100%)',
                      color: 'white',
                    }}
                  >
                    {loadingDiscounts ? "..." : <Tag className="w-5 h-5" />}
                  </motion.button>
                </div>
                {appliedDiscount && (
                  <div className="mt-2 text-green-600 text-sm">
                    Applied: {appliedDiscount.code} (-{appliedDiscount.discount_type === 'percent' ? `${appliedDiscount.value}%` : `${appliedDiscount.value}`})
                  </div>
                )}
                {discountError && (
                  <div className="mt-2 text-red-600 text-sm">{discountError}</div>
                )}
              </div>

              {/* Price Breakdown - Gestalt: Alignment */}
              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{subtotal}</span>
                </div>
                {appliedDiscount && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="text-green-600">- {discountValue}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span>{tax}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping}</span>
                </div>
              </div>

              <div className="flex justify-between mb-8 text-2xl">
                <span>Total</span>
                <span>{(appliedDiscount ? totalWithDiscount : total)}</span>
              </div>

              <motion.button
                onClick={() => navigate('/checkout')}
                className="w-full py-5 rounded-2xl text-white flex items-center justify-center gap-3 group"
                style={{
                  background: 'linear-gradient(135deg, rgb(88, 35, 212) 0%, #c9a9e9 100%)',
                  boxShadow: '0 8px 32px rgba(161, 140, 209, 0.4)',
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 12px 40px rgba(161, 140, 209, 0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <button
                onClick={() => navigate('/search')}
                className="w-full mt-4 py-4 rounded-2xl text-center text-muted-foreground hover:text-foreground transition-colors"
              >
                Continue Shopping
              </button>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyCart({ navigate }: { navigate: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-20"
    >
      <div className="mb-8">
        <div
          className="w-32 h-32 mx-auto rounded-3xl flex items-center justify-center mb-6"
          style={{
            background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
          }}
        >
          <ShoppingBag className="w-16 h-16 text-muted-foreground" />
        </div>
        <h2 className="text-3xl mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8">
          Add some delicious 3D-printed food to get started!
        </p>
        <motion.button
          onClick={() => navigate('/search')}
          className="px-8 py-4 rounded-2xl text-white"
          style={{
            background: 'linear-gradient(135deg, #a18cd1 0%, #c9a9e9 100%)',
            boxShadow: '0 8px 32px rgba(161, 140, 209, 0.4)',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Browse Products
        </motion.button>
      </div>
    </motion.div>
  );
}
