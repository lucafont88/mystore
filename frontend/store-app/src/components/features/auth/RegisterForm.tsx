import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { registerSchema, RegisterInput } from '@/lib/validators';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useState, useEffect, useRef } from 'react';
import { authService } from '@/services/auth.service';
import { useNavigate } from 'react-router-dom';

const otpSchema = z.object({
  otp: z.string().length(6, 'Inserisci il codice a 6 cifre').regex(/^\d+$/, 'Solo cifre'),
});
type OtpInput = z.infer<typeof otpSchema>;

const RESEND_COOLDOWN = 60; // secondi

export function RegisterForm() {
  const { t } = useTranslation(['auth', 'common']);
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2>(1);
  const [registrationData, setRegistrationData] = useState<{ email: string; password: string; role: string } | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (cooldownRef.current) clearInterval(cooldownRef.current);
    };
  }, []);

  const startCooldown = () => {
    setCooldown(RESEND_COOLDOWN);
    cooldownRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Step 1: dati registrazione
  const {
    register: registerStep1,
    handleSubmit: handleStep1,
    formState: { errors: errorsStep1 },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onStep1Submit = async (data: RegisterInput) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.sendOtp(data.email, data.password, data.role ?? 'CUSTOMER');
      setRegistrationData({ email: data.email, password: data.password, role: data.role ?? 'CUSTOMER' });
      setStep(2);
      startCooldown();
    } catch (err: any) {
      setError(err.message || 'Errore durante la registrazione');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: OTP
  const {
    register: registerStep2,
    handleSubmit: handleStep2,
    formState: { errors: errorsStep2 },
    reset: resetOtpForm,
  } = useForm<OtpInput>({
    resolver: zodResolver(otpSchema),
  });

  const onStep2Submit = async (data: OtpInput) => {
    if (!registrationData) return;
    setIsLoading(true);
    setError(null);
    try {
      await authService.verifyOtp(registrationData.email, data.otp, registrationData.password);
      const user = authService.getCurrentUser();
      if (user?.role === 'VENDOR' && user?.profileStatus === 'PENDING_PROFILE') {
        navigate('/vendor/complete-profile');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'Codice non valido o scaduto');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!registrationData || cooldown > 0) return;
    setIsLoading(true);
    setError(null);
    try {
      await authService.sendOtp(registrationData.email, registrationData.password, registrationData.role);
      resetOtpForm();
      startCooldown();
    } catch (err: any) {
      setError(err.message || 'Errore nel reinvio del codice');
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 1) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t('register.title', 'Registrati')}</CardTitle>
          <CardDescription>
            {t('register.description', 'Crea un nuovo account per iniziare a fare acquisti')}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleStep1(onStep1Submit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="email">Email</label>
              <Input id="email" type="email" {...registerStep1('email')} />
              {errorsStep1.email && <p className="text-xs text-destructive">{errorsStep1.email.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Tipo account</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value="CUSTOMER" {...registerStep1('role')} defaultChecked />
                  <span className="text-sm">Cliente</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value="VENDOR" {...registerStep1('role')} />
                  <span className="text-sm">Venditore</span>
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="password">Password</label>
              <Input id="password" type="password" {...registerStep1('password')} />
              {errorsStep1.password && <p className="text-xs text-destructive">{errorsStep1.password.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="confirmPassword">Conferma Password</label>
              <Input id="confirmPassword" type="password" {...registerStep1('confirmPassword')} />
              {errorsStep1.confirmPassword && <p className="text-xs text-destructive">{errorsStep1.confirmPassword.message}</p>}
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t('common:actions.loading') : 'Continua'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Verifica la tua email</CardTitle>
        <CardDescription>
          Abbiamo inviato un codice a 6 cifre a <strong>{registrationData?.email}</strong>. Il codice è valido per 10 minuti.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleStep2(onStep2Submit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="otp">Codice OTP</label>
            <Input
              id="otp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="123456"
              className="text-center text-2xl tracking-widest font-mono"
              {...registerStep2('otp')}
            />
            {errorsStep2.otp && <p className="text-xs text-destructive">{errorsStep2.otp.message}</p>}
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Non hai ricevuto il codice?</span>
            <button
              type="button"
              onClick={handleResend}
              disabled={cooldown > 0 || isLoading}
              className="text-primary underline underline-offset-2 disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed"
            >
              {cooldown > 0 ? `Reinvia tra ${cooldown}s` : 'Reinvia codice'}
            </button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? t('common:actions.loading') : 'Verifica e registrati'}
          </Button>
          <button
            type="button"
            onClick={() => { setStep(1); setError(null); }}
            className="text-xs text-muted-foreground underline underline-offset-2"
          >
            ← Torna indietro
          </button>
        </CardFooter>
      </form>
    </Card>
  );
}
