import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart } from "lucide-react";

const SavedItems = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header onAuthOpen={() => setAuthOpen(true)} onCartOpen={() => setCartOpen(true)} />
      
      <div className="container py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Link to="/my-account">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Account
            </Button>
          </Link>

          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">Saved Items</h1>

          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Heart className="h-24 w-24 text-muted-foreground/30 mb-6" />
            <h2 className="text-2xl font-serif font-semibold mb-3">No saved items</h2>
            <p className="text-muted-foreground mb-8">Save items you love to view them later</p>
            <Link to="/shop/women">
              <Button size="lg">Explore Collections</Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
      <WhatsAppButton />
    </div>
  );
};

export default SavedItems;
