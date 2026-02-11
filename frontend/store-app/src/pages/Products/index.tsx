import { useState } from 'react';
import { useProductsQuery } from '@/queries/useProductsQuery';
import { ProductGrid } from '@/components/features/products/ProductGrid';
import { ProductFilters } from '@/components/features/products/ProductFilters';
import { useTranslation } from 'react-i18next';

export default function ProductsPage() {
  const { t } = useTranslation(['products', 'common']);
  const [search, setSearch] = useState('');
  
  const { data, isLoading } = useProductsQuery({ search });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 md:flex-row">
        <aside className="w-full md:w-64 shrink-0">
          <ProductFilters searchValue={search} onSearchChange={setSearch} />
        </aside>
        
        <main className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{t('common:navigation.products')}</h1>
            <p className="text-muted-foreground">
              {data?.total || 0} prodotti trovati
            </p>
          </div>
          
          <ProductGrid products={data?.items || []} isLoading={isLoading} />
        </main>
      </div>
    </div>
  );
}
