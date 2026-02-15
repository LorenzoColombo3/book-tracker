import { useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { UserModel } from '../model/UserModel';

export function AuthViewModel() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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
        login: (e, p) => signInWithEmailAndPassword(auth, e, p),
        logout: () => signOut(auth),
        signUp: (e, p) => createUserWithEmailAndPassword(auth, e, p)
    };
}