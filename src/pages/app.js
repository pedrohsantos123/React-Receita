import { useState, useEffect } from "react";
import { db, auth } from "./firebaseConnection";

import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [idPost, setIdPost] = useState("");

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [post, setPosts] = useState([]);

  const [usuario, setUsuario] = useState("");
  const [detalhesUsuario, setDetalhesUsuario] = useState({});

  useEffect(() => {
    async function carregarPosts() {
      const dados = onSnapshot(collection(db, "posts"), (snapshot) => {
        let listaPost = [];

        snapshot.forEach((doc) => {
          listaPost.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          });
        });
        setPosts(listaPost);
      });
    }
    carregarPosts();
  }, []);

  useEffect(()=>{
    async function verificarLogin(){
      onAuthStateChanged(auth , (user)=>{
        if(user){
          //se tem usuario logado entra aqui 
          setUsuario(true);
          setDetalhesUsuario({
            id: user.id,
            email: user.email,
          });
        } else {
            //nao possui nenhum usuario logado
            setUsuario(false);
            setDetalhesUsuario({});
        }
      });
    }
    verificarLogin();
}, []);

async function novoUsuario(){
  await createUserWithEmailAndPassword(auth, email, senha)
.then(
  ()=>{
    setEmail("");
    setSenha("");
  }
).catch((error)=>{
  if(error.code === 'auth/weak-password'){
    alert("Senha muito fraca.")
  } else if(error.code === 'auth/email-already-in-use'){
    alert("Email ja existe!")
  }
})

}

async function logarUsuario(){
  await signInWithEmailAndPassword(auth, email, senha)
  .then(
    (value)=>{
      setUsuario(true);
      setDetalhesUsuario({
        id: value.user.id,
        email: value.user.email,
      })
      setEmail("");
      setSenha("");
    }
  ).catch((error) => {
    console.log("ERRO" + error);
  })
}

async function fazerLogout(){
  await signOut(auth)
  setUsuario(false);
  setDetalhesUsuario({});
}

  async function adicionarPosts() {
    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        console.log("Cadastro realizado com sucesso");
        setAutor("");
        setTitulo("");
      })
      .catch((error) => {
        console.log("ERRO" + error);
      });
  }
  async function buscarPost() {
    const dados = collection(db, "posts");

    await getDocs(dados)
      .then((snapshot) => {
        let listaPost = [];

        snapshot.forEach((doc) => {
          listaPost.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          });
        });
        setPosts(listaPost);
      })
      .catch((error) => {
        console.log("Erro:" + error);
      });
  }

  async function editarPost() {
    const postEditado = doc(db, "posts", idPost);

    await updateDoc(postEditado, {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        console.log("Post editado com sucesso!");
        setIdPost("");
        setTitulo("");
        setAutor("");
      })
      .catch((error) => {
        console.log("Error:" + error);
      });
  }

  async function excluirPost(id) {
    const postExcluido = doc(id, "posts", id);

    await deleteDoc(postExcluido)
      .then(() => {
        alert("Post exluido com sucesso!!");
      })
      .catch((error) => {
        console.log("Error" + error);
      });
  }
  return (
    <div>
      <h1>React JS + Firebase</h1>

      <h2>Usuarios</h2>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Insira um email"
      />
      <br />

      <label>Senha:</label>
      <input
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Insira uma senha"
      />
      <br />

      <button onClick={novoUsuario}>Cadastrar</button> 
      <button onClick={logarUsuario}>login</button> 

      <hr></hr>
      <h2>POSTS</h2>
      <label>ID do Post:</label>
      <input
        placeholder="ID do Post"
        value={idPost}
        onChange={(e) => setIdPost(e.target.value)}
      />
      <br />

      <label>Título:</label>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título"
      />
      <br />

      <label>Autor:</label>
      <input
        type="text"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        placeholder="Autor"
      />
      <br />

      <button onClick={adicionarPost}>Adicionar</button>
      <button onClick={buscarPost}>Buscar</button>
      <button onClick={editarPost}>Editar</button>

      <ul>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <strong>ID: {post.id}</strong>
              <br />
              <strong>Título: {post.titulo}</strong>
              <br />
              <strong>Autor: {post.autor}</strong>
              <br />
              <button onClick={() => excluirPost(post.id)}>Excluir</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;