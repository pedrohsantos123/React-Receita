import receitas from './receitas.json';

export function getReceitas() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(receitas);
    }, 500); 
  });
}

export function getReceitaById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const receita = receitas.find((r) => r.id === parseInt(id));
      resolve(receita);
    }, 500);
  });
}

export function adicionarReceita(novaReceita) {
  return new Promise((resolve) => {
    setTimeout(() => {
      receitas.push({ ...novaReceita, id: receitas.length + 1 });
      resolve(novaReceita);
    }, 500);
  });
}
