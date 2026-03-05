import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
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
import AdminLayout from '@/pages/Admin';
import AdminDashboardPage from '@/pages/Admin/Dashboard';
import AdminCategoriesPage from '@/pages/Admin/Categories';
import AdminUsersPage from '@/pages/Admin/Users';
import { Layout } from '@/components/layout/Layout';
import { useAuthStore } from '@/stores/authStore';

/**
 * Guard for vendor routes that require a complete profile.
 * If user is VENDOR with PENDING_PROFILE → redirect to complete-profile.
 */
function VendorProfileGuard() {
  const user = useAuthStore((s) => s.user);
  if (user?.role === 'VENDOR' && user?.profileStatus === 'PENDING_PROFILE') {
    return <Navigate to="/vendor/complete-profile" replace />;
  }
  return <Outlet />;
}

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
        // Vendor routes that require profile to be complete
        element: <VendorProfileGuard />,
        children: [
          { path: 'vendor/dashboard', element: <VendorDashboardPage /> },
          { path: 'vendor/products', element: <VendorProductsPage /> },
          { path: 'vendor/products/create', element: <VendorCreateProductPage /> },
          { path: 'vendor/products/:id', element: <VendorEditProductPage /> },
          { path: 'vendor/bundles', element: <VendorBundlesPage /> },
          { path: 'vendor/bundles/create', element: <VendorCreateBundlePage /> },
          { path: 'vendor/bundles/:id', element: <VendorEditBundlePage /> },
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
