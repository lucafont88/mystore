import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ShieldAlert, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useBundleQuery, useDeleteBundle } from '@/queries/useBundlesQuery';
import { useAuthStore } from '@/stores/authStore';

export default function EditBundlePage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('vendor');
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const { data: bundle, isLoading } = useBundleQuery(id!);
  const deleteBundle = useDeleteBundle();

  if (!isAuthenticated || user?.role?.toUpperCase() !== 'VENDOR') {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-20 text-center">
        <ShieldAlert className="mb-4 h-16 w-16 text-destructive/60" />
        <h1 className="mb-2 text-2xl font-bold">{t('accessDenied', 'Accesso negato')}</h1>
      </div>
    );
  }

  if (isLoading) return <div className="container mx-auto px-4 py-8">Caricamento...</div>;
  if (!bundle) return <div className="container mx-auto px-4 py-8">Bundle non trovato</div>;

  const originalPrice = bundle.items?.reduce(
    (sum, item) => sum + Number(item.product?.price || 0) * item.quantity, 0
  ) || 0;
  const discount = originalPrice > 0 ? Math.round((1 - Number(bundle.price) / originalPrice) * 100) : 0;

  const handleDelete = async () => {
    if (!confirm('Sei sicuro di voler eliminare questo bundle?')) return;
    await deleteBundle.mutateAsync(id!);
    navigate('/vendor/bundles');
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <Button variant="ghost" className="mb-4 gap-2" onClick={() => navigate('/vendor/bundles')}>
        <ArrowLeft className="h-4 w-4" /> Torna ai bundle
      </Button>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">{bundle.name}</h1>
          <Badge variant={bundle.isActive ? 'default' : 'secondary'}>
            {bundle.isActive ? 'Attivo' : 'Inattivo'}
          </Badge>
        </div>
        <Button variant="destructive" size="sm" className="gap-2" onClick={handleDelete}>
          <Trash2 className="h-4 w-4" /> Elimina
        </Button>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border p-4 space-y-2">
          <h2 className="font-semibold">Prezzo</h2>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold">€{Number(bundle.price).toFixed(2)}</span>
            {originalPrice > 0 && (
              <>
                <span className="text-lg text-muted-foreground line-through">€{originalPrice.toFixed(2)}</span>
                <Badge className="bg-green-100 text-green-700">-{discount}%</Badge>
              </>
            )}
          </div>
        </div>

        <div className="rounded-lg border p-4 space-y-3">
          <h2 className="font-semibold">Prodotti inclusi ({bundle.items?.length || 0})</h2>
          <div className="space-y-2">
            {bundle.items?.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded bg-muted/50 px-3 py-2 text-sm">
                <span>{item.product?.name || 'Prodotto'}</span>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span>x{item.quantity}</span>
                  <span>€{(Number(item.product?.price || 0) * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {bundle.description && (
          <div className="rounded-lg border p-4 space-y-2">
            <h2 className="font-semibold">Descrizione</h2>
            <p className="text-sm text-muted-foreground">{bundle.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
