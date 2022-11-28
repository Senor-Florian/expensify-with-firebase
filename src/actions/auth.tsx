import { auth, googleAuthProvider } from '../firebase/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

// todo check if google has other library for auth

export const login = (uid = '', displayName : string = '') => ({
    type: 'LOGIN',
    uid,
    displayName
});

export const startLogin = () => {
    return () => {
        return signInWithPopup(auth, googleAuthProvider);
    };
};

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return () => {
        return signOut(auth);
    };
};