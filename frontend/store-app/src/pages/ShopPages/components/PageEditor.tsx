import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Eye, LayoutGrid } from 'lucide-react';
import { SiteBuilder } from '../builder/SiteBuilder';
import { HtmlSourceEditor } from './HtmlSourceEditor';

interface PageEditorProps {
  pageId: string;
  savedHtmlContent: string;
  previewHtml: string;
  isSavingContent: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onHtmlSaved: (html: string) => void;
  builderInitKey: number;
  htmlForBuilder: string;
}

export function PageEditor({
  pageId,
  savedHtmlContent,
  previewHtml,
  isSavingContent,
  activeTab,
  onTabChange,
  onHtmlSaved,
  builderInitKey,
  htmlForBuilder,
}: PageEditorProps) {
  const { t } = useTranslation('shopPages');

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="flex h-full flex-col">
      <TabsList className="mx-4 mt-4 w-fit">
        <TabsTrigger value="builder" className="gap-2">
          <LayoutGrid className="h-4 w-4" />
          {t('tabs.siteBuilder')}
        </TabsTrigger>
        <TabsTrigger value="source" className="gap-2">
          <Code className="h-4 w-4" />
          {t('tabs.htmlSource')}
        </TabsTrigger>
        <TabsTrigger value="preview" className="gap-2">
          <Eye className="h-4 w-4" />
          {t('tabs.preview')}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="builder" className="flex-1 p-0">
        <SiteBuilder
          pageId={pageId}
          onHtmlGenerated={onHtmlSaved}
          initKey={builderInitKey}
          htmlContent={htmlForBuilder}
          fallbackHtml={savedHtmlContent}
        />
      </TabsContent>

      <TabsContent value="source" className="flex-1 p-0">
        <HtmlSourceEditor
          savedHtmlContent={savedHtmlContent}
          onSave={onHtmlSaved}
          isSaving={isSavingContent}
        />
      </TabsContent>

      <TabsContent value="preview" className="flex-1 px-4 pb-4">
        {previewHtml ? (
          <iframe
            title="Page Preview"
            srcDoc={previewHtml}
            sandbox=""
            className="h-full w-full rounded-md border bg-white"
          />
        ) : (
          <div className="flex h-full items-center justify-center rounded-md border bg-muted/30 text-sm text-muted-foreground">
            {t('editor.previewEmpty')}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
