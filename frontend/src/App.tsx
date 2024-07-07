import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProductionLinePage from './pages/ProductionLinePage'
import ProductionResultPage from './pages/ProductionResultPage'
import RegisterPage from './pages/RegisterPage'
import { TooltipContextProvider } from './context/TooltipContext'
import { SensorContextProvider } from './context/SensorDataContext'
import ProductionLine3DPage from './pages/ProductionLine3DPage'

function App() {
  return (
    <main className='w-full min-h-screen bg-white'>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/dashboard/line' element={
            <TooltipContextProvider>
              <SensorContextProvider>
                <ProductionLinePage />
              </SensorContextProvider>
            </TooltipContextProvider>
          } />
          <Route path='/dashboard/line-3d' element={
            <TooltipContextProvider>
              <SensorContextProvider>
                <ProductionLine3DPage />
              </SensorContextProvider>
            </TooltipContextProvider>
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