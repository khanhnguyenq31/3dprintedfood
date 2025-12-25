import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, User, Printer, ArrowRight, Eye, EyeOff, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { api, BASE_URL } from '../lib/api';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignup = () => {
    window.location.href = `${BASE_URL}/user/auth/google/login`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post<{ message: string }>('/user/register-user', {
        fullname: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        password: formData.password,
      });

      toast.success('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Registration failed!');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      <motion.div
        className="hidden lg:flex flex-1 items-center justify-center p-12 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgb(88, 35, 212) 0%, #c9a9e9 100%)',
          boxShadow: '0 0 20px rgba(161, 140, 209, 0.3)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative z-10 text-white text-center max-w-md">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl mb-4">Join PrintFood</h2>
            <p className="text-lg text-white/90 mb-8">
              Start your journey into the future of sustainable dining
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: 'Burgers', icon: '🍔' },
                { name: 'Cakes', icon: '🎂' },
                { name: 'Candy', icon: '🍬' },
              ].map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm"
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-sm">{item.name}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="flex items-center gap-3 mb-8">
            <motion.div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgb(88, 35, 212) 0%, #c9a9e9 100%)',
                boxShadow: '0 0 20px rgba(161, 140, 209, 0.3)',
              }}
              whileHover={{ scale: 1.05 }}
            >
              <Printer className="w-7 h-7 text-white" />
            </motion.div>
            <div>
              <div className="text-2xl">Create Account</div>
              <div className="text-sm text-muted-foreground">Join PrintFood today</div>
            </div>
          </Link>

          <motion.form
            onSubmit={handleSubmit}
            className="p-8 rounded-3xl"
            style={{
              background: '#ffffff',
              boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="space-y-5">
              <InputField
                id="name"
                label="Full Name"
                type="text"
                icon={<User className="w-5 h-5" />}
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
              />

              <InputField
                id="email"
                label="Email Address"
                type="email"
                icon={<Mail className="w-5 h-5" />}
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
              />

              <InputField
                id="phone"
                label="Phone Number"
                type="tel"
                icon={<Phone className="w-5 h-5" />}
                placeholder="0703315830"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
              />

              <div>
                <label htmlFor="password" className="block mb-2 text-sm">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <motion.input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-4 rounded-2xl border-0 outline-none transition-all"
                    style={{
                      background: focusedField === 'password' ? '#ffffff' : '#f5f7fa',
                      boxShadow: focusedField === 'password'
                        ? 'inset 6px 6px 12px rgba(163, 177, 198, 0.2), inset -6px -6px 12px rgba(255, 255, 255, 0.8), 0 0 0 3px rgba(137, 212, 207, 0.1)'
                        : 'inset 3px 3px 6px rgba(163, 177, 198, 0.15)',
                    }}
                    required
                    animate={{ scale: focusedField === 'password' ? 1.02 : 1 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <InputField
                id="confirmPassword"
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                icon={<Lock className="w-5 h-5" />}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
              />



              <motion.button
                type="submit"
                className="w-full py-4 rounded-2xl text-white flex items-center justify-center gap-2 group"
                style={{
                  background: 'linear-gradient(135deg, rgb(88, 35, 212) 0%, #c9a9e9 100%)',
                  boxShadow: '0 0 20px rgba(161, 140, 209, 0.3)',
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 12px 40px rgba(137, 212, 207, 0.5)' }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Create Account'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.form>

          <div className="mt-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#f5f7fa] text-muted-foreground">Or join with</span>
              </div>
            </div>

            <motion.button
              onClick={handleGoogleSignup}
              className="w-full py-4 rounded-2xl bg-white border border-gray-200 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6" />
              <span className="text-gray-700 font-medium">Sign up with Google</span>
            </motion.button>
          </div>

          <p className="text-center mt-6 text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-foreground hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function InputField({
  id,
  label,
  type,
  icon,
  placeholder,
  value,
  onChange,
  focusedField,
  setFocusedField,
}: {
  id: string;
  label: string;
  type: string;
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </div>
        <motion.input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocusedField(id)}
          onBlur={() => setFocusedField(null)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-4 rounded-2xl border-0 outline-none transition-all"
          style={{
            background: focusedField === id ? '#ffffff' : '#f5f7fa',
            boxShadow: focusedField === id
              ? 'inset 6px 6px 12px rgba(163, 177, 198, 0.2), inset -6px -6px 12px rgba(255, 255, 255, 0.8), 0 0 0 3px rgba(137, 212, 207, 0.1)'
              : 'inset 3px 3px 6px rgba(163, 177, 198, 0.15)',
          }}
          required
          animate={{ scale: focusedField === id ? 1.02 : 1 }}
        />
      </div>
    </div>
  );
}
