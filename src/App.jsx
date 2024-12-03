
import { Route, Routes } from 'react-router-dom'
import './App.css'
import RootLayout from './layout/Layout'
import Analytics from './pages/analiytics/Analytics'
import Employees from './pages/employment/Employees'
import Products from './pages/products/Products'
import Shops from './pages/shop/Shops'
import Login from './pages/auth/Login'
import Error404 from './pages/error404/Error404'
import SingleShop from './pages/shop/components/SingleShop'

function App() {

  return (
    <>
    <Routes>
        <Route path='login' element={<Login/>}/>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Analytics />} />
          <Route path="/products" element={<Products />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/shops/:id" element={<SingleShop />} />
          <Route path="/employees" element={<Employees />} />
          <Route path='/*' element={<Error404/>}/>
        </Route>
        
      </Routes>
   
    </>
  )
}

export default App
