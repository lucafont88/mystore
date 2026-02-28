import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tag, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useAdminStatsQuery } from '@/queries/useAdminStatsQuery';

type Period = 'week' | 'month' | 'quarter' | 'year';

const formatDate = (dateStr: string) => {
  const [, month, day] = dateStr.split('-');
  return `${day}/${month}`;
};

export default function AdminDashboardPage() {
  const { t } = useTranslation('admin');
  const [period, setPeriod] = useState<Period>('month');

  const { data: stats, isLoading } = useAdminStatsQuery(period);

  const periods: { key: Period; label: string }[] = [
    { key: 'week', label: t('stats.week') },
    { key: 'month', label: t('stats.month') },
    { key: 'quarter', label: t('stats.quarter') },
    { key: 'year', label: t('stats.year') },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t('dashboard.title')}</h1>
        <p className="mt-1 text-muted-foreground">{t('dashboard.subtitle')}</p>
      </div>

      {/* Stat card + periodo */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <Card className="flex-1 min-w-[200px] max-w-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t('stats.totalOrders')}</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {isLoading ? '—' : (stats?.totalOrders ?? 0)}
            </p>
          </CardContent>
        </Card>

        {/* Selettore periodo */}
        <div className="flex gap-1 rounded-md border p-1">
          {periods.map(({ key, label }) => (
            <Button
              key={key}
              variant={period === key ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setPeriod(key)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* BarChart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-sm font-medium">{t('stats.ordersChart')}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-[300px] items-center justify-center text-muted-foreground text-sm">
              —
            </div>
          ) : !stats?.ordersByDay?.length ? (
            <div className="flex h-[300px] items-center justify-center text-muted-foreground text-sm">
              {t('stats.noData')}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.ordersByDay} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value) => [value, t('stats.totalOrders')]}
                  labelFormatter={(label) => formatDate(label as string)}
                />
                <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Quick links */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link to="/admin/categories">
          <Card className="cursor-pointer transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t('sidebar.categories')}</CardTitle>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{t('categories.title')}</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
