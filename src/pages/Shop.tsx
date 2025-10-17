import { useState } from "react";
import { useParams, Link } from "react-router-dom";
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
import product6 from "@/assets/product-6-men.jpg";
import product7 from "@/assets/product-7-men.jpg";
import product8 from "@/assets/product-8.jpg";
import product9 from "@/assets/product-9-men.jpg";
import product10 from "@/assets/product-10-men.jpg";

const allProducts = [
  { id: "1", name: "The Moonlit Garden", category: "Dress", image: product1, type: "ready-to-wear", gender: "women" },
  { id: "2", name: "The Orchid Gown", category: "Gown", image: product2, type: "couture", gender: "women" },
  { id: "3", name: "The Crimson Petals", category: "Evening Wear", image: product3, type: "couture", gender: "women" },
  { id: "4", name: "Ivory Dream", category: "Bridal", image: product4, type: "couture", gender: "women" },
  { id: "5", name: "Midnight Bloom", category: "Evening Wear", image: product5, type: "ready-to-wear", gender: "women" },
  { id: "6", name: "Lumina", category: "Cocktail", image: product6, type: "ready-to-wear", gender: "men" },
  { id: "7", name: "Bloodstone", category: "Evening Wear", image: product7, type: "couture", gender: "men" },
  { id: "8", name: "Red Jasper", category: "Gown", image: product8, type: "ready-to-wear", gender: "men" },
  { id: "9", name: "Ruby", category: "Suit", image: product9, type: "couture", gender: "men" },
  { id: "10", name: "Jasper", category: "Blazer", image: product10, type: "ready-to-wear", gender: "men" },
];

const Shop = () => {
  const { category } = useParams();
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  // Parse the URL: /shop/:gender or /shop/:gender/:type
  const pathParts = category?.split('/') || [];
  const gender = pathParts[0]; // 'men' or 'women'
  const type = pathParts[1]; // 'ready-to-wear' or 'couture'

  const filteredProducts = allProducts.filter((p) => {
    if (!category) return true; // Show all if no category
    
    // If gender is specified
    if (gender === 'men' || gender === 'women') {
      const matchesGender = p.gender === gender;
      // If type is also specified
      if (type) {
        return matchesGender && p.type === type;
      }
      return matchesGender;
    }
    
    // Legacy support for direct type filtering
    if (gender === 'ready-to-wear' || gender === 'couture') {
      return p.type === gender;
    }
    
    return true;
  });

  const getTitle = () => {
    if (gender === 'women') {
      if (type === 'couture') return "Women's Couture";
      if (type === 'ready-to-wear') return "Women's Ready to Wear";
      return "Women's Collection";
    }
    if (gender === 'men') {
      if (type === 'couture') return "Men's Couture";
      if (type === 'ready-to-wear') return "Men's Ready to Wear";
      return "Men's Collection";
    }
    if (gender === 'couture') return "Couture Collection";
    if (gender === 'ready-to-wear') return "Ready to Wear";
    return "All Collections";
  };

  const title = getTitle();

  return (
    <div className="min-h-screen">
      <Header onAuthOpen={() => setAuthOpen(true)} onCartOpen={() => setCartOpen(true)} />
      
      <div className="container py-12">
        <div className="mb-12">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-foreground">Shop</span>
            {category && (
              <>
                <span>/</span>
                <span className="text-foreground capitalize">{category.replace("-", " ")}</span>
              </>
            )}
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-bold">{title}</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
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

export default Shop;
