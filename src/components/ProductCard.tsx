import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  image: string;
  isNew?: boolean;
}

export const ProductCard = ({ id, name, category, image, isNew }: ProductCardProps) => {
  return (
    <Link to={`/product/${id}`} className="group">
      <div className="relative overflow-hidden bg-secondary/50 aspect-[3/4]">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {isNew && (
          <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
            New
          </Badge>
        )}
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="font-serif text-lg font-medium group-hover:text-primary transition-smooth">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground">{category}</p>
      </div>
    </Link>
  );
};
