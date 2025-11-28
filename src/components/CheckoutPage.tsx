import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { CreditCard, MapPin, Package, CheckCircle2, Lock } from 'lucide-react';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock order creation
    const orderId = Math.random().toString(36).substring(7).toUpperCase();
    navigate(`/order-tracking/${orderId}`);
  };

  const total = 69.92; // Mock total

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl mb-12 text-center">Checkout</h1>

      {/* Progress Steps - Gestalt: Continuity */}
      <div className="mb-12">
        <div className="flex items-center justify-center gap-4 mb-8">
          {[
            { num: 1, label: 'Delivery', icon: <MapPin className="w-5 h-5" /> },
            { num: 2, label: 'Payment', icon: <CreditCard className="w-5 h-5" /> },
            { num: 3, label: 'Review', icon: <Package className="w-5 h-5" /> },
          ].map((s, index) => (
            <div key={s.num} className="flex items-center">
              <motion.div
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl ${
                  step >= s.num ? 'text-white' : 'text-muted-foreground'
                }`}
                style={{
                  background: step >= s.num
                    ? 'linear-gradient(135deg, #a18cd1 0%, #c9a9e9 100%)'
                    : '#f5f7fa',
                  boxShadow: step >= s.num
                    ? '0 8px 32px rgba(161, 140, 209, 0.3)'
                    : 'inset 2px 2px 4px rgba(163, 177, 198, 0.15)',
                }}
                whileHover={{ scale: 1.05 }}
              >
                {s.icon}
                <span>{s.label}</span>
                {step > s.num && <CheckCircle2 className="w-5 h-5" />}
              </motion.div>
              {index < 2 && (
                <div
                  className="w-12 h-1 mx-2 rounded"
                  style={{
                    background: step > s.num
                      ? 'linear-gradient(135deg, #a18cd1 0%, #c9a9e9 100%)'
                      : '#e8eef5',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form - Gestalt: Common Region */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            {/* Delivery Information */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-8 rounded-3xl mb-6"
                style={{
                  background: '#ffffff',
                  boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
                }}
              >
                <h2 className="text-2xl mb-6 flex items-center gap-3">
                  <MapPin className="w-6 h-6" />
                  Delivery Information
                </h2>
                <div className="space-y-4">
                  <InputField
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                  />
                  <InputField
                    label="Full Name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="John Doe"
                  />
                  <InputField
                    label="Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="123 Main St, Apt 4B"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="City"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="New York"
                    />
                    <InputField
                      label="ZIP Code"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      placeholder="10001"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Payment Information */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-8 rounded-3xl mb-6"
                style={{
                  background: '#ffffff',
                  boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
                }}
              >
                <h2 className="text-2xl mb-6 flex items-center gap-3">
                  <CreditCard className="w-6 h-6" />
                  Payment Method
                </h2>
                <div className="space-y-4">
                  <InputField
                    label="Card Number"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    placeholder="1234 5678 9012 3456"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="Expiry Date"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                      placeholder="MM/YY"
                    />
                    <InputField
                      label="CVV"
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                      placeholder="123"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                    <Lock className="w-4 h-4" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Review Order */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-8 rounded-3xl mb-6"
                style={{
                  background: '#ffffff',
                  boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
                }}
              >
                <h2 className="text-2xl mb-6 flex items-center gap-3">
                  <Package className="w-6 h-6" />
                  Review Your Order
                </h2>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Delivery Address</div>
                    <div>{formData.fullName}</div>
                    <div>{formData.address}</div>
                    <div>{formData.city}, {formData.zipCode}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Payment Method</div>
                    <div>Card ending in {formData.cardNumber.slice(-4)}</div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              {step > 1 && (
                <motion.button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex-1 py-4 rounded-2xl"
                  style={{
                    background: '#ffffff',
                    boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Back
                </motion.button>
              )}
              <motion.button
                type={step === 3 ? 'submit' : 'button'}
                onClick={() => step < 3 && setStep(step + 1)}
                className="flex-1 py-4 rounded-2xl text-white"
                style={{
                  background: 'linear-gradient(135deg, #a18cd1 0%, #c9a9e9 100%)',
                  boxShadow: '0 8px 32px rgba(161, 140, 209, 0.4)',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {step === 3 ? 'Place Order' : 'Continue'}
              </motion.button>
            </div>
          </form>
        </div>

        {/* Order Summary - Gestalt: Common Region */}
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
            <h3 className="text-xl mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6 pb-6 border-b border-border">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>$59.97</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>$4.80</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>$4.99</span>
              </div>
            </div>
            <div className="flex justify-between text-2xl mb-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Estimated delivery: 2-3 days
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block text-sm mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-4 rounded-2xl border-0 outline-none"
        style={{
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
          boxShadow: 'inset 2px 2px 4px rgba(163, 177, 198, 0.15)',
        }}
        required
      />
    </div>
  );
}
