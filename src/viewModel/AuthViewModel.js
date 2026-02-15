import { useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { UserModel } from '../model/UserModel';

/**
 * Gestisce lo stato dell'autenticazione, monitorando se l'utente è collegato e fornendo
 * i metodi per login, logout e registrazione
 */

export function AuthViewModel() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //Monitora in tempo reale i cambiamenti dello stato di autenticazione per aggiornare l'interfaccia
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(UserModel.fromFirebase(currentUser));
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return { 
        user, 
        setUser,
        loading,
        //Effettua l'accesso dell'utente utilizzando le credenziali Firebase 
        login: (e, p) => signInWithEmailAndPassword(auth, e, p),
        //Termina la sessione corrente dell'utente
        logout: () => signOut(auth),
        //Registra un nuovo account utente sulla piattaforma Firebase
        signUp: (e, p) => createUserWithEmailAndPassword(auth, e, p)
    };
}