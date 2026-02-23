import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, User, Search, Globe, LogOut, Package, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import { useState } from 'react';

export function Header() {
  const { t, i18n } = useTranslation();
  const { user, logout, isAuthenticated } = useAuthStore();
  const { setOpen, getTotalItems } = useCartStore();
  const navigate = useNavigate();
  const location = useLocation();
  const isShopPages = location.pathname.startsWith('/shop-pages');
  const [search, setSearch] = useState('');

  // Debounced search logic could be added here
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <Package className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block">MyStore</span>
        </Link>

        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link to="/products" className="transition-colors hover:text-foreground/80 text-foreground/60">
            {t('common:products', 'Prodotti')}
          </Link>
          <Link to="/bundles" className="transition-colors hover:text-foreground/80 text-foreground/60">
            {t('common:bundles', 'Bundle')}
          </Link>
          {isAuthenticated && user?.role?.toUpperCase() === 'VENDOR' && (
            <>
              <Link to="/shop-pages" className="flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground/60">
                <FileText className="h-4 w-4" />
                {t('shopPages:title', 'Le mie pagine')}
              </Link>
              <Link to="/vendor/products" className="transition-colors hover:text-foreground/80 text-foreground/60">
                {t('common:myProducts', 'I miei prodotti')}
              </Link>
              <Link to="/vendor/bundles" className="transition-colors hover:text-foreground/80 text-foreground/60">
                {t('common:myBundles', 'I miei bundle')}
              </Link>
            </>
          )}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <form onSubmit={handleSearch} className="hidden lg:flex relative w-full max-w-sm items-center">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t('common:search_placeholder', 'Cerca prodotti...')}
              className="pl-8 w-full bg-muted/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          <div className="flex items-center space-x-2">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">Cambia lingua</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeLanguage('it')}>Italiano</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('en')}>English</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart Button — hidden on shop pages */}
            {!isShopPages && (
              <Button variant="ghost" size="icon" className="relative" onClick={() => setOpen(true)}>
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Menu utente</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user?.email && (
                        <p className="font-medium text-sm">
                          {user.email.split('@')[0]}
                        </p>
                      )}
                      {user?.email && <p className="w-[200px] truncate text-xs text-muted-foreground">{user.email}</p>}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/orders">I miei ordini</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => logout()} className="text-red-600 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="default" size="sm">
                <Link to="/login">{t('common:login', 'Accedi')}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
