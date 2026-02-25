import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Package, Download, Key, Globe, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCreateDigitalProduct } from '@/queries/useDigitalProductsQuery';
import { useAuthStore } from '@/stores/authStore';
import { useCategoriesQuery } from '@/queries/useProductsQuery';
import { ProductType } from '@/types/product';

const typeOptions: { value: ProductType; label: string; desc: string; icon: React.ReactNode }[] = [
  { value: 'PHYSICAL', label: 'Prodotto Fisico', desc: 'Articolo con spedizione', icon: <Package className="h-6 w-6" /> },
  { value: 'DIGITAL_FILE', label: 'File Scaricabile', desc: 'PDF, ZIP, MP3, ecc.', icon: <Download className="h-6 w-6" /> },
  { value: 'DIGITAL_LICENSE', label: 'Licenza / Chiave', desc: 'Codici di attivazione', icon: <Key className="h-6 w-6" /> },
  { value: 'DIGITAL_ACCESS', label: 'Accesso / Abbonamento', desc: 'Contenuti riservati', icon: <Globe className="h-6 w-6" /> },
];

export default function CreateProductPage() {
  const { t } = useTranslation('vendor');
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const { data: categories } = useCategoriesQuery();
  const createDigital = useCreateDigitalProduct();

  const [step, setStep] = useState(1);
  const [productType, setProductType] = useState<ProductType>('PHYSICAL');
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    sku: '',
    categoryId: '',
    stockQuantity: '0',
    // Digital file
    maxDownloads: '5',
    // Digital access
    accessDurationDays: '30',
    accessUrl: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [licenseKeys, setLicenseKeys] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthenticated || user?.role?.toUpperCase() !== 'VENDOR') {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-20 text-center">
        <ShieldAlert className="mb-4 h-16 w-16 text-destructive/60" />
        <h1 className="mb-2 text-2xl font-bold">{t('accessDenied', 'Accesso negato')}</h1>
      </div>
    );
  }

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (productType === 'PHYSICAL') {
        // Use existing product API for physical products
        const { api } = await import('@/services/api');
        await api.post('/products', {
          name: form.name,
          description: form.description,
          price: parseFloat(form.price),
          sku: form.sku,
          categoryId: form.categoryId,
          stockQuantity: parseInt(form.stockQuantity),
          productType: 'PHYSICAL',
        });
      } else {
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('description', form.description);
        formData.append('price', form.price);
        formData.append('sku', form.sku);
        formData.append('categoryId', form.categoryId);
        formData.append('digitalType', productType);

        if (productType === 'DIGITAL_FILE' && file) {
          formData.append('file', file);
          formData.append('maxDownloads', form.maxDownloads);
        }
        if (productType === 'DIGITAL_ACCESS') {
          formData.append('accessDurationDays', form.accessDurationDays);
          if (form.accessUrl) formData.append('accessUrl', form.accessUrl);
        }

        await createDigital.mutateAsync(formData);
      }
      navigate('/vendor/products');
    } catch (err: any) {
      alert(err.message || 'Errore nella creazione');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">{t('products.createTitle', 'Nuovo prodotto')}</h1>

      {/* Step 1: Choose type */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Tipo di prodotto</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {typeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { setProductType(opt.value); setStep(2); }}
                className={`flex items-center gap-3 rounded-lg border-2 p-4 text-left transition-colors hover:bg-muted/50 ${
                  productType === opt.value ? 'border-primary bg-primary/5' : 'border-muted'
                }`}
              >
                <div className="shrink-0 text-primary">{opt.icon}</div>
                <div>
                  <div className="font-medium">{opt.label}</div>
                  <div className="text-sm text-muted-foreground">{opt.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Common fields */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Informazioni generali</h2>
          <div className="space-y-3">
            <div>
              <Label>Nome</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <Label>Descrizione</Label>
              <Textarea value={form.description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label>Prezzo (€)</Label>
                <Input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
              <div>
                <Label>SKU</Label>
                <Input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
              </div>
            </div>
            <div>
              <Label>Categoria</Label>
              <select
                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              >
                <option value="">Seleziona categoria...</option>
                {(categories || []).map((cat: any) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep(1)}>Indietro</Button>
            <Button onClick={() => setStep(3)} disabled={!form.name || !form.price || !form.sku || !form.categoryId}>
              Avanti
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Type-specific fields */}
      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Dettagli specifici</h2>
          <div className="space-y-3">
            {productType === 'PHYSICAL' && (
              <div>
                <Label>Quantità in stock</Label>
                <Input type="number" value={form.stockQuantity} onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })} />
              </div>
            )}
            {productType === 'DIGITAL_FILE' && (
              <>
                <div>
                  <Label>File da caricare</Label>
                  <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                </div>
                <div>
                  <Label>Max download per acquisto</Label>
                  <Input type="number" value={form.maxDownloads} onChange={(e) => setForm({ ...form, maxDownloads: e.target.value })} />
                </div>
              </>
            )}
            {productType === 'DIGITAL_LICENSE' && (
              <div>
                <Label>Chiavi di licenza (una per riga)</Label>
                <Textarea
                  rows={6}
                  placeholder="XXXXX-XXXXX-XXXXX&#10;YYYYY-YYYYY-YYYYY"
                  value={licenseKeys}
                  onChange={(e) => setLicenseKeys(e.target.value)}
                />
              </div>
            )}
            {productType === 'DIGITAL_ACCESS' && (
              <>
                <div>
                  <Label>Durata accesso (giorni)</Label>
                  <Input type="number" value={form.accessDurationDays} onChange={(e) => setForm({ ...form, accessDurationDays: e.target.value })} />
                </div>
                <div>
                  <Label>URL accesso (opzionale)</Label>
                  <Input value={form.accessUrl} onChange={(e) => setForm({ ...form, accessUrl: e.target.value })} />
                </div>
              </>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep(2)}>Indietro</Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Creazione...' : 'Crea prodotto'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
