import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Package, MapPin, Heart, User, CreditCard, Settings, LogOut } from "lucide-react";

const MyAccount = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const navigate = useNavigate();

  const accountSections = [
    { icon: Package, title: "Orders", description: "View your order history", path: "/my-account/orders" },
    { icon: Heart, title: "Saved Items", description: "Your wishlist items", path: "/my-account/saved-items" },
    { icon: MapPin, title: "Addresses", description: "Manage delivery addresses", path: "/my-account/addresses" },
    { icon: User, title: "Account Details", description: "Update your information", path: "/my-account/details" },
    { icon: CreditCard, title: "Payment Methods", description: "Saved payment methods", path: "/my-account/payment-methods" },
    { icon: Settings, title: "Preferences", description: "Email & SMS settings", path: "/my-account/preferences" },
  ];

  const handleLogout = () => {
    // Logout logic will be added with Lovable Cloud
    navigate("/");
  };

  return (
    <div className="min-h-screen">
      <Header onAuthOpen={() => setAuthOpen(true)} onCartOpen={() => setCartOpen(true)} />
      
      <div className="container py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold">My Account</h1>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accountSections.map((section) => {
              const Icon = section.icon;
              return (
                <Link key={section.path} to={section.path}>
                  <div className="border rounded-lg p-6 hover:border-primary transition-colors cursor-pointer h-full">
                    <Icon className="h-8 w-8 text-primary mb-4" />
                    <h3 className="text-xl font-serif font-semibold mb-2">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </div>
                </Link>
              );
            })}
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

export default MyAccount;
