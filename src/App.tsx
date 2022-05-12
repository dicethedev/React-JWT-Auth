import { useEffect } from 'react'
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { useAppDispatch } from './app/hooks'
import { setUser } from './features/authSlice'
import PrivateRoute from './components/PrivateRoute'

function App() {
  const dispatch = useAppDispatch();
  //user is the key i pass from the authSlice.tsx
  const user  = JSON.parse(localStorage.getItem('user') || "{}");

  useEffect(() => {
    dispatch(setUser(user));
  }, [])

  return (
    <div className="App">
      {/* <h2>Auth JWT</h2> */}
      <BrowserRouter>
      {/* Toastify notication is below */}
        <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace/>} />
        <Route path="/auth" element={<Auth />} />
        {/* this route is here before <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/dashboard" element={<PrivateRoute>
            <Dashboard />
          </PrivateRoute>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
