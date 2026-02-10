import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '@/pages/Auth/Login';
import RegisterPage from '@/pages/Auth/Register';

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
    path: '/',
    element: (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Home Page (Public)</h1>
        <div className="space-x-4 mt-4">
          <a href="/login" className="text-primary hover:underline">Login</a>
          <a href="/register" className="text-primary hover:underline">Register</a>
        </div>
      </div>
    ),
  },
]);
