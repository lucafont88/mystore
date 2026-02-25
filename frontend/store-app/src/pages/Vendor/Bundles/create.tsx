import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldAlert, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCreateBundle } from '@/queries/useBundlesQuery';
import { useProductsQuery, useCategoriesQuery } from '@/queries/useProductsQuery';
import { useAuthStore } from '@/stores/authStore';
import { Product } from '@/types/product';

export default function CreateBundlePage() {
  const { t } = useTranslation('vendor');
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const { data: productsData } = useProductsQuery({ vendorId: user?.id } as any);
  const { data: categories } = useCategoriesQuery();
  const createBundle = useCreateBundle();

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
  });
  const [selectedItems, setSelectedItems] = useState<{ productId: string; quantity: number; product: Product }[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isAuthenticated || user?.role?.toUpperCase() !== 'VENDOR') {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-20 text-center">
        <ShieldAlert className="mb-4 h-16 w-16 text-destructive/60" />
        <h1 className="mb-2 text-2xl font-bold">{t('accessDenied', 'Accesso negato')}</h1>
      </div>
    );
  }

  const products = ((productsData as any)?.items ?? []) as Product[];
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedItems.some((i) => i.productId === p.id)
  );

  const addProduct = (product: Product) => {
    setSelectedItems([...selectedItems, { productId: product.id, quantity: 1, product }]);
    setSearchQuery('');
  };

  const removeProduct = (productId: string) => {
    setSelectedItems(selectedItems.filter((i) => i.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setSelectedItems(selectedItems.map((i) => (i.productId === productId ? { ...i, quantity } : i)));
  };

  const originalPrice = selectedItems.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);

  const handleSubmit = async () => {
    try {
      await createBundle.mutateAsync({
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        categoryId: form.categoryId,
        items: selectedItems.map((i) => ({ productId: i.productId, quantity: i.quantity })),
      });
      navigate('/vendor/bundles');
    } catch (err: any) {
      alert(err.message || 'Errore nella creazione');
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">{t('bundles.createTitle', 'Nuovo bundle')}</h1>

      <div className="space-y-6">
        {/* Bundle info */}
        <div className="space-y-3">
          <div>
            <Label>Nome bundle</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <Label>Descrizione</Label>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label>Prezzo bundle (€)</Label>
              <Input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              {originalPrice > 0 && form.price && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Prezzo originale: €{originalPrice.toFixed(2)} • Sconto: {Math.round((1 - parseFloat(form.price) / originalPrice) * 100)}%
                </p>
              )}
            </div>
            <div>
              <Label>Categoria</Label>
              <select
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              >
                <option value="">Seleziona...</option>
                {(categories || []).map((cat: any) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Product picker */}
        <div className="space-y-3">
          <Label>Prodotti nel bundle</Label>

          {selectedItems.length > 0 && (
            <div className="space-y-2">
              {selectedItems.map((item) => (
                <div key={item.productId} className="flex items-center gap-3 rounded-lg border p-3">
                  <div className="flex-1 truncate">
                    <div className="font-medium text-sm">{item.product.name}</div>
                    <div className="text-xs text-muted-foreground">€{Number(item.product.price).toFixed(2)}</div>
                  </div>
                  <Input
                    type="number"
                    min={1}
                    className="w-16 text-center"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)}
                  />
                  <Button variant="ghost" size="sm" onClick={() => removeProduct(item.productId)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div>
            <Input
              placeholder="Cerca prodotti da aggiungere..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && filteredProducts.length > 0 && (
              <div className="mt-1 max-h-40 overflow-y-auto rounded-md border bg-background">
                {filteredProducts.slice(0, 10).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => addProduct(p)}
                    className="flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-muted/50"
                  >
                    <span>{p.name}</span>
                    <span className="text-muted-foreground">€{Number(p.price).toFixed(2)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={!form.name || !form.price || !form.categoryId || selectedItems.length === 0 || createBundle.isPending}
        >
          {createBundle.isPending ? 'Creazione...' : 'Crea bundle'}
        </Button>
      </div>
    </div>
  );
}
