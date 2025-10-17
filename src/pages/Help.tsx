import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useState } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { AuthModal } from "@/components/AuthModal";
import { Package, CreditCard, ShoppingBag, User, MessageCircle } from "lucide-react";

const Help = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const helpSections = [
    {
      icon: Package,
      title: "Delivery & Returns",
      description: "Shipping information, returns policy, and order tracking",
      link: "/help/delivery-returns"
    },
    {
      icon: CreditCard,
      title: "Orders & Payment",
      description: "Payment methods, order status, and promotions",
      link: "/help/orders-payment"
    },
    {
      icon: ShoppingBag,
      title: "Products & Stock",
      description: "Product information, size guides, and availability",
      link: "/help/products-stock"
    },
    {
      icon: User,
      title: "Account Help",
      description: "Account management and preferences",
      link: "/help/account"
    },
    {
      icon: MessageCircle,
      title: "Contact Us",
      description: "Get in touch with our customer service team",
      link: "/help/contact"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header onAuthOpen={() => setAuthOpen(true)} onCartOpen={() => setCartOpen(true)} />
      
      <div className="container py-12">
        <div className="mb-12">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-foreground">Help Center</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Help Center</h1>
          <p className="text-muted-foreground">How can we help you today?</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpSections.map((section) => (
            <Link 
              key={section.title}
              to={section.link}
              className="p-6 border rounded-lg hover:border-primary transition-smooth group"
            >
              <section.icon className="h-10 w-10 mb-4 text-primary" />
              <h2 className="text-xl font-serif font-bold mb-2 group-hover:text-primary transition-smooth">
                {section.title}
              </h2>
              <p className="text-muted-foreground">{section.description}</p>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
      <WhatsAppButton />
    </div>
  );
};

export default Help;
