import { useState } from 'react';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, CreditCard, Package, ShoppingBag, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { ordersService } from '@/services/orders.service';
import { useAuthStore } from '@/stores/authStore';

type CheckoutStep = 'shipping' | 'payment' | 'review';

export default function CheckoutPage() {
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const formattedTotal = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(getTotalPrice());

  const steps = [
    { id: 'shipping', label: 'Spedizione', icon: Package },
    { id: 'payment', label: 'Pagamento', icon: CreditCard },
    { id: 'review', label: 'Riepilogo', icon: ShoppingBag },
  ];

  const handleNext = async () => {
    if (step === 'shipping') setStep('payment');
    else if (step === 'payment') setStep('review');
    else if (step === 'review') {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }

      setIsSubmitting(true);
      setError(null);
      try {
        await ordersService.createOrder({
          items: items.map((item) => ({
            productId: item.productId,
            vendorId: item.vendorId,
            productName: item.name,
            productType: item.productType || 'PHYSICAL',
            unitPrice: item.price,
            quantity: item.quantity,
          })),
        });
        clearCart();
        navigate('/');
        alert('Ordine completato con successo!');
      } catch (err: any) {
        setError(err.message || 'Errore durante la creazione dell\'ordine');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (step === 'payment') setStep('shipping');
    else if (step === 'review') setStep('payment');
  };

  if (items.length === 0 && step !== 'review') {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Il tuo carrello è vuoto.</h1>
        <Button onClick={() => navigate('/products')}>Torna ai prodotti</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Stepper */}
      <div className="mb-12 flex justify-between">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const isActive = step === s.id;
          const isCompleted = steps.findIndex(st => st.id === step) > i;

          return (
            <div key={s.id} className="flex flex-1 flex-col items-center relative">
              <div
                className={cn(
                  "z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-background transition-colors",
                  isActive && "border-primary text-primary",
                  isCompleted && "border-primary bg-primary text-primary-foreground",
                  !isActive && !isCompleted && "border-muted text-muted-foreground"
                )}
              >
                {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : <Icon className="h-5 w-5" />}
              </div>
              <span className={cn("mt-2 text-sm font-medium", isActive ? "text-primary" : "text-muted-foreground")}>
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div className={cn(
                  "absolute top-5 left-1/2 w-full h-[2px]",
                  steps.findIndex(st => st.id === step) > i ? "bg-primary" : "bg-muted"
                )} />
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {step === 'shipping' && 'Informazioni di Spedizione'}
                {step === 'payment' && 'Metodo di Pagamento'}
                {step === 'review' && 'Conferma il tuo Ordine'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {step === 'shipping' && (
                <div className="space-y-4">
                  <p className="text-muted-foreground">Placeholder per il form di spedizione...</p>
                  <div className="h-40 w-full rounded border-2 border-dashed flex items-center justify-center">
                    Form Spedizione (React Hook Form)
                  </div>
                </div>
              )}
              {step === 'payment' && (
                <div className="space-y-4">
                  <p className="text-muted-foreground">Placeholder per l'integrazione con Stripe...</p>
                  <div className="h-40 w-full rounded border-2 border-dashed flex items-center justify-center">
                    Stripe Elements Placeholder
                  </div>
                </div>
              )}
              {step === 'review' && (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.productId} className="flex justify-between py-2 border-b">
                      <span>{item.name} x {item.quantity}</span>
                      <span className="font-medium">€{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack} disabled={step === 'shipping' || isSubmitting}>
              Indietro
            </Button>
            <Button onClick={handleNext} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {step === 'review' ? 'Completa Ordine' : 'Continua'}
            </Button>
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Riepilogo Ordine</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotale</span>
                <span>{formattedTotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Spedizione</span>
                <span className="text-green-600 font-medium">Gratis</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Totale</span>
                <span className="text-primary">{formattedTotal}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
