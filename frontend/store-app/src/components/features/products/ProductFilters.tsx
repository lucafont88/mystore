import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';

interface ProductFiltersProps {
  onSearchChange: (value: string) => void;
  searchValue: string;
}

export function ProductFilters({ onSearchChange, searchValue }: ProductFiltersProps) {
  const { t } = useTranslation(['common']);

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
    </div>
  );
}
