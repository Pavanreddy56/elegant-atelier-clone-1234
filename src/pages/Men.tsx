import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { AuthModal } from "@/components/AuthModal";
import product6 from "@/assets/product-6-men.jpg";
import product7 from "@/assets/product-7-men.jpg";
import product9 from "@/assets/product-9-men.jpg";

import { products, getProductsByCategory } from "@/data/products";

const Men = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const categories = [
    { name: "Shirts", subcategory: "shirts", url: "/men/shirts", image: product6 },
    { name: "Jeans", subcategory: "jeans", url: "/men/jeans", image: product7 },
    { name: "Suits", subcategory: "suits", url: "/men/suits", image: product9 },
    { name: "Accessories", subcategory: "accessories", url: "/men/accessories", image: product7 },
  ];

  return (
    <div className="min-h-screen">
      <Header onAuthOpen={() => setAuthOpen(true)} onCartOpen={() => setCartOpen(true)} />
      
      <div className="container py-12">
        <div className="mb-12">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-foreground">Men</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">All Clothes</h1>
          <p className="text-muted-foreground">Explore our complete collection of men's fashion</p>
        </div>

        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category.name} className="border-b pb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-serif font-bold">{category.name}</h2>
                <Link to={category.url}>
                  <Button variant="outline">View All</Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {getProductsByCategory("men", category.subcategory).slice(0, 4).map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`} className="group">
                    <div className="relative overflow-hidden bg-secondary/50 aspect-[3/4]">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="font-serif text-lg font-medium group-hover:text-primary transition-smooth">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
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

export default Men;
