import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '@/pages/Auth/Login';
import RegisterPage from '@/pages/Auth/Register';
import ProductsPage from '@/pages/Products';
import ProductDetailPage from '@/pages/Products/[id]';
import CheckoutPage from '@/pages/Checkout';
import HomePage from '@/pages/Home';
import ShopPagesPage from '@/pages/ShopPages';
import { Layout } from '@/components/layout/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
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
      {
        path: 'shop-pages',
        element: <ShopPagesPage />,
      },
    ],
  },
]);
