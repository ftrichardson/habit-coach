import { initializeApp } from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';
import * as firebaseFirestore from 'firebase/firestore';
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
const auth = firebaseAuth.getAuth(app);
const db = firebaseFirestore.getFirestore(app);

const BASE_URL = 'https://habit-coach.onrender.com';

const logIn = async (email, password) => {
  try {
    await firebaseAuth.signInWithEmailAndPassword(auth, email, password);
    return [true, ''];
  } catch (err) {
    return [false, err.message];
  }
};

const register = async (username, email, password) => {
  try {
    const { user } = await firebaseAuth.createUserWithEmailAndPassword(auth, email, password);
    await firebaseFirestore.addDoc(firebaseFirestore.collection(db, 'users'), {
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
  firebaseAuth.signOut(auth);
};

export { auth, db, logIn, register, logout };