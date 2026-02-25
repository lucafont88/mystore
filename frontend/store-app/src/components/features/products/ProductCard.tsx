import { Product } from '@/types/product';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/stores/cartStore';
import { Download, Key, Globe } from 'lucide-react';

const digitalBadges: Record<string, { label: string; icon: React.ReactNode }> = {
  DIGITAL_FILE: { label: 'Download', icon: <Download className="h-3 w-3" /> },
  DIGITAL_LICENSE: { label: 'Licenza', icon: <Key className="h-3 w-3" /> },
  DIGITAL_ACCESS: { label: 'Accesso', icon: <Globe className="h-3 w-3" /> },
};

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
      vendorId: product.vendorId,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0] || 'https://placehold.co/400x400?text=No+Image',
      productType: product.productType,
    });
  };

  const formattedPrice = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(product.price);

  const badge = digitalBadges[product.productType];
  const isDigital = product.productType !== 'PHYSICAL';

  return (
    <Link to={`/products/${product.id}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="relative p-0">
          <div className="aspect-square overflow-hidden bg-muted">
            <img
              src={product.images[0] || 'https://placehold.co/400x400?text=No+Image'}
              alt={product.name}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
              loading="lazy"
            />
          </div>
          {badge && (
            <Badge className="absolute top-2 right-2 gap-1 bg-primary/90 text-xs">
              {badge.icon}
              {badge.label}
            </Badge>
          )}
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="line-clamp-1 text-base">{product.name}</CardTitle>
          <p className="mt-2 text-lg font-bold text-primary">{formattedPrice}</p>
          {isDigital && (
            <p className="text-xs text-muted-foreground mt-1">
              {product.productType === 'DIGITAL_FILE' && 'Download immediato'}
              {product.productType === 'DIGITAL_LICENSE' && `${product.availableLicenses ?? '—'} chiavi disponibili`}
              {product.productType === 'DIGITAL_ACCESS' && `Accesso per ${product.digitalAccess?.accessDurationDays ?? '—'} giorni`}
            </p>
          )}
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
