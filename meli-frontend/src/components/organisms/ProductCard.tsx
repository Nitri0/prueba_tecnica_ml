import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/atoms/Card';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { ShoppingCart, Heart } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  onAddToCart?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
}

export function ProductCard({
  id,
  title,
  description,
  price,
  image,
  category,
  onAddToCart,
  onToggleFavorite,
}: ProductCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        {category && (
          <Badge className="absolute left-2 top-2" variant="secondary">
            {category}
          </Badge>
        )}
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-2 top-2 bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={() => onToggleFavorite?.(id)}
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-primary">{formatCurrency(price)}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => onAddToCart?.(id)}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Agregar al carrito
        </Button>
      </CardFooter>
    </Card>
  );
}
