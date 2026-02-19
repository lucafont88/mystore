import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { Loader2, Save, Undo2 } from 'lucide-react';
import { useBuilderStore } from '@/stores/builderStore';
import { useBuilderQuery, useSaveBuilder } from '@/queries/useShopPagesQuery';
import { BuilderBlock } from '@/types/builder';
import { Button } from '@/components/ui/button';
import { BLOCK_CATALOG, createBlock } from './blockCatalog';
import { BlockLibrary } from './BlockLibrary';
import { BuilderCanvas } from './BuilderCanvas';
import { PropertyInspector } from './PropertyInspector';
import { blocksToHtml } from './blocksToHtml';
import { htmlToBlocks } from './htmlToBlocks';

interface SiteBuilderProps {
  pageId: string;
  onHtmlGenerated?: (html: string) => void;
  initKey?: number;
  htmlContent?: string;
  fallbackHtml?: string;
}

export function SiteBuilder({ pageId, onHtmlGenerated, initKey, htmlContent, fallbackHtml }: SiteBuilderProps) {
  const { t } = useTranslation('shopPages');
  const { data: builderData, isLoading } = useBuilderQuery(pageId);
  const saveBuilder = useSaveBuilder();
  const initializedRef = useRef<string | null>(null);

  // Snapshot of the last saved state — used for dirty check and cancel
  const [savedSnapshot, setSavedSnapshot] = useState<string>('[]');

  const setBlocks = useBuilderStore((s) => s.setBlocks);
  const addBlock = useBuilderStore((s) => s.addBlock);
  const reorderBlocks = useBuilderStore((s) => s.reorderBlocks);
  const moveBlock = useBuilderStore((s) => s.moveBlock);
  const currentBlocks = useBuilderStore((s) => s.stateByPageId[pageId]?.blocks ?? []);

  const isDirty = JSON.stringify(currentBlocks) !== savedSnapshot;

  // Re-initialize from HTML when initKey changes (tab switch from source → builder)
  useEffect(() => {
    if (initKey && initKey > 0 && htmlContent) {
      const blocks = htmlToBlocks(htmlContent);
      setBlocks(pageId, blocks);
      setSavedSnapshot(JSON.stringify(blocks));
      initializedRef.current = pageId;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initKey]);

  // Initialize store from API data (fallback — only if not already initialized)
  useEffect(() => {
    if (builderData && initializedRef.current !== pageId) {
      const blocks = builderData.blocks ?? [];
      if (blocks.length === 0 && fallbackHtml) {
        const parsed = htmlToBlocks(fallbackHtml);
        setBlocks(pageId, parsed);
        setSavedSnapshot(JSON.stringify(parsed));
      } else {
        setBlocks(pageId, blocks);
        setSavedSnapshot(JSON.stringify(blocks));
      }
      initializedRef.current = pageId;
    }
  }, [builderData, pageId, setBlocks, fallbackHtml]);

  const handleSave = useCallback(() => {
    saveBuilder.mutate(
      { id: pageId, data: { blocks: currentBlocks } },
      {
        onSuccess: () => {
          setSavedSnapshot(JSON.stringify(currentBlocks));
          onHtmlGenerated?.(blocksToHtml(currentBlocks));
        },
      }
    );
  }, [pageId, currentBlocks, saveBuilder, onHtmlGenerated]);

  const handleCancel = useCallback(() => {
    const restored: BuilderBlock[] = JSON.parse(savedSnapshot);
    setBlocks(pageId, restored);
  }, [pageId, savedSnapshot, setBlocks]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    // Case 1: Drag from library → canvas/container
    if (source.droppableId === 'block-library') {
      const catalogEntry = BLOCK_CATALOG[source.index];
      if (!catalogEntry) return;

      const destParentId =
        destination.droppableId === 'canvas-root'
          ? undefined
          : destination.droppableId.replace('container-', '');

      const newBlock = createBlock(catalogEntry);
      addBlock(pageId, newBlock, destParentId, destination.index);
      return;
    }

    // Case 2: Reorder within same droppable
    if (source.droppableId === destination.droppableId) {
      if (source.index === destination.index) return;
      const parentId =
        source.droppableId === 'canvas-root'
          ? null
          : source.droppableId.replace('container-', '');
      reorderBlocks(pageId, parentId, source.index, destination.index);
      return;
    }

    // Case 3: Move between droppables
    const toParentId =
      destination.droppableId === 'canvas-root'
        ? null
        : destination.droppableId.replace('container-', '');
    moveBlock(pageId, result.draggableId, toParentId, destination.index);
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar with Save / Cancel */}
      <div className="flex items-center justify-end gap-2 border-b px-4 py-2">
        {saveBuilder.isPending && (
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
          disabled={!isDirty || saveBuilder.isPending}
          onClick={handleSave}
          className="gap-1.5"
        >
          <Save className="h-3.5 w-3.5" />
          {t('builder.save')}
        </Button>
      </div>

      {/* 3-column builder layout */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-1 overflow-hidden">
          <BlockLibrary />
          <BuilderCanvas pageId={pageId} />
          <PropertyInspector pageId={pageId} />
        </div>
      </DragDropContext>
    </div>
  );
}
