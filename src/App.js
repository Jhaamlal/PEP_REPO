import { Home, Levers } from './container';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { ProjectForm } from 'components';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AppRouter from 'AppRouter';

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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className='tw-bg-slate-300 tw-h-screen'>
          {/* <Home /> */}
          <AppRouter />
          {/* <Levers /> */}
          {/* <ProjectForm /> */}
        </div>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}

export default App;
