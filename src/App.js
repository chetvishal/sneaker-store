import { useState } from 'react';
import { Home, Cart, WishList, NoRoute, ProductPg, Login } from './pages/index';
import { Navbar, Toast } from './components/index.js';
import { useDataContext } from './context/cartContextProvider';
import { Route, Routes } from 'react-router-dom';
import {PrivateRoute} from './api/PrivateRoute';

function App() {

  const { state } = useDataContext();
  const { toast } = state;
  const [input, setInput] = useState('');

  return (
    <div className="App">
      <Navbar setInput={setInput} />
      <Routes>
        <Route path="/" element={<Home input={input} />} />
        <Route path="/wishlist" element={<WishList />} />
        <PrivateRoute path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductPg />} />
        <Route path="*" element={<NoRoute />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <button onClick={()=> console.log("data context: ", state)}>data context</button>
      {toast.visible && <Toast text={toast.text} />}
    </div>
  );
}

export default App;
