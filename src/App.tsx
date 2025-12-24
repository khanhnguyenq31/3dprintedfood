import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Toaster } from 'sonner';
import Layout from "./components/Layout";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import InformationPage from "./components/InformationPage";
import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage";
import ProductDetailPage from "./components/ProductDetailPage";
import ConfiguratorPage from "./components/ConfiguratorPage";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import OrderTrackingPage from "./components/OrderTrackingPage";
import OrderHistoryPage from "./components/OrderHistoryPage";
import SubscriptionPage from "./components/SubscriptionPage";
import StyleGuidePage from "./components/StyleGuidePage";
import ContactUsPage from "./components/ContactUsPage";
import FeedbackPage from "./components/FeedbackPage";
import WishlistPage from "./components/WishlistPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthCallbackPage from "./components/AuthCallbackPage";
export default function App() {
  return (
    <Router>
      <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route path="/" element={<Layout />}>
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/style-guide" element={<StyleGuidePage />} />
          <Route path="/information" element={<InformationPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route index element={<HomePage />} />

          {/* Các trang cần đăng nhập */}
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <WishlistPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/configurator/:id"
            element={
              <ProtectedRoute>
                <ConfiguratorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-tracking/:orderId"
            element={
              <ProtectedRoute>
                <OrderTrackingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-history"
            element={
              <ProtectedRoute>
                <OrderHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/subscription"
            element={
              <ProtectedRoute>
                <SubscriptionPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}