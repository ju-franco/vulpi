

// Oioi Kaskas, fiz esse código só para eu conseguir  cadastrar uns itens e visualizar como ficaria a estilização
// dos cards. Pode apagar se quiser e começçar doo zero ou  reutilizar e modicar algumas coisas.





import React, { useState, useEffect } from "react";
import { styles } from "../styles";
import Navbar from "../components/Navbar";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { IoMdPin } from "react-icons/io";

export default function Catalogo() {
  const [itens, setItens] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [modalItem, setModalItem] = useState(null);
  const [aceitou, setAceitou] = useState(false);

  useEffect(() => {
    const fetchItens = async () => {
      const snapshot = await getDocs(collection(db, "itens"));

      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Ordena por data (mais recente primeiro)
      lista.sort((a, b) => b.dataCriacao - a.dataCriacao);

      setItens(lista);
    };

    fetchItens();
  }, []);

  // 🔍 FILTRO
  const itensFiltrados = itens.filter((item) => {
    const nome = item.nome ? item.nome.toLowerCase() : "";
    const termo = busca.toLowerCase();

    return (
      nome.includes(termo) &&
      (categoria === "" || item.categoria === categoria)
    );
  });

  return (
    <>
      <Navbar />

      <div style={styles.layoutMain}>
        {/* ===== FILTROS ===== */}
        <div style={styles.topBar}>
          <input
            placeholder="Buscar item..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={styles.inputCatalogo}
          />

          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            style={styles.inputCatalogo}
          >
            <option value="">Todas categorias</option>
            <option value="eletronico">Eletrônico</option>
            <option value="roupa">Roupa</option>
            <option value="material">Material</option>
          </select>
        </div>

        {/* ===== GRID ===== */}
        <div style={styles.gridItens}>
          {itensFiltrados.map((item) => (
            <div key={item.id} style={styles.cardItem}>
              
              {/* IMAGEM */}
              <div style={styles.imagemContainer}>
                <img
                  src={item.imagem}
                  alt={item.nome}
                  style={styles.imagemItem}
                />
              </div>

              {/* INFO */}
              <div style={styles.infoContainer}>
                <h3 style={styles.tituloItem}>{item.nome}</h3>

                <p style={styles.local}>
                  <IoMdPin />
                  {item.local} {item.cor && ` | ${item.cor}`}
                </p>

                <span style={styles.tagTipo}>{item.tipo}</span>

                <p style={styles.data}>
                  {item.dataManual
                    ? new Date(item.dataManual + "T12:00:00").toLocaleDateString("pt-BR")
                    : "Sem data"}
                </p>
              </div>

              {/* BOTÃO */}
              <button
                style={styles.botaoCatalogo}
                onClick={() => setModalItem(item)}
              >
                Este item é meu
              </button>
            </div>
          ))}
        </div>

        {/* ===== MODAL ===== */}
        {modalItem && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h2>Reivindicar item</h2>

              <p>
                Você confirma que o item <b>{modalItem.nome}</b> é seu?
              </p>

              <label>
                <input
                  type="checkbox"
                  checked={aceitou}
                  onChange={() => setAceitou(!aceitou)}
                />
                Aceito os termos
              </label>

              <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                <button
                  style={styles.botaoCatalogo}
                  disabled={!aceitou}
                  onClick={() => {
                    alert("Solicitação enviada!");
                    setModalItem(null);
                    setAceitou(false);
                  }}
                >
                  Confirmar
                </button>

                <button
                  style={{
                    ...styles.botaoCatalogo,
                    backgroundColor: "#ccc",
                    color: "#333",
                  }}
                  onClick={() => setModalItem(null)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}