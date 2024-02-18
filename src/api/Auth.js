import React from 'react'
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    sendEmailVerification, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut 
} from "firebase/auth";
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBypyPnnYIlx3jERXkMj5Wc49zOr-Qxmi8",
    authDomain: "react-firebase-project-01.firebaseapp.com",
    projectId: "react-firebase-project-01",
    storageBucket: "react-firebase-project-01.appspot.com",
    messagingSenderId: "638173231828",
    appId: "1:638173231828:web:fd0b2993a853d81a195941"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export const signUp = (newAccount) => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, newAccount.email, newAccount.psw)
            .then(() => { resolve(true) })
            .catch(function (error) { reject(error) });
    })
}

export const SendEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
        .then(() => {
            console.log('sent')
        })
        .catch((error) => {
            console.log(auth.currentUser)
            console.log(error);
        });
}

export const authentificateUser = () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('User is signed in')
                console.log({ user })
                resolve(user)
            } else {
                console.log('No User is signed in')
                reject('No User is signed in')
            }
        })
    })
}

export const SignIn = (credentials) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, credentials.email, credentials.psw)
        .then((user) => {
            resolve(user)
        })
        .catch(function(error) {
            reject(error)
        })
    })
}

export const SignOut = () => {
    signOut(auth).then(() => {
        console.log('Sign-out successfully')
    }).catch((error) => {
        console.log('An error happened', error)
    })
}
