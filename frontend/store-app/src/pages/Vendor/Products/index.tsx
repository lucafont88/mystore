import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus, Package, Download, Key, Globe, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProductsQuery } from '@/queries/useProductsQuery';
import { useAuthStore } from '@/stores/authStore';
import { Product, ProductType } from '@/types/product';

const typeIcons: Record<ProductType, React.ReactNode> = {
  PHYSICAL: <Package className="h-3.5 w-3.5" />,
  DIGITAL_FILE: <Download className="h-3.5 w-3.5" />,
  DIGITAL_LICENSE: <Key className="h-3.5 w-3.5" />,
  DIGITAL_ACCESS: <Globe className="h-3.5 w-3.5" />,
};

const typeLabels: Record<ProductType, string> = {
  PHYSICAL: 'Fisico',
  DIGITAL_FILE: 'File',
  DIGITAL_LICENSE: 'Licenza',
  DIGITAL_ACCESS: 'Accesso',
};

export default function VendorProductsPage() {
  const { t } = useTranslation('vendor');
  const { isAuthenticated, user } = useAuthStore();
  const { data, isLoading } = useProductsQuery({ vendorId: user?.id } as any);

  if (!isAuthenticated || user?.role?.toUpperCase() !== 'VENDOR') {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-20 text-center">
        <ShieldAlert className="mb-4 h-16 w-16 text-destructive/60" />
        <h1 className="mb-2 text-2xl font-bold">{t('accessDenied', 'Accesso negato')}</h1>
      </div>
    );
  }

  const products = (data as any)?.items ?? [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('products.title', 'I miei prodotti')}</h1>
        <Link to="/vendor/products/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            {t('products.create', 'Nuovo prodotto')}
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">{t('products.empty', 'Non hai ancora creato prodotti.')}</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product: Product) => (
            <Link
              key={product.id}
              to={`/vendor/products/${product.id}`}
              className="flex flex-col gap-2 rounded-lg border p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold truncate">{product.name}</h3>
                <Badge variant="outline" className="gap-1 shrink-0">
                  {typeIcons[product.productType || 'PHYSICAL']}
                  {typeLabels[product.productType || 'PHYSICAL']}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>€{Number(product.price).toFixed(2)}</span>
                {product.productType === 'PHYSICAL' && (
                  <span>Stock: {product.stockQuantity}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
