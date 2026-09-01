import './App.css'

import { Routes, Route } from 'react-router-dom'
import Home from './user/Home'
import Marketplace from './user/Marketplace'
import DetailedProduct from './user/DetailedProduct'
import DetailedStoreview from './user/DetailedStoreview'
import Categories from './user/Categories'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/product/:id" element={<DetailedProduct />} />
      <Route path="/product" element={<DetailedProduct />} />
      <Route path="/shop/:id" element={<DetailedStoreview />} />
      <Route path="/shop" element={<DetailedStoreview />} />
    </Routes>
  )
}

export default App
