import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCategoriesQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } from '@/queries/useCategoriesQuery';
import { Category } from '@/services/categories.service';

interface CategoryFormState {
  name: string;
  description: string;
  parentId: string;
}

const EMPTY_FORM: CategoryFormState = { name: '', description: '', parentId: '' };

export default function AdminCategoriesPage() {
  const { t } = useTranslation('admin');
  const { data: categories, isLoading, isError } = useCategoriesQuery();
  const createMutation = useCreateCategoryMutation();
  const updateMutation = useUpdateCategoryMutation();
  const deleteMutation = useDeleteCategoryMutation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState<CategoryFormState>(EMPTY_FORM);

  const openCreate = () => {
    setEditingCategory(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  };

  const openEdit = (category: Category) => {
    setEditingCategory(category);
    setForm({
      name: category.name,
      description: category.description ?? '',
      parentId: category.parentId ?? '',
    });
    setDialogOpen(true);
  };

  const openDelete = (id: string) => {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  };

  const handleSave = async () => {
    const payload = {
      name: form.name.trim(),
      description: form.description.trim() || undefined,
      parentId: form.parentId || null,
    };

    if (editingCategory) {
      await updateMutation.mutateAsync({ id: editingCategory.id, data: payload });
    } else {
      await createMutation.mutateAsync(payload);
    }
    setDialogOpen(false);
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    await deleteMutation.mutateAsync(deletingId);
    setDeleteDialogOpen(false);
    setDeletingId(null);
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const isDeleting = deleteMutation.isPending;

  // Exclude the category being edited from parent options (avoid self-reference)
  const parentOptions = (categories ?? []).filter(
    (c) => c.id !== editingCategory?.id
  );

  const getParentName = (parentId: string | null) => {
    if (!parentId) return '—';
    return categories?.find((c) => c.id === parentId)?.name ?? parentId;
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('categories.title')}</h1>
        <Button onClick={openCreate}>
          <Plus className="mr-2 h-4 w-4" />
          {t('categories.create')}
        </Button>
      </div>

      {isLoading && (
        <p className="text-muted-foreground">{t('categories.loading')}</p>
      )}
      {isError && (
        <p className="text-red-500">{t('categories.errorLoad')}</p>
      )}

      {!isLoading && !isError && (
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">{t('categories.name')}</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">{t('categories.slug')}</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">{t('categories.description')}</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">{t('categories.parent')}</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {(categories ?? []).length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    {t('categories.noCategories')}
                  </td>
                </tr>
              ) : (
                (categories ?? []).map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{category.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{category.slug}</td>
                    <td className="max-w-xs px-4 py-3 text-muted-foreground truncate">
                      {category.description ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {getParentName(category.parentId)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(category)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => openDelete(category.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? t('categories.edit') : t('categories.create')}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="cat-name">{t('categories.name')} *</Label>
              <Input
                id="cat-name"
                placeholder={t('categories.namePlaceholder')}
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cat-description">{t('categories.description')}</Label>
              <Textarea
                id="cat-description"
                placeholder={t('categories.descriptionPlaceholder')}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cat-parent">{t('categories.parent')}</Label>
              <Select
                value={form.parentId || '__none__'}
                onValueChange={(val) =>
                  setForm((f) => ({ ...f, parentId: val === '__none__' ? '' : val }))
                }
              >
                <SelectTrigger id="cat-parent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">{t('categories.noParent')}</SelectItem>
                  {parentOptions.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              {t('categories.cancel')}
            </Button>
            <Button onClick={handleSave} disabled={isSaving || !form.name.trim()}>
              {isSaving ? t('categories.saving') : t('categories.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('categories.confirmDeleteTitle')}</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">{t('categories.confirmDelete')}</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              {t('categories.cancel')}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? t('categories.saving') : t('categories.deleteConfirm')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
