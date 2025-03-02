import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Signup from "./pages/Signup"
import Home from "./pages/Dashboard"
import Login from "./pages/Login"
import { useAuthContext } from './hooks/useAuthContext'

function App() {

  const { user } = useAuthContext()
  
    return (
      <div className="App">
        <BrowserRouter>
          <div className="pages">
            <Routes>
              <Route path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/"/>} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    )
  }
  
  export default App;