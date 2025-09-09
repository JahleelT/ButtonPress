import { AuthProvider } from './contexts/AuthContext.tsx'
import { AuthUI } from '../components/AuthUI.tsx';

function App() {

  return (
    <>
      <AuthProvider>
        <AuthUI/>
      </AuthProvider>
    </>
  )
  
}

export default App
