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
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/verify-email" element={<EmailVerify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
