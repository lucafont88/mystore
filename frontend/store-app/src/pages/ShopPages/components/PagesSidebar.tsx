import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from '@hello-pangea/dnd';
import { Plus, GripVertical, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { ShopPageListItem } from '@/types/shopPage';
import { cn } from '@/lib/utils';

interface PagesSidebarProps {
  pages: ShopPageListItem[];
  selectedPageId: string | null;
  onSelectPage: (id: string) => void;
  onCreatePage: (title: string) => void;
  onRenamePage: (id: string, newTitle: string) => void;
  onDeletePage: (id: string) => void;
  onReorder: (pages: ShopPageListItem[]) => void;
}

const statusColors: Record<string, string> = {
  NEW_PAGE: 'bg-blue-100 text-blue-700',
  DRAFT: 'bg-yellow-100 text-yellow-700',
  PUBLISHED: 'bg-green-100 text-green-700',
};

type DialogState =
  | { type: 'closed' }
  | { type: 'create' }
  | { type: 'rename'; page: ShopPageListItem }
  | { type: 'delete'; page: ShopPageListItem };

export function PagesSidebar({
  pages,
  selectedPageId,
  onSelectPage,
  onCreatePage,
  onRenamePage,
  onDeletePage,
  onReorder,
}: PagesSidebarProps) {
  const { t } = useTranslation('shopPages');
  const [dialog, setDialog] = useState<DialogState>({ type: 'closed' });
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (dialog.type === 'create' || dialog.type === 'rename') {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [dialog.type]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;

    const reordered = Array.from(pages);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    onReorder(reordered);
  };

  const openCreateDialog = () => {
    setInputValue('');
    setDialog({ type: 'create' });
  };

  const openRenameDialog = (e: React.MouseEvent, page: ShopPageListItem) => {
    e.stopPropagation();
    setInputValue(page.title);
    setDialog({ type: 'rename', page });
  };

  const openDeleteDialog = (e: React.MouseEvent, page: ShopPageListItem) => {
    e.stopPropagation();
    setDialog({ type: 'delete', page });
  };

  const closeDialog = () => setDialog({ type: 'closed' });

  const handleConfirmCreate = () => {
    if (inputValue.trim()) {
      onCreatePage(inputValue.trim());
      closeDialog();
    }
  };

  const handleConfirmRename = () => {
    if (dialog.type === 'rename' && inputValue.trim() && inputValue.trim() !== dialog.page.title) {
      onRenamePage(dialog.page.id, inputValue.trim());
      closeDialog();
    }
  };

  const handleConfirmDelete = () => {
    if (dialog.type === 'delete') {
      onDeletePage(dialog.page.id);
      closeDialog();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (dialog.type === 'create') handleConfirmCreate();
      if (dialog.type === 'rename') handleConfirmRename();
    }
  };

  return (
    <div className="flex h-full flex-col border-r bg-muted/30">
      <div className="border-b p-4">
        <Button onClick={openCreateDialog} className="w-full" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          {t('createNew')}
        </Button>
      </div>

      {pages.length === 0 ? (
        <div className="flex-1 p-4 text-center text-sm text-muted-foreground">
          {t('noPages')}
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="pages-list">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex-1 overflow-y-auto p-2"
              >
                {pages.map((page, index) => (
                  <Draggable key={page.id} draggableId={page.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={cn(
                          'mb-1 flex items-center rounded-md border bg-background p-2 text-sm transition-colors cursor-pointer',
                          selectedPageId === page.id && 'border-primary bg-primary/5',
                          snapshot.isDragging && 'shadow-md'
                        )}
                        onClick={() => onSelectPage(page.id)}
                      >
                        <div
                          {...provided.dragHandleProps}
                          className="mr-2 flex-shrink-0 text-muted-foreground hover:text-foreground"
                        >
                          <GripVertical className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium">{page.title}</p>
                          <span
                            className={cn(
                              'mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium',
                              statusColors[page.status] ?? 'bg-gray-100 text-gray-700'
                            )}
                          >
                            {t(`status.${page.status}`)}
                          </span>
                        </div>
                        <div className="ml-1 flex flex-shrink-0 gap-1">
                          <button
                            type="button"
                            onClick={(e) => openRenameDialog(e, page)}
                            className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                            title={t('renamePage')}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => openDeleteDialog(e, page)}
                            className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            title={t('deletePage')}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {/* Create dialog */}
      <Dialog open={dialog.type === 'create'} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('createNew')}</DialogTitle>
            <DialogDescription>{t('createPrompt')}</DialogDescription>
          </DialogHeader>
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('newPage.title')}
          />
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              {t('common:actions.cancel', 'Annulla')}
            </Button>
            <Button onClick={handleConfirmCreate} disabled={!inputValue.trim()}>
              {t('common:actions.add', 'Aggiungi')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename dialog */}
      <Dialog open={dialog.type === 'rename'} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('renamePage')}</DialogTitle>
            <DialogDescription>{t('renamePrompt')}</DialogDescription>
          </DialogHeader>
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              {t('common:actions.cancel', 'Annulla')}
            </Button>
            <Button onClick={handleConfirmRename} disabled={!inputValue.trim()}>
              {t('common:actions.save', 'Salva')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog open={dialog.type === 'delete'} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('deletePage')}</DialogTitle>
            <DialogDescription>
              {dialog.type === 'delete' && t('deleteConfirm', { title: dialog.page.title })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              {t('common:actions.cancel', 'Annulla')}
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              {t('deletePage')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
