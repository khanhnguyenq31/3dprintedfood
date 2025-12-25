import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { CreditCard, MapPin, Package, CheckCircle2, Lock, Plus, Wallet, X } from 'lucide-react';
import { api } from '../lib/api';
import { CartOut, OrderOut, PaymentUrlOut } from '../types/api';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | 'new' | null>(null);
  const [cart, setCart] = useState<CartOut | null>(null);
  const [items, setItems] = useState<any[]>([]); // To display items in review

  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    label: 'Home',
    address: '',
    province: '',
    city: '',
    zipCode: '',
    // Card fields removed
  });

  useEffect(() => {
    // Fetch addresses
    api.get<any[]>('/users/me/addresses')
      .then(data => {
        setAddresses(data);
        if (data.length > 0) {
          setSelectedAddressId(data[0].id);
        } else {
          setSelectedAddressId('new');
        }
      })
      .catch(console.error);

    // Fetch Cart for summary
    api.get<CartOut>('/cart')
      .then(data => {
        setCart(data);
        setItems(data.items);
      })
      .catch(console.error);

  }, []);

  const total = items.reduce((sum, item) => {
    const price = item.custom_configuration?.price || item.product?.price || 0;
    return sum + price * item.quantity;
  }, 0) * 1.08 + 4.99; // Approx

  const handlePlaceOrder = async () => {
    if (!selectedAddressId || selectedAddressId === 'new') {
      alert("Please select a valid address");
      return;
    }

    try {
      // 1. Create Order
      const order = await api.post<OrderOut>('/order', {
        address_id: selectedAddressId
      });

      // 2. Get VNPay URL
      const amountStr = (order.total_amount * 100).toFixed(0);
      const paymentData = await api.post<PaymentUrlOut>('/order/payment_url', {
        vnp_Amount: amountStr,
        vnp_TxnRef: order.id.toString(),
        vnp_OrderInfo: `Payment for Order #${order.id}`,
        vnp_ReturnUrl: window.location.origin + '/payment-callback'
      });

      // 3. Redirect
      if (paymentData.payment_url) {
        window.location.href = paymentData.payment_url;
      } else {
        alert("Failed to generate payment URL");
      }

    } catch (error) {
      console.error("Order creation failed", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl mb-12 text-center">Checkout</h1>

      {/* Progress Steps - Gestalt: Continuity */}
      <div className="mb-12">
        <div className="flex items-center justify-center gap-4 mb-8">
          {[
            { num: 1, label: 'Delivery', icon: <MapPin className="w-5 h-5" /> },
            { num: 2, label: 'Payment', icon: <Wallet className="w-5 h-5" /> },
            { num: 3, label: 'Review', icon: <Package className="w-5 h-5" /> },
          ].map((s, index) => (
            <div key={s.num} className="flex items-center">
              <motion.div
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl ${step >= s.num ? 'text-white' : 'text-muted-foreground'
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

              {/* Address Selection */}
              {addresses.length > 0 && (
                <div className="mb-6 space-y-3">
                  <label className="block text-sm font-medium mb-2">Select Address</label>
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`relative p-4 rounded-xl cursor-pointer border-2 transition-all duration-200 ${selectedAddressId === addr.id
                        ? 'border-purple-600 bg-purple-50 shadow-sm'
                        : 'border-transparent bg-gray-50 hover:bg-gray-100'
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedAddressId === addr.id ? 'border-purple-600 bg-white' : 'border-gray-400'
                          }`}>
                          {selectedAddressId === addr.id && <div className="w-3 h-3 rounded-full bg-purple-600" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className={`font-semibold ${selectedAddressId === addr.id ? 'text-purple-900' : 'text-gray-900'}`}>{addr.label}</span>
                            {selectedAddressId === addr.id && <CheckCircle2 className="w-5 h-5 text-purple-600" />}
                          </div>
                          <div className="text-sm text-gray-500 mt-0.5">{addr.street}, {addr.city}</div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div
                    onClick={() => setSelectedAddressId('new')}
                    className={`p-4 rounded-xl cursor-pointer border-2 transition-all flex items-center gap-3 ${selectedAddressId === 'new'
                      ? 'border-purple-500 bg-purple-50/50'
                      : 'border-transparent bg-gray-50'
                      }`}
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add New Address</span>
                  </div>
                </div>
              )}

              {/* New Address Form */}
              {(selectedAddressId === 'new' || addresses.length === 0) && (
                <div className="space-y-4 border-2 border-purple-100 p-4 rounded-2xl bg-purple-50/30">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-lg text-purple-900">Add New Address</h3>
                    {addresses.length > 0 && (
                      <button
                        onClick={() => setSelectedAddressId(addresses[0].id)}
                        className="p-2 hover:bg-purple-100 rounded-full text-purple-700 transition-colors"
                        title="Cancel"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <InputField
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                  />
                  <InputField
                    label="Address Label (e.g. Home, Office)"
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    placeholder="Home"
                  />
                  <InputField
                    label="Full Name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="John Doe"
                  />
                  <InputField
                    label="Street Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="123 Main St, Apt 4B"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="Province"
                      value={formData.province}
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                      placeholder="Province"
                    />
                    <InputField
                      label="City"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="New York"
                    />
                  </div>
                  <InputField
                    label="Postal Code"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    placeholder="10001"
                  />
                </div>
              )}
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
                <Wallet className="w-6 h-6" />
                Payment Method
              </h2>

              <div className="p-6 rounded-2xl border-2 border-purple-500 bg-purple-50/20">
                <div className="flex items-center gap-4">
                  <img src="https://vnpay.vn/assets/images/logo-icon/logo-primary.svg" alt="VNPay" className="h-8" />
                  <div>
                    <div className="font-semibold text-lg">VNPay (Vietnam e-Wallet)</div>
                    <div className="text-sm text-muted-foreground">You will be redirected to VNPay to complete your secure payment.</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-6">
                <Lock className="w-4 h-4" />
                <span>Your payment information is secure and encrypted</span>
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
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="text-sm text-muted-foreground mb-1">Delivery Address</div>
                  {selectedAddressId === 'new' ? (
                    <div>
                      <div>{formData.fullName}</div>
                      <div>{formData.address}, {formData.city}</div>
                    </div>
                  ) : (
                    (() => {
                      const addr = addresses.find(a => a.id === selectedAddressId);
                      return addr ? (
                        <div>
                          <div className="font-medium">{addr.label}</div>
                          <div>{addr.street}, {addr.city}</div>
                        </div>
                      ) : <div>Unknown Address</div>
                    })()
                  )}
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="text-sm text-muted-foreground mb-1">Payment Method</div>
                  <div className="font-medium">VNPay E-Wallet</div>
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
                whileTap={{ scale: 0.98 }}
              >
                Back
              </motion.button>
            )}
            <motion.button
              type={'button'}
              onClick={async () => {
                if (step === 1) {
                  // Create Address if new
                  if (selectedAddressId === 'new') {
                    try {
                      const newAddress = await api.post<any>('/users/me/addresses', {
                        label: formData.label,
                        street: formData.address,
                        city: formData.city,
                        province: formData.province,
                        postal_code: formData.zipCode,
                        is_default: true,
                      });
                      setAddresses([...addresses, newAddress]);
                      setSelectedAddressId(newAddress.id);
                      setStep(step + 1);
                    } catch (e) {
                      alert('Failed to save address: ' + (e as any).message);
                      return;
                    }
                  } else if (selectedAddressId) {
                    setStep(step + 1);
                  } else {
                    alert("Please select or create an address");
                  }
                } else if (step === 2) {
                  setStep(step + 1);
                } else if (step === 3) {
                  handlePlaceOrder();
                }
              }}
              className="flex-1 py-4 rounded-2xl text-white"
              style={{
                background: 'linear-gradient(135deg, #a18cd1 0%, #c9a9e9 100%)',
                boxShadow: '0 8px 32px rgba(161, 140, 209, 0.4)',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {step === 3 ? 'Place Order & Pay' : 'Continue'}
            </motion.button>
          </div>
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
                <span className="text-muted-foreground">Items ({items.length})</span>
                {/* <span>${subtotal}</span> */}
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>Calculated at payment</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>50.000 VND</span>
              </div>
            </div>
            <div className="flex justify-between text-2xl mb-4">
              <span>Total</span>
              <span>{total} VND</span>
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
