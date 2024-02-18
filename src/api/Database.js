import { initializeApp } from 'firebase/app';
import "firebase/firestore"
import { addDoc, collection, doc, setDoc, getFirestore, getDocs, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBypyPnnYIlx3jERXkMj5Wc49zOr-Qxmi8",
    authDomain: "react-firebase-project-01.firebaseapp.com",
    projectId: "react-firebase-project-01",
    storageBucket: "react-firebase-project-01.appspot.com",
    messagingSenderId: "638173231828",
    appId: "1:638173231828:web:fd0b2993a853d81a195941"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const collections = {
    favorites: "favorites"
}
//read
export async function read() {
    return new Promise((onSuccess, OnFail) => {
        const querySnapshot = getDocs(collection(db, collections.favorites))
            .then(querySnapshot => {
                onSuccess(querySnapshot)
            })
            .catch(err => OnFail(err))
    })
}

//write
export async function write(item) {
    try {
        item.isFavorite = true;
        // Add a new document with a generated id
        const newDoc = doc(collection(db, collections.favorites));
        await setDoc(newDoc, item);
        console.log("Document written successfully");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

//delete
export async function remove(item) {
    try {
        await deleteDoc(doc(db, collections.favorites, item.imdb));
        console.log("Document deleted successfully");
    } catch (e) {
        console.error("Error deleting document: ", e);
    }   
}
