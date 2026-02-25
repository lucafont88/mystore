import { useTranslation } from 'react-i18next';
import { useBundlesQuery } from '@/queries/useBundlesQuery';
import { BundleCard } from '@/components/features/bundles/BundleCard';
import { Bundle } from '@/types/product';

export default function BundlesPage() {
  const { t } = useTranslation('products');
  const { data, isLoading } = useBundlesQuery();

  const bundles = data?.items ?? [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">{t('bundles.title', 'Bundle')}</h1>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : bundles.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">{t('bundles.empty', 'Nessun bundle disponibile al momento.')}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {bundles.map((bundle: Bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>
      )}
    </div>
  );
}
