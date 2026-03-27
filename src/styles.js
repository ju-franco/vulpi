export const styles = {
  /* ====== LOGIN  ====== */

  telaToda: {
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1E1E2F, #2c2c54)",
  },

  containerCentral: {
    width: "100%",
    maxWidth: "420px",
    padding: "2zpx",
  },

  cardBranco: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: "40px",
    borderRadius: "24px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    backdropFilter: "blur(12px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  logoLogin: {
    width: "170px",
    marginBottom: "2px",
  },

  tituloLogin: {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "10px",
    color: "#000000",
  },

  grupoInput: {
    position: "relative",
    width: "100%",
    marginBottom: "15px",
  },

  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "2px solid #eee",
    fontSize: "14px",
    outline: "none",
    transition: "0.3s",
    backgroundColor: "#fafafa",
  },

  iconeOlho: {
    position: "absolute",
    right: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: "#F15F0A",
  },

  botao: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #F15F0A, #ff7a2f)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
    transition: "0.2s",
  },

  botaoHover: {
    transform: "scale(1.03)",
    filter: "brightness(1.1)",
  },

  /* ====== FILTRO DE PESQUISA ====== */

  topBar: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  inputCatalogo: {
    padding: "12px",
    borderRadius: "600px",
    border: "1px solid #ddd",
    flex: 1,
    background: "#fff",
  },

  /* ====== GRID ITENS CATÁLOGO ====== */

  gridItens: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "30px",
  },

  /* ====== CARD ====== */

  cardItem: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "16px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    display: "flex",
    flexDirection: "column",
    transition: "0.2s",
    border: "1px solid #efefef",
    height: "420px",
    justifyContent: "space-between",
  },

  imagemContainer: {
    width: "100%",
    height: "180px",
    borderRadius: "14px",
    overflow: "hidden",
    marginBottom: "12px",
    backgroundColor: "#eee",
  },

  imagemItem: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  infoContainer: {
    textAlign: "left",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  tituloItem: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#2D3436",
  },

  local: {
    fontSize: "11px",
    color: "#636E72",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  tagTipo: {
    backgroundColor: "#FFF4ED",
    color: "#F15F0A",
    padding: "4px 12px",
    borderRadius: "8px",
    fontSize: "11px",
    fontWeight: "700",
    alignSelf: "flex-start",
    marginTop: "8px",
  },

  data: {
    fontSize: "12px",
    color: "#B2BEC3",
    marginTop: "auto",
  },

  botaoCatalogo: {
    marginTop: "15px",
    padding: "12px",
    border: "none",
    borderRadius: "12px",
    backgroundColor: "#F15F0A",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },

  /* ====== LAYOUT GERAL  ====== */

  layoutMain: {
  marginLeft: "260px",
  minHeight: "100vh",
  padding: "40px",
  boxSizing: "border-box",

  overflowY: "auto", // 🔥 ISSO AQUI
},

  /* ====== SIDEBAR (DESIGN PREMIUM) ====== */

  sidebar: {
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    width: "260px", // Um pouco mais larga para respiro
    background: "#1A1A2E", // Tom escuro mais profundo e moderno
    display: "flex",
    flexDirection: "column",
    padding: "30px 20px", // Padding interno generoso
    color: "#fff",
    zIndex: 1000,
    boxShadow: "4px 0 15px rgba(0,0,0,0.05)", // Sombra suave para separação
  },

  logoSidebar: {
    // Se usar texto como logo:
    fontSize: "24px",
    fontWeight: "800",
    color: "#F15F0A", // Laranja Vulpi
    letterSpacing: "1px",
    marginBottom: "40px",
    textAlign: "center",
  },

  // Se usar imagem como logo:
  logoImagemSidebar: {
    width: "120px",
    marginBottom: "40px",
    alignSelf: "center",
  },

  navLinksContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px", // Espaço entre os itens do menu
    flexGrow: 1, // Empurra o botão de logout para baixo
  },

  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px", // Espaço ícone-texto
    padding: "12px 18px",
    borderRadius: "14px", // Arredondamento moderno (super-ellipse)
    cursor: "pointer",
    transition: "all 0.3s ease",
    color: "#b2bec3", // Cor de texto não ativo
    fontSize: "15px",
    fontWeight: "500",
  },

  // Estado de Hover (ao passar o mouse)
  menuItemHover: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "#fff",
  },

  // Estado Ativo (página atual)
  menuItemActive: {
    backgroundColor: "#F15F0A", // Laranja Vulpi
    color: "#fff",
    fontWeight: "600",
    boxShadow: "0 4px 10px rgba(241, 95, 10, 0.2)",
  },

  iconeMenu: {
    fontSize: "20px",
  },

  // Seção de Logout separada no final
  logoutSection: {
    borderTop: "1px solid rgba(255,255,255,0.05)",
    paddingTop: "20px",
    marginTop: "auto",
  },

  /* ====== TOPBAR & PERFIL ====== */
  topbarNova: {
    height: "80px",
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 40px",
    borderBottom: "1px solid #f0f0f0",
    position: "fixed",
    left: "260px",
    right: 0,
    top: 0,
    zIndex: 999,
  },

  perfilContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    position: "relative",
  },

  perfilFoto: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #F15F0A",
  },

  notificacoesContainer: {
    marginRight: "25px",
    position: "relative",
    cursor: "pointer",
    fontSize: "24px",
    color: "#5c5c7d",
    display: "flex",
    alignItems: "center",
  },

  badge: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    background: "#F15F0A",
    color: "white",
    fontSize: "10px",
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },

  /* ====== DROPDOWNS (FLUTUANTES) ====== */
  dropdownFlutuante: {
    position: "absolute",
    top: "60px",
    right: 0,
    width: "280px",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    padding: "20px",
    zIndex: 1000,
    border: "1px solid #eee",
  },

  inputPerfil: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    boxSizing: "border-box",
  },

  /* ====== BOTÕES DO PERFIL (DROPDOWN) ====== */

  labelSmall: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#A0AEC0",
    textTransform: "uppercase",
    marginBottom: "4px",
    marginTop: "12px",
    display: "block",
    letterSpacing: "0.5px",
  },

  botaoSenha: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #E2E8F0",
    backgroundColor: "#F8FAFC",
    color: "#4A5568",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginTop: "15px",
    transition: "all 0.2s ease",
  },

  botaoSenhaHover: {
    backgroundColor: "#EDF2F7",
    borderColor: "#CBD5E0",
  },

  botaoSalvar: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#F15F0A", // Laranja Vulpi
    color: "#FFFFFF",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow: "0 4px 12px rgba(241, 95, 10, 0.2)",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },

  botaoSalvarHover: {
    backgroundColor: "#D95208",
    transform: "translateY(-1px)",
    boxShadow: "0 6px 15px rgba(241, 95, 10, 0.3)",
  },
};
