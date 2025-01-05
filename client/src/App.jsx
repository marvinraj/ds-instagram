import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import FeedPage from './pages/FeedPage'
import RegisterPage from './pages/RegisterPage'
import ForgetPasswordPage from './pages/ForgetPasswordPage'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/feed' element={<FeedPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/reset' element={<ForgetPasswordPage/>}/>
      </Routes>
    </>
  )
}

export default App
