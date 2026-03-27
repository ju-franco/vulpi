import React, { useState } from "react";
import { styles } from "../styles.js";
import { FaEye, FaEyeSlash, FaChevronDown } from "react-icons/fa";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom"; // 🔥 IMPORTADO

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export default function Login() {
  const navigate = useNavigate(); // 🔥 INICIALIZADO
  const [verSenha, setVerSenha] = useState(false);
  const [isFocused, setIsFocused] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [tipo, setTipo] = useState("aluno");

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    registro: "",
    codigoInstituicao: "",
    loginInput: "",
  });

  const getBorderStyle = (name) => ({
    ...styles.input,
    borderColor: isFocused === name ? "#f15f0a" : "#eee",
    boxShadow: isFocused === name ? "0 0 0 4px rgba(241, 95, 10, 0.1)" : "none",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const gerarCodigo = () => Math.floor(100 + Math.random() * 900).toString();

  // 🚀 CADASTRO
  const handleCadastro = async () => {
    // Validação básica de campos vazios
    if (!form.email || !form.senha || !form.nome) {
        return alert("Preencha os campos obrigatórios!");
    }

    try {
      const user = await createUserWithEmailAndPassword(auth, form.email, form.senha);

      let codigo = form.codigoInstituicao;
      if (tipo === "instituicao") {
        codigo = gerarCodigo();
      }

      await addDoc(collection(db, "usuarios"), {
        uid: user.user.uid,
        nome: form.nome,
        email: form.email,
        tipo,
        registro: tipo === "aluno" ? form.registro : "",
        codigoInstituicao: codigo,
      });

      alert(tipo === "instituicao" ? `Instituição cadastrada! Código: ${codigo}` : "Cadastro realizado!");
      navigate("/catalogo"); // 🔥 NAVEGA APÓS CADASTRAR
    } catch (err) {
      alert("Erro no cadastro: " + err.message);
    }
  };

  // 🔐 LOGIN
  const handleLogin = async () => {
    if (!form.loginInput || !form.senha) {
        return alert("Preencha login e senha!");
    }

    try {
      let emailFinal = form.loginInput;

      if (!form.loginInput.includes("@")) {
        const q = query(collection(db, "usuarios"), where("nome", "==", form.loginInput));
        const q2 = query(collection(db, "usuarios"), where("registro", "==", form.loginInput));

        let snapshot = await getDocs(q);
        if (snapshot.empty) snapshot = await getDocs(q2);
        if (snapshot.empty) return alert("Usuário não encontrado!");

        emailFinal = snapshot.docs[0].data().email;
      }

      await signInWithEmailAndPassword(auth, emailFinal, form.senha);
      alert("Login realizado!");
      navigate("/catalogo"); // 🔥 AGORA VOCÊ ENTRA NO SITE!
    } catch (err) {
      alert("Erro: Dados incorretos ou usuário inexistente.");
    }
  };

  const handleReset = async () => {
    if (!form.email) return alert("Digite seu email");
    await sendPasswordResetEmail(auth, form.email);
    alert("Email de recuperação enviado!");
  };

  return (
    <div style={{
      ...styles.telaToda,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <div style={styles.containerCentral}>
        <div style={styles.cardBranco}>
          <img src="logo-preta.png" alt="Vulpi Logo" style={styles.logo} />
          <h1 style={styles.titulo}>{isLogin ? "Log In" : "Criar Conta"}</h1>

          {/* TIPO */}
          <div style={styles.grupoInput}>
            <div style={{ position: "relative", width: "100%" }}>
              <select
                name="tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                style={{
                  ...styles.input,
                  width: "100%", // Ajustado para preencher o card
                  paddingRight: "45px",
                  appearance: "none",
                }}
              >
                <option value="aluno">Aluno</option>
                <option value="instituicao">Instituição</option>
              </select>
              <FaChevronDown style={{ position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)", color: "#aaa", pointerEvents: "none" }} />
            </div>
          </div>

          {/* CAMPOS OBRIGATÓRIOS MANTIDOS */}
          {!isLogin && (
            <div style={styles.grupoInput}>
              <input name="nome" placeholder="Nome*" style={getBorderStyle("nome")} onFocus={() => setIsFocused("nome")} onBlur={() => setIsFocused("")} onChange={handleChange} />
            </div>
          )}

          {!isLogin && tipo === "aluno" && (
            <div style={styles.grupoInput}>
              <input name="registro" placeholder="Registro do aluno*" style={getBorderStyle("registro")} onFocus={() => setIsFocused("registro")} onBlur={() => setIsFocused("")} onChange={handleChange} />
            </div>
          )}

          {isLogin ? (
            <div style={styles.grupoInput}>
              <input name="loginInput" placeholder="Email / Nome / Registro*" style={getBorderStyle("login")} onFocus={() => setIsFocused("login")} onBlur={() => setIsFocused("")} onChange={handleChange} />
            </div>
          ) : (
            <div style={styles.grupoInput}>
              <input name="email" placeholder="E-mail*" style={getBorderStyle("email")} onFocus={() => setIsFocused("email")} onBlur={() => setIsFocused("")} onChange={handleChange} />
            </div>
          )}

          <div style={styles.grupoInput}>
            <input
              name="senha"
              type={verSenha ? "text" : "password"}
              placeholder="Senha*"
              style={getBorderStyle("password")}
              onFocus={() => setIsFocused("password")}
              onBlur={() => setIsFocused("")}
              onChange={handleChange}
            />
            <div onClick={() => setVerSenha(!verSenha)} style={styles.iconeOlho}>
              {verSenha ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {isLogin && (
            <div style={styles.grupoInput}>
              <input name="codigoInstituicao" placeholder="Código da Instituição*" style={getBorderStyle("codigo")} onFocus={() => setIsFocused("codigo")} onBlur={() => setIsFocused("")} onChange={handleChange} />
            </div>
          )}

          <button style={styles.botao} onClick={isLogin ? handleLogin : handleCadastro}>
            {isLogin ? "Entrar" : "Cadastrar"}
          </button>

          {isLogin && <p onClick={handleReset} style={{ marginTop: "10px", fontSize: "13px", cursor: "pointer" }}>Esqueci minha senha</p>}

          <p style={{ marginTop: "20px", fontSize: "14px" }}>
            {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
            <span onClick={() => setIsLogin(!isLogin)} style={{ color: "#f15f0a", fontWeight: "bold", cursor: "pointer", textDecoration: "underline", marginLeft: "5px" }}>
              {isLogin ? "Criar conta" : "Fazer login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}