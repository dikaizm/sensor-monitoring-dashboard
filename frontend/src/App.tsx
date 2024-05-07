import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProductionLinePage from './pages/ProductionLinePage'
import ProductionResultPage from './pages/ProductionResultPage'
import RegisterPage from './pages/RegisterPage'
import { TooltipContextProvider } from './context/TooltipContext'

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
              <ProductionLinePage />
            </TooltipContextProvider>
          } />
          <Route path='/dashboard/result' element={<ProductionResultPage />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App