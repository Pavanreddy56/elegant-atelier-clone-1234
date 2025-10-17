import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { AuthModal } from "@/components/AuthModal";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const About = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header onAuthOpen={() => setAuthOpen(true)} onCartOpen={() => setCartOpen(true)} />
      
      <div className="container py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8">About OVAA Fashion</h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-lg leading-relaxed">
              OVAA Fashion House represents the pinnacle of haute couture and ready-to-wear fashion.
              Founded on the principle that fashion is a form of art with no boundaries, we create 
              pieces that transcend traditional design conventions.
            </p>
            
            <p className="text-lg leading-relaxed">
              Each collection is meticulously crafted, blending timeless elegance with contemporary 
              innovation. From The Whispers of Charm to The Moonlit Garden, every piece tells a story 
              of sophistication and artistic vision.
            </p>
            
            <blockquote className="border-l-4 border-primary pl-6 py-4 my-8 italic text-xl">
              "When aestheticism resides in the soul and body of art and gives it practical meaning, 
              that's where the future is created."
            </blockquote>
            
            <h2 className="text-3xl font-serif font-bold mt-12 mb-6">Our Philosophy</h2>
            <p className="text-lg leading-relaxed">
              We believe in the transformative power of fashion. Every garment we create is designed 
              to empower, inspire, and celebrate individuality. Our collections are not just clothing—they 
              are wearable art that allows you to express your unique style.
            </p>
            
            <h2 className="text-3xl font-serif font-bold mt-12 mb-6">Craftsmanship</h2>
            <p className="text-lg leading-relaxed">
              Each piece is created with exceptional attention to detail, using only the finest materials 
              and traditional couture techniques. Our atelier combines centuries-old craftsmanship with 
              modern innovation to create garments that are both timeless and contemporary.
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

export default About;
