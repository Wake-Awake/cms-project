import './App.css'
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
   
       <AuthProvider>
        			<Toaster position="top-right" reverseOrder={false} />
				<AppRoutes />
			
		</AuthProvider>
    
  )
}

export default App;


