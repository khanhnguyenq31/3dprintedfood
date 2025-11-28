import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Zap, Sparkles, Crown } from 'lucide-react';

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Starter',
      icon: <Zap className="w-8 h-8" />,
      gradient: 'linear-gradient(135deg, #89d4cf 0%, #a8e6cf 100%)',
      monthlyPrice: 9.99,
      yearlyPrice: 99.99,
      description: 'Perfect for trying 3D-printed food',
      features: [
        '5 custom meals per month',
        'Basic customization',
        'Standard delivery',
        'Email support',
        'Recipe library access',
      ],
      popular: false,
    },
    {
      name: 'Pro',
      icon: <Sparkles className="w-8 h-8" />,
      gradient: 'linear-gradient(135deg, #a18cd1 0%, #c9a9e9 100%)',
      monthlyPrice: 24.99,
      yearlyPrice: 249.99,
      description: 'Most popular for food enthusiasts',
      features: [
        '20 custom meals per month',
        'Advanced customization',
        'Priority delivery',
        'Priority support',
        'Nutrition consultation',
        'Early access to new foods',
        'Custom recipe creation',
      ],
      popular: true,
    },
    {
      name: 'Premium',
      icon: <Crown className="w-8 h-8" />,
      gradient: 'linear-gradient(135deg, #ffa8b5 0%, #ffc4d6 100%)',
      monthlyPrice: 49.99,
      yearlyPrice: 499.99,
      description: 'Ultimate experience for connoisseurs',
      features: [
        'Unlimited custom meals',
        'Full customization suite',
        'Express delivery',
        '24/7 VIP support',
        'Personal nutrition coach',
        'Exclusive flavors & ingredients',
        'Beta features access',
        'Custom packaging',
      ],
      popular: false,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-16">
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
          <span className="text-white">Subscription Plans</span>
        </motion.div>
        <h1 className="text-5xl mb-6">Choose Your Plan</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Unlock the full potential of 3D-printed food with a subscription
        </p>

        {/* Billing Toggle - Gestalt: Common Region */}
        <div
          className="inline-flex p-2 rounded-2xl gap-2"
          style={{
            background: '#ffffff',
            boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
          }}
        >
          <button
            onClick={() => setBillingCycle('monthly')}
            className="px-6 py-3 rounded-xl transition-all"
            style={{
              background: billingCycle === 'monthly'
                ? 'linear-gradient(135deg, #a18cd1 0%, #c9a9e9 100%)'
                : 'transparent',
              color: billingCycle === 'monthly' ? '#ffffff' : 'inherit',
              boxShadow: billingCycle === 'monthly' ? '0 4px 16px rgba(161, 140, 209, 0.3)' : 'none',
            }}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className="px-6 py-3 rounded-xl transition-all relative"
            style={{
              background: billingCycle === 'yearly'
                ? 'linear-gradient(135deg, #a18cd1 0%, #c9a9e9 100%)'
                : 'transparent',
              color: billingCycle === 'yearly' ? '#ffffff' : 'inherit',
              boxShadow: billingCycle === 'yearly' ? '0 4px 16px rgba(161, 140, 209, 0.3)' : 'none',
            }}
          >
            Yearly
            <span
              className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs text-white"
              style={{
                background: 'linear-gradient(135deg, #ffa8b5 0%, #ffc4d6 100%)',
              }}
            >
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Plans Grid - Gestalt: Similarity & Common Region */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {/* Popular Badge */}
            {plan.popular && (
              <motion.div
                className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full text-sm text-white z-10"
                style={{
                  background: 'linear-gradient(135deg, #ffa8b5 0%, #ffc4d6 100%)',
                  boxShadow: '0 8px 32px rgba(255, 168, 181, 0.4)',
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                Most Popular
              </motion.div>
            )}

            <motion.div
              className="p-8 rounded-3xl h-full flex flex-col"
              style={{
                background: '#ffffff',
                boxShadow: plan.popular
                  ? '20px 20px 60px rgba(163, 177, 198, 0.3), -20px -20px 60px rgba(255, 255, 255, 0.8)'
                  : '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
                transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
              }}
              whileHover={{ y: -8 }}
            >
              {/* Plan Header - Gestalt: Proximity */}
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-white mx-auto"
                style={{ background: plan.gradient }}
              >
                {plan.icon}
              </div>

              <h3 className="text-2xl text-center mb-2">{plan.name}</h3>
              <p className="text-sm text-muted-foreground text-center mb-6">
                {plan.description}
              </p>

              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-1 mb-1">
                  <span className="text-5xl">
                    ${billingCycle === 'monthly' ? plan.monthlyPrice : Math.floor(plan.yearlyPrice / 12)}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                {billingCycle === 'yearly' && (
                  <div className="text-sm text-muted-foreground">
                    ${plan.yearlyPrice} billed annually
                  </div>
                )}
              </div>

              {/* Features - Gestalt: Alignment */}
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-white"
                      style={{ background: plan.gradient }}
                    >
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.button
                className="w-full py-4 rounded-2xl text-white"
                style={{
                  background: plan.gradient,
                  boxShadow: `0 8px 32px ${plan.gradient.includes('a18cd1') ? 'rgba(161, 140, 209, 0.4)' : plan.gradient.includes('89d4cf') ? 'rgba(137, 212, 207, 0.4)' : 'rgba(255, 168, 181, 0.4)'}`,
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.button>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Comparison Table - Gestalt: Alignment & Common Region */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-8 rounded-3xl"
        style={{
          background: '#ffffff',
          boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
        }}
      >
        <h2 className="text-3xl mb-8 text-center">Compare Plans</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4">Feature</th>
                {plans.map((plan) => (
                  <th key={plan.name} className="text-center py-4 px-4">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Custom meals', '5/month', '20/month', 'Unlimited'],
                ['Customization level', 'Basic', 'Advanced', 'Full'],
                ['Delivery speed', 'Standard', 'Priority', 'Express'],
                ['Support', 'Email', 'Priority', '24/7 VIP'],
                ['Nutrition consultation', '—', '✓', '✓'],
                ['Recipe creation', '—', '✓', '✓'],
                ['Beta access', '—', '—', '✓'],
              ].map((row, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-4 px-4">{row[0]}</td>
                  {row.slice(1).map((cell, j) => (
                    <td key={j} className="py-4 px-4 text-center text-muted-foreground">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-16 text-center"
      >
        <h3 className="text-2xl mb-4">Questions?</h3>
        <p className="text-muted-foreground mb-6">
          Contact our team to learn more about our subscription plans
        </p>
        <motion.button
          className="px-8 py-4 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgb(48, 218, 207) 0%, #a8e6cf 100%)',
            color: 'white',
            boxShadow: '0 8px 32px rgba(137, 212, 207, 0.4)',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Support
        </motion.button>
      </motion.div>
    </div>
  );
}
