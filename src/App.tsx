import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProductionResultPage from './pages/ProductionResultPage'
import RegisterPage from './pages/RegisterPage'
import { SensorContextProvider } from './context/SensorDataContext'
import ProductionLine3DPage from './pages/ProductionLine3DPage'
import { WindowContextProvider } from './context/WindowContext'

function App() {
  return (
    <main className='w-full min-h-screen bg-white'>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/dashboard/line-3d' element={
            <WindowContextProvider>
              <SensorContextProvider>
                <ProductionLine3DPage />
              </SensorContextProvider>
            </WindowContextProvider>
          } />
          <Route path='/dashboard/result' element={
            <SensorContextProvider>
              <ProductionResultPage />
            </SensorContextProvider>
          } />
        </Routes>
      </Router>
    </main>
  )
}

export default App