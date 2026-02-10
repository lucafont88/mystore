import { createBrowserRouter, Link } from 'react-router-dom';
import LoginPage from '@/pages/Auth/Login';
import RegisterPage from '@/pages/Auth/Register';
import ProductsPage from '@/pages/Products';
import ProductDetailPage from '@/pages/Products/[id]';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/products',
    element: <ProductsPage />,
  },
  {
    path: '/products/:id',
    element: <ProductDetailPage />,
  },
  {
    path: '/',
    element: (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-foreground">
        <div className="max-w-md space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            E-commerce Platform
          </h1>
          <p className="text-lg text-muted-foreground">
            Benvenuto nel tuo nuovo store. Esplora il catalogo o accedi al tuo account.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/products" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
              Vedi Prodotti
            </Link>
            <Link to="/login" className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
              Accedi
            </Link>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-primary"></div>
          </div>
        </div>
      </div>
    ),
  },
]);
