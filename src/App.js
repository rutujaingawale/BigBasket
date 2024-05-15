import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Product from './components/Product';
import { MycontextProviders } from './MycontextProviders';
import Register from './components/Register';
import Login from './components/Login';
import Checkout from './components/Checkout';


function App() {
  return (
    <div className="App">
      <MycontextProviders>
      <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path="/" element={<Product/>}></Route>
      <Route path="/product" element={<Product/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/checkout" element={<Checkout/>}></Route>
      </Routes>
      </BrowserRouter>
      </MycontextProviders>
  
    </div>
  );
}

export default App;
