import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDoLUKtLpd8_BjxH5udixw3QhYawLqODoI",
  authDomain: "netflix-clone-fb1eb.firebaseapp.com",
  projectId: "netflix-clone-fb1eb",
  storageBucket: "netflix-clone-fb1eb.appspot.com",
  messagingSenderId: "109804153898",
  appId: "1:109804153898:web:bb0e5297e77d0a7b682753"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, 'user'),{
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        })
    } catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const login = async (email, password)=>{
    try{
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};