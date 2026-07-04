import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import FoodHome from './pages/FoodHome';
import GroceryHome from './pages/GroceryHome';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Tracking from './pages/Tracking';
import NotFound from './pages/NotFound';
import Login from './pages/Login';          // new
import Register from './pages/Register';    // new

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path="/food" element={<FoodHome />} />
          <Route path="/grocery" element={<GroceryHome />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />        // new
          <Route path="/register" element={<Register />} />  // new
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}