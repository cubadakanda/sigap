import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import FormPelaporan from './pages/FormPelaporan'
import LoginPetugas from './pages/LoginPetugas'
import ManajemenPetugas from './pages/ManajemenPetugas'
import MapView from './pages/MapView'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/laporkan" element={<FormPelaporan />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/peta" element={<MapView />} />
        <Route path="/login" element={<LoginPetugas />} />
        <Route path="/manajemen" element={<ManajemenPetugas />} />
      </Routes>
    </Router>
  )
}

export default App
