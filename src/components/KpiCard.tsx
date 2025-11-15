import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

export function KpiCard({ title, value, icon: Icon, trend, className }: KpiCardProps) {
  return (
    <Card className={cn('p-6 hover:shadow-md transition-shadow', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-sans font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
          <p className="text-4xl font-serif font-semibold text-foreground">{value}</p>
          {trend && (
            <p
              className={cn(
                'text-sm font-sans font-medium',
                trend.isPositive ? 'text-success' : 'text-destructive'
              )}
            >
              {trend.value}
            </p>
          )}
        </div>
        <div className="p-3 rounded-lg bg-muted">
          <Icon className="h-6 w-6 text-foreground" />
        </div>
      </div>
    </Card>
  );
}
