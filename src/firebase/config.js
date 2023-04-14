import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDwqCfQohUbH3Iu9XXIATMMKHFNZcimVxY',
  authDomain: 'dojo-management-b097c.firebaseapp.com',
  projectId: 'dojo-management-b097c',
  storageBucket: 'dojo-management-b097c.appspot.com',
  messagingSenderId: '465047921348',
  appId: '1:465047921348:web:37f5fa208e6b6e2730df91',
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

const timestamp = firebase.firestore.Timestamp;

export { firestore, auth, storage, timestamp };
