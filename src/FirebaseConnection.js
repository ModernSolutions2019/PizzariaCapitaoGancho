import firebase from 'firebase';

let firebaseConfig = {
  apiKey: 'AIzaSyA19LSX7HRIYQa32j-tTEBGLf8XWyU-DUc',
  authDomain: 'pizzaria-capitao-gancho.firebaseapp.com',
  databaseURL: 'https://pizzaria-capitao-gancho.firebaseio.com',
  projectId: 'pizzaria-capitao-gancho',
  storageBucket: '',
  messagingSenderId: '402544295280',
  appId: '1:402544295280:web:7d0033aca5208125faa3b5',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
