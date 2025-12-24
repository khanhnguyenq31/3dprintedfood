import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, Printer, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { api, BASE_URL } from '../lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = `${BASE_URL}/user/auth/google/login`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const data = await api.post<{ access_token: string }>('/user/login', {
        email,
        password,
      });

      if (data.access_token) {
        toast.success('Login successful!');
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('isLoggedIn', 'true'); // Keep for compatibility if used elsewhere
        setTimeout(() => {
          navigate('/');
        }, 1200);
      } else {
        toast.error('Login failed! No token received.');
      }
    } catch (err: any) {
      console.error(err);

      toast.error(err.message || 'Login failed!');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
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
              <div className="text-2xl">Welcome Back</div>
              <div className="text-sm text-muted-foreground">Log in to PrintFood</div>
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
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <motion.input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-0 outline-none transition-all"
                    style={{
                      background: focusedField === 'email' ? '#ffffff' : '#f5f7fa',
                      boxShadow: focusedField === 'email'
                        ? 'inset 6px 6px 12px rgba(163, 177, 198, 0.2), inset -6px -6px 12px rgba(255, 255, 255, 0.8), 0 0 0 3px rgba(161, 140, 209, 0.1)'
                        : 'inset 3px 3px 6px rgba(163, 177, 198, 0.15)',
                    }}
                    required
                    animate={{
                      scale: focusedField === 'email' ? 1.02 : 1,
                    }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <motion.input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-4 rounded-2xl border-0 outline-none transition-all"
                    style={{
                      background: focusedField === 'password' ? '#ffffff' : '#f5f7fa',
                      boxShadow: focusedField === 'password'
                        ? 'inset 6px 6px 12px rgba(163, 177, 198, 0.2), inset -6px -6px 12px rgba(255, 255, 255, 0.8), 0 0 0 3px rgba(161, 140, 209, 0.1)'
                        : 'inset 3px 3px 6px rgba(163, 177, 198, 0.15)',
                    }}
                    required
                    animate={{
                      scale: focusedField === 'password' ? 1.02 : 1,
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Forgot password?
                </a>
              </div>



              <motion.button
                type="submit"
                className="w-full py-4 rounded-2xl text-white flex items-center justify-center gap-2 group"
                style={{
                  background: 'linear-gradient(135deg, rgb(88, 35, 212) 0%, #c9a9e9 100%)',
                  boxShadow: '0 8px 32px rgba(161, 140, 209, 0.4)',
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 12px 40px rgba(161, 140, 209, 0.5)' }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Sign In'}
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
                <span className="px-4 bg-[#f5f7fa] text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <motion.button
              onClick={handleGoogleLogin}
              className="w-full py-4 rounded-2xl bg-white border border-gray-200 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6" />
              <span className="text-gray-700 font-medium">Continue with Google</span>
            </motion.button>
          </div>

          <p className="text-center mt-6 text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/signup" className="text-foreground hover:underline">
              Sign up for free
            </Link>
          </p>
        </motion.div>
      </div>

      <motion.div
        className="hidden lg:flex flex-1 items-center justify-center p-12 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgb(88, 35, 212) 0%, #c9a9e9 100%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative z-10 text-white text-center max-w-md">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto mb-6 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Printer className="w-16 h-16" />
            </div>
            <h2 className="text-4xl mb-4">3D Printed Food</h2>
            <p className="text-lg text-white/90">
              Customize every aspect of your meal with precision technology
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              'Personalized nutrition',
              'Zero food waste',
              'Infinite customization',
            ].map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-3 justify-center"
              >
                <div className="w-2 h-2 rounded-full bg-white" />
                <span className="text-white/90">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
