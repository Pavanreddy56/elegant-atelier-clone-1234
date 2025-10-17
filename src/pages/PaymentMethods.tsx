import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

const PaymentMethods = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  
  // Mock saved payment methods
  const [paymentMethods] = useState([
    { id: 1, type: "card", last4: "4242", brand: "Visa", expiry: "12/25" },
    { id: 2, type: "upi", upiId: "user@paytm" },
  ]);

  const handleDelete = (id: number) => {
    toast.success("Payment method removed");
  };

  return (
    <div className="min-h-screen">
      <Header onAuthOpen={() => setAuthOpen(true)} onCartOpen={() => setCartOpen(true)} />
      
      <div className="container py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          <Link to="/my-account">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Account
            </Button>
          </Link>

          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">Payment Methods</h1>

          <div className="space-y-4 mb-6">
            {paymentMethods.map((method) => (
              <Card key={method.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CreditCard className="h-6 w-6" />
                    <div>
                      {method.type === "card" ? (
                        <>
                          <p className="font-medium">{method.brand} ending in {method.last4}</p>
                          <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                        </>
                      ) : (
                        <>
                          <p className="font-medium">UPI</p>
                          <p className="text-sm text-muted-foreground">{method.upiId}</p>
                        </>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(method.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <Button className="w-full" variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add Payment Method
          </Button>

          <div className="mt-8 p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Your payment information is encrypted and secure. We never store your full card details.
            </p>
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

export default PaymentMethods;
