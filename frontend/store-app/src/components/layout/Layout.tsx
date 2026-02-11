import { Outlet } from 'react-router-dom';
import { CartDrawer } from '@/components/features/cart/CartDrawer';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
