import firebase from '../FirebaseConnection';

export const getRankingList = objeto => {
  return dispatch => {
    firebase
      .database()
      .ref('Clientes')
      .orderByChild('pizzas')
      .on('value', snapshot => {
        let clientes = [];

        snapshot.forEach(childItem => {
          clientes.push({
            key: childItem.key,
            nome: childItem.val().nome,
            pizzas: childItem.val().pizzas,
          });
        });

        clientes.sort((a, b) => a.pizzas < b.pizzas);

        dispatch({
          type: 'setRankingList',
          payload: {
            clientes,
          },
        });
      });
  };
};
