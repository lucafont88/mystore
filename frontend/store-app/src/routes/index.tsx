import { createBrowserRouter, Link } from 'react-router-dom';
import LoginPage from '@/pages/Auth/Login';
import RegisterPage from '@/pages/Auth/Register';
import ProductsPage from '@/pages/Products';
import ProductDetailPage from '@/pages/Products/[id]';
import CheckoutPage from '@/pages/Checkout';
import { useCartStore } from '@/stores/cartStore';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomeRoute />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'products/:id',
        element: <ProductDetailPage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
    ],
  },
]);

function HomeRoute() {
  const toggleCart = useCartStore((state) => state.toggleCart);
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-background p-4 text-foreground">
      <div className="absolute top-4 right-4">
        <Button variant="outline" size="icon" className="relative" onClick={toggleCart}>
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {totalItems}
            </span>
          )}
        </Button>
      </div>

      <div className="max-w-md space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary">
          E-commerce Platform
        </h1>
        <p className="text-lg text-muted-foreground">
          Esplora il catalogo, aggiungi prodotti al carrello e procedi al pagamento.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/products" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Vedi Prodotti
          </Link>
          <Link to="/login" className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
            Accedi
          </Link>
        </div>
      </div>
    </div>
  );
}
