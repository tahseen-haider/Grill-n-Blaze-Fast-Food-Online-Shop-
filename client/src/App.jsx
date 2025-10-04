import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import LoginSignup from "./pages/Auth/LoginSignup";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import EmailVerify from "./pages/Auth/EmailVerify";
import Dashboard from "./pages/Auth/ProtectedRoute";
import Layout from "./components/Layouts/Layout";

import { fetchUserData } from "./store/userSlice";
import { fetchCartItems } from "./store/cartItemsSlice";
import ResetPassword from "./pages/auth/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoutes";
import Checkout from "./pages/Checkout";
import PublicRoute from "./components/PublicRoutes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchCartItems());
  }, [dispatch]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* ✅ Public Routes (only for unauthenticated users) */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<EmailVerify />} />
          </Route>
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
