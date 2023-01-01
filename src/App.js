import { Home, Levers } from './container';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { ProjectForm } from 'components';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <div className='tw-bg-slate-300 tw-h-screen'>
        <Home />
        {/* <Levers /> */}
        <ProjectForm />
      </div>
    </QueryClientProvider>
  );
}

export default App;
