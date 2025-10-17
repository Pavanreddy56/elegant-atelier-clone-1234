import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";

export const Header = ({ onAuthOpen, onCartOpen }: { onAuthOpen: () => void; onCartOpen: () => void }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <nav className="flex flex-col space-y-4 mt-8">
              <Link to="/" className="text-lg font-medium hover:text-primary transition-smooth" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <div className="space-y-2">
                <p className="text-lg font-medium">Women</p>
                <Link to="/women" className="block pl-4 text-muted-foreground hover:text-primary transition-smooth" onClick={() => setMobileMenuOpen(false)}>
                  All Women
                </Link>
                <Link to="/women/shoes" className="block pl-4 text-muted-foreground hover:text-primary transition-smooth" onClick={() => setMobileMenuOpen(false)}>
                  Shoes
                </Link>
                <Link to="/women/accessories" className="block pl-4 text-muted-foreground hover:text-primary transition-smooth" onClick={() => setMobileMenuOpen(false)}>
                  Accessories
                </Link>
                <Link to="/women/brands" className="block pl-4 text-muted-foreground hover:text-primary transition-smooth" onClick={() => setMobileMenuOpen(false)}>
                  Brands
                </Link>
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium">Men</p>
                <Link to="/men" className="block pl-4 text-muted-foreground hover:text-primary transition-smooth" onClick={() => setMobileMenuOpen(false)}>
                  All Men
                </Link>
                <Link to="/men/shoes" className="block pl-4 text-muted-foreground hover:text-primary transition-smooth" onClick={() => setMobileMenuOpen(false)}>
                  Shoes
                </Link>
                <Link to="/men/accessories" className="block pl-4 text-muted-foreground hover:text-primary transition-smooth" onClick={() => setMobileMenuOpen(false)}>
                  Accessories
                </Link>
                <Link to="/men/brands" className="block pl-4 text-muted-foreground hover:text-primary transition-smooth" onClick={() => setMobileMenuOpen(false)}>
                  Brands
                </Link>
              </div>
              <Link to="/about" className="text-lg font-medium hover:text-primary transition-smooth" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <Link to="/contact" className="text-lg font-medium hover:text-primary transition-smooth" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
              <Link to="/news" className="text-lg font-medium hover:text-primary transition-smooth" onClick={() => setMobileMenuOpen(false)}>
                News
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/" className="flex flex-col items-start -space-y-1">
          <span className="text-2xl md:text-3xl font-serif font-bold tracking-[0.2em] text-foreground">OVAA</span>
          <span className="text-[10px] md:text-xs tracking-[0.3em] text-muted-foreground font-light uppercase pl-0.5">Fashion</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-smooth">
            Home
          </Link>
          <div className="relative group">
            <button className="text-sm font-medium hover:text-primary transition-smooth">
              Women
            </button>
            <div className="absolute left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all bg-background border rounded-md shadow-lg z-50">
              <Link to="/women" className="block px-4 py-3 text-sm hover:bg-secondary transition-smooth">
                All Women
              </Link>
              <Link to="/women/shoes" className="block px-4 py-3 text-sm hover:bg-secondary transition-smooth">
                Shoes
              </Link>
              <Link to="/women/accessories" className="block px-4 py-3 text-sm hover:bg-secondary transition-smooth">
                Accessories
              </Link>
              <Link to="/women/brands" className="block px-4 py-3 text-sm hover:bg-secondary transition-smooth">
                Brands
              </Link>
            </div>
          </div>
          <div className="relative group">
            <button className="text-sm font-medium hover:text-primary transition-smooth">
              Men
            </button>
            <div className="absolute left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all bg-background border rounded-md shadow-lg z-50">
              <Link to="/men" className="block px-4 py-3 text-sm hover:bg-secondary transition-smooth">
                All Men
              </Link>
              <Link to="/men/shoes" className="block px-4 py-3 text-sm hover:bg-secondary transition-smooth">
                Shoes
              </Link>
              <Link to="/men/accessories" className="block px-4 py-3 text-sm hover:bg-secondary transition-smooth">
                Accessories
              </Link>
              <Link to="/men/brands" className="block px-4 py-3 text-sm hover:bg-secondary transition-smooth">
                Brands
              </Link>
            </div>
          </div>
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-smooth">
            About
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:text-primary transition-smooth">
            Contact
          </Link>
          <Link to="/news" className="text-sm font-medium hover:text-primary transition-smooth">
            News
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Link to="/search">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/bag" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
