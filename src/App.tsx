import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
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

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/information"
            element={<InformationPage />}
          />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="/product/:id"
            element={<ProductDetailPage />}
          />
          <Route
            path="/configurator/:id"
            element={<ConfiguratorPage />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/order-tracking/:orderId"
            element={<OrderTrackingPage />}
          />
          <Route
            path="/order-history"
            element={<OrderHistoryPage />}
          />
          <Route
            path="/subscription"
            element={<SubscriptionPage />}
          />
          <Route
            path="/style-guide"
            element={<StyleGuidePage />}
          />
        </Route>
      </Routes>
    </Router>
  );
}