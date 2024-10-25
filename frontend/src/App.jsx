import {Navigate, Route, Routes} from "react-router-dom";
import {Toaster} from "react-hot-toast"
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage"
import CartPage from "./pages/CartPage";
import Footer from "./components/Footer";

import Navbar from "./components/Navbar"
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner"
import { useCartStore } from "./stores/useCartStore";
function App() {
  const {user, checkAuth, checkingAuth} = useUserStore();
  const {getCartItems} = useCartStore();
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    getCartItems()
  },[getCartItems])

  if(checkingAuth) return <LoadingSpinner />


  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-r from-indigo-950 to-sky-900" />
        </div>
      </div>
      <div className="relative z-50 pt-20">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/secret-dashboard" element={user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/cart" element={user ? <CartPage /> : <Navigate to="/login" />} />
        </Routes>
        <Footer />
      </div>
      <Toaster />
    </div>
  )
}

export default App
