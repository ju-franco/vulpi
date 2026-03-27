import { useNavigate } from "react-router-dom";
import { styles } from "../styles";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { IoNotificationsOutline } from "react-icons/io5";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <>
      {/* ===== SIDEBAR ===== */}
      <div style={styles.sidebar}>
        
        {/* LOGO */}
        <h2 style={{ color: "#fff", marginBottom: "40px" }}>Vulpi</h2>

        {/* MENU */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          
          <div style={styles.menuItem} onClick={() => navigate("/catalogo")}>
            📦 Catálogo
          </div>

          <div style={styles.menuItem} onClick={() => navigate("/cadastro-item")}>
            ➕ Cadastro
          </div>

          <div style={styles.menuItem} onClick={() => navigate("/forum")}>
            💬 Fórum
          </div>

          <div style={styles.menuItem} onClick={handleLogout}>
            🚪 Sair
          </div>

        </div>
      </div>

      {/* ===== TOPBAR ===== */}
      <div style={styles.topbarNova}>
        
        <IoNotificationsOutline style={styles.iconeTopbar} />

        <img
          src="https://i.pravatar.cc/100"
          alt="Perfil"
          style={styles.perfil}
          onClick={() => navigate("/perfil")}
        />

      </div>
    </>
  );
}