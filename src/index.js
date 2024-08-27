import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import ListaReceitas from './pages/ListaReceitas';
import DetalhesReceita from './pages/DetalhesReceita';
import AdicionarReceita from './pages/AdicionarReceita';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<ListaReceitas />} />
      <Route path="/receita/:id" element={<DetalhesReceita />} />
      <Route path="/adicionar" element={<AdicionarReceita />} />
    </Routes>
  </Router>
);