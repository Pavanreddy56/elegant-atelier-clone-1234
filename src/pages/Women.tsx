import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { AuthModal } from "@/components/AuthModal";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

import { products, getProductsByCategory } from "@/data/products";

const Women = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const categories = [
    { name: "Dresses", subcategory: "dresses", url: "/women/dresses", image: product1 },
    { name: "Tops", subcategory: "tops", url: "/women/tops", image: product2 },
    { name: "Jeans", subcategory: "jeans", url: "/women/jeans", image: product3 },
    { name: "Coats & Jackets", subcategory: "coats-jackets", url: "/women/coats-jackets", image: product1 },
    { name: "Shoes", subcategory: "shoes", url: "/women/shoes", image: product2 },
    { name: "Accessories", subcategory: "accessories", url: "/women/accessories", image: product3 },
    { name: "Brands", subcategory: "brands", url: "/women/brands", image: product1 },
  ];

  return (
    <div className="min-h-screen">
      <Header onAuthOpen={() => setAuthOpen(true)} onCartOpen={() => setCartOpen(true)} />
      
      <div className="container py-12">
        <div className="mb-12">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-foreground">Women</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">All Women</h1>
          <p className="text-muted-foreground">Explore our complete collection of women's fashion</p>
        </div>

        <div className="space-y-8 md:space-y-12">
          {categories.map((category) => (
            <div key={category.name} className="border-b pb-6 md:pb-8">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold">{category.name}</h2>
                <Link to={category.url}>
                  <Button variant="outline" size="sm" className="md:h-10">View All</Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {getProductsByCategory("women", category.subcategory).slice(0, 4).map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`} className="group">
                    <div className="relative overflow-hidden bg-secondary/50 aspect-[3/4]">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-2 md:mt-4">
                      <h3 className="font-serif text-sm md:text-lg font-medium group-hover:text-primary transition-smooth">
                        {product.name}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground">{product.category}</p>
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

export default Women;
