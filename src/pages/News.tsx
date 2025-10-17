import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { AuthModal } from "@/components/AuthModal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const newsItems = [
  {
    id: 1,
    title: "New Couture Collection Launch",
    date: "March 15, 2025",
    category: "Launch",
    excerpt: "Discover our latest haute couture collection featuring exquisite craftsmanship and timeless elegance.",
  },
  {
    id: 2,
    title: "Behind the Scenes: The Making of Moonlit Garden",
    date: "March 10, 2025",
    category: "Behind the Scenes",
    excerpt: "Take an exclusive look at the creative process behind one of our most celebrated designs.",
  },
  {
    id: 3,
    title: "Sustainable Fashion: Our Commitment",
    date: "March 5, 2025",
    category: "Sustainability",
    excerpt: "Learn about OVAA Fashion's dedication to sustainable practices and ethical fashion production.",
  },
];

const News = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header onAuthOpen={() => setAuthOpen(true)} onCartOpen={() => setCartOpen(true)} />
      
      <div className="container py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-12">News & Updates</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-smooth">
              <div className="aspect-[16/10] bg-secondary/50" />
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{item.category}</Badge>
                  <span className="text-sm text-muted-foreground">{item.date}</span>
                </div>
                <h3 className="text-xl font-serif font-semibold">{item.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.excerpt}</p>
              </CardContent>
            </Card>
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

export default News;
