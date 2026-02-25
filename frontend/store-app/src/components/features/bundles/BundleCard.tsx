import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Bundle } from '@/types/product';

interface BundleCardProps {
  bundle: Bundle;
}

export function BundleCard({ bundle }: BundleCardProps) {
  const originalPrice = bundle.items?.reduce(
    (sum, item) => sum + Number(item.product?.price || 0) * item.quantity, 0
  ) || 0;
  const discount = originalPrice > 0 ? Math.round((1 - Number(bundle.price) / originalPrice) * 100) : 0;

  return (
    <Link
      to={`/bundles/${bundle.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border transition-colors hover:border-primary/50"
    >
      {bundle.images?.[0] ? (
        <div className="aspect-video overflow-hidden bg-muted">
          <img src={bundle.images[0]} alt={bundle.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
          <span className="text-3xl font-bold text-primary/20">Bundle</span>
        </div>
      )}

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-semibold truncate">{bundle.name}</h3>

        {bundle.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{bundle.description}</p>
        )}

        <div className="mt-auto flex items-center gap-2">
          <span className="text-lg font-bold">€{Number(bundle.price).toFixed(2)}</span>
          {originalPrice > 0 && (
            <>
              <span className="text-sm text-muted-foreground line-through">€{originalPrice.toFixed(2)}</span>
              <Badge className="bg-green-100 text-green-700 text-xs">-{discount}%</Badge>
            </>
          )}
        </div>

        <div className="flex gap-1 mt-1">
          {bundle.items?.slice(0, 4).map((item) => (
            <div key={item.id} className="h-8 w-8 rounded bg-muted overflow-hidden shrink-0">
              {item.product?.images?.[0] ? (
                <img src={item.product.images[0]} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-muted-foreground/10" />
              )}
            </div>
          ))}
          {(bundle.items?.length || 0) > 4 && (
            <div className="flex h-8 w-8 items-center justify-center rounded bg-muted text-xs text-muted-foreground">
              +{bundle.items!.length - 4}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
