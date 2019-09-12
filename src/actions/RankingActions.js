import firebase from '../FirebaseConnection';

export const getRankingList = () => {
  return dispatch => {
    firebase
      .database()
      .ref('clientes')
      .orderByChild('pizzas')
      .on('value', snapshot => {
        let clientes = [];

        snapshot.forEach(childItem => {
          clientes.push({
            key: childItem.key,
            nome: childItem.val().nome,
            pizzas: childItem.val().pizzas,
          });

          clientes.sort((a, b) => a.pizzas < b.pizzas);
        });

        firebase
          .database()
          .ref('ranking')
          .set(clientes);

        dispatch({
          type: 'setRankingList',
          payload: {
            clientes,
          },
        });
      });
  };
};

export const getPosition = uid => {
  return dispatch => {
    firebase
      .database()
      .ref('ranking')
      .orderByValue()
      .on('value', snapshot => {
        let position;
        snapshot.forEach(childItem => {
          if (childItem.val().key == uid) {
            position = parseInt(childItem.key) + 1;
          }
        });

        dispatch({
          type: 'setPosition',
          payload: {
            position: position + 'º lugar',
          },
        });
      });
  };
};
