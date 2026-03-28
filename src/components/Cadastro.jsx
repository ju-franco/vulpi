import React, { useRef, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: "",
    categoria: "",
    tipo: "",
    local: "",
    cor: "",
    dataManual: "",
    descricao: "",
    urlImagem: "",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const refs = {
    nome: useRef(),
    tipo: useRef(),
    local: useRef(),
    dataManual: useRef(),
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: false });
    }
  };

  const validateFields = () => {
    const newErrors = {};

    if (!form.nome) newErrors.nome = true;
    if (!form.tipo) newErrors.tipo = true;
    if (!form.local) newErrors.local = true;
    if (!form.dataManual) newErrors.dataManual = true;

    setErrors(newErrors);

    const fields = ["nome", "tipo", "local", "dataManual"];
    for (let f of fields) {
      if (newErrors[f]) {
        refs[f].current.focus();
        break;
      }
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setMsg("");

    if (!validateFields()) {
      return setMsg("Preencha todos os campos obrigatórios.");
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "itens"), {
        ...form,
        imagem: form.urlImagem || null,
        dataCriacao: Date.now(),
      });

      setMsg("Item cadastrado com sucesso!");

      setForm({
        nome: "",
        categoria: "",
        tipo: "",
        local: "",
        cor: "",
        dataManual: "",
        descricao: "",
        urlImagem: "",
      });

      setErrors({});
    } catch (err) {
      setMsg("Erro ao salvar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    tela: {
      width: "100vw",
      minHeight: "100vh",
      background: "#f6f7fb",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    card: {
      width: "100%",
      maxWidth: "480px",
      background: "#fff",
      borderRadius: 16,
      padding: 30,
      boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
      display: "flex",
      flexDirection: "column",
      gap: 15,
    },
    input: (err) => ({
      padding: "12px 14px",
      borderRadius: 10,
      border: err ? "2px solid #ff4d4d" : "1px solid #ccc",
      width: "100%",
      fontSize: 15,
      outline: "none",
      transition: "0.2s",
      background: err ? "#ffe5e5" : "#fff",
    }),
    button: {
      padding: "14px",
      borderRadius: 12,
      background: "rgb(241, 95, 10)",
      color: "#fff",
      fontSize: 16,
      cursor: "pointer",
      border: "none",
      marginTop: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
    },
    spinner: {
      width: 18,
      height: 18,
      border: "3px solid rgba(255,255,255,0.3)",
      borderTopColor: "#fff",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
  };

  return (
    <div style={styles.tela}>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>

      <div style={styles.card}>
        <h2>📌 Cadastrar Item</h2>

        <input
          ref={refs.nome}
          name="nome"
          placeholder="O que você encontrou?"
          value={form.nome}
          onChange={handleChange}
          style={styles.input(errors.nome)}
        />

        {/* Cor + Data */}
        <div style={{ display: "flex", gap: "10px" }}>
          <select
            name="cor"
            value={form.cor}
            onChange={handleChange}
            style={styles.input(false)}
          >
            <option value="">Cor principal</option>
            <option value="Preto">Preto</option>
            <option value="Branco">Branco</option>
            <option value="Vermelho">Vermelho</option>
            <option value="Laranja">Laranja</option>
            <option value="Azul">Azul</option>
            <option value="Verde">Verde</option>
            <option value="Amarelo">Amarelo</option>
            <option value="Cinza">Cinza</option>
            <option value="Rosa">Rosa</option>
            <option value="Roxo">Roxo</option>
            <option value="Marrom">Marrom</option>
            <option value="Colorido">Colorido</option>
          </select>

          <input
            ref={refs.dataManual}
            type="date"
            name="dataManual"
            value={form.dataManual}
            onChange={handleChange}
            style={styles.input(errors.dataManual)}
          />
        </div>

        <select
          ref={refs.tipo}
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          style={styles.input(errors.tipo)}
        >
          <option value="">Selecione o tipo</option>
          <optgroup label="Mais Comuns">
            <option value="Garrafa / Squeeze">Garrafa / Squeeze</option>
            <option value="Estojo">Estojo</option>
            <option value="Fone de ouvido">Fone de ouvido</option>
          </optgroup>
          <optgroup label="Eletrônicos">
            <option value="Celular">Celular</option>
            <option value="Carregador / Cabo">Carregador / Cabo</option>
          </optgroup>
          <option value="Outro">Outro</option>
        </select>

        <textarea
          name="descricao"
          placeholder="Descrição detalhada"
          value={form.descricao}
          onChange={handleChange}
          rows={3}
          style={styles.input(false)}
        />

        <input
          ref={refs.local}
          name="local"
          placeholder="Local encontrado"
          value={form.local}
          onChange={handleChange}
          style={styles.input(errors.local)}
        />

        {/* === Novas Categorias === */}
        <select
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          style={styles.input(false)}
        >
          <option value="">Selecione a categoria</option>

          <optgroup label="Documentos e Acessos">
            <option value="documento">Documento</option>
            <option value="cartao">Cartão / Carteirinha</option>
          </optgroup>

          <optgroup label="Pertences pessoais">
            <option value="chave">Chave</option>
            <option value="acessorio">Acessório</option>
            <option value="roupa">Roupa</option>
            <option value="garrafa">Garrafa / Squeeze</option>
          </optgroup>

          <optgroup label="Eletrônicos">
            <option value="eletronico">Eletrônico</option>
          </optgroup>

          <optgroup label="Material acadêmico">
            <option value="material">Material</option>
            <option value="mochila">Mochila / Bolsa</option>
          </optgroup>

          <option value="outros">Outros</option>
        </select>

        {/* URL da imagem */}
        <input
          name="urlImagem"
          placeholder="URL da imagem (opcional)"
          value={form.urlImagem}
          onChange={handleChange}
          style={styles.input(false)}
        />

        <button style={styles.button} onClick={handleSubmit} disabled={loading}>
          {loading && <div style={styles.spinner}></div>}
          {loading ? "Salvando..." : "Salvar"}
        </button>

        {msg && <p style={{ color: "#f15f0a" }}>{msg}</p>}
      </div>
    </div>
  );
}