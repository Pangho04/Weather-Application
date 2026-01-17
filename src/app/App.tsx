import { AppRouter } from '@app/providers/router';
import { QueryProvider } from '@app/providers/query';
import { AlertProvider } from '@/shared/providers/AlertProvider';

export function App() {
  return (
    <QueryProvider>
      <AlertProvider>
        <AppRouter />
      </AlertProvider>
    </QueryProvider>
  );
}
