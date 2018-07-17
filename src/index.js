import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

 // Initialize Firebase
 const config = {
    apiKey: "AIzaSyBjhpKwpAR3zQM7hzC2NX2oSrmO5nXHZcU",
    authDomain: "comments-test-task.firebaseapp.com",
    databaseURL: "https://comments-test-task.firebaseio.com",
    projectId: "comments-test-task",
    storageBucket: "comments-test-task.appspot.com",
    messagingSenderId: "383524867559"
  };
  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

