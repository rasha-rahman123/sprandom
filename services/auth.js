import React, { createContext, useContext, useEffect, useState } from 'react'
import {NextPage} from 'next'
import initFirebase from './firebase'
import firebase from 'firebase/app'

initFirebase();

export const authContext = createContext();


export function ProvideAuth({children}) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>    
}

export const useAuth = () => {
    return useContext(authContext)
};

export function useProvideAuth() {
    const [user,setUser] = useState();

    const signin = (email,password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
                .then(res => {
                    setUser(res.user);
                    return res.user;
                });
    };

    const signup = (email,password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(res => {
                    setUser(res.user);
                    return res.user;
                });
    };

    const signout = () => {
        return firebase.auth().signOut().then(() => {
            setUser(false)
        })
    };


    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(false)
            }
        });
    },[]);

    return {
        userID: user && user.uid,
        signin,
        signup,
        signout
    };

}

