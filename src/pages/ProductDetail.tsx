import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { AuthModal } from "@/components/AuthModal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Minus, Plus, Ruler, Heart, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { getProductById } from "@/data/products";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("purple");
  const [selectedSize, setSelectedSize] = useState("M");
  const { addItem } = useCart();

  const product = getProductById(id || "1");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate("/")}>Go to Home</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      color: selectedColor,
      size: selectedSize,
    });
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Header onAuthOpen={() => setAuthOpen(true)} onCartOpen={() => setCartOpen(true)} />
      
      <div className="container py-12">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to={`/${product.gender}`} className="hover:text-primary">
            {product.gender === "women" ? "Woman" : "Men"}
          </Link>
          <span>/</span>
          <Link to={`/${product.gender}/${product.subcategory}`} className="hover:text-primary">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-secondary/50 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-secondary/50 overflow-hidden cursor-pointer hover:opacity-75 transition-smooth">
                  <img 
                    src={product.image} 
                    alt={`${product.name} ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground mb-2">Category: <span className="text-foreground">{product.category}</span></p>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-muted'}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>
              <p className="text-2xl font-bold mt-4">₹{product.price.toFixed(2)}</p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link" className="text-primary p-0 h-auto font-normal">
                  <Ruler className="w-4 h-4 mr-2" />
                  Size Guide
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Size Guide</DialogTitle>
                </DialogHeader>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Size</th>
                        <th className="text-left py-3 px-4">EU</th>
                        <th className="text-left py-3 px-4">Chest (in)</th>
                        <th className="text-left py-3 px-4">Waist (in)</th>
                        <th className="text-left py-3 px-4">Hip (in)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { size: "XS", eu: "34", chest: "34-36", waist: "27-29", hip: "34-36" },
                        { size: "S", eu: "36", chest: "36-38", waist: "29-31", hip: "36-38" },
                        { size: "M", eu: "38", chest: "38-40", waist: "31-33", hip: "38-40" },
                        { size: "L", eu: "40", chest: "40-42", waist: "33-36", hip: "40-43" },
                        { size: "XL", eu: "42", chest: "42-45", waist: "36-40", hip: "43-47" },
                        { size: "XXL", eu: "44", chest: "45-48", waist: "40-44", hip: "47-51" },
                      ].map((row) => (
                        <tr key={row.size} className="border-b">
                          <td className="py-3 px-4 font-medium">{row.size}</td>
                          <td className="py-3 px-4">{row.eu}</td>
                          <td className="py-3 px-4">{row.chest}</td>
                          <td className="py-3 px-4">{row.waist}</td>
                          <td className="py-3 px-4">{row.hip}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </DialogContent>
            </Dialog>

            <div>
              <h3 className="font-medium mb-3">Select Color</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedColor("purple")}
                  className={`w-10 h-10 rounded-full bg-purple-600 border-2 transition-all ${
                    selectedColor === "purple" ? "border-primary scale-110" : "border-transparent"
                  }`}
                />
                <button
                  onClick={() => setSelectedColor("white")}
                  className={`w-10 h-10 rounded-full bg-white border-2 transition-all ${
                    selectedColor === "white" ? "border-primary scale-110" : "border-gray-300"
                  }`}
                />
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Select Size</h3>
              <div className="flex gap-2 flex-wrap">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    className="min-w-[60px]"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                size="lg" 
                className="flex-1"
                onClick={handleAddToCart}
              >
                Add to Bag
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="px-6"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            <Tabs defaultValue="details" className="w-full mt-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-3 text-sm mt-4">
                <p>{product.description}</p>
                <p><strong>Material:</strong> {product.material}</p>
                <p><strong>Care:</strong> {product.care}</p>
                <p><strong>Fit:</strong> {product.fit}</p>
                <p><strong>Made in:</strong> {product.madeIn}</p>
              </TabsContent>
              <TabsContent value="shipping" className="space-y-2 text-sm mt-4">
                <p>• Free shipping on orders over ₹5,000</p>
                <p>• Standard delivery: 5-7 business days</p>
                <p>• Express delivery: 2-3 business days (₹500)</p>
                <p>• Free returns within 28 days</p>
                <p>• Authenticity guaranteed</p>
              </TabsContent>
              <TabsContent value="reviews" className="mt-4">
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <span className="font-semibold">Amazing dress!</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Perfect fit and beautiful quality. Highly recommend!</p>
                    <p className="text-xs text-muted-foreground">- Sarah M. (Verified Purchase)</p>
                  </div>
                  <div className="border-b pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                        <Star className="h-4 w-4 text-muted" />
                      </div>
                      <span className="font-semibold">Great quality</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Love the fabric and design. Only wish it came in more colors.</p>
                    <p className="text-xs text-muted-foreground">- Priya K. (Verified Purchase)</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
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

export default ProductDetail;
