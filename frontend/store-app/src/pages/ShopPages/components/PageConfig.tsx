import { useTranslation } from 'react-i18next';
import { Settings } from 'lucide-react';

export function PageConfig() {
  const { t } = useTranslation('shopPages');

  return (
    <div className="flex h-full flex-col border-l bg-muted/30">
      <div className="border-b p-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <Settings className="h-4 w-4" />
          {t('config.title')}
        </h3>
      </div>
      <div className="flex flex-1 items-center justify-center p-4 text-center text-sm text-muted-foreground">
        {t('config.placeholder')}
      </div>
    </div>
  );
}
