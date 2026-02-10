import { RegisterForm } from '@/components/features/auth/RegisterForm';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function RegisterPage() {
  const { t } = useTranslation(['auth', 'common']);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            {t('common:navigation.home')} Store
          </h1>
        </div>
        <RegisterForm />
        <p className="text-center text-sm text-muted-foreground">
          {t('register.have_account', 'Hai già un account?')}{' '}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            {t('common:navigation.login')}
          </Link>
        </p>
      </div>
    </div>
  );
}
