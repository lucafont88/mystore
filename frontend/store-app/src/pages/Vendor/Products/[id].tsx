import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useProductQuery } from '@/queries/useProductsQuery';
import { useLicenseKeysQuery, useAddLicenseKeys, useDeleteLicenseKey } from '@/queries/useDigitalProductsQuery';
import { useAuthStore } from '@/stores/authStore';
import { useState } from 'react';

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('vendor');
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const { data: product, isLoading } = useProductQuery(id!);
  const isDigitalLicense = product?.productType === 'DIGITAL_LICENSE';
  const { data: licenseKeys } = useLicenseKeysQuery(isDigitalLicense ? id! : '');
  const addKeys = useAddLicenseKeys();
  const deleteKey = useDeleteLicenseKey();

  const [newKeys, setNewKeys] = useState('');

  if (!isAuthenticated || user?.role?.toUpperCase() !== 'VENDOR') {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-20 text-center">
        <ShieldAlert className="mb-4 h-16 w-16 text-destructive/60" />
        <h1 className="mb-2 text-2xl font-bold">{t('accessDenied', 'Accesso negato')}</h1>
      </div>
    );
  }

  if (isLoading) return <div className="container mx-auto px-4 py-8">Caricamento...</div>;
  if (!product) return <div className="container mx-auto px-4 py-8">Prodotto non trovato</div>;

  const handleAddKeys = async () => {
    const keys = newKeys.split('\n').map((k) => k.trim()).filter(Boolean);
    if (keys.length === 0) return;
    await addKeys.mutateAsync({ productId: id!, keys });
    setNewKeys('');
  };

  const handleDeleteKey = async (keyId: string) => {
    await deleteKey.mutateAsync({ productId: id!, keyId });
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <Button variant="ghost" className="mb-4 gap-2" onClick={() => navigate('/vendor/products')}>
        <ArrowLeft className="h-4 w-4" /> Torna ai prodotti
      </Button>

      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <Badge variant="outline">{product.productType || 'PHYSICAL'}</Badge>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border p-4 space-y-3">
          <h2 className="font-semibold">Informazioni generali</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label>Prezzo</Label>
              <div className="text-sm">€{Number(product.price).toFixed(2)}</div>
            </div>
            <div>
              <Label>SKU</Label>
              <div className="text-sm">{(product as any).sku}</div>
            </div>
            {product.category && (
              <div>
                <Label>Categoria</Label>
                <div className="text-sm">{product.category.name}</div>
              </div>
            )}
            {product.productType === 'PHYSICAL' && (
              <div>
                <Label>Stock</Label>
                <div className="text-sm">{product.stockQuantity}</div>
              </div>
            )}
          </div>
        </div>

        {/* Digital file info */}
        {product.productType === 'DIGITAL_FILE' && product.digitalFile && (
          <div className="rounded-lg border p-4 space-y-3">
            <h2 className="font-semibold">File digitale</h2>
            <div className="text-sm">
              <div>File: {product.digitalFile.fileName}</div>
              <div>Dimensione: {(product.digitalFile.fileSize / 1024 / 1024).toFixed(2)} MB</div>
              <div>Max download: {product.digitalFile.maxDownloads}</div>
            </div>
          </div>
        )}

        {/* Digital access info */}
        {product.productType === 'DIGITAL_ACCESS' && product.digitalAccess && (
          <div className="rounded-lg border p-4 space-y-3">
            <h2 className="font-semibold">Accesso digitale</h2>
            <div className="text-sm">
              <div>Durata: {product.digitalAccess.accessDurationDays} giorni</div>
              {product.digitalAccess.accessUrl && <div>URL: {product.digitalAccess.accessUrl}</div>}
            </div>
          </div>
        )}

        {/* License keys management */}
        {isDigitalLicense && (
          <div className="rounded-lg border p-4 space-y-4">
            <h2 className="font-semibold">Chiavi di licenza</h2>
            <div className="text-sm text-muted-foreground">
              {licenseKeys?.length || 0} chiavi totali • {licenseKeys?.filter((k) => !k.isRedeemed).length || 0} disponibili
            </div>

            <div className="space-y-2">
              <Label>Aggiungi chiavi (una per riga)</Label>
              <Textarea rows={4} value={newKeys} onChange={(e) => setNewKeys(e.target.value)} />
              <Button size="sm" onClick={handleAddKeys} disabled={!newKeys.trim() || addKeys.isPending}>
                {addKeys.isPending ? 'Aggiunta...' : 'Aggiungi chiavi'}
              </Button>
            </div>

            {licenseKeys && licenseKeys.length > 0 && (
              <div className="max-h-60 overflow-y-auto space-y-1">
                {licenseKeys.map((key) => (
                  <div key={key.id} className="flex items-center justify-between rounded bg-muted/50 px-3 py-1.5 text-sm font-mono">
                    <span className={key.isRedeemed ? 'line-through text-muted-foreground' : ''}>
                      {key.key}
                    </span>
                    <div className="flex items-center gap-2">
                      {key.isRedeemed ? (
                        <Badge variant="secondary" className="text-xs">Riscattata</Badge>
                      ) : (
                        <Button variant="ghost" size="sm" className="h-6 text-xs text-destructive" onClick={() => handleDeleteKey(key.id)}>
                          Rimuovi
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
