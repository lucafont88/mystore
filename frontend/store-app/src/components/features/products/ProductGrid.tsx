import { Product, Bundle } from '@/types/product';
import { ProductCard } from './ProductCard';
import { BundleCard } from '@/components/features/bundles/BundleCard';

interface ProductGridProps {
  products: Product[];
  bundles?: Bundle[];
  isLoading?: boolean;
}

export function ProductGrid({ products, bundles = [], isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-80 w-full animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    );
  }

  if (products.length === 0 && bundles.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center rounded-lg border-2 border-dashed">
        <p className="text-muted-foreground">Nessun prodotto trovato.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      {bundles.map((bundle) => (
        <BundleCard key={`bundle-${bundle.id}`} bundle={bundle} />
      ))}
    </div>
  );
}
