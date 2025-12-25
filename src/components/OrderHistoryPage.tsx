import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Package, Eye, RotateCcw, Loader2, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { api } from '../lib/api';
import { OrderOut } from '../types/api';

export default function OrderHistoryPage() {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [orders, setOrders] = useState<OrderOut[]>([]);
  const [loading, setLoading] = useState(true);
  const [reorderingId, setReorderingId] = useState<number | null>(null);

  useEffect(() => {
    api.get<OrderOut[]>('/order')
      .then(data => {
        setOrders(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleReorder = async (order: OrderOut) => {
    setReorderingId(order.id);
    try {
      // Create an array of promises to add each item to the cart
      const promises = order.items.map((item) =>
        api.post('/cart/items', {
          product_id: item.product_id,
          quantity: item.quantity,
          custom_configuration: item.custom_configuration,
        })
      );

      await Promise.all(promises);
      navigate('/cart');
    } catch (error) {
      console.error("Failed to reorder items", error);
      alert("Something went wrong while reordering. Please try again.");
    } finally {
      setReorderingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl mb-2">Order History</h1>
        <p className="text-muted-foreground">View and manage your past orders</p>
      </div>

      <div className="space-y-6">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-3xl overflow-hidden"
            style={{
              background: '#ffffff',
              boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
            }}
          >
            {/* Order Header - Gestalt: Proximity */}
            <div
              className="p-6 cursor-pointer"
              onClick={() => setSelectedOrder(selectedOrder === index ? null : index)}
              style={{
                background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #a18cd1 0%, #c9a9e9 100%)',
                    }}
                  >
                    <Package className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span>Order #{order.id}</span>
                      <span
                        className="px-3 py-1 rounded-full text-xs text-white"
                        style={{
                          background: 'linear-gradient(135deg, #89d4cf 0%, #a8e6cf 100%)',
                        }}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl mb-1">{order.total_amount}</div>
                  <div className="text-sm text-muted-foreground">{order.items.length} items</div>
                </div>
              </div>
            </div>

            {/* Order Details - Expandable */}
            <AnimatePresence>
              {selectedOrder === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 space-y-6">
                    {/* Items - Gestalt: Similarity & Alignment */}
                    <div>
                      <h4 className="mb-4">Order Items</h4>
                      <div className="space-y-4">
                        {order.items.map((item: any, itemIndex: number) => (
                          <div
                            key={itemIndex}
                            className="flex items-center gap-4 p-4 rounded-2xl"
                            style={{
                              background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
                            }}
                          >
                            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                              {/* If item has product details embedded, use them. Otherwise placeholder. */}
                              <ImageWithFallback
                                src={item.product?.image_url || 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=100'}
                                alt={item.product?.name || 'Product'}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="mb-1">{item.product?.name || `Product #${item.product_id}`}</div>
                              <div className="text-sm text-muted-foreground">Qty: {item.quantity}</div>
                            </div>
                            <div className="text-right">
                              <div className="mb-2">{item.product?.price ? item.product.price : '0.00'}</div>
                              <RatingButton productId={item.product_id} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions - Gestalt: Proximity */}
                    <div className="flex gap-4 pt-4 border-t border-border">
                      <motion.button
                        onClick={() => navigate(`/order-tracking/${order.id}`)}
                        className="flex-1 px-6 py-3 rounded-2xl flex items-center justify-center gap-2"
                        style={{
                          background: 'linear-gradient(135deg, rgb(48, 218, 207) 0%, #a8e6cf 100%)',
                          color: 'white',
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Eye className="w-5 h-5" />
                        View Details
                      </motion.button>
                      <motion.button
                        onClick={() => handleReorder(order)}
                        disabled={reorderingId === order.id}
                        className="flex-1 px-6 py-3 rounded-2xl flex items-center justify-center gap-2"
                        style={{
                          background: '#ffffff',
                          boxShadow: '6px 6px 12px rgba(163, 177, 198, 0.15), -6px -6px 12px rgba(255, 255, 255, 0.8)',
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {reorderingId === order.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <RotateCcw className="w-5 h-5" />}
                        Reorder
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {orders.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div
            className="w-32 h-32 mx-auto rounded-3xl flex items-center justify-center mb-6"
            style={{
              background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
            }}
          >
            <Package className="w-16 h-16 text-muted-foreground" />
          </div>
          <h2 className="text-3xl mb-4">No orders yet</h2>
          <p className="text-muted-foreground mb-8">Start your journey with 3D-printed food!</p>
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
        </motion.div>
      )}
    </div>
  );
}

function RatingButton({ productId }: { productId: number }) {
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return;
    setIsSubmitting(true);

    try {
      await api.post('/feedback', {
        product_id: productId,
        rating: rating,
        comment: comment
      });
      setIsSubmitted(true);
      setShowRating(false);
    } catch (error) {
      console.error("Failed to submit feedback", error);
      alert("Failed to submit feedback");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center gap-1 justify-end">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
          />
        ))}
      </div>
    );
  }

  if (showRating) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-6 w-full max-w-sm"
          style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Rate this product</h3>
            <button onClick={() => setShowRating(false)} className="p-1 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="hover:scale-110 transition-transform"
              >
                <Star
                  className={`w-8 h-8 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-200'}`}
                />
              </button>
            ))}
          </div>

          <textarea
            className="w-full p-4 rounded-xl bg-gray-50 border-0 focus:ring-2 ring-purple-200 outline-none mb-4 resize-none"
            rows={3}
            placeholder="Share your thoughts (optional)..."
            value={comment}
            onChange={e => setComment(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || rating === 0}
            className="w-full py-3 rounded-xl text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, #a18cd1 0%, #c9a9e9 100%)',
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowRating(true)}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors underline decoration-dotted"
    >
      Rate Product
    </button>
  );
}
