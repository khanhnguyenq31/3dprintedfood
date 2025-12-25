import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Package, Truck, CheckCircle2, Clock } from 'lucide-react';
import { api } from '../lib/api';
import { OrderOut, AddressOut } from '../types/api';

export default function OrderTrackingPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderOut | null>(null);
  const [address, setAddress] = useState<AddressOut | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    // Fetch all orders and find the one matching ID (Since /order/{id} might not exist)
    api.get<OrderOut[]>('/order')
      .then(async (orders) => {
        const foundOrder = orders.find(o => o.id === Number(orderId));
        if (foundOrder) {
          setOrder(foundOrder);
          // Fetch address details
          try {
            const addresses = await api.get<AddressOut[]>('/users/me/addresses');
            const foundAddress = addresses.find(a => a.id === foundOrder.address_id);
            if (foundAddress) setAddress(foundAddress);
          } catch (e) {
            console.error("Failed to fetch address", e);
          }
        } else {
          // Handle not found
          console.error("Order not found");
          // maybe navigate back
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Order not found</h2>
        <button onClick={() => navigate('/order-history')} className="text-primary mt-4 hover:underline">Back to History</button>
      </div>
    )
  }

  // Determine current step based on status
  // Statuses: 'pending', 'confirmed', 'processing' (printing), 'ready' (quality check?), 'shipped' (out for delivery), 'delivered'
  // Simplified mapping
  let currentStep = 1;
  const statusLower = order.status.toLowerCase();

  if (statusLower === 'delivered') currentStep = 5;
  else if (statusLower === 'shipped' || statusLower === 'in_transit') currentStep = 4;
  else if (statusLower === 'ready' || statusLower === 'quality_check') currentStep = 3;
  else if (statusLower === 'processing' || statusLower === 'printing' || statusLower === 'confirmed') currentStep = 2;
  else currentStep = 1;

  const timeline = [
    {
      step: 1,
      label: 'Order Placed',
      description: 'Your order has been confirmed',
      timestamp: new Date(order.created_at).toLocaleString(),
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: '#a18cd1',
      completed: currentStep > 1,
      current: currentStep === 1,
    },
    {
      step: 2,
      label: 'Printing Started',
      description: '3D printing your customized food',
      timestamp: currentStep >= 2 ? 'In Progress' : 'Pending', // We don't have timestamps for steps yet
      icon: <Package className="w-6 h-6" />,
      color: '#89d4cf',
      completed: currentStep > 2,
      current: currentStep === 2,
    },
    {
      step: 3,
      label: 'Quality Check',
      description: 'Ensuring perfection',
      timestamp: currentStep >= 3 ? 'In Progress' : 'Pending',
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: '#ffa8b5',
      completed: currentStep > 3,
      current: currentStep === 3,
    },
    {
      step: 4,
      label: 'Out for Delivery',
      description: 'On its way to you',
      timestamp: currentStep >= 4 ? 'In Progress' : 'Pending',
      icon: <Truck className="w-6 h-6" />,
      color: '#ffd89b',
      completed: currentStep > 4,
      current: currentStep === 4,
    },
    {
      step: 5,
      label: 'Delivered',
      description: 'Enjoy your meal!',
      timestamp: currentStep === 5 ? 'Delivered' : 'Estimated',
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: '#c9a9e9',
      completed: currentStep === 5,
      current: false, // Delivered is final state
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-6"
          style={{
            background: 'linear-gradient(135deg, rgb(48, 218, 207) 0%, #a8e6cf 100%)',
            boxShadow: '0 8px 32px rgba(137, 212, 207, 0.3)',
          }}
        >
          <Package className="w-5 h-5 text-white" />
          <span className="text-white">Order #{order.id}</span>
        </div>
        <h1 className="text-4xl mb-4">Track Your Order</h1>
        <p className="text-lg text-muted-foreground">
          Current Status: {order.status}
        </p>
      </motion.div>

      {/* Timeline - Gestalt: Continuity & Alignment */}
      <div className="relative">
        {/* Connection Line */}
        <div
          className="absolute left-8 top-0 bottom-0 w-1 rounded"
          style={{
            background: 'linear-gradient(180deg, #a18cd1 0%, #89d4cf 25%, #ffa8b5 50%, #ffd89b 75%, #c9a9e9 100%)',
            opacity: 0.2,
          }}
        />

        <div className="space-y-8">
          {timeline.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex gap-6">
                {/* Icon - Gestalt: Figure/Ground */}
                <motion.div
                  className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-white relative z-10"
                  style={{
                    background: item.completed || item.current
                      ? `linear-gradient(135deg, ${item.color} 0%, ${item.color}99 100%)`
                      : '#e8eef5',
                    boxShadow: item.completed || item.current
                      ? `0 8px 32px ${item.color}40`
                      : 'inset 2px 2px 4px rgba(163, 177, 198, 0.15)',
                    color: item.completed || item.current ? 'white' : '#a3b1c6',
                  }}
                  animate={item.current ? {
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      `0 8px 32px ${item.color}40`,
                      `0 12px 40px ${item.color}60`,
                      `0 8px 32px ${item.color}40`,
                    ],
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: item.current ? Infinity : 0,
                  }}
                >
                  {item.current ? <Clock className="w-6 h-6" /> : item.icon}
                </motion.div>

                {/* Content - Gestalt: Proximity */}
                <div
                  className="flex-1 p-6 rounded-3xl"
                  style={{
                    background: item.completed || item.current ? '#ffffff' : '#f5f7fa',
                    boxShadow: item.completed || item.current
                      ? '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)'
                      : 'inset 2px 2px 4px rgba(163, 177, 198, 0.1)',
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3>{item.label}</h3>
                    {item.current && (
                      <motion.span
                        className="px-3 py-1 rounded-full text-xs text-white"
                        style={{
                          background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}99 100%)`,
                        }}
                        animate={{ opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        In Progress
                      </motion.span>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-2">{item.description}</p>
                  <div className="text-sm text-muted-foreground">{item.timestamp}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Delivery Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 p-8 rounded-3xl"
        style={{
          background: 'linear-gradient(135deg, rgb(88, 35, 212) 0%, #c9a9e9 100%)',
          boxShadow: '0 20px 60px rgba(161, 140, 209, 0.3)',
        }}
      >
        <div className="text-white">
          <h3 className="text-2xl mb-4">Delivery Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-white/70 mb-1">Delivery Address</div>
              {address ? (
                <>
                  <div>{address.address_line1}</div>
                  <div>{address.city}, {address.state} {address.postal_code}</div>
                </>
              ) : (
                <div>Loading address...</div>
              )}
            </div>
            <div>
              <div className="text-sm text-white/70 mb-1">Contact</div>
              {/* User contact should be fetched too if not in address, but for now placeholder or use address phone */}
              <div>{address?.phone || 'Loading...'}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
