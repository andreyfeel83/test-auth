import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AppRouter} from './AppRouter';

export function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />;
    </QueryClientProvider>
  );
}
