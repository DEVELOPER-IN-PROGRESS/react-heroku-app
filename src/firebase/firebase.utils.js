import  firebase from 'firebase/app' ;
import 'firebase/firestore';
import 'firebase/auth';

const  config = {
    apiKey: "AIzaSyADUI6SK84tdG-xbxMy0B7u2VLrAqZtiko",
    authDomain: "react-ecom-97d1a.firebaseapp.com",
    projectId: "react-ecom-97d1a",
    storageBucket: "react-ecom-97d1a.appspot.com",
    messagingSenderId: "108330158488",
    appId: "1:108330158488:web:5e709888c6e4a4627f83ed",
    measurementId: "G-3YDVWDNKKL"
  };

export const createUserProfileDocument = async (userAuth , additionalData) => {
 if(!userAuth) return ; 
 
 const userRef = firestore.doc(`users/${userAuth.uid}`) ; 

 const snapShot = await userRef.get() ;

 if(!snapShot.exits){
   const { displayName , email } = userAuth  ; 
   const createdAt = new Date(); 

    try {
      await userRef.set({
        displayName , 
        email  , 
        createdAt , 
        ...additionalData , 
      })


    }
    catch(error) {
 console.log('error creating user' , error.message)
    }
 }

 return userRef ; 
 //console.log(snapShot) ; 
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'}) ;

export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase ; 

