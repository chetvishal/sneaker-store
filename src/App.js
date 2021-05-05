import { useState } from 'react';
import {Home, Cart, WishList, NoRoute} from './pages/index';
import { Navbar, Toast } from './components/index.js';
import { useDataContext } from './context/cartContextProvider';
import { Route, Routes } from 'react-router-dom';

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
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NoRoute />} />
      </Routes>
      {toast.visible && <Toast text={toast.text} />}
    </div>
  );
}

export default App;
