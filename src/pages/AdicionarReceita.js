import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adicionarReceita } from '../api';
import styles from './AdicionarReceita.module.css'


function AdicionarReceita() {
  const [titulo, setTitulo] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const novaReceita = {
      titulo,
      ingredientes,
      modoPreparo,
    };
    adicionarReceita(novaReceita).then(() => {
      navigate('/');
    });
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Adicionar Nova Receita</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Ingredientes</label>
          <textarea
            value={ingredientes}
            onChange={(e) => setIngredientes(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Modo de Preparo</label>
          <textarea
            value={modoPreparo}
            onChange={(e) => setModoPreparo(e.target.value)}
          />
        </div>
        <button className={styles.button} type="submit">Adicionar Receita</button>
      </form>
    </div>
  );
}

export default AdicionarReceita;
