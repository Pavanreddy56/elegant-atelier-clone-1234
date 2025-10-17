import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import { AuthModal } from "@/components/AuthModal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import coutureHero from "@/assets/couture-hero.jpg";
import promoFestival from "@/assets/promo-festival.jpg";
import promoEvents from "@/assets/promo-events.jpg";
import promoArrivals from "@/assets/promo-arrivals.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";
import product9 from "@/assets/product-9.jpg";
import product10 from "@/assets/product-10.jpg";
import product6Men from "@/assets/product-6-men.jpg";
import product7Men from "@/assets/product-7-men.jpg";
import product9Men from "@/assets/product-9-men.jpg";
import { products } from "@/data/products";

const promoSlides = [
  { image: promoFestival, title: "Festival Collection", subtitle: "Celebrate in Style", link: "/women" },
  { image: promoEvents, title: "Event Specials", subtitle: "Make Every Moment Count", link: "/men" },
  { image: promoArrivals, title: "New Arrivals", subtitle: "Fresh Styles Just In", link: "/new-arrivals" },
];

const latestProducts = [
  { id: "1", name: "The Moonlit Garden", category: "Dress", image: product1, isNew: true },
  { id: "2", name: "The Orchid Gown", category: "Gown", image: product2, isNew: true },
  { id: "3", name: "The Crimson Petals", category: "Evening Wear", image: product3, isNew: true },
  { id: "4", name: "Ivory Dream", category: "Bridal", image: product4, isNew: true },
  { id: "5", name: "Midnight Bloom", category: "Evening Wear", image: product5, isNew: true },
  { id: "6", name: "Lumina", category: "Cocktail", image: product6, isNew: true },
  { id: "7", name: "Bloodstone", category: "Evening Wear", image: product7, isNew: true },
  { id: "8", name: "Red Jasper", category: "Gown", image: product8, isNew: true },
];

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header onAuthOpen={() => setAuthOpen(true)} onCartOpen={() => setCartOpen(true)} />
      
      {/* Promotional Carousel */}
      <section className="w-full">
        <Carousel
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 4000 })]}
          className="w-full"
        >
          <CarouselContent>
            {promoSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <Link to={slide.link}>
                  <div className="relative h-[40vh] md:h-[50vh] overflow-hidden cursor-pointer">
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="text-center text-white">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-2">{slide.title}</h2>
                        <p className="text-lg md:text-xl font-light">{slide.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* Spacer */}
      <div className="h-12 md:h-16"></div>

      {/* Hero Section 1 */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <img 
          src={hero1} 
          alt="The Whispers of Charm" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
          <div className="container">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                The Whispers of Charm
              </h1>
              <Link to="/premium-women">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Discover <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Arrivals - Women */}
      <section className="container py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold">LATEST ARRIVALS</h2>
          <Link to="/women">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </div>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 md:gap-6 pb-4">
            {products.filter(p => p.gender === "women").slice(0, 6).map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="group flex-shrink-0 w-[140px] md:w-[180px]">
                <div className="relative overflow-hidden bg-secondary/50 aspect-[3/4] rounded-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-2 space-y-1">
                  <h3 className="font-serif text-xs md:text-sm font-medium group-hover:text-primary transition-smooth line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">{product.category}</p>
                  <p className="text-sm md:text-base font-semibold">₹{product.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section 2 - Make your Own Style */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <img 
          src={hero2} 
          alt="Make your Own Style" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/50 to-transparent flex items-center justify-end">
          <div className="container">
            <div className="max-w-xl ml-auto text-right">
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                Make your Own Style
              </h1>
              <Link to="/premium-men">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Arrivals - Men */}
      <section className="container py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold">LATEST ARRIVALS</h2>
          <Link to="/men">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </div>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 md:gap-6 pb-4">
            {products.filter(p => p.gender === "men").slice(0, 6).map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="group flex-shrink-0 w-[140px] md:w-[180px]">
                <div className="relative overflow-hidden bg-secondary/50 aspect-[3/4] rounded-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-2 space-y-1">
                  <h3 className="font-serif text-xs md:text-sm font-medium group-hover:text-primary transition-smooth line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">{product.category}</p>
                  <p className="text-sm md:text-base font-semibold">₹{product.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-8 md:h-12"></div>

      {/* Brand Philosophy */}
      <section className="container py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
            "Fashion is a form of art that has no boundaries. When aestheticism resides in the soul and body of art and gives it practical meaning, that's where the future is created."
          </p>
        </div>
      </section>

      {/* Couture Section */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img 
          src={coutureHero} 
          alt="All Coutures" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center">
          <div className="container">
            <div className="max-w-xl">
              <p className="text-white/90 text-sm uppercase tracking-wider mb-4">COUTURE</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">
                All Coutures
              </h2>
              <Link to="/men">
                <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary backdrop-blur">
                  View all <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
