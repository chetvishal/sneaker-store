import { useState } from 'react';
import { Home, Cart, WishList, NoRoute, ProductPg, Login, User, Signup } from './pages/index';
import { Navbar, Toast, Footer } from './components/index.js';
import { useDataContext } from './context/dataContextProvider';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './api/PrivateRoute';

function App() {

  const { state } = useDataContext();
  const { toast } = state;
  const [input, setInput] = useState('');

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <div className="App">
        <Navbar setInput={setInput} />
        <Routes>
          <Route path="/" element={<Home input={input} setInput={setInput} />} />
          <PrivateRoute path="/wishlist" element={<WishList />} />
          <PrivateRoute path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductPg />} />
          <Route path="*" element={<NoRoute />} />
          <PrivateRoute path="/user" element={<User />} />
        </Routes>
        {toast.visible && <Toast text={toast.text} />}
        <Footer />
      </div>
    </Routes>
  );
}

export default App;
