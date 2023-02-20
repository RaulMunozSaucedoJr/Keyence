/* Importing the initializeApp function from the firebase/app module. */
import { initializeApp } from 'firebase/app'
/* Importing the getAuth function from the firebase/auth module. */
import { getAuth } from 'firebase/auth'
/* Importing the getFirestore function from the firebase/firestore module. */
import { getFirestore } from 'firebase/firestore'
/* Importing the getStorage function from the firebase/storage module. */
import { getStorage } from 'firebase/storage'
/* The configuration for the firebase app. */
const firebaseConfig = {
	apiKey: 'AIzaSyC-6y4cYuYkUPBTiBcx_OGC0pxScReBgac',
	authDomain: 'vanityclothing-7725b.firebaseapp.com',
	projectId: 'vanityclothing-7725b',
	storageBucket: 'vanityclothing-7725b.appspot.com',
	messagingSenderId: '682455627966',
	appId: '1:682455627966:web:55f466197c045ed05e06ef',
}
/* Initializing the firebase app with the configuration and exporting the auth, db, and storage
modules. */
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const db = getFirestore(app)
export const auth = getAuth(app)
export default app
