import { Product } from '@/types/product';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/stores/cartStore';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation(['products', 'common']);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0] || 'https://placehold.co/400x400?text=No+Image',
    });
  };

  const formattedPrice = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(product.price);

  return (
    <Link to={`/products/${product.id}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="p-0">
          <div className="aspect-square overflow-hidden bg-muted">
            <img
              src={product.images[0] || 'https://placehold.co/400x400?text=No+Image'}
              alt={product.name}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="line-clamp-1 text-base">{product.name}</CardTitle>
          <p className="mt-2 text-lg font-bold text-primary">{formattedPrice}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            variant="outline"
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
          >
            {t('common:actions.add')}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
