import React, { useState, useEffect } from "react";
import { styles } from "../styles";
import { db, auth } from "../firebase";
import { 
  collection, addDoc, getDocs, query, orderBy, 
  serverTimestamp, doc, updateDoc, increment, getDoc, arrayUnion 
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth"; // Importante para monitorar o login
import { 
  IoSend, IoArrowUpCircleOutline, 
  IoArrowDownCircleOutline, IoCreateOutline, IoCheckmarkDoneOutline 
} from "react-icons/io5";

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [novoPost, setNovoPost] = useState("");
  const [tag, setTag] = useState("");
  const [fotoItem, setFotoItem] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para evitar tela branca infinita

  const [editandoId, setEditandoId] = useState(null);
  const [textoEditado, setTextoEditado] = useState("");
  const [comentarioTexto, setComentarioTexto] = useState({});

  // 1. MONITORAR LOGIN E BUSCAR DADOS
  useEffect(() => {
    // onAuthStateChanged garante que o código espere o Firebase dizer quem é o usuário
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const d = await getDoc(doc(db, "usuarios", user.uid));
          if (d.exists()) {
            setUserData(d.data());
          }
        } catch (err) {
          console.error("Erro ao buscar usuário:", err);
        }
      }
      // Independente de achar o usuário, busca os posts
      buscarPosts();
    });

    return () => unsub(); // Limpa o monitor ao sair da tela
  }, []);

  const buscarPosts = async () => {
    try {
      // Se der erro aqui, verifique o console (F12) para o link de "Criar Índice"
      const q = query(collection(db, "forum"), orderBy("votos", "desc"));
      const snapshot = await getDocs(q);
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(lista);
    } catch (error) {
      console.error("Erro no Firestore:", error);
    } finally {
      setLoading(false); // Para o carregamento
    }
  };

  // 2. FUNÇÕES DE AÇÃO (Publicar, Votar, Comentar)
  const handlePublicar = async () => {
    if (!novoPost.trim()) return;
    setEnviando(true);
    try {
      await addDoc(collection(db, "forum"), {
        texto: novoPost,
        tag: tag || "Geral",
        fotoItem: fotoItem || null,
        autorNome: userData?.nome || "Usuário Vulpi",
        autorFoto: userData?.foto || "https://via.placeholder.com/150",
        autorId: auth.currentUser.uid,
        votos: 0,
        comentarios: [],
        dataCriacao: serverTimestamp(),
      });
      setNovoPost(""); setTag(""); setFotoItem("");
      buscarPosts();
    } catch (e) { alert("Erro ao publicar: " + e.message); }
    finally { setEnviando(false); }
  };

  const handleVoto = async (postId, valor) => {
    try {
      const postRef = doc(db, "forum", postId);
      await updateDoc(postRef, { votos: increment(valor) });
      // Atualiza apenas localmente para ser rápido (opcional) ou chama buscarPosts
      buscarPosts();
    } catch (e) { console.error(e); }
  };

  const handleComentar = async (postId) => {
    const texto = comentarioTexto[postId];
    if (!texto?.trim()) return;

    try {
      const postRef = doc(db, "forum", postId);
      await updateDoc(postRef, {
        comentarios: arrayUnion({
          texto,
          autorNome: userData?.nome || "Usuário",
          autorFoto: userData?.foto || "https://via.placeholder.com/150",
          data: new Date().toISOString()
        })
      });
      setComentarioTexto({ ...comentarioTexto, [postId]: "" });
      buscarPosts();
    } catch (e) { console.error(e); }
  };

  if (loading) return <div style={{ padding: "100px", textAlign: "center", fontFamily: "Poppins" }}>Carregando Fórum Vulpi...</div>;

  return (
    <div style={styles.layoutMain}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        
        {/* BOX CRIAR POST */}
        <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", marginBottom: "30px" }}>
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <input placeholder="Tag (ex: Chaves)" value={tag} onChange={e => setTag(e.target.value)} style={{ ...styles.inputPerfil, flex: 1, marginBottom: 0 }} />
            <input placeholder="URL da foto do item" value={fotoItem} onChange={e => setFotoItem(e.target.value)} style={{ ...styles.inputPerfil, flex: 1, marginBottom: 0 }} />
          </div>
          <textarea placeholder="O que você perdeu?" value={novoPost} onChange={e => setNovoPost(e.target.value)} style={{ ...styles.inputPerfil, minHeight: "80px", resize: "none" }} />
          <button onClick={handlePublicar} disabled={enviando} style={styles.botaoSalvar}>{enviando ? "Postando..." : "Publicar no Feed"}</button>
        </div>

        {/* FEED */}
        {posts.map(post => (
          <div key={post.id} style={{ display: "flex", gap: "15px", backgroundColor: "#fff", padding: "20px", borderRadius: "20px", marginBottom: "20px", border: "1px solid #eee" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
              <IoArrowUpCircleOutline size={28} onClick={() => handleVoto(post.id, 1)} style={{ cursor: "pointer", color: "#F15F0A" }} />
              <span style={{ fontWeight: "bold" }}>{post.votos || 0}</span>
              <IoArrowDownCircleOutline size={28} onClick={() => handleVoto(post.id, -1)} style={{ cursor: "pointer", color: "#999" }} />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <img src={post.autorFoto || "https://via.placeholder.com/150"} style={{ width: "35px", height: "35px", borderRadius: "50%" }} />
                <span style={{ fontWeight: "600", fontSize: "14px" }}>{post.autorNome}</span>
                <span style={{ backgroundColor: "#f1f1f1", padding: "2px 8px", borderRadius: "5px", fontSize: "11px" }}>#{post.tag}</span>
              </div>
              
              <p style={{ fontSize: "15px", color: "#333" }}>{post.texto}</p>
              
              {post.fotoItem && <img src={post.fotoItem} style={{ width: "100%", borderRadius: "10px", marginTop: "10px" }} />}

              {/* COMENTÁRIOS */}
              <div style={{ marginTop: "15px", borderTop: "1px solid #eee", paddingTop: "10px" }}>
                {post.comentarios?.map((c, i) => (
                  <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "8px", fontSize: "13px" }}>
                    <img src={c.autorFoto} style={{ width: "20px", height: "20px", borderRadius: "50%" }} />
                    <p><b>{c.autorNome}:</b> {c.texto}</p>
                  </div>
                ))}
                <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
                  <input 
                    placeholder="Comentar..." 
                    value={comentarioTexto[post.id] || ""} 
                    onChange={e => setComentarioTexto({...comentarioTexto, [post.id]: e.target.value})}
                    style={{ ...styles.inputPerfil, flex: 1, padding: "5px 10px", marginBottom: 0 }}
                  />
                  <button onClick={() => handleComentar(post.id)} style={{ ...styles.botaoSalvar, width: "auto", padding: "0 10px", marginTop: 0 }}><IoSend /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}