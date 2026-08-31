import './App.css'

import { Routes, Route } from 'react-router-dom'
import Home from './user/Home'
import Marketplace from './user/Marketplace'
import DetailedProduct from './user/DetailedProduct'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/product/:id" element={<DetailedProduct />} />
      <Route path="/product" element={<DetailedProduct />} />
    </Routes>
  )
}

export default App
