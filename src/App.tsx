import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Women from "./pages/Women";
import Men from "./pages/Men";
import NewArrivals from "./pages/NewArrivals";
import PremiumWomen from "./pages/PremiumWomen";
import PremiumMen from "./pages/PremiumMen";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import News from "./pages/News";
import Bag from "./pages/Bag";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import MyAccount from "./pages/MyAccount";
import Orders from "./pages/Orders";
import SavedItems from "./pages/SavedItems";
import AccountDetails from "./pages/AccountDetails";
import Addresses from "./pages/Addresses";
import PaymentMethods from "./pages/PaymentMethods";
import Preferences from "./pages/Preferences";
import Search from "./pages/Search";
import Help from "./pages/Help";
import HelpDeliveryReturns from "./pages/HelpDeliveryReturns";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminCustomers from "./pages/admin/Customers";
import AdminAnalytics from "./pages/admin/Analytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/premium-women" element={<PremiumWomen />} />
          <Route path="/premium-men" element={<PremiumMen />} />
          <Route path="/women" element={<Women />} />
          <Route path="/men" element={<Men />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news" element={<News />} />
          <Route path="/bag" element={<Bag />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/my-account/orders" element={<Orders />} />
          <Route path="/my-account/saved-items" element={<SavedItems />} />
          <Route path="/my-account/details" element={<AccountDetails />} />
          <Route path="/my-account/addresses" element={<Addresses />} />
          <Route path="/my-account/payment-methods" element={<PaymentMethods />} />
          <Route path="/my-account/preferences" element={<Preferences />} />
          <Route path="/search" element={<Search />} />
          <Route path="/help" element={<Help />} />
          <Route path="/help/delivery-returns" element={<HelpDeliveryReturns />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/customers" element={<AdminCustomers />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
