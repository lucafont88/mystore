import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2, Save, Undo2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HtmlSourceEditorProps {
  savedHtmlContent: string;
  onSave: (html: string) => void;
  isSaving: boolean;
}

export function HtmlSourceEditor({ savedHtmlContent, onSave, isSaving }: HtmlSourceEditorProps) {
  const { t } = useTranslation('shopPages');
  const [draft, setDraft] = useState(savedHtmlContent);

  // Reset draft when the saved content changes (page switch or external save)
  useEffect(() => {
    setDraft(savedHtmlContent);
  }, [savedHtmlContent]);

  const isDirty = draft !== savedHtmlContent;

  const handleSave = () => onSave(draft);
  const handleCancel = () => setDraft(savedHtmlContent);

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar matching SiteBuilder's toolbar */}
      <div className="flex items-center justify-end gap-2 border-b px-4 py-2">
        {isSaving && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Loader2 className="h-3 w-3 animate-spin" />
            {t('builder.saving')}
          </span>
        )}
        <Button
          variant="outline"
          size="sm"
          disabled={!isDirty}
          onClick={handleCancel}
          className="gap-1.5"
        >
          <Undo2 className="h-3.5 w-3.5" />
          {t('builder.cancel')}
        </Button>
        <Button
          size="sm"
          disabled={!isDirty || isSaving}
          onClick={handleSave}
          className="gap-1.5"
        >
          <Save className="h-3.5 w-3.5" />
          {t('builder.save')}
        </Button>
      </div>
      <div className="flex-1 px-4 pb-4 pt-2">
        <textarea
          className="h-full w-full resize-none rounded-md border bg-muted/30 p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={t('editor.placeholder')}
          spellCheck={false}
        />
      </div>
    </div>
  );
}
