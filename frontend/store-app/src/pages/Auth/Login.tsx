import { LoginForm } from '@/components/features/auth/LoginForm';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function LoginPage() {
  const { t } = useTranslation(['auth', 'common']);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            {t('common:navigation.home')} Store
          </h1>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-muted-foreground">
          {t('login.no_account', 'Non hai un account?')}{' '}
          <Link to="/register" className="font-semibold text-primary hover:underline">
            {t('common:navigation.register')}
          </Link>
        </p>
      </div>
    </div>
  );
}
