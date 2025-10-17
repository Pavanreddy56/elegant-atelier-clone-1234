import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { AuthModal } from "@/components/AuthModal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { products } from "@/data/products";

const NewArrivals = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  // Get all products (both women and men)
  const allProducts = products;

  return (
    <div className="min-h-screen bg-background">
      <Header onAuthOpen={() => setAuthOpen(true)} onCartOpen={() => setCartOpen(true)} />
      
      <main className="container py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">NEW ARRIVALS</h1>
          <p className="text-muted-foreground">Fresh styles for everyone</p>
        </div>

        {/* Women's Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif font-bold">WOMEN</h2>
            <Link to="/women" className="text-sm text-primary hover:underline">
              View All Women's Collection →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.filter(p => p.gender === "women").map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="group">
                <div className="relative overflow-hidden bg-secondary/50 aspect-[3/4] rounded-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 space-y-1">
                  <h3 className="font-serif text-sm md:text-base font-medium group-hover:text-primary transition-smooth line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">{product.category}</p>
                  <p className="text-sm md:text-base font-semibold">₹{product.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Men's Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif font-bold">MEN</h2>
            <Link to="/men" className="text-sm text-primary hover:underline">
              View All Men's Collection →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.filter(p => p.gender === "men").map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="group">
                <div className="relative overflow-hidden bg-secondary/50 aspect-[3/4] rounded-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 space-y-1">
                  <h3 className="font-serif text-sm md:text-base font-medium group-hover:text-primary transition-smooth line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">{product.category}</p>
                  <p className="text-sm md:text-base font-semibold">₹{product.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
      <WhatsAppButton />
    </div>
  );
};

export default NewArrivals;
