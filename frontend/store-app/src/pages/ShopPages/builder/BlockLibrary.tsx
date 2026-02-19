import { useTranslation } from 'react-i18next';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import {
  Blocks,
  ShoppingBag,
  MousePointerClick,
  Columns3,
  Square,
  Table,
  Code2,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { BLOCK_CATALOG } from './blockCatalog';

const iconMap: Record<string, LucideIcon> = {
  ShoppingBag,
  MousePointerClick,
  Columns3,
  Square,
  Table,
  Code2,
};

export function BlockLibrary() {
  const { t } = useTranslation('shopPages');

  return (
    <div className="flex h-full w-48 flex-col border-r bg-muted/30">
      <div className="border-b p-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <Blocks className="h-4 w-4" />
          {t('builder.library.title')}
        </h3>
      </div>
      <Droppable droppableId="block-library" isDropDisabled={true}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex-1 overflow-y-auto p-2"
          >
            {BLOCK_CATALOG.map((entry, index) => {
              const Icon = iconMap[entry.icon] ?? Blocks;
              return (
                <Draggable
                  key={entry.type}
                  draggableId={`catalog-${entry.type}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={cn(
                        'mb-2 flex cursor-grab items-center gap-2 rounded-md border bg-background p-2 text-sm',
                        snapshot.isDragging && 'opacity-80 shadow-md'
                      )}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                      <span>{t(entry.labelKey)}</span>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
