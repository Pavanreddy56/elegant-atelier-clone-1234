import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { AuthModal } from "@/components/AuthModal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { ArrowLeft, CreditCard, Truck } from "lucide-react";

type CheckoutStep = 'delivery' | 'payment' | 'review';

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('delivery');
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const { items, getTotalPrice, clearCart, removeItem } = useCart();
  
  // Check if we're checking out a single item
  const singleItemId = searchParams.get('item');
  const checkoutItems = singleItemId 
    ? items.filter(item => `${item.id}-${item.color}-${item.size}` === singleItemId)
    : items;
  
  const subtotal = checkoutItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCost = deliveryMethod === 'express' ? 500 : deliveryMethod === 'nextday' ? 1000 : 0;
  const total = subtotal + shippingCost;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    toast.success("Order placed successfully!");
    if (singleItemId) {
      // Remove only the checked out item
      removeItem(singleItemId);
    } else {
      // Clear entire cart
      clearCart();
    }
    navigate("/my-account/orders");
  };

  if (checkoutItems.length === 0) {
    return (
      <div className="min-h-screen">
        <Header onAuthOpen={() => setAuthOpen(true)} onCartOpen={() => setCartOpen(true)} />
        <div className="container py-16 text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Your cart is empty</h2>
          <Link to="/women">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header onAuthOpen={() => setAuthOpen(true)} onCartOpen={() => setCartOpen(true)} />
      
      <div className="container py-12">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/bag" className="hover:text-primary">Bag</Link>
          <span>/</span>
          <span className="text-foreground">Checkout</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-6">Secure Checkout</h1>
          
          {/* Progress Steps */}
          <div className="flex items-center gap-4 mb-8">
            <div className={`flex items-center gap-2 ${currentStep === 'delivery' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep === 'delivery' ? 'border-primary bg-primary text-white' : 'border-muted'}`}>
                1
              </div>
              <span className="text-sm font-medium">Delivery</span>
            </div>
            <Separator className="w-12" />
            <div className={`flex items-center gap-2 ${currentStep === 'payment' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep === 'payment' ? 'border-primary bg-primary text-white' : 'border-muted'}`}>
                2
              </div>
              <span className="text-sm font-medium">Payment</span>
            </div>
            <Separator className="w-12" />
            <div className={`flex items-center gap-2 ${currentStep === 'review' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep === 'review' ? 'border-primary bg-primary text-white' : 'border-muted'}`}>
                3
              </div>
              <span className="text-sm font-medium">Review</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* Delivery Information */}
            {currentStep === 'delivery' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-4">Delivery Information</h2>
                  <div className="grid gap-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="address">Address *</Label>
                      <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input id="state" name="state" value={formData.state} onChange={handleInputChange} required />
                      </div>
                      <div>
                        <Label htmlFor="pincode">Pincode *</Label>
                        <Input id="pincode" name="pincode" value={formData.pincode} onChange={handleInputChange} required />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-serif font-bold mb-4">Delivery Method</h2>
                  <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                    <div className="flex items-center space-x-3 border rounded-lg p-4 hover:border-primary transition-colors">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Truck className="h-5 w-5" />
                            <div>
                              <p className="font-medium">Standard Delivery</p>
                              <p className="text-sm text-muted-foreground">5-7 business days</p>
                            </div>
                          </div>
                          <span className="font-semibold">FREE</span>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 border rounded-lg p-4 hover:border-primary transition-colors">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Truck className="h-5 w-5" />
                            <div>
                              <p className="font-medium">Express Delivery</p>
                              <p className="text-sm text-muted-foreground">2-3 business days</p>
                            </div>
                          </div>
                          <span className="font-semibold">₹500</span>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 border rounded-lg p-4 hover:border-primary transition-colors">
                      <RadioGroupItem value="nextday" id="nextday" />
                      <Label htmlFor="nextday" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Truck className="h-5 w-5" />
                            <div>
                              <p className="font-medium">Next Day Delivery</p>
                              <p className="text-sm text-muted-foreground">Next business day</p>
                            </div>
                          </div>
                          <span className="font-semibold">₹1,000</span>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex gap-3">
                  <Link to="/bag" className="flex-1">
                    <Button variant="outline" className="w-full">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Bag
                    </Button>
                  </Link>
                  <Button className="flex-1" onClick={() => setCurrentStep('payment')}>
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {/* Payment Method */}
            {currentStep === 'payment' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-4">Payment Method</h2>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-3 border rounded-lg p-4 hover:border-primary transition-colors">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5" />
                          <div>
                            <p className="font-medium">Credit / Debit Card</p>
                            <p className="text-sm text-muted-foreground">Visa, Mastercard, Amex</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 border rounded-lg p-4 hover:border-primary transition-colors">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 flex items-center justify-center">₹</div>
                          <div>
                            <p className="font-medium">UPI Payment</p>
                            <p className="text-sm text-muted-foreground">Google Pay, PhonePe, Paytm</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 border rounded-lg p-4 hover:border-primary transition-colors">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex-1 cursor-pointer">
                        <div>
                          <p className="font-medium">Cash on Delivery</p>
                          <p className="text-sm text-muted-foreground">Pay when you receive</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" value={formData.cardNumber} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="cardName">Name on Card *</Label>
                      <Input id="cardName" name="cardName" value={formData.cardName} onChange={handleInputChange} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date *</Label>
                        <Input id="expiry" name="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleInputChange} required />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input id="cvv" name="cvv" type="password" placeholder="123" maxLength={3} value={formData.cvv} onChange={handleInputChange} required />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setCurrentStep('delivery')}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button className="flex-1" onClick={() => setCurrentStep('review')}>
                    Continue to Review
                  </Button>
                </div>
              </div>
            )}

            {/* Order Review */}
            {currentStep === 'review' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-4">Review Your Order</h2>
                  
                  <div className="space-y-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Delivery Address</h3>
                      <p className="text-sm">{formData.fullName}</p>
                      <p className="text-sm">{formData.address}</p>
                      <p className="text-sm">{formData.city}, {formData.state} - {formData.pincode}</p>
                      <p className="text-sm">{formData.phone}</p>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Delivery Method</h3>
                      <p className="text-sm capitalize">{deliveryMethod.replace('-', ' ')} Delivery</p>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Payment Method</h3>
                      <p className="text-sm capitalize">{paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod === 'upi' ? 'UPI Payment' : 'Cash on Delivery'}</p>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="font-semibold mb-3">Order Items</h3>
                      <div className="space-y-3">
                        {checkoutItems.map((item) => (
                          <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-3 pb-3 border-b last:border-0">
                            <div className="w-16 h-20 bg-secondary/50 rounded overflow-hidden">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-xs text-muted-foreground">{item.category}</p>
                              {item.color && <p className="text-xs">Color: {item.color}</p>}
                              {item.size && <p className="text-xs">Size: {item.size}</p>}
                              <p className="text-xs mt-1">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-semibold text-sm">₹{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setCurrentStep('payment')}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button className="flex-1" onClick={handlePlaceOrder}>
                    Place Order
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-muted/30 p-6 rounded-lg sticky top-24">
              <h2 className="text-xl font-serif font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({checkoutItems.length} items)</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">{shippingCost === 0 ? 'FREE' : `₹${shippingCost.toFixed(2)}`}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-semibold text-lg">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-muted-foreground">
                <p>✓ Secure SSL encryption</p>
                <p>✓ Free returns within 28 days</p>
                <p>✓ 100% authentic products</p>
                <p>✓ PCI DSS compliant payment</p>
              </div>
            </div>
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

export default Checkout;
