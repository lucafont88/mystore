import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslation } from 'react-i18next';

interface ProductFiltersProps {
  onSearchChange: (value: string) => void;
  searchValue: string;
  includeBundles: boolean;
  onIncludeBundlesChange: (value: boolean) => void;
}

export function ProductFilters({ onSearchChange, searchValue, includeBundles, onIncludeBundlesChange }: ProductFiltersProps) {
  const { t } = useTranslation(['common', 'products']);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-sm font-semibold">Ricerca</h3>
        <Input
          placeholder={t('actions.search')}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div>
        <h3 className="mb-4 text-sm font-semibold">Categorie</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="cursor-pointer hover:text-primary">Tutte le categorie</p>
          <p className="cursor-pointer hover:text-primary">Elettronica</p>
          <p className="cursor-pointer hover:text-primary">Casa</p>
          <p className="cursor-pointer hover:text-primary">Abbigliamento</p>
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-sm font-semibold">Opzioni</h3>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="include-bundles"
            checked={includeBundles}
            onCheckedChange={(checked) => onIncludeBundlesChange(checked === true)}
          />
          <label
            htmlFor="include-bundles"
            className="text-sm cursor-pointer select-none text-muted-foreground hover:text-primary"
          >
            {t('products:filters.includeBundles', 'Includi bundle')}
          </label>
        </div>
      </div>
    </div>
  );
}
