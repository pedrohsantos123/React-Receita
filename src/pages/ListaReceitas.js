import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReceitas } from "../api";
import styles from "./ListaReceitas.module.css";

function ListaReceitas() {
  const [receitas, setReceitas] = useState([]);

  useEffect(() => {
    getReceitas().then((data) => setReceitas(data));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Receitas</h1>
        <Link to="/adicionar" className={styles.addLink}>
          Adicionar Nova Receita
        </Link>
      </div>
      <ul className={styles.list}>
        {receitas.map((receita) => (
          <li key={receita.id} className={styles.listItem}>
            <Link to={`/receita/${receita.id}`} className={styles.link}>
              {receita.titulo}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaReceitas;
