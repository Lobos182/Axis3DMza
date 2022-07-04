import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
// import ItemCount from './components/ItemCount/ItemCount';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cart from './components/Cart/Cart';
import { CartContextProvider } from './context/CartContext';
import FormContent from './components/FormContent/FormContent';
import Nosotros from './components/Nosotros/Nosotros';




const App = () => {


  return (
    <div className="App">
      <CartContextProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<ItemListContainer greeting="Bienvenidos a Axis3DMendoza" />} />
            <Route path='/categoria/:categoriaId' element={<ItemListContainer greeting="Productos Filtrados" />} />
            <Route path='/detalle/:productoId' element={<ItemDetailContainer />} />
            <Route path='/about' element={<Nosotros />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/pago' element={<FormContent />} />
            <Route path='*' element={<h1>No se encuentra la Pagina</h1>} />
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
    </div>
  );
}


export default App;
