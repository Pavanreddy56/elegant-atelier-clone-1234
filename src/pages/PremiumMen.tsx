import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import { AuthModal } from "@/components/AuthModal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import product6 from "@/assets/product-6-men.jpg";
import product7 from "@/assets/product-7-men.jpg";
import product9 from "@/assets/product-9-men.jpg";
import product10 from "@/assets/product-10-men.jpg";

const premiumProducts = [
  { id: "1", name: "Lumina", category: "Premium Suit", image: product6 },
  { id: "2", name: "Bloodstone", category: "Premium Evening", image: product7 },
  { id: "3", name: "Ruby", category: "Premium Suit", image: product9 },
  { id: "4", name: "Jasper", category: "Premium Blazer", image: product10 },
  { id: "5", name: "The Executive", category: "Premium Collection", image: product6 },
  { id: "6", name: "Midnight Noir", category: "Premium Formal", image: product7 },
  { id: "7", name: "Sterling Elite", category: "Premium Suit", image: product9 },
  { id: "8", name: "Prestige", category: "Premium Couture", image: product10 },
];

const PremiumMen = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header onAuthOpen={() => setAuthOpen(true)} onCartOpen={() => setCartOpen(true)} />
      
      <div className="container py-12">
        <div className="mb-12">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/men" className="hover:text-primary">Men</Link>
            <span>/</span>
            <span className="text-foreground">Premium Collection</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Premium Men's Collection</h1>
          <p className="text-muted-foreground">Discover our exclusive premium men's fashion</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {premiumProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
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

export default PremiumMen;
