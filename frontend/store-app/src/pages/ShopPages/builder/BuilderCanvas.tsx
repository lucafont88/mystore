import { useTranslation } from 'react-i18next';
import { Droppable } from '@hello-pangea/dnd';
import { LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBuilderStore } from '@/stores/builderStore';
import { CanvasBlock } from './CanvasBlock';

interface BuilderCanvasProps {
  pageId: string;
}

export function BuilderCanvas({ pageId }: BuilderCanvasProps) {
  const { t } = useTranslation('shopPages');
  const blocks = useBuilderStore((s) => s.stateByPageId[pageId]?.blocks ?? []);
  const selectBlock = useBuilderStore((s) => s.selectBlock);

  return (
    <div
      className="flex h-full flex-1 flex-col overflow-y-auto bg-background"
      onClick={() => selectBlock(pageId, null)}
    >
      <Droppable droppableId="canvas-root">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              'min-h-full flex-1 p-4',
              snapshot.isDraggingOver && 'bg-primary/5'
            )}
          >
            {blocks.length === 0 && !snapshot.isDraggingOver ? (
              <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                <LayoutGrid className="mb-3 h-10 w-10 opacity-40" />
                <p className="text-sm">{t('builder.canvas.empty')}</p>
              </div>
            ) : (
              blocks.map((block, index) => (
                <CanvasBlock
                  key={block.id}
                  block={block}
                  pageId={pageId}
                  index={index}
                />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
