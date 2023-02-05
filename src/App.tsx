import React from 'react';
import { Route, Routes } from "react-router-dom"
import Parameter  from './Pages/Parameter/Parameter';
import Data  from './Pages/Data/Data';
import Game from './Pages/Game/Game';
import Auth from './Pages/Auth/Auth';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} /> 
      <Route path="/game" element={<Game />} /> 
      <Route path="/parameter" element={<Parameter />} />
      <Route path="/data" element={<Data />} />
    </Routes>
  );
}

export default App;
