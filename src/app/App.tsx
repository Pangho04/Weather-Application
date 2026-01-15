import { AppRouter } from '@app/providers/router';
import { QueryProvider } from '@app/providers/query';

export function App() {
  return (
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  );
}
