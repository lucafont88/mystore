import { Outlet, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Tag, Users } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function AdminLayout() {
  const { t } = useTranslation('admin');
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || user?.role?.toUpperCase() !== 'ADMIN') {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-lg text-muted-foreground">{t('accessDenied')}</p>
      </div>
    );
  }

  return (
    <TooltipProvider>
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="w-64 shrink-0 border-r bg-gray-50">
        <div className="p-4">
          <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Admin
          </p>
          <nav className="space-y-1">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/70 hover:bg-gray-200 hover:text-foreground'
                }`
              }
            >
              <LayoutDashboard className="h-4 w-4" />
              {t('sidebar.dashboard')}
            </NavLink>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/70 hover:bg-gray-200 hover:text-foreground'
                }`
              }
            >
              <Users className="h-4 w-4" />
              {t('sidebar.users')}
            </NavLink>
            <NavLink
              to="/admin/categories"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/70 hover:bg-gray-200 hover:text-foreground'
                }`
              }
            >
              <Tag className="h-4 w-4" />
              {t('sidebar.categories')}
            </NavLink>
          </nav>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
    </TooltipProvider>
  );
}
