import { Link } from "react-router-dom";
import { Linkedin, Instagram, Facebook, Youtube, X as Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
  return (
    <footer className="border-t bg-secondary/30 mt-24">
      {/* Newsletter Section */}
      <div className="container py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-semibold">JOIN US</h3>
            <p className="text-muted-foreground">Subscribe to receive updates, access to exclusive deals, and more.</p>
          </div>
          <div className="flex gap-2">
            <Input 
              type="email" 
              placeholder="Email address" 
              className="bg-background"
            />
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
              JOIN US
            </Button>
          </div>
        </div>
      </div>

      {/* Links and Social */}
      <div className="border-t">
        <div className="container py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="font-medium mb-4">About</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/about" className="hover:text-primary transition-smooth">About us</Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-primary transition-smooth">Contact us</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/faq" className="hover:text-primary transition-smooth">FAQs</Link>
                </li>
                <li>
                  <Link to="/returns" className="hover:text-primary transition-smooth">Return and Exchanges</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Follow Us</h4>
              <div className="flex gap-3">
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <Youtube className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <Twitter className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Footer */}
      <div className="border-t">
        <div className="container py-16">
          <div className="flex justify-center items-center gap-16 text-8xl font-serif font-bold text-primary/10">
            <span>O</span>
            <span>V</span>
            <span>A</span>
            <span>A</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
