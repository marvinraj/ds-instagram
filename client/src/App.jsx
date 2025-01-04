import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import FeedPage from './pages/FeedPage'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/feed' element={<FeedPage/>}/>
      </Routes>
    </>
  )
}

export default App
