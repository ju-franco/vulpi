export const styles = {

  /* ====== LOGIN MODERNO ====== */

telaToda: {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #1E1E2F, #2c2c54)",
},

containerCentral: {
  width: "100%",
  maxWidth: "420px",
  padding: "20px",
},

cardBranco: {
  backgroundColor: "rgba(255,255,255,0.95)",
  padding: "40px",
  borderRadius: "24px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  backdropFilter: "blur(12px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
},

logo: {
  width: "90px",
  marginBottom: "20px",
},

titulo: {
  fontSize: "26px",
  fontWeight: "700",
  marginBottom: "25px",
  color: "#2D3436",
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
  /* ====== LAYOUT GERAL ====== */

  layoutMain: {
    marginLeft: "240px",
    paddingTop: "70px",
    minHeight: "100vh",
    backgroundColor: "#F8F9FA",
    padding: "30px",
  },

  /* ====== SIDEBAR ====== */

  sidebar: {
    position: "fixed",
    left: 0,
    top: 0,
    width: "240px",
    height: "100vh",
    background: "#1E1E2F",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    color: "#fff",
    zIndex: 1000,
  },

  logoSidebar: {
    width: "120px",
    marginBottom: "40px",
  },

  menuItem: {
    padding: "12px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "0.2s",
  },

  menuItemHover: {
    backgroundColor: "#2c2c54",
  },

  /* ====== TOPBAR ====== */

  topbarNova: {
    height: "70px",
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 30px",
    borderBottom: "1px solid #eee",
    position: "fixed",
    left: "240px",
    right: 0,
    top: 0,
    zIndex: 999,
  },

  iconeTopbar: {
    fontSize: "22px",
    marginRight: "20px",
    cursor: "pointer",
    color: "#555",
  },

  perfil: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
    cursor: "pointer",
  },

  /* ====== FILTRO ====== */

  topBar: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  inputCatalogo: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    flex: 1,
    background: "#fff",
  },

  /* ====== GRID ====== */

  gridItens: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "24px",
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
    fontSize: "18px",
    fontWeight: "700",
    color: "#2D3436",
  },

  local: {
    fontSize: "14px",
    color: "#636E72",
    display: "flex",
    alignItems: "center",
    gap: "4px",
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
};