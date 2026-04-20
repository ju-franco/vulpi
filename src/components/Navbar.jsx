import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { styles } from "../styles";
import { auth, db } from "../firebase";
import {
  signOut,
  onAuthStateChanged,
  updateEmail,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

// Ícones
import { IoNotificationsOutline, IoKeyOutline } from "react-icons/io5";
import { MdOutlineAddToPhotos, MdOutlineLogout } from "react-icons/md";
import { TbMapPinSearch } from "react-icons/tb";
import { HiOutlineChatAlt2 } from "react-icons/hi";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Estados
  const [abaPerfil, setAbaPerfil] = useState(false);
  const [usuario, setUsuario] = useState({
    nome: "Carregando...",
    email: "",
    foto: "https://via.placeholder.com/150",
  });

  // 1. Monitorar usuário logado e buscar no Firebase
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUsuario(docSnap.data());
        } else {
          const novoUsuario = {
            nome: user.displayName || "Usuário",
            email: user.email,
            foto:
              user.photoURL ||
              "https://tse4.mm.bing.net/th/id/OIP.ZT7M33hqdCe92O_2UDtn1wHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
          };
          await setDoc(docRef, novoUsuario);
          setUsuario(novoUsuario);
        }
      }
    });
    return () => unsub();
  }, []);

  // 2. Funções de Ação
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const salvarAlteracoes = async () => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      if (usuario.email !== user.email) {
        await updateEmail(user, usuario.email);
      }
      const docRef = doc(db, "usuarios", user.uid);
      await updateDoc(docRef, usuario);
      setAbaPerfil(false);
      alert("Perfil atualizado!");
    } catch (error) {
      alert("Erro ao salvar: " + error.message);
    }
  };

  const resetarSenha = async () => {
    try {
      await sendPasswordResetEmail(auth, usuario.email);
      alert("E-mail de redefinição enviado!");
    } catch (error) {
      alert("Erro: " + error.message);
    }
  };

  // 3. Estilos Ativos
  const isActive = (path) => location.pathname === path;

  const getMenuItemStyle = (path) => {
    let baseStyle = { ...styles.menuItem };
    if (isActive(path)) {
      baseStyle = { ...baseStyle, ...styles.menuItemActive };
    }
    return baseStyle;
  };

  return (
    <>
      {" "}
      {/* <--- O Fragmento resolve o erro de retorno múltiplo */}
      {/* ===== SIDEBAR ===== */}
      <div style={styles.sidebar}>
        <div style={styles.logoSidebar}>
          <img
            src="/public/logo-sem-fundo.png"
            alt="Vulpi Logo"
            style={{
              width: "170px",
              height: "auto",
              marginTop: "30px",
              display: "block",
              marginLeft: "20px",
            }}
          />
        </div>

        <div style={styles.navLinksContainer}>
          <div
            style={getMenuItemStyle("/catalogo")}
            onClick={() => navigate("/catalogo")}
            onMouseEnter={(e) =>
              !isActive("/catalogo") &&
              (e.currentTarget.style.backgroundColor =
                styles.menuItemHover.backgroundColor)
            }
            onMouseLeave={(e) =>
              !isActive("/catalogo") &&
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <TbMapPinSearch style={styles.iconeMenu} /> Catálogo
          </div>

          <div
            style={getMenuItemStyle("/cadastro-item")}
            onClick={() => navigate("/cadastro-item")}
            onMouseEnter={(e) =>
              !isActive("/cadastro-item") &&
              (e.currentTarget.style.backgroundColor =
                styles.menuItemHover.backgroundColor)
            }
            onMouseLeave={(e) =>
              !isActive("/cadastro-item") &&
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <MdOutlineAddToPhotos style={styles.iconeMenu} /> Cadastro
          </div>

          <div
            style={getMenuItemStyle("/forum")}
            onClick={() => navigate("/forum")}
            onMouseEnter={(e) =>
              !isActive("/forum") &&
              (e.currentTarget.style.backgroundColor =
                styles.menuItemHover.backgroundColor)
            }
            onMouseLeave={(e) =>
              !isActive("/forum") &&
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <HiOutlineChatAlt2 style={styles.iconeMenu} /> Fórum
          </div>
        </div>

        <div style={styles.logoutSection}>
          <div
            style={styles.menuItem}
            onClick={handleLogout}
            onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.menuItemHover.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <MdOutlineLogout style={styles.iconeMenu} /> Sair
          </div>
        </div>
      </div>
      {/* ===== TOPBAR ===== */}
      <div style={styles.topbarNova}>
        <div
          style={styles.notificacoesContainer}
          onClick={() => alert("Mural em breve!")}
        >
          <IoNotificationsOutline />
          <span style={styles.badge}>!</span>
        </div>

        <div
          style={styles.perfilContainer}
          onClick={() => setAbaPerfil(!abaPerfil)}
        >
          <div style={{ textAlign: "right", marginRight: "10px" }}>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#333" }}>
              {usuario.nome}
            </div>
            <div style={{ fontSize: "11px", color: "#999" }}>
              {usuario.email}
            </div>
          </div>
          <img src={usuario.foto} alt="Perfil" style={styles.perfilFoto} />

          {abaPerfil && (
            <div
              style={styles.dropdownFlutuante}
              onClick={(e) => e.stopPropagation()}
            >
              <h4 style={{ margin: "0 0 10px 0" }}>Configurações da Conta</h4>

              <span style={styles.labelSmall}>Nome</span>
              <input
                style={styles.inputPerfil}
                value={usuario.nome}
                onChange={(e) =>
                  setUsuario({ ...usuario, nome: e.target.value })
                }
              />

              <span style={styles.labelSmall}>E-mail de Login</span>
              <input
                style={styles.inputPerfil}
                value={usuario.email}
                onChange={(e) =>
                  setUsuario({ ...usuario, email: e.target.value })
                }
              />

              <span style={styles.labelSmall}>Link da Foto</span>
              <input
                style={styles.inputPerfil}
                value={usuario.foto}
                onChange={(e) =>
                  setUsuario({ ...usuario, foto: e.target.value })
                }
              />

              <button style={styles.botaoSenha} onClick={resetarSenha}>
                <IoKeyOutline /> Mudar Senha via E-mail
              </button>

              <button
                style={{ ...styles.botaoSalvar, marginTop: "15px" }}
                onClick={salvarAlteracoes}
              >
                Salvar Alterações
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
