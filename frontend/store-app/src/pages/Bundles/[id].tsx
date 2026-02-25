import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useBundleQuery } from '@/queries/useBundlesQuery';
import { useCartStore } from '@/stores/cartStore';

export default function BundleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('products');
  const { data: bundle, isLoading } = useBundleQuery(id!);
  const addItem = useCartStore((s) => s.addItem);

  if (isLoading) return <div className="container mx-auto px-4 py-8">Caricamento...</div>;
  if (!bundle) return <div className="container mx-auto px-4 py-8">Bundle non trovato</div>;

  const originalPrice = bundle.items?.reduce(
    (sum, item) => sum + Number(item.product?.price || 0) * item.quantity, 0
  ) || 0;
  const discount = originalPrice > 0 ? Math.round((1 - Number(bundle.price) / originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    addItem({
      productId: bundle.id,
      vendorId: bundle.vendorId,
      name: bundle.name,
      price: Number(bundle.price),
      quantity: 1,
      image: bundle.images?.[0] || '',
    });
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Link to="/bundles">
        <Button variant="ghost" className="mb-4 gap-2">
          <ArrowLeft className="h-4 w-4" /> {t('bundles.backToList', 'Torna ai bundle')}
        </Button>
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Image */}
        <div className="aspect-square overflow-hidden rounded-lg bg-muted">
          {bundle.images?.[0] ? (
            <img src={bundle.images[0]} alt={bundle.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-4xl font-bold text-primary/20">Bundle</span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{bundle.name}</h1>
            {bundle.description && <p className="mt-2 text-muted-foreground">{bundle.description}</p>}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">€{Number(bundle.price).toFixed(2)}</span>
            {originalPrice > 0 && (
              <>
                <span className="text-xl text-muted-foreground line-through">€{originalPrice.toFixed(2)}</span>
                <Badge className="bg-green-100 text-green-700">-{discount}%</Badge>
              </>
            )}
          </div>

          <Button size="lg" className="w-full gap-2" onClick={handleAddToCart}>
            <ShoppingCart className="h-5 w-5" />
            {t('bundles.addToCart', 'Aggiungi al carrello')}
          </Button>

          {/* Included products */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">{t('bundles.includedProducts', 'Prodotti inclusi')}</h2>
            <div className="space-y-2">
              {bundle.items?.map((item) => (
                <Link
                  key={item.id}
                  to={`/products/${item.product?.id}`}
                  className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded bg-muted">
                    {item.product?.images?.[0] ? (
                      <img src={item.product.images[0]} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full bg-muted-foreground/10" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{item.product?.name}</div>
                    <div className="text-xs text-muted-foreground">
                      x{item.quantity} • €{(Number(item.product?.price || 0) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
