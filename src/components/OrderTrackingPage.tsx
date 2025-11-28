import { useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Package, Truck, CheckCircle2, Clock } from 'lucide-react';

export default function OrderTrackingPage() {
  const { orderId } = useParams();

  const orderStatus = {
    orderId: orderId || 'ABC123',
    status: 'in_transit',
    estimatedDelivery: 'November 30, 2025',
    currentStep: 3,
  };

  const timeline = [
    {
      step: 1,
      label: 'Order Placed',
      description: 'Your order has been confirmed',
      timestamp: 'Nov 28, 10:30 AM',
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: '#a18cd1',
      completed: true,
    },
    {
      step: 2,
      label: 'Printing Started',
      description: '3D printing your customized food',
      timestamp: 'Nov 28, 11:00 AM',
      icon: <Package className="w-6 h-6" />,
      color: '#89d4cf',
      completed: true,
    },
    {
      step: 3,
      label: 'Quality Check',
      description: 'Ensuring perfection',
      timestamp: 'Nov 28, 2:15 PM',
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: '#ffa8b5',
      completed: true,
    },
    {
      step: 4,
      label: 'Out for Delivery',
      description: 'On its way to you',
      timestamp: 'Nov 29, 8:00 AM',
      icon: <Truck className="w-6 h-6" />,
      color: '#ffd89b',
      completed: false,
      current: true,
    },
    {
      step: 5,
      label: 'Delivered',
      description: 'Enjoy your meal!',
      timestamp: 'Estimated: Nov 30',
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: '#c9a9e9',
      completed: false,
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
          <span className="text-white">Order #{orderStatus.orderId}</span>
        </div>
        <h1 className="text-4xl mb-4">Track Your Order</h1>
        <p className="text-lg text-muted-foreground">
          Estimated delivery: {orderStatus.estimatedDelivery}
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
              <div>123 Main St, Apt 4B</div>
              <div>New York, NY 10001</div>
            </div>
            <div>
              <div className="text-sm text-white/70 mb-1">Contact</div>
              <div>you@example.com</div>
              <div>+1 (555) 123-4567</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
