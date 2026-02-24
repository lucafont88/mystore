import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldAlert, Package, Boxes, FileText, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';
import { useProductsQuery } from '@/queries/useProductsQuery';
import { useBundlesQuery } from '@/queries/useBundlesQuery';
import { useVendorStatsQuery } from '@/queries/useVendorStatsQuery';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Period = 'week' | 'month' | 'quarter' | 'year';

const periodLabels: Record<Period, string> = {
  week: 'Ultima settimana',
  month: 'Ultimo mese',
  quarter: 'Ultimo trimestre',
  year: 'Ultimo anno',
};

export default function VendorDashboardPage() {
  const { t } = useTranslation('vendor');
  const { isAuthenticated, user } = useAuthStore();
  const [period, setPeriod] = useState<Period>('month');

  const { data: statsData, isLoading: statsLoading } = useVendorStatsQuery(period);
  const { data: productsData } = useProductsQuery({ vendorId: user?.id } as any);
  const { data: bundlesData } = useBundlesQuery({ vendorId: user?.id });

  if (!isAuthenticated || user?.role?.toUpperCase() !== 'VENDOR') {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-20 text-center">
        <ShieldAlert className="mb-4 h-16 w-16 text-destructive/60" />
        <h1 className="mb-2 text-2xl font-bold">{t('accessDenied', 'Accesso negato')}</h1>
      </div>
    );
  }

  const totalProducts = (productsData as any)?.total ?? 0;
  const totalBundles = bundlesData?.total ?? 0;
  const stats = statsData;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t('dashboard.title', 'Dashboard')}</h1>
        <p className="text-muted-foreground">{t('dashboard.welcome', 'Benvenuto nella tua area vendor')}</p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.totalRevenue', 'Ricavi totali')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              €{(stats?.totalRevenue ?? 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">{periodLabels[period]}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.totalOrders', 'Ordini totali')}</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalOrders ?? 0}</div>
            <p className="text-xs text-muted-foreground">{periodLabels[period]}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.products', 'Prodotti')}</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">{t('dashboard.totalActive', 'Totale attivi')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.bundles', 'Bundle')}</CardTitle>
            <Boxes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBundles}</div>
            <p className="text-xs text-muted-foreground">{t('dashboard.totalActive', 'Totale attivi')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
              <CardTitle>{t('dashboard.salesChart', 'Andamento vendite')}</CardTitle>
            </div>
            <div className="flex gap-1">
              {(Object.keys(periodLabels) as Period[]).map((p) => (
                <Button
                  key={p}
                  variant={period === p ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPeriod(p)}
                >
                  {p === 'week' ? '7g' : p === 'month' ? '1m' : p === 'quarter' ? '3m' : '1a'}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {statsLoading ? (
            <div className="flex h-64 items-center justify-center">
              <p className="text-muted-foreground">Caricamento...</p>
            </div>
          ) : !stats?.salesByDay?.length ? (
            <div className="flex h-64 items-center justify-center">
              <p className="text-muted-foreground">{t('dashboard.noSalesData', 'Nessun dato di vendita per questo periodo')}</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={stats.salesByDay}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(val) => {
                    const d = new Date(val);
                    return `${d.getDate()}/${d.getMonth() + 1}`;
                  }}
                  className="text-xs"
                />
                <YAxis
                  tickFormatter={(val) => `€${val}`}
                  className="text-xs"
                />
                <Tooltip
                  formatter={(value) => [`€${Number(value).toFixed(2)}`, 'Ricavi']}
                  labelFormatter={(label) => {
                    const d = new Date(label);
                    return d.toLocaleDateString('it-IT');
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link to="/vendor/products">
          <Card className="transition-colors hover:border-primary/50 cursor-pointer">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{t('products.title', 'I miei prodotti')}</h3>
                <p className="text-sm text-muted-foreground">{totalProducts} {t('dashboard.products', 'prodotti')}</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/vendor/bundles">
          <Card className="transition-colors hover:border-primary/50 cursor-pointer">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Boxes className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{t('bundles.title', 'I miei bundle')}</h3>
                <p className="text-sm text-muted-foreground">{totalBundles} bundle</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/shop-pages">
          <Card className="transition-colors hover:border-primary/50 cursor-pointer">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{t('dashboard.myPages', 'Le mie pagine')}</h3>
                <p className="text-sm text-muted-foreground">{t('dashboard.managePages', 'Gestisci le tue pagine')}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
