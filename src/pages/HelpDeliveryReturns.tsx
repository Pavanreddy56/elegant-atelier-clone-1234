import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useState } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { AuthModal } from "@/components/AuthModal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HelpDeliveryReturns = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header onAuthOpen={() => setAuthOpen(true)} onCartOpen={() => setCartOpen(true)} />
      
      <div className="container py-12">
        <div className="mb-12">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/help" className="hover:text-primary">Help</Link>
            <span>/</span>
            <span className="text-foreground">Delivery & Returns</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Delivery & Returns</h1>
        </div>

        <div className="max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="shipping">
              <AccordionTrigger className="text-lg font-serif">Shipping Information</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>We offer worldwide shipping with the following delivery times:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Standard Delivery: 5-7 business days</li>
                    <li>Express Delivery: 2-3 business days</li>
                    <li>International: 7-14 business days</li>
                  </ul>
                  <p>Free shipping on orders over ₹5,000.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="returns">
              <AccordionTrigger className="text-lg font-serif">Returns Policy</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>We accept returns within 30 days of delivery for unworn, unwashed items with tags attached.</p>
                  <p>To initiate a return:</p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Log into your account</li>
                    <li>Go to Order History</li>
                    <li>Select the item to return</li>
                    <li>Follow the return instructions</li>
                  </ol>
                  <p>Refunds will be processed within 7-10 business days.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="tracking">
              <AccordionTrigger className="text-lg font-serif">Track Your Order</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>Once your order ships, you'll receive a tracking number via email.</p>
                  <p>You can track your order by:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Visiting your Order History page</li>
                    <li>Using the tracking link in your shipping confirmation email</li>
                    <li>Contacting our customer service team</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <Footer />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
      <WhatsAppButton />
    </div>
  );
};

export default HelpDeliveryReturns;
