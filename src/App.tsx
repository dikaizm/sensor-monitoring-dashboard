import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProductionResultPage from './pages/ProductionResultPage'
import RegisterPage from './pages/RegisterPage'
import { SensorContextProvider } from './context/SensorDataContext'
import ProductionLine3DPage from './pages/ProductionLine3DPage'
import { WindowContextProvider } from './context/WindowContext'
import { UserProvider } from './context/UserContext'

function App() {
  return (
    <main className='w-full min-h-screen bg-white'>
      <Router>
        <Routes>
          <Route path="/" element={
            <UserProvider>
              <HomePage />
            </UserProvider>
          } />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/dashboard/line-3d' element={
            <UserProvider>
              <WindowContextProvider>
                <SensorContextProvider>
                  <ProductionLine3DPage />
                </SensorContextProvider>
              </WindowContextProvider>
            </UserProvider>
          } />
          <Route path='/dashboard/result' element={
            <UserProvider>
              <SensorContextProvider>
                <ProductionResultPage />
              </SensorContextProvider>
            </UserProvider>
          } />
        </Routes>
      </Router>
    </main>
  )
}

export default App