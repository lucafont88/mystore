import { useState, useCallback, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldAlert, FileText } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useShopPagesQuery, useShopPageQuery, useCreateShopPage, useSaveShopPageContent, useUpdateShopPage, useDeleteShopPage } from '@/queries/useShopPagesQuery';
import { ShopPageListItem } from '@/types/shopPage';
import { useBuilderStore } from '@/stores/builderStore';
import { blocksToHtml } from './builder/blocksToHtml';
import { PagesSidebar } from './components/PagesSidebar';
import { PageEditor } from './components/PageEditor';
import { PageConfig } from './components/PageConfig';

export default function ShopPagesPage() {
  const { t } = useTranslation('shopPages');
  const { user, isAuthenticated } = useAuthStore();
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [localPages, setLocalPages] = useState<ShopPageListItem[] | null>(null);
  const [localHtmlContent, setLocalHtmlContent] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('builder');
  const [builderInitKey, setBuilderInitKey] = useState<number>(0);
  const htmlForBuilderRef = useRef<string>('');
  const previousTabRef = useRef<string>('builder');

  const { data: fetchedPages, isLoading } = useShopPagesQuery();
  const { data: selectedPage } = useShopPageQuery(selectedPageId);
  const createPageMutation = useCreateShopPage();
  const saveContentMutation = useSaveShopPageContent();
  const updatePageMutation = useUpdateShopPage();
  const deletePageMutation = useDeleteShopPage();

  // Use local order if user has reordered, otherwise use fetched data
  const pages = localPages ?? fetchedPages ?? [];

  // Sync selected page content to local state
  const handleSelectPage = useCallback((id: string) => {
    // Save current content before switching
    if (selectedPageId && localHtmlContent) {
      saveContentMutation.mutate({ id: selectedPageId, htmlContent: localHtmlContent });
    }
    setSelectedPageId(id);
    setLocalHtmlContent('');
  }, [selectedPageId, localHtmlContent, saveContentMutation]);

  // Update local content when selected page data loads
  useEffect(() => {
    if (selectedPage && selectedPageId && localHtmlContent === '') {
      setLocalHtmlContent(selectedPage.htmlContent ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPage, selectedPageId]);

  const handleCreatePage = useCallback(async (title: string) => {
    const result = await createPageMutation.mutateAsync({ title });
    setLocalPages(null);
    setSelectedPageId(result.id);
    setLocalHtmlContent(result.htmlContent ?? '');
  }, [createPageMutation]);

  const handleRenamePage = useCallback((id: string, newTitle: string) => {
    updatePageMutation.mutate({ id, title: newTitle });
    setLocalPages(null);
  }, [updatePageMutation]);

  const handleDeletePage = useCallback((id: string) => {
    deletePageMutation.mutate(id);
    setLocalPages(null);
    if (selectedPageId === id) {
      setSelectedPageId(null);
      setLocalHtmlContent('');
    }
  }, [deletePageMutation, selectedPageId]);

  const handleReorder = useCallback((reordered: ShopPageListItem[]) => {
    setLocalPages(reordered);
  }, []);

  const handleTabChange = useCallback((tab: string) => {
    const prev = previousTabRef.current;

    // Leaving builder → generate HTML from current blocks
    if (prev === 'builder' && tab !== 'builder' && selectedPageId) {
      const pageState = useBuilderStore.getState().stateByPageId[selectedPageId];
      if (pageState?.blocks?.length) {
        const html = blocksToHtml(pageState.blocks);
        setLocalHtmlContent(html);
      }
    }

    // Entering builder from any other tab → signal re-init from current HTML
    if (tab === 'builder' && prev !== 'builder') {
      htmlForBuilderRef.current = localHtmlContent;
      setBuilderInitKey((k) => k + 1);
    }

    previousTabRef.current = tab;
    setActiveTab(tab);
  }, [localHtmlContent, selectedPageId]);

  const handleHtmlSaved = useCallback((html: string) => {
    setLocalHtmlContent(html);
    if (selectedPageId) {
      saveContentMutation.mutate({ id: selectedPageId, htmlContent: html });
    }
  }, [selectedPageId, saveContentMutation]);

  // VENDOR role guard
  if (!isAuthenticated || user?.role?.toUpperCase() !== 'VENDOR') {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-20 text-center">
        <ShieldAlert className="mb-4 h-16 w-16 text-destructive/60" />
        <h1 className="mb-2 text-2xl font-bold">{t('accessDenied.title')}</h1>
        <p className="text-muted-foreground">{t('accessDenied.message')}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-muted-foreground">{t('common:actions.loading', 'Caricamento...')}</div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left sidebar - Pages list with DnD */}
      <div className="w-64 flex-shrink-0">
        <PagesSidebar
          pages={pages}
          selectedPageId={selectedPageId}
          onSelectPage={handleSelectPage}
          onCreatePage={handleCreatePage}
          onRenamePage={handleRenamePage}
          onDeletePage={handleDeletePage}
          onReorder={handleReorder}
        />
      </div>

      {/* Center - Editor/Preview/Builder */}
      <div className="flex-1 overflow-hidden">
        {selectedPageId ? (
          <PageEditor
            pageId={selectedPageId}
            savedHtmlContent={localHtmlContent}
            previewHtml={localHtmlContent}
            isSavingContent={saveContentMutation.isPending}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onHtmlSaved={handleHtmlSaved}
            builderInitKey={builderInitKey}
            htmlForBuilder={htmlForBuilderRef.current}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
            <FileText className="mb-4 h-12 w-12 opacity-50" />
            <p>{t('noPageSelected')}</p>
          </div>
        )}
      </div>

      {/* Right - Configuration placeholder (hidden in builder mode) */}
      {activeTab !== 'builder' && (
        <div className="w-64 flex-shrink-0">
          <PageConfig />
        </div>
      )}
    </div>
  );
}
