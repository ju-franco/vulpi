import React, { useState } from "react";
import { styles } from "../styles";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: "",
    categoria: "",
    tipo: "",
    local: "",
    imagem: "",
    cor: "",
    dataManual: "",
    descricao: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Verificação de campos essenciais para evitar itens vazios
    if (!form.nome || !form.tipo || !form.local || !form.dataManual) {
      return setMsg("Preencha os campos principais (Nome, Tipo, Local e Data)!");
    }

    try {
      // Envia todos os dados para a coleção "itens" no Firestore
      await addDoc(collection(db, "itens"), {
        ...form,
        dataCriacao: Date.now(), // Registro interno de quando o post foi feito
      });

      setMsg("Item cadastrado com sucesso!");

      // Limpa o formulário após o sucesso
      setForm({
        nome: "",
        categoria: "",
        tipo: "",
        local: "",
        imagem: "",
        cor: "",
        dataManual: "",
        descricao: "",
      });

    } catch (err) {
      setMsg("Erro ao salvar: " + err.message);
    }
  };

  return (
    <div style={styles.telaToda}>
      <div style={styles.containerCentral}>
        <div style={styles.cardBranco}>
          <h1 style={styles.titulo}>Cadastrar Item</h1>

          {/* Nome do objeto */}
          <input 
            name="nome" 
            placeholder="O que você encontrou?" 
            value={form.nome} 
            onChange={handleChange} 
            style={styles.input} 
          />
          
          {/* Linha com Cor e Data (Lado a lado) */}
          <div style={{ display: "flex", gap: "10px", width: "100%" }}>
            <input 
              name="cor" 
              placeholder="Cor principal" 
              value={form.cor} 
              onChange={handleChange} 
              style={styles.input} 
            />
            <input 
              type="date" 
              name="dataManual" 
              value={form.dataManual} 
              onChange={handleChange} 
              style={styles.input} 
            />
          </div>

          {/* Seleção de Tipo (Itens comuns em escolas) */}
          <select name="tipo" value={form.tipo} onChange={handleChange} style={styles.input}>
            <option value="">Selecione o tipo</option>
            <optgroup label="Mais Comuns">
              <option value="Garrafa / Squeeze">Garrafa / Squeeze</option>
              <option value="Estojo">Estojo</option>
              <option value="Fone de ouvido">Fone de ouvido</option>
              <option value="Guarda-chuva">Guarda-chuva</option>
            </optgroup>
            <optgroup label="Eletrônicos">
              <option value="Celular">Celular</option>
              <option value="Carregador / Cabo">Carregador / Cabo</option>
              <option value="Notebook">Notebook</option>
              <option value="Mouse">Mouse</option>
            </optgroup>
            <optgroup label="Vestuário">
              <option value="Agasalho / Blusa">Agasalho / Blusa</option>
              <option value="Boné / Chapéu">Boné / Chapéu</option>
              <option value="Óculos">Óculos</option>
            </optgroup>
          </select>

          {/* Descrição Detalhada para ajudar o dono a identificar */}
          <textarea 
            name="descricao" 
            placeholder="Descrição detalhada (Ex: Tem um adesivo da Vulpi no canto direito)" 
            value={form.descricao} 
            onChange={handleChange} 
            style={styles.textarea} 
          />

          {/* Local onde foi achado */}
          <input 
            name="local" 
            placeholder="Onde foi encontrado? (Ex: Bloco A)" 
            value={form.local} 
            onChange={handleChange} 
            style={styles.input} 
          />
          
          {/* Categoria Geral para filtros */}
          <select name="categoria" value={form.categoria} onChange={handleChange} style={styles.input}>
            <option value="">Categoria Geral</option>
            <option value="eletronico">Eletrônico</option>
            <option value="roupa">Roupa</option>
            <option value="material">Material Acadêmico</option>
            <option value="outro">Outros</option>
          </select>

          {/* Link da Imagem */}
          <input 
            name="imagem" 
            placeholder="URL da foto do item" 
            value={form.imagem} 
            onChange={handleChange} 
            style={styles.input} 
          />

          <button style={styles.botao} onClick={handleSubmit}>
            Salvar no Sistema
          </button>

          {/* Feedback para o usuário */}
          {msg && <p style={{ marginTop: "15px", color: "#f15f0a", fontWeight: "600" }}>{msg}</p>}
        </div>
      </div>
    </div>
  );
}