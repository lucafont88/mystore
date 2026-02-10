import { Outlet } from 'react-router-dom';
import { CartDrawer } from '@/components/features/cart/CartDrawer';

export function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
      <CartDrawer />
    </div>
  );
}
