

import LoginForm from './pages/Login'
import Profile from './pages/Profile'
import Home from './pages/Home'
import Navbar from './components/Navbar';
import PrivateRoutes from '../src/routes/PrivateRoutes'

import { Route, Routes } from 'react-router-dom';
function App() {

  return (
    <div>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />

        <Route path="/profile" element={
          <PrivateRoutes>
            <Profile />
          </PrivateRoutes>
        } />
      </Routes>

      </div>
  )
}

export default App
