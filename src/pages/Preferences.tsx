import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const Preferences = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotions, setPromotions] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [language, setLanguage] = useState("english");
  const [currency, setCurrency] = useState("inr");

  const handleSave = () => {
    toast.success("Preferences saved successfully");
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

          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">Preferences</h1>

          <div className="space-y-8">
            {/* Notifications */}
            <div className="space-y-4">
              <h2 className="text-xl font-serif font-semibold">Notifications</h2>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates via email
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates via SMS
                  </p>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={smsNotifications}
                  onCheckedChange={setSmsNotifications}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="order-updates">Order Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about order status
                  </p>
                </div>
                <Switch
                  id="order-updates"
                  checked={orderUpdates}
                  onCheckedChange={setOrderUpdates}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="promotions">Promotional Offers</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive exclusive deals and offers
                  </p>
                </div>
                <Switch
                  id="promotions"
                  checked={promotions}
                  onCheckedChange={setPromotions}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="newsletter">Newsletter</Label>
                  <p className="text-sm text-muted-foreground">
                    Subscribe to our weekly newsletter
                  </p>
                </div>
                <Switch
                  id="newsletter"
                  checked={newsletter}
                  onCheckedChange={setNewsletter}
                />
              </div>
            </div>

            {/* Language & Region */}
            <div className="space-y-4">
              <h2 className="text-xl font-serif font-semibold">Language & Region</h2>
              
              <div className="p-4 border rounded-lg space-y-3">
                <Label>Language</Label>
                <RadioGroup value={language} onValueChange={setLanguage}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="english" id="english" />
                    <Label htmlFor="english" className="cursor-pointer">English</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hindi" id="hindi" />
                    <Label htmlFor="hindi" className="cursor-pointer">हिंदी (Hindi)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="p-4 border rounded-lg space-y-3">
                <Label>Currency</Label>
                <RadioGroup value={currency} onValueChange={setCurrency}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inr" id="inr" />
                    <Label htmlFor="inr" className="cursor-pointer">₹ INR - Indian Rupee</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="usd" id="usd" />
                    <Label htmlFor="usd" className="cursor-pointer">$ USD - US Dollar</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <Button size="lg" className="w-full" onClick={handleSave}>
              Save Preferences
            </Button>
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

export default Preferences;
