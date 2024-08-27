import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReceitaById } from '../api';
import styles from './DetalhesReceita.module.css';

function DetalhesReceita() {
  const { id } = useParams();
  const [receita, setReceita] = useState(null);

  useEffect(() => {
    getReceitaById(id).then((data) => setReceita(data));
  }, [id]);

  if (!receita) return <div className={styles.loading}>Carregando...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{receita.titulo}</h1>
      <h3 className={styles.subTitle}>Ingredientes:</h3>
      <p className={styles.text}>{receita.ingredientes}</p>
      <h3 className={styles.subTitle}>Modo de Preparo:</h3>
      <p className={styles.text}>{receita.modoPreparo}</p>
    </div>
  );
}

export default DetalhesReceita;
