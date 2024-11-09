import { auth } from "./firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";

export const Login = async (email, password) => { 
    return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword( auth,email, password );
};

export const doSignInWithGoogle = async () => {
    const auth = getAuth(); // assuming auth is initialized here
    const provider = new GoogleAuthProvider();
    
    try {
        const result = await signInWithPopup(auth, provider);
        return result;
    } catch (error) {
        console.error("Error signing in with Google:", error);
        throw error;  // Optional: You may choose to handle or throw the error.
    }
};

export const doSignOut = () => {
    return auth.signOut( auth );
};

