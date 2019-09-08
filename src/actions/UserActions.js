import firebase from '../FirebaseConnection';

export const getNome = () => {
  return dispatch => {
    let uid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref('Clientes')
      .child(uid)
      .once('value', snapshot => {
        let nome = snapshot.val().nome;
        dispatch({
          type: 'getNome',
          payload: {
            nome,
          },
        });
      });
  };
};

export const editPizzas = pizzas => {
  return dispatch => {
    firebase
      .database()
      .ref('Clientes')
      .child(firebase.auth().currentUser.uid)
      .child('pizzas')
      .on('value', snapshot => {
        pizza = snapshot.val();
        dispatch({
          type: 'editPizzas',
          payload: {
            pizzas: pizza,
          },
        });
      });
  };
};

export const adicionarPizza = (uid, pizzas) => {
  return dispatch => {
    firebase
      .database()
      .ref('Clientes')
      .child(uid)
      .child('pizzas')
      .once('value', snapshot => {
        let pizzas = snapshot.val() + 1;
        firebase
          .database()
          .ref('Clientes')
          .child(uid)
          .update({pizzas});
        dispatch({
          type: 'editPizzas',
          payload: {
            pizzas,
          },
        });
      });
  };
};
