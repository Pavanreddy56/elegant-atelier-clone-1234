import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductCard } from "@/components/ProductCard";
import { Search as SearchIcon, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Mock product data - replace with API call
const mockProducts = [
  {
    id: 1,
    name: "Silk Evening Dress",
    price: 299,
    image: "/placeholder.svg",
    category: "women",
    gender: "female",
  },
  {
    id: 2,
    name: "Tailored Blazer",
    price: 189,
    image: "/placeholder.svg",
    category: "men",
    gender: "male",
  },
  {
    id: 3,
    name: "Leather Handbag",
    price: 159,
    image: "/placeholder.svg",
    category: "accessories",
    gender: "female",
  },
  {
    id: 4,
    name: "Cotton T-Shirt",
    price: 29,
    image: "/placeholder.svg",
    category: "men",
    gender: "male",
  },
  {
    id: 5,
    name: "Summer Dress",
    price: 79,
    image: "/placeholder.svg",
    category: "women",
    gender: "female",
  },
  {
    id: 6,
    name: "Classic Watch",
    price: 249,
    image: "/placeholder.svg",
    category: "accessories",
    gender: "unisex",
  },
];

const Search = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  
  // Filter states
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);

  // Filter and search logic
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      // Search query filter
      const matchesQuery = query
        ? product.name.toLowerCase().includes(query.toLowerCase())
        : true;

      // Price filter
      const matchesPrice =
        product.price >= priceRange.min && product.price <= priceRange.max;

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      // Gender filter
      const matchesGender =
        selectedGenders.length === 0 ||
        selectedGenders.includes(product.gender);

      return matchesQuery && matchesPrice && matchesCategory && matchesGender;
    }).sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [query, priceRange, selectedCategories, selectedGenders, sortBy]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleGender = (gender: string) => {
    setSelectedGenders((prev) =>
      prev.includes(gender)
        ? prev.filter((g) => g !== gender)
        : [...prev, gender]
    );
  };

  return (
    <div className="min-h-screen">
      <Header onAuthOpen={() => setAuthOpen(true)} onCartOpen={() => setCartOpen(true)} />
      
      <div className="container py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Search Results</h1>
            <p className="text-muted-foreground">
              {query ? `${filteredProducts.length} results for "${query}"` : "Browse all products"}
            </p>
          </div>
          <div className="flex gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-64 space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Category</h3>
                <div className="space-y-2">
                  {["women", "men", "accessories"].map((cat) => (
                    <div key={cat} className="flex items-center space-x-2">
                      <Checkbox
                        id={cat}
                        checked={selectedCategories.includes(cat)}
                        onCheckedChange={() => toggleCategory(cat)}
                      />
                      <Label htmlFor={cat} className="capitalize cursor-pointer">
                        {cat}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Gender</h3>
                <div className="space-y-2">
                  {["male", "female", "unisex"].map((gender) => (
                    <div key={gender} className="flex items-center space-x-2">
                      <Checkbox
                        id={gender}
                        checked={selectedGenders.includes(gender)}
                        onCheckedChange={() => toggleGender(gender)}
                      />
                      <Label htmlFor={gender} className="capitalize cursor-pointer">
                        {gender}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Price Range</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    ${priceRange.min} - ${priceRange.max}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setPriceRange({ min: 0, max: 500 })}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id.toString()}
                    name={product.name}
                    category={product.category}
                    image={product.image}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <SearchIcon className="h-24 w-24 text-muted-foreground/30 mb-6" />
                <h2 className="text-2xl font-serif font-semibold mb-3">No results found</h2>
                <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
              </div>
            )}
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

export default Search;
