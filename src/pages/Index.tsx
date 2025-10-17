import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import { AuthModal } from "@/components/AuthModal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import coutureHero from "@/assets/couture-hero.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";
import product9 from "@/assets/product-9.jpg";
import product10 from "@/assets/product-10.jpg";

const latestProducts = [
  { id: "1", name: "The Moonlit Garden", category: "Dress", image: product1, isNew: true },
  { id: "2", name: "The Orchid Gown", category: "Gown", image: product2, isNew: true },
  { id: "3", name: "The Crimson Petals", category: "Evening Wear", image: product3, isNew: true },
  { id: "4", name: "Ivory Dream", category: "Bridal", image: product4, isNew: true },
  { id: "5", name: "Midnight Bloom", category: "Evening Wear", image: product5, isNew: true },
  { id: "6", name: "Lumina", category: "Cocktail", image: product6, isNew: true },
  { id: "7", name: "Bloodstone", category: "Evening Wear", image: product7, isNew: true },
  { id: "8", name: "Red Jasper", category: "Gown", image: product8, isNew: true },
];

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header onAuthOpen={() => setAuthOpen(true)} onCartOpen={() => setCartOpen(true)} />
      
      {/* Hero Section 1 */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <img 
          src={hero1} 
          alt="The Whispers of Charm" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
          <div className="container">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                The Whispers of Charm
              </h1>
              <Link to="/premium-women">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Discover <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section 2 */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <img 
          src={hero2} 
          alt="Make your Own Style" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/50 to-transparent flex items-center justify-end">
          <div className="container">
            <div className="max-w-xl ml-auto text-right">
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                Make your Own Style
              </h1>
              <Link to="/premium-men">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Arrivals */}
      <section className="container py-16 md:py-24">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">LATEST ARRIVALS</h2>
          <Link to="/women">
            <Button variant="outline" className="hidden md:flex items-center gap-2">
              View all <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {latestProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link to="/women">
            <Button variant="outline" className="w-full">
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="container py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
            "Fashion is a form of art that has no boundaries. When aestheticism resides in the soul and body of art and gives it practical meaning, that's where the future is created."
          </p>
        </div>
      </section>

      {/* Couture Section */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img 
          src={coutureHero} 
          alt="All Coutures" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center">
          <div className="container">
            <div className="max-w-xl">
              <p className="text-white/90 text-sm uppercase tracking-wider mb-4">COUTURE</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">
                All Coutures
              </h2>
              <Link to="/men">
                <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary backdrop-blur">
                  View all <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
