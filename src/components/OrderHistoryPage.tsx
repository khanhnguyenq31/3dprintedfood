import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, Package, Eye, RotateCcw } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function OrderHistoryPage() {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

  const orders = [
    {
      id: 'ABC123',
      date: 'November 28, 2025',
      status: 'Delivered',
      total: 69.92,
      items: [
        { name: 'Classic 3D Burger', quantity: 2, price: 12.99, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=100', rating: 0 },
        { name: 'Rainbow Layer Cake', quantity: 1, price: 24.99, image: 'https://images.unsplash.com/photo-1635822161882-b82ffacd8278?w=100', rating: 5 },
      ],
    },
    {
      id: 'DEF456',
      date: 'November 20, 2025',
      status: 'Delivered',
      total: 45.97,
      items: [
        { name: 'Protein Power Burger', quantity: 1, price: 15.99, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=100', rating: 4 },
        { name: 'Gourmet Gummy Mix', quantity: 3, price: 8.99, image: 'https://images.unsplash.com/photo-1720924109595-161e675c792f?w=100', rating: 5 },
      ],
    },
  ];

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
                    <div className="text-sm text-muted-foreground">{order.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl mb-1">${order.total.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">{order.items.length} items</div>
                </div>
              </div>
            </div>

            {/* Order Details - Expandable */}
            {selectedOrder === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-6 space-y-6"
              >
                {/* Items - Gestalt: Similarity & Alignment */}
                <div>
                  <h4 className="mb-4">Order Items</h4>
                  <div className="space-y-4">
                    {order.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center gap-4 p-4 rounded-2xl"
                        style={{
                          background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
                        }}
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="mb-1">{item.name}</div>
                          <div className="text-sm text-muted-foreground">Qty: {item.quantity}</div>
                        </div>
                        <div className="text-right">
                          <div className="mb-2">${item.price}</div>
                          {item.rating > 0 ? (
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < item.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          ) : (
                            <RatingButton itemName={item.name} />
                          )}
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
                    onClick={() => navigate('/search')}
                    className="flex-1 px-6 py-3 rounded-2xl flex items-center justify-center gap-2"
                    style={{
                      background: '#ffffff',
                      boxShadow: '6px 6px 12px rgba(163, 177, 198, 0.15), -6px -6px 12px rgba(255, 255, 255, 0.8)',
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <RotateCcw className="w-5 h-5" />
                    Reorder
                  </motion.button>
                </div>
              </motion.div>
            )}
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

function RatingButton({ itemName }: { itemName: string }) {
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);

  if (rating > 0) {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  }

  if (showRating) {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className="hover:scale-110 transition-transform"
          >
            <Star className="w-5 h-5 text-yellow-400 hover:fill-yellow-400" />
          </button>
        ))}
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowRating(true)}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      Rate Product
    </button>
  );
}
