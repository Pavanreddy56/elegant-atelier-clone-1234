import { useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import { AuthModal } from "@/components/AuthModal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product6 from "@/assets/product-6-men.jpg";
import product7 from "@/assets/product-7-men.jpg";
import product9 from "@/assets/product-9-men.jpg";

const CategoryPage = () => {
  const { category } = useParams();
  const location = useLocation();
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  
  // Detect gender from URL path
  const gender = location.pathname.startsWith('/women') ? 'women' : 'men';

  // Sample products for demonstration
  const products = gender === "women" 
    ? [
        { id: "1", name: "Elegant Dress", category: category || "Fashion", image: product1 },
        { id: "2", name: "Classic Top", category: category || "Fashion", image: product2 },
        { id: "3", name: "Designer Piece", category: category || "Fashion", image: product3 },
        { id: "4", name: "Premium Item", category: category || "Fashion", image: product1 },
      ]
    : [
        { id: "5", name: "Formal Shirt", category: category || "Fashion", image: product6 },
        { id: "6", name: "Classic Suit", category: category || "Fashion", image: product7 },
        { id: "7", name: "Designer Wear", category: category || "Fashion", image: product9 },
        { id: "8", name: "Premium Style", category: category || "Fashion", image: product6 },
      ];

  const getCategoryTitle = () => {
    if (!category) return "";
    return category
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const title = getCategoryTitle();

  return (
    <div className="min-h-screen">
      <Header onAuthOpen={() => setAuthOpen(true)} onCartOpen={() => setCartOpen(true)} />
      
      <div className="container py-12">
        <div className="mb-12">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to={`/${gender}`} className="hover:text-primary capitalize">{gender}</Link>
            <span>/</span>
            <span className="text-foreground">{title}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-bold">{gender === "women" ? "Women's" : "Men's"} {title}</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
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

export default CategoryPage;
