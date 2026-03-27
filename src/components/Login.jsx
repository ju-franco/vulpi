import React, { useState } from "react";
import { styles } from "../styles.js";
import { FaEye, FaEyeSlash, FaChevronDown } from "react-icons/fa";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

export default function Login() {
  const navigate = useNavigate();
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
  });

  const getBorderStyle = (name) => ({
    ...styles.input,
    borderColor: isFocused === name ? "#f15f0a" : "#eee",
    boxShadow: isFocused === name ? "0 0 0 4px rgba(241, 95, 10, 0.1)" : "none",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const gerarCodigo = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  // 🚀 CADASTRO
  const handleCadastro = async () => {
    if (!form.email || !form.senha || !form.nome) {
      return alert("Preencha os campos obrigatórios!");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.senha
      );
      const user = userCredential.user;

      let codigo = form.codigoInstituicao;
      if (tipo === "instituicao") {
        codigo = gerarCodigo();
      }

      await setDoc(doc(db, "usuarios", user.uid), {
        uid: user.uid,
        nome: form.nome,
        email: form.email,
        foto: "https://i.pravatar.cc/150?img=32",
        tipo,
        registro: tipo === "aluno" ? form.registro : "",
        codigoInstituicao: codigo,
      });

      alert("Cadastro realizado!");
      navigate("/catalogo");
    } catch (err) {
      alert("Erro no cadastro: " + err.message);
    }
  };

  // 🔐 LOGIN (AGORA SÓ EMAIL)
  const handleLogin = async () => {
    if (!form.email || !form.senha) {
      return alert("Preencha email e senha!");
    }

    try {
      await signInWithEmailAndPassword(auth, form.email, form.senha);
      navigate("/catalogo");
    } catch (err) {
      alert("Erro: Email ou senha incorretos.");
    }
  };

  const handleReset = async () => {
    if (!form.email) return alert("Digite seu email");
    await sendPasswordResetEmail(auth, form.email);
    alert("Email de recuperação enviado!");
  };

  return (
    <div
      style={{
        ...styles.telaToda,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div style={styles.containerCentral}>
        <div style={styles.cardBranco}>
          <img
            src="logo-preta.png"
            alt="Vulpi Logo"
            style={styles.logoLogin}
          />

          <h1 style={styles.tituloLogin}>
            {isLogin ? "Log In" : "Criar Conta"}
          </h1>

          {/* TIPO */}
          <div style={styles.grupoInput}>
            <div style={{ position: "relative", width: "100%" }}>
              <select
                name="tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                style={{
                  ...styles.input,
                  width: "100%",
                  paddingRight: "45px",
                  appearance: "none",
                }}
              >
                <option value="aluno">Aluno</option>
                <option value="instituicao">Instituição</option>
              </select>

              <FaChevronDown
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#aaa",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>

          {/* CAMPOS CADASTRO */}
          {!isLogin && (
            <div style={styles.grupoInput}>
              <input
                name="nome"
                placeholder="Nome*"
                style={getBorderStyle("nome")}
                onFocus={() => setIsFocused("nome")}
                onBlur={() => setIsFocused("")}
                onChange={handleChange}
              />
            </div>
          )}

          {!isLogin && tipo === "aluno" && (
            <div style={styles.grupoInput}>
              <input
                name="registro"
                placeholder="Registro do aluno*"
                style={getBorderStyle("registro")}
                onFocus={() => setIsFocused("registro")}
                onBlur={() => setIsFocused("")}
                onChange={handleChange}
              />
            </div>
          )}

          {/* EMAIL (AGORA SEMPRE USADO) */}
          <div style={styles.grupoInput}>
            <input
              name="email"
              placeholder="E-mail*"
              style={getBorderStyle("email")}
              onFocus={() => setIsFocused("email")}
              onBlur={() => setIsFocused("")}
              onChange={handleChange}
            />
          </div>

          {/* SENHA */}
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

            <div
              onClick={() => setVerSenha(!verSenha)}
              style={styles.iconeOlho}
            >
              {verSenha ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* BOTÃO */}
          <button
            style={styles.botao}
            onClick={isLogin ? handleLogin : handleCadastro}
          >
            {isLogin ? "Entrar" : "Cadastrar"}
          </button>

          {isLogin && (
            <p
              onClick={handleReset}
              style={{
                marginTop: "10px",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              Esqueci minha senha
            </p>
          )}

          <p style={{ marginTop: "20px", fontSize: "14px" }}>
            {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
            <span
              onClick={() => setIsLogin(!isLogin)}
              style={{
                color: "#f15f0a",
                fontWeight: "bold",
                cursor: "pointer",
                textDecoration: "underline",
                marginLeft: "5px",
              }}
            >
              {isLogin ? "Criar conta" : "Fazer login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}