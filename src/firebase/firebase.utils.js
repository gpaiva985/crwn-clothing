import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyCwF_qjwEs4pOoOSNL-zIo3G_gmfwuVT64",
    authDomain: "crwn-db-f9d2a.firebaseapp.com",
    projectId: "crwn-db-f9d2a",
    storageBucket: "crwn-db-f9d2a.appspot.com",
    messagingSenderId: "980361997456",
    appId: "1:980361997456:web:81b6ce17efcfc17c2e3c15",
    measurementId: "G-Y3NHTXZP3M"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get()

    if (!snapShot.exists) {
      const {displayName, email} = userAuth;
      const createDate = new Date()

      try {
        await userRef.set({
          displayName,
          email,
          createDate,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message )
      }
    }

    return userRef;
    
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;