import { useState } from 'react';
import { useProductsQuery } from '@/queries/useProductsQuery';
import { useBundlesQuery } from '@/queries/useBundlesQuery';
import { ProductGrid } from '@/components/features/products/ProductGrid';
import { ProductFilters } from '@/components/features/products/ProductFilters';
import { useTranslation } from 'react-i18next';

export default function ProductsPage() {
  const { t } = useTranslation(['products', 'common']);
  const [search, setSearch] = useState('');
  const [includeBundles, setIncludeBundles] = useState(false);

  const { data: productsData, isLoading: productsLoading } = useProductsQuery({ search });
  const { data: bundlesData, isLoading: bundlesLoading } = useBundlesQuery(
    includeBundles ? { search } : {},
  );

  const products = productsData?.items || [];
  const bundles = includeBundles ? (bundlesData?.items || []) : [];
  const isLoading = productsLoading || (includeBundles && bundlesLoading);

  const totalProducts = productsData?.total || 0;
  const totalBundles = includeBundles ? (bundlesData?.total || 0) : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 md:flex-row">
        <aside className="w-full md:w-64 shrink-0">
          <ProductFilters
            searchValue={search}
            onSearchChange={setSearch}
            includeBundles={includeBundles}
            onIncludeBundlesChange={setIncludeBundles}
          />
        </aside>

        <main className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{t('common:navigation.products')}</h1>
            <p className="text-muted-foreground">
              {includeBundles && totalBundles > 0
                ? `${totalProducts} prodotti e ${totalBundles} bundle trovati`
                : `${totalProducts} prodotti trovati`}
            </p>
          </div>

          <ProductGrid products={products} bundles={bundles} isLoading={isLoading} />
        </main>
      </div>
    </div>
  );
}
