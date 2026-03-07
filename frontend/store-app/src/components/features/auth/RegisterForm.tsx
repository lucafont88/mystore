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
import { useNavigate, Link } from 'react-router-dom';

const RESEND_COOLDOWN = 60;

export function RegisterForm() {
  const { t } = useTranslation(['auth', 'common']);
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2>(1);
  const [registrationData, setRegistrationData] = useState<{ email: string; password: string; role: string } | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Email existence check
  const [emailExists, setEmailExists] = useState(false);
  const [emailChecking, setEmailChecking] = useState(false);

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

  // Step 1
  const {
    register: registerStep1,
    handleSubmit: handleStep1,
    getValues,
    formState: { errors: errorsStep1 },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const handleEmailBlur = async () => {
    const email = getValues('email');
    // Only check if email looks valid (basic format)
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setEmailChecking(true);
    try {
      const { exists } = await authService.checkEmail(email);
      setEmailExists(exists);
    } catch {
      // silently ignore network errors on blur check
    } finally {
      setEmailChecking(false);
    }
  };

  const onStep1Submit = async (data: RegisterInput) => {
    if (emailExists) return;
    setIsLoading(true);
    setError(null);
    try {
      await authService.sendOtp(data.email, data.password, data.role ?? 'CUSTOMER');
      setRegistrationData({ email: data.email, password: data.password, role: data.role ?? 'CUSTOMER' });
      setStep(2);
      startCooldown();
    } catch (err: any) {
      setError(err.message || t('register.error'));
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2 schema
  const otpSchema = z.object({
    otp: z
      .string()
      .length(6, t('otp.invalidCode'))
      .regex(/^\d+$/, t('otp.onlyDigits')),
  });
  type OtpInput = z.infer<typeof otpSchema>;

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
      setError(err.message || t('otp.error'));
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
      setError(err.message || t('otp.resendError'));
    } finally {
      setIsLoading(false);
    }
  };

  // ---- Step 1 ----
  if (step === 1) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t('register.title')}</CardTitle>
          <CardDescription>{t('register.description')}</CardDescription>
        </CardHeader>
        <form onSubmit={handleStep1(onStep1Submit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                {...registerStep1('email', {
                  onBlur: handleEmailBlur,
                  onChange: () => setEmailExists(false),
                })}
              />
              {errorsStep1.email && (
                <p className="text-xs text-destructive">{errorsStep1.email.message}</p>
              )}
              {!errorsStep1.email && emailExists && (
                <p className="text-xs text-destructive">
                  {t('register.emailExistsPlain')}{' '}
                  <Link to="/login" className="underline font-medium">
                    {t('common:navigation.login')}
                  </Link>
                </p>
              )}
              {emailChecking && (
                <p className="text-xs text-muted-foreground">{t('common:actions.loading')}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">{t('register.accountType')}</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value="CUSTOMER" {...registerStep1('role')} defaultChecked />
                  <span className="text-sm">{t('register.customer')}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value="VENDOR" {...registerStep1('role')} />
                  <span className="text-sm">{t('register.vendor')}</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="password">Password</label>
              <Input id="password" type="password" {...registerStep1('password')} />
              {errorsStep1.password && (
                <p className="text-xs text-destructive">{errorsStep1.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="confirmPassword">
                Conferma Password
              </label>
              <Input id="confirmPassword" type="password" {...registerStep1('confirmPassword')} />
              {errorsStep1.confirmPassword && (
                <p className="text-xs text-destructive">{errorsStep1.confirmPassword.message}</p>
              )}
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading || emailExists || emailChecking}>
              {isLoading ? t('common:actions.loading') : t('register.continue')}
            </Button>
          </CardFooter>
        </form>
      </Card>
    );
  }

  // ---- Step 2 ----
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{t('otp.title')}</CardTitle>
        <CardDescription>
          {t('otp.description', { email: registrationData?.email })}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleStep2(onStep2Submit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="otp">
              {t('otp.label')}
            </label>
            <Input
              id="otp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="123456"
              className="text-center text-2xl tracking-widest font-mono"
              {...registerStep2('otp')}
            />
            {errorsStep2.otp && (
              <p className="text-xs text-destructive">{errorsStep2.otp.message}</p>
            )}
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{t('otp.noCode')}</span>
            <button
              type="button"
              onClick={handleResend}
              disabled={cooldown > 0 || isLoading}
              className="text-primary underline underline-offset-2 disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed"
            >
              {cooldown > 0
                ? t('otp.resendCooldown', { seconds: cooldown })
                : t('otp.resend')}
            </button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? t('common:actions.loading') : t('otp.verify')}
          </Button>
          <button
            type="button"
            onClick={() => { setStep(1); setError(null); setEmailExists(false); }}
            className="text-xs text-muted-foreground underline underline-offset-2"
          >
            {t('otp.back')}
          </button>
        </CardFooter>
      </form>
    </Card>
  );
}
