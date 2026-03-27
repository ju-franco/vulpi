// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Catalogo from "./components/Catalogo";
import Cadastro from "./components/Cadastro";
import Forum from "./components/Forum";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* SEM NAVBAR */}
        <Route path="/" element={<Login />} />

        {/* COM NAVBAR */}
        <Route
          path="/catalogo"
          element={
            <Layout>
              <Catalogo />
            </Layout>
          }
        />

        <Route
          path="/cadastro-item"
          element={
            <Layout>
              <Cadastro />
            </Layout>
          }
        />

        <Route
          path="/forum"
          element={
            <Layout>
              <Forum />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;