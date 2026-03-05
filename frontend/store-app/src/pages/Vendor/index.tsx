import { Outlet, NavLink, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Package, Boxes, User } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

export default function VendorLayout() {
  const { t } = useTranslation('vendor');
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || user?.role?.toUpperCase() !== 'VENDOR') {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-lg text-muted-foreground">{t('accessDenied')}</p>
      </div>
    );
  }

  if (user?.profileStatus === 'PENDING_PROFILE') {
    return <Navigate to="/vendor/complete-profile" replace />;
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-primary text-primary-foreground'
        : 'text-foreground/70 hover:bg-gray-200 hover:text-foreground'
    }`;

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="w-64 shrink-0 border-r bg-gray-50">
        <div className="p-4">
          <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t('sidebar.vendor', 'Vendor')}
          </p>
          <nav className="space-y-1">
            <NavLink to="/vendor/dashboard" end className={navLinkClass}>
              <LayoutDashboard className="h-4 w-4" />
              {t('sidebar.dashboard', 'Dashboard')}
            </NavLink>
            <NavLink to="/vendor/products" className={navLinkClass}>
              <Package className="h-4 w-4" />
              {t('sidebar.products', 'Prodotti')}
            </NavLink>
            <NavLink to="/vendor/bundles" className={navLinkClass}>
              <Boxes className="h-4 w-4" />
              {t('sidebar.bundles', 'Bundle')}
            </NavLink>
            <NavLink to="/vendor/profile" className={navLinkClass}>
              <User className="h-4 w-4" />
              {t('sidebar.myData', 'I miei dati')}
            </NavLink>
          </nav>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
