import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./components/screen/Home";
import './App.css';
import Login from "./components/screen/Login";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min';
import Signup from './components/screen/signup/Signup';
import AdminLogin from './components/screen/admin/AdminLogin';
import AdminHome from './components/screen/admin/AdminHome';
import { CartProvider } from './components/ContextReducer';
import Cart from './components/screen/Cart';
import MyOrder from './components/screen/MyOrder';



function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path='/createuser' element={<Signup />} />
            <Route path='admin' element={<AdminHome/>}>
              <Route path='/adminlogin' element={<AdminLogin />}></Route>
            </Route>
            <Route path='mycart' element={<Cart />} />
            <Route path='myorder' element={<MyOrder />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
