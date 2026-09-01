import './App.css'

import { Routes, Route } from 'react-router-dom'
import Home from './user/Home'
import Marketplace from './user/Marketplace'
import DetailedProduct from './user/DetailedProduct'
import DetailedStoreview from './user/DetailedStoreview'
import Categories from './user/Categories'
import Cart from './user/Cart'
import Login from './user/Login'
import BecomeSeller from './user/BecomeSeller'
import SellerDashboard from './admin/SellerDashboard'
import SellerLogin from './admin/SellerLogin'
import MarketplaceRegister from './admin/pages/MarketplaceRegister'
import ServiceRegister from './admin/pages/ServiceRegister'
import ServiceDashboardPage from './admin/serviceProviders/pages/ServiceDashboardPage'
import BookingsPage from './admin/serviceProviders/pages/BookingsPage'
import ServicesManagePage from './admin/serviceProviders/pages/ServicesManagePage'
import ServiceEarningsPage from './admin/serviceProviders/pages/ServiceEarningsPage'
import DashboardPage from './admin/pages/DashboardPage'
import ProductsPage from './admin/pages/ProductsPage'
import CategoriesPage from './admin/pages/CategoriesPage'
import OrdersPage from './admin/pages/OrdersPage'
import PaymentPage from './admin/pages/PaymentPage'
import ManagedSalesRegister from './admin/managedSales/ManagedSalesRegister'
import ManagedDashboardPage from './admin/managedSales/pages/ManagedDashboardPage'
import SuperAdminDashboard from './superAdmin/pages/SuperAdminDashboard'
import ManagedRequestsPage from './superAdmin/pages/ManagedRequestsPage'
import CatalogingUploadPage from './superAdmin/pages/CatalogingUploadPage'
import SellersMasterPage from './superAdmin/pages/SellersMasterPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/seller-login" element={<SellerLogin />} />
      <Route path="/seller/login" element={<SellerLogin />} />
      <Route path="/seller" element={<BecomeSeller />} />
      <Route path="/seller/dashboard" element={<SellerDashboard />} />
      <Route path="/admin/marketplace-register" element={<MarketplaceRegister />} />
      <Route path="/admin/service-register" element={<ServiceRegister />} />
      <Route path="/admin/service-dashboard" element={<ServiceDashboardPage />} />
      <Route path="/admin/service-bookings" element={<BookingsPage />} />
      <Route path="/admin/service-manage" element={<ServicesManagePage />} />
      <Route path="/admin/service-earnings" element={<ServiceEarningsPage />} />
      <Route path="/admin/managed-sales-register" element={<ManagedSalesRegister />} />
      <Route path="/admin/managed-dashboard" element={<ManagedDashboardPage />} />
      <Route path="/admin/managed-cataloging" element={<ManagedDashboardPage />} />
      <Route path="/admin/managed-orders" element={<ManagedDashboardPage />} />
      <Route path="/admin/managed-payouts" element={<ManagedDashboardPage />} />
      <Route path="/admin/dashboard" element={<DashboardPage />} />
      <Route path="/admin/products" element={<ProductsPage />} />
      <Route path="/admin/categories" element={<CategoriesPage />} />
      <Route path="/admin/orders" element={<OrdersPage />} />
      <Route path="/admin/payment" element={<PaymentPage />} />
      <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
      <Route path="/super-admin/managed-requests" element={<ManagedRequestsPage />} />
      <Route path="/super-admin/sellers" element={<SellersMasterPage />} />
      <Route path="/super-admin/categories" element={<CategoriesPage />} />
      <Route path="/super-admin/cataloging" element={<CatalogingUploadPage />} />
      <Route path="/product/:id" element={<DetailedProduct />} />
      <Route path="/product" element={<DetailedProduct />} />
      <Route path="/shop/:id" element={<DetailedStoreview />} />
      <Route path="/shop" element={<DetailedStoreview />} />
    </Routes>
  )
}

export default App
