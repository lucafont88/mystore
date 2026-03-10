import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { ShieldCheck, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { stripeIdentityService } from '@/services/stripeIdentity.service';
import { api } from '@/services/api';
import { useAuthStore } from '@/stores/authStore';
import type { ProfileStatus } from '@/stores/authStore';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

type Step = 'idle' | 'verifying' | 'waiting' | 'checking' | 'done' | 'failed';

export default function VendorVerifyIdentityPage() {
  const navigate = useNavigate();
  const { login, user, token, isAuthenticated } = useAuthStore();
  const [step, setStep] = useState<Step>('idle');
  const [error, setError] = useState<string | null>(null);

  // Redirect al login se la sessione è scaduta
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleUnauthorized = useCallback(() => {
    // api.ts ha già chiamato logout() e cancellato il token
    navigate('/login', { replace: true });
  }, [navigate]);

  const startVerification = useCallback(async () => {
    setStep('verifying');
    setError(null);
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe non disponibile');

      const { clientSecret } = await stripeIdentityService.createSession();
      const { error: stripeError } = await stripe.verifyIdentity(clientSecret);

      if (stripeError) {
        if (stripeError.code === 'session_cancelled') {
          setStep('idle');
        } else {
          setError(stripeError.message || 'Verifica non riuscita');
          setStep('failed');
        }
      } else {
        // Modal completato — webhook confermerà in background
        setStep('waiting');
      }
    } catch (err: any) {
      if (err?.status === 401) {
        handleUnauthorized();
        return;
      }
      setError(err.message || 'Errore durante la verifica');
      setStep('failed');
    }
  }, [handleUnauthorized]);

  const checkVerificationStatus = useCallback(async () => {
    setStep('checking');
    setError(null);
    try {
      // 1. Interroga Stripe via backend per ottenere lo stato aggiornato
      const { status } = await stripeIdentityService.checkStatus();

      if (status === 'VERIFIED') {
        // 2. Identità verificata — aggiorna lo stato utente dal server
        const response = await api.get<{ user: { profileStatus: ProfileStatus } }>('/auth/me');
        const freshStatus = response?.user?.profileStatus;

        if (freshStatus === 'COMPLETE') {
          if (user && token) {
            login({ ...user, profileStatus: 'COMPLETE' }, token);
          }
          setStep('done');
          setTimeout(() => navigate('/vendor/dashboard'), 1500);
        } else {
          // Identità verificata ma l'evento RabbitMQ non ha ancora aggiornato l'auth-service
          setError('Identità verificata! L\'account è in fase di attivazione, riprova tra qualche secondo.');
          setStep('waiting');
        }
      } else if (status === 'FAILED') {
        setError('La verifica è fallita. Riprova con un documento valido.');
        setStep('failed');
      } else {
        // PENDING o PROCESSING
        setError('La verifica non è ancora completata. Riprova tra qualche istante.');
        setStep('waiting');
      }
    } catch (err: any) {
      if (err?.status === 401) {
        handleUnauthorized();
        return;
      }
      setError(err?.message || 'Impossibile verificare lo stato. Riprova.');
      setStep('waiting');
    }
  }, [user, token, login, navigate, handleUnauthorized]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-lg space-y-4">
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Verifica identità</h1>
          <p className="text-muted-foreground text-sm">
            Ultimo passaggio — verifica la tua identità per iniziare a vendere su Zelko.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Verifica tramite Stripe Identity
            </CardTitle>
            <CardDescription>
              Avrai bisogno di un documento d'identità valido (carta d'identità, passaporto o
              patente) e potrebbe essere richiesta una foto del volto.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {step === 'idle' && (
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  Clicca "Avvia verifica" per aprire il processo guidato di Stripe
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  Segui le istruzioni per fotografare il tuo documento
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  Al termine, attendi qualche secondo e clicca "Ho completato la verifica"
                </li>
              </ul>
            )}

            {(step === 'waiting' || step === 'checking') && (
              <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 text-sm text-blue-800">
                <p className="font-medium mb-1">Verifica in corso</p>
                <p>
                  Abbiamo ricevuto i tuoi documenti. La verifica può richiedere qualche secondo.
                  Clicca "Ho completato la verifica" per aggiornare lo stato.
                </p>
              </div>
            )}

            {step === 'done' && (
              <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 p-4 text-sm text-green-800">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <p>Identità verificata! Reindirizzamento alla dashboard...</p>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <p>{error}</p>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-2">
            {(step === 'idle' || step === 'verifying' || step === 'failed') && (
              <Button
                className="w-full"
                onClick={startVerification}
                disabled={step === 'verifying'}
              >
                {step === 'verifying' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Caricamento...
                  </>
                ) : step === 'failed' ? (
                  'Riprova verifica'
                ) : (
                  'Avvia verifica'
                )}
              </Button>
            )}

            {(step === 'waiting' || step === 'checking') && (
              <Button
                className="w-full"
                onClick={checkVerificationStatus}
                disabled={step === 'checking'}
              >
                {step === 'checking' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifica in corso...
                  </>
                ) : (
                  'Ho completato la verifica'
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
