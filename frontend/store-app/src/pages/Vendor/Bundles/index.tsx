import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useBundlesQuery } from '@/queries/useBundlesQuery';
import { useAuthStore } from '@/stores/authStore';
import { Bundle } from '@/types/product';

export default function VendorBundlesPage() {
  const { t } = useTranslation('vendor');
  const { isAuthenticated, user } = useAuthStore();
  const { data, isLoading } = useBundlesQuery({ vendorId: user?.id });

  if (!isAuthenticated || user?.role?.toUpperCase() !== 'VENDOR') {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-20 text-center">
        <ShieldAlert className="mb-4 h-16 w-16 text-destructive/60" />
        <h1 className="mb-2 text-2xl font-bold">{t('accessDenied', 'Accesso negato')}</h1>
      </div>
    );
  }

  const bundles = data?.items ?? [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('bundles.title', 'I miei bundle')}</h1>
        <Link to="/vendor/bundles/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            {t('bundles.create', 'Nuovo bundle')}
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : bundles.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">{t('bundles.empty', 'Non hai ancora creato bundle.')}</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bundles.map((bundle: Bundle) => (
            <Link
              key={bundle.id}
              to={`/vendor/bundles/${bundle.id}`}
              className="flex flex-col gap-2 rounded-lg border p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold truncate">{bundle.name}</h3>
                <Badge variant={bundle.isActive ? 'default' : 'secondary'}>
                  {bundle.isActive ? 'Attivo' : 'Inattivo'}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                {bundle.items?.length || 0} prodotti • €{Number(bundle.price).toFixed(2)}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
