import firebase from 'firebase';
import apiKey from './apiKey.js';

var config = {
  apiKey: apiKey,
  authDomain: "aquabot-7025f.firebaseapp.com",
  databaseURL: "https://aquabot-7025f.firebaseio.com",
  projectId: "aquabot-7025f",
  storageBucket: "aquabot-7025f.appspot.com",
  messagingSenderId: "175900022778"
};
var fire = firebase.initializeApp(config);

export default fire;
