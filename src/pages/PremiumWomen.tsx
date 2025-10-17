import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import { AuthModal } from "@/components/AuthModal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

const premiumProducts = [
  { id: "1", name: "The Moonlit Garden", category: "Premium Dress", image: product1 },
  { id: "2", name: "The Orchid Gown", category: "Premium Gown", image: product2 },
  { id: "3", name: "The Crimson Petals", category: "Premium Evening", image: product3 },
  { id: "4", name: "Ivory Dream", category: "Premium Bridal", image: product4 },
  { id: "5", name: "Midnight Bloom", category: "Premium Collection", image: product5 },
  { id: "6", name: "Lumina", category: "Premium Couture", image: product6 },
  { id: "7", name: "The Silk Cascade", category: "Premium Dress", image: product1 },
  { id: "8", name: "Aurora Elegance", category: "Premium Gown", image: product2 },
];

const PremiumWomen = () => {
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
            <Link to="/women" className="hover:text-primary">Women</Link>
            <span>/</span>
            <span className="text-foreground">Premium Collection</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Premium Women's Collection</h1>
          <p className="text-muted-foreground">Discover our exclusive premium women's fashion</p>
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

export default PremiumWomen;
