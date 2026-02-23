import { Draggable, Droppable } from '@hello-pangea/dnd';
import { X, ShoppingBag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { useBuilderStore } from '@/stores/builderStore';
import {
  BuilderBlock,
  ButtonBlockProps,
  RowBlockProps,
  BoxBlockProps,
  TableBlockProps,
  HtmlBlockProps,
} from '@/types/builder';
import { Button } from '@/components/ui/button';

interface CanvasBlockProps {
  block: BuilderBlock;
  pageId: string;
  index: number;
}

function BlockContent({ block, t }: { block: BuilderBlock; t: (key: string) => string }) {
  switch (block.type) {
    case 'product': {
      return (
        <div className="flex items-center gap-2 rounded-md border border-dashed border-muted-foreground/30 bg-muted/20 p-4">
          <ShoppingBag className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{t('builder.canvas.productPlaceholder')}</span>
        </div>
      );
    }
    case 'button': {
      const props = block.props as ButtonBlockProps;
      const variantMap: Record<string, 'default' | 'secondary' | 'outline'> = {
        primary: 'default',
        secondary: 'secondary',
        outline: 'outline',
      };
      return (
        <Button variant={variantMap[props.variant] ?? 'default'} size="sm" className="pointer-events-none">
          {props.text}
        </Button>
      );
    }
    case 'row': {
      const props = block.props as RowBlockProps;
      const justifyMap: Record<string, string> = {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
      };
      return (
        <div
          className={cn('flex min-h-[40px] items-stretch', justifyMap[props.justify])}
          style={{ gap: `${props.gap}px` }}
        />
      );
    }
    case 'box': {
      const props = block.props as BoxBlockProps;
      return (
        <div
          className="min-h-[40px] rounded-sm"
          style={{
            padding: `${props.padding}px`,
            margin: `${props.margin}px`,
            backgroundColor: props.backgroundColor,
          }}
        />
      );
    }
    case 'table': {
      const props = block.props as TableBlockProps;
      return (
        <table className="w-full border-collapse text-sm">
          <tbody>
            {Array.from({ length: props.rows }, (_, r) => (
              <tr key={r}>
                {Array.from({ length: props.cols }, (_, c) => (
                  <td key={c} className="border border-muted-foreground/20 p-2">
                    {props.cells[r]?.[c] || ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    case 'html': {
      const props = block.props as HtmlBlockProps;
      const preview = props.content.substring(0, 80);
      return (
        <div className="rounded-sm border border-dashed border-amber-400/50 bg-amber-50/30 p-2 font-mono text-xs text-amber-700 dark:bg-amber-950/20 dark:text-amber-400">
          <span className="opacity-60">&lt;/&gt;</span>{' '}
          {preview}{preview.length < props.content.length ? '...' : ''}
        </div>
      );
    }
    default:
      return null;
  }
}

export function CanvasBlock({ block, pageId, index }: CanvasBlockProps) {
  const { t } = useTranslation('shopPages');
  const selectedBlockId = useBuilderStore((s) => s.stateByPageId[pageId]?.selectedBlockId);
  const selectBlock = useBuilderStore((s) => s.selectBlock);
  const removeBlock = useBuilderStore((s) => s.removeBlock);
  const isSelected = selectedBlockId === block.id;
  const isContainer = block.type === 'row' || block.type === 'box';

  return (
    <Draggable draggableId={block.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            'group relative mb-2 rounded-md border bg-background p-2 transition-colors',
            isSelected && 'border-primary ring-1 ring-primary/30',
            snapshot.isDragging && 'shadow-lg',
            !isSelected && 'hover:border-muted-foreground/40'
          )}
          onClick={(e) => {
            e.stopPropagation();
            selectBlock(pageId, block.id);
          }}
        >
          {/* Block type label */}
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {t(`builder.blocks.${block.type}`)}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeBlock(pageId, block.id);
              }}
              className="rounded p-0.5 text-muted-foreground opacity-0 transition-opacity hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
              title={t('builder.canvas.removeBlock')}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Block visual content */}
          <BlockContent block={block} t={t} />

          {/* Container children zone */}
          {isContainer && (
            <Droppable droppableId={`container-${block.id}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    'mt-2 min-h-[32px] rounded border border-dashed p-1',
                    snapshot.isDraggingOver
                      ? 'border-primary/50 bg-primary/5'
                      : 'border-muted-foreground/20',
                    block.children.length === 0 && 'flex items-center justify-center'
                  )}
                >
                  {block.children.length === 0 ? (
                    <span className="text-xs text-muted-foreground/50">
                      {t('builder.canvas.dropHere')}
                    </span>
                  ) : (
                    block.children.map((child, childIndex) => (
                      <CanvasBlock
                        key={child.id}
                        block={child}
                        pageId={pageId}
                        index={childIndex}
                      />
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        </div>
      )}
    </Draggable>
  );
}
