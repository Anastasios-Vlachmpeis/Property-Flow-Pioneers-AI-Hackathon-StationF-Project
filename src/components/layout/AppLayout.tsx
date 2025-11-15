import { ReactNode } from 'react';
import { AppSidebar } from './AppSidebar';
import { RefreshCw, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

interface AppLayoutProps {
  children: ReactNode;
  title: string;
}

export function AppLayout({ children, title }: AppLayoutProps) {
  const { signOut } = useAuth();
  
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          <h2 className="text-2xl font-serif font-semibold text-foreground">{title}</h2>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-success/10 text-success text-sm font-sans">
              <RefreshCw className="h-4 w-4" />
              <span className="font-medium">Synced</span>
            </div>
            <Button variant="outline" size="sm" onClick={signOut} className="font-sans">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
