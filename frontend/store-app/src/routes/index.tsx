import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '@/pages/Auth/Login';
import RegisterPage from '@/pages/Auth/Register';
import ProductsPage from '@/pages/Products';
import ProductDetailPage from '@/pages/Products/[id]';
import CheckoutPage from '@/pages/Checkout';
import HomePage from '@/pages/Home';
import ShopPagesPage from '@/pages/ShopPages';
import VendorProductsPage from '@/pages/Vendor/Products';
import VendorCreateProductPage from '@/pages/Vendor/Products/create';
import VendorEditProductPage from '@/pages/Vendor/Products/[id]';
import VendorBundlesPage from '@/pages/Vendor/Bundles';
import VendorCreateBundlePage from '@/pages/Vendor/Bundles/create';
import VendorEditBundlePage from '@/pages/Vendor/Bundles/[id]';
import BundlesPage from '@/pages/Bundles';
import BundleDetailPage from '@/pages/Bundles/[id]';
import VendorDashboardPage from '@/pages/Vendor/Dashboard';
import VendorCompleteProfilePage from '@/pages/Vendor/CompleteProfile';
import VendorProfilePage from '@/pages/Vendor/Profile';
import VendorLayout from '@/pages/Vendor';
import AdminLayout from '@/pages/Admin';
import AdminDashboardPage from '@/pages/Admin/Dashboard';
import AdminCategoriesPage from '@/pages/Admin/Categories';
import AdminUsersPage from '@/pages/Admin/Users';
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
        path: 'bundles',
        element: <BundlesPage />,
      },
      {
        path: 'bundles/:id',
        element: <BundleDetailPage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
      {
        path: 'shop-pages',
        element: <ShopPagesPage />,
      },
      {
        path: 'vendor/complete-profile',
        element: <VendorCompleteProfilePage />,
      },
      {
        element: <VendorLayout />,
        children: [
          { path: 'vendor/dashboard', element: <VendorDashboardPage /> },
          { path: 'vendor/products', element: <VendorProductsPage /> },
          { path: 'vendor/products/create', element: <VendorCreateProductPage /> },
          { path: 'vendor/products/:id', element: <VendorEditProductPage /> },
          { path: 'vendor/bundles', element: <VendorBundlesPage /> },
          { path: 'vendor/bundles/create', element: <VendorCreateBundlePage /> },
          { path: 'vendor/bundles/:id', element: <VendorEditBundlePage /> },
          { path: 'vendor/profile', element: <VendorProfilePage /> },
        ],
      },
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: 'users', element: <AdminUsersPage /> },
          { path: 'categories', element: <AdminCategoriesPage /> },
        ],
      },
    ],
  },
]);
