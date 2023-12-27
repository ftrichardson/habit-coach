import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

import axios from 'axios';

const firebaseConfig = {
  apiKey: 'AIzaSyDvF7wppiAj-oahVcEZtvDh6FKAbSO2VJs',
  authDomain: 'habit-coach-c042e.firebaseapp.com',
  projectId: 'habit-coach-c042e',
  storageBucket: 'habit-coach-c042e.appspot.com',
  messagingSenderId: '653640981754',
  appId: '1:653640981754:web:7058abdf92d2c4caacbd43',
  measurementId: 'G-PKEZMGB3YH'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const BASE_URL = 'https://habit-coach.onrender.com';

const logIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return [true, ''];
  } catch (err) {
    return [false, err.message];
  }
};

const register = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      username,
      authProvider: 'local',
      email,
    });
    await axios.post(`${BASE_URL}/api/users`, {
      userName: username,
      email: email,
    });
    return [true, ''];
  } catch (err) {
    return [false, err.message];
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, logIn, register, logout };