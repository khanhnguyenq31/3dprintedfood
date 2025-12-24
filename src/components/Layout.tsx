import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Printer, Home, Search, Package, History, CreditCard, Info, Heart, LogOut, Bell } from 'lucide-react';
import { api } from '../lib/api';
import { NotificationOut } from '../types/api';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

function NotificationBell() {
  const [notifications, setNotifications] = useState<NotificationOut[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access_token')) return;

    api.get<NotificationOut[]>('/notifications')
      .then(data => {
        setNotifications(data);
        setUnreadCount(data.filter((n) => !n.is_read).length);
      })
      .catch(console.error);
  }, []);

  const handleMarkRead = async (id: number) => {
    try {
      await api.put(`/notifications/${id}/read`, {});
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking read', error);
    }
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative w-12 h-12 rounded-xl flex items-center justify-center"
        style={{
          background: '#ffffff',
          boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bell className="w-5 h-5 text-foreground" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border border-white" />
        )}
      </motion.button>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-2xl p-4 shadow-xl z-50 border border-gray-100"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Notifications</h3>
              <button onClick={() => setShowDropdown(false)} className="text-xs text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
            </div>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {notifications.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">No notifications</p>
              ) : (
                notifications.map(n => (
                  <div
                    key={n.id}
                    className={`p-3 rounded-xl text-sm cursor-pointer transition-colors ${n.is_read ? 'bg-gray-50' : 'bg-blue-50'}`}
                    onClick={() => !n.is_read && handleMarkRead(n.id)}
                  >
                    <div className="font-medium mb-1">{n.title}</div>
                    <div className="text-gray-600 text-xs">{n.content}</div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Forces re-render on route change
  const cartItemCount = 3; // Mock data

  return (
    <div className="min-h-screen">

      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-border/50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                className="w-12 h-12 rounded-2xl flex items-center justify-center relative"
                style={{
                  background: 'linear-gradient(135deg, rgb(88, 35, 212) 0%, #c9a9e9 100%)',
                  boxShadow: '0 8px 32px rgba(161, 140, 209, 0.25)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Printer className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <div className="font-semibold text-xl text-foreground">PrintFood</div>
                <div className="text-xs text-muted-foreground">Future of Dining</div>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <NavLink to="/" icon={<Home className="w-4 h-4" />}>Home</NavLink>
              <NavLink to="/information" icon={<Info className="w-4 h-4" />}>About</NavLink>
              <NavLink to="/search" icon={<Search className="w-4 h-4" />}>Search</NavLink>
              <NavLink to="/subscription" icon={<CreditCard className="w-4 h-4" />}>Plans</NavLink>
              <NavLink to="/order-history" icon={<History className="w-4 h-4" />}>Orders</NavLink>
              <NavLink to="wishlist" icon={<Heart className="w-4 h-4" />}>Wishlist</NavLink>
            </div>

            <div className="flex items-center gap-3">
              {localStorage.getItem('access_token') && <NotificationBell />}

              <motion.button
                onClick={() => navigate('/cart')}
                className="relative w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: '#ffffff',
                  boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="w-5 h-5 text-foreground" />
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white"
                    style={{
                      background: 'linear-gradient(135deg,rgb(198, 29, 54) 0%, #ffc4d6 100%)',
                      boxShadow: '0 0 20px rgba(255, 168, 181, 0.5)',
                    }}
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </motion.button>

              {localStorage.getItem('access_token') ? (
                <motion.button
                  onClick={() => {
                    api.delete('/user/logout').finally(() => {
                      localStorage.removeItem('access_token');
                      localStorage.removeItem('isLoggedIn');
                      navigate('/login');
                    });
                  }}
                  className="hidden md:flex w-12 h-12 rounded-xl items-center justify-center"
                  style={{
                    background: '#ff4d4f', // Red for logout
                    boxShadow: '0 0 20px rgba(255, 77, 79, 0.3)',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Logout"
                >
                  <LogOut className="w-5 h-5 text-white" />
                </motion.button>
              ) : (
                <motion.button
                  onClick={() => navigate('/login')}
                  className="hidden md:flex w-12 h-12 rounded-xl items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg,rgb(88, 35, 212) 0%, #c9a9e9 100%)',
                    boxShadow: '0 0 20px rgba(161, 140, 209, 0.3)',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <User className="w-5 h-5 text-white" />
                </motion.button>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: '#ffffff',
                  boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
                }}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden pb-4 space-y-2"
              >
                <MobileNavLink to="/" icon={<Home className="w-4 h-4" />} onClick={() => setMobileMenuOpen(false)}>
                  Home
                </MobileNavLink>
                <MobileNavLink to="/information" icon={<Info className="w-4 h-4" />} onClick={() => setMobileMenuOpen(false)}>
                  About
                </MobileNavLink>
                <MobileNavLink to="/search" icon={<Search className="w-4 h-4" />} onClick={() => setMobileMenuOpen(false)}>
                  Search
                </MobileNavLink>
                <MobileNavLink to="/subscription" icon={<CreditCard className="w-4 h-4" />} onClick={() => setMobileMenuOpen(false)}>
                  Plans
                </MobileNavLink>
                <MobileNavLink to="/order-history" icon={<History className="w-4 h-4" />} onClick={() => setMobileMenuOpen(false)}>
                  Orders
                </MobileNavLink>
                <MobileNavLink to="/login" icon={<User className="w-4 h-4" />} onClick={() => setMobileMenuOpen(false)}>
                  Account
                </MobileNavLink>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      <footer className="mt-24 border-t border-border/50 bg-white/50 backdrop-blur-sm flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgb(88, 35, 212) 0%, #c9a9e9 100%)',
                  }}
                >
                  <Printer className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold">PrintFood</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Revolutionary 3D-printed food technology for a sustainable future.
              </p>
            </div>
            <div>
              <h4 className="mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/search?category=burger" className="hover:text-foreground transition-colors">Burgers</Link></li>
                <li><Link to="/search?category=cake" className="hover:text-foreground transition-colors">Cakes</Link></li>
                <li><Link to="/search?category=candy" className="hover:text-foreground transition-colors">Candy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/information" className="hover:text-foreground transition-colors">About Us</Link></li>
                <li><Link to="/subscription" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link to="/order-history" className="hover:text-foreground transition-colors">My Orders</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/feedback" className="hover:text-foreground transition-colors">Feedback</a></li>
                <li><a href="/contact" className="hover:text-foreground transition-colors">Contact Us</a></li>
                <li><Link to="/style-guide" className="hover:text-foreground transition-colors">Style Guide</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className="w-full py-12 text-center text-sm text-white font-medium"
          style={{
            background: 'linear-gradient(135deg, rgb(88, 35, 212) 0%, #c9a9e9 100%)',
          }}
        >
          © 2025 PrintFood. Future of dining, today.
        </div>
      </footer>
    </div>
  );
}

function NavLink({ to, icon, children }: { to: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Link to={to}>
      <motion.div
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-foreground/70 hover:text-foreground transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {icon}
        {children}
      </motion.div>
    </Link>
  );
}

function MobileNavLink({ to, icon, children, onClick }: { to: string; icon: React.ReactNode; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link to={to} onClick={onClick}>
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl"
        style={{
          background: '#ffffff',
          boxShadow: '6px 6px 12px rgba(163, 177, 198, 0.15), -6px -6px 12px rgba(255, 255, 255, 0.8)',
        }}
      >
        {icon}
        <span className="text-sm">{children}</span>
      </div>
    </Link>
  );
}
