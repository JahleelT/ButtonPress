import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import { AuthUI } from '../components/AuthUI';

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
