import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navegacion/Navbar";
import Inicio from "./components/paginas/Inicio";
import RickandMorty from "./components/paginas/Rickandmorty";
import Formulario from "./components/paginas/Formulario";
import Usuarios from "./components/paginas/Usuarios";

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/apirick" element={<RickandMorty />} />
          <Route path="/formulario" element={<Formulario />} />
          <Route path="/usuarios" element={<Usuarios />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
