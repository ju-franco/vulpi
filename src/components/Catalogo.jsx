import React, { useState, useEffect } from "react";
import { styles } from "../styles";
import Navbar from "../components/Navbar";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { IoMdPin } from "react-icons/io";

// ÍCONES DAS CATEGORIAS
import {
  IoPhonePortraitOutline,
  IoShirtOutline,
  IoCreateOutline,
  IoDocumentTextOutline,
  IoWatchOutline,
  IoKeyOutline,
  IoWaterOutline,
  IoCardOutline,
  IoBagOutline,
  IoEllipsisHorizontalCircleOutline,
  IoColorPalette,
  IoSearch,
  IoClose,
} from "react-icons/io5";

export default function Catalogo() {
  const [itens, setItens] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtros, setFiltros] = useState([]);
  const [modalItem, setModalItem] = useState(null);
  const [aceitou, setAceitou] = useState(false);

  // LISTA DE CATEGORIAS + ÍCONES
  const categorias = [
    { id: "eletronico", label: "Eletrônico", icon: <IoPhonePortraitOutline /> },
    { id: "roupa", label: "Roupa", icon: <IoShirtOutline /> },
    { id: "material", label: "Material", icon: <IoCreateOutline /> },
    { id: "documento", label: "Documento", icon: <IoDocumentTextOutline /> },
    { id: "acessorio", label: "Acessório", icon: <IoWatchOutline /> },
    { id: "chave", label: "Chave", icon: <IoKeyOutline /> },
    { id: "garrafa", label: "Garrafa", icon: <IoWaterOutline /> },
    { id: "cartao", label: "Cartão", icon: <IoCardOutline /> },
    { id: "mochila", label: "Mochila", icon: <IoBagOutline /> },
    {
      id: "outros",
      label: "Outros",
      icon: <IoEllipsisHorizontalCircleOutline />,
    },
  ];

  useEffect(() => {
    const fetchItens = async () => {
      const snapshot = await getDocs(collection(db, "itens"));

      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      lista.sort((a, b) => b.dataCriacao - a.dataCriacao);

      setItens(lista);
    };

    fetchItens();
  }, []);

  const toggleFiltro = (cat) => {
    if (filtros.includes(cat)) {
      setFiltros(filtros.filter((c) => c !== cat));
    } else {
      setFiltros([...filtros, cat]);
    }
  };

  const itensFiltrados = itens.filter((item) => {
    const nome = item.nome ? item.nome.toLowerCase() : "";
    const termo = busca.toLowerCase();

    return (
      nome.includes(termo) &&
      (filtros.length === 0 || filtros.includes(item.categoria))
    );
  });

  return (
    <>
      <Navbar />

      <div style={styles.layoutMain}>
        {/* BUSCA */}
        <div style={styles.topBar}>
          <div style={styles.containerBusca}>
            <IoSearch style={styles.iconeBusca} />
            <input
              placeholder="Buscar item pelo nome..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              style={styles.inputCatalogo}
            />
            {busca && (
              <IoClose
                style={styles.iconeLimpar}
                onClick={() => setBusca("")}
              />
            )}
          </div>
        </div>

        {/* CHIPS DE CATEGORIA */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          {categorias.map((cat) => (
            <div
              key={cat.id}
              onClick={() => toggleFiltro(cat.id)}
              style={{
                padding: "6px 14px",
                borderRadius: "20px",
                cursor: "pointer",
                backgroundColor: filtros.includes(cat.id)
                  ? "#F15F0A"
                  : "#f1f1f1a2",
                color: filtros.includes(cat.id) ? "#fff" : "#333",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "0.2s",
              }}
            >
              {cat.icon}
              {filtros.includes(cat.id) ? `${cat.label} ✕` : cat.label}
            </div>
          ))}
        </div>

        {/* GRID DE ITENS */}
        <div style={styles.gridItens}>
          {itensFiltrados.map((item) => (
            <div key={item.id} style={styles.cardItem}>
              <div style={styles.imagemContainer}>
                <img
                  src={item.imagem || "/public/icone-logo.png"}
                  alt={item.nome}
                  style={styles.imagemItem}
                />
              </div>

              <div style={styles.infoContainer}>
                <h3 style={styles.tituloItem}>{item.nome}</h3>

                <p style={styles.local}>
                  <IoMdPin />
                  {item.local} <IoColorPalette />
                  {item.cor && ` ${item.cor}`}
                </p>

                <span style={styles.tagTipo}>{item.tipo}</span>

                <p style={styles.data}>
                  {item.dataManual
                    ? new Date(
                        item.dataManual + "T12:00:00",
                      ).toLocaleDateString("pt-BR")
                    : "Sem data"}
                </p>
              </div>

              <button
                style={styles.botaoCatalogo}
                onClick={() => setModalItem(item)}
              >
                Este item é meu
              </button>
            </div>
          ))}
        </div>

        {/* MODAL */}
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
