import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

export const firebaseConfig = {
    apiKey: "AIzaSyCmVfdP2afXuFx8lux7VGfxyI8jxM7UYX4",
    authDomain: "racoongo.firebaseapp.com",
    projectId: "racoongo",
    storageBucket: "racoongo.appspot.com",
    messagingSenderId: "498418850159",
    appId: "1:498418850159:web:0f5ec85ca154ba163d709a",
    measurementId: "G-CKR90DQ6VD"
};



export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
