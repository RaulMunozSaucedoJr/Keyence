import { useContext, createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import CryptoJS from 'crypto-js'
import {
	getAuth,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	onAuthStateChanged,
	GoogleAuthProvider,
	FacebookAuthProvider,
	signOut,
} from 'firebase/auth'
import {
	getFirestore,
	query,
	getDocs,
	collection,
	where,
	addDoc,
	serverTimestamp,
} from 'firebase/firestore'

import app from '../../../firebase/firebase'
const auth = getAuth(app)
const db = getFirestore(app)

const AuthContext = createContext()

const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({})
	const navigate = useNavigate()

	const logIn = (email, password, timestamp) => {
		return signInWithEmailAndPassword(auth, email, password, timestamp)
	}

	const signUp = async (email, password, timestamp) => {
		const encryptedPassword = CryptoJS.SHA256(password).toString()
		return createUserWithEmailAndPassword(
			auth,
			email,
			encryptedPassword,
			timestamp
		)
	}

	const logOut = () => {
		signOut(auth)
	}

	const googleSignIn = async () => {
		try {
			const res = await signInWithPopup(auth, googleProvider)
			const user = res.user
			const q = query(collection(db, 'users'), where('uid', '==', user.uid))
			const docs = await getDocs(q)
			if (docs.docs.length === 0) {
				await addDoc(collection(db, 'users'), {
					uid: user.uid,
					name: user.displayName,
					authProvider: 'Google',
					email: user.email,
					rol: 'user',
					timestamp: serverTimestamp(),
					photoURL: user.photoURL,
				})
				setTimeout(() => {
					Swal.fire({
						icon: 'success',
						title: '¡Bienvenido!',
						text: `Hola ${user.displayName}, bienvenido a la plataforma`,
						showCancelButton: false,
						showConfirmButton: false,
						timer: 2500,
					})
				}, 300)
				navigate('/Dashboard')
			} else {
				Swal.fire({
					icon: 'success',
					title: '¡Bienvenido!',
					text: `Hola ${user.displayName}, un gusto tenerte de nuevo en la plataforma.`,
					showCancelButton: false,
					showConfirmButton: false,
					timer: 3500,
				})
				navigate('/Dashboard')
			}
		} catch (err) {
			console.error(err)
			Swal.fire({
				title: '¡Atención!',
				icon: 'info',
				text: `Se ha generado el siguiente error ${err.message}. Por lo que NO se podrá ingresar con su cuenta de Google. \n Favor de comunicar este error al equipo de TI.`,
				showCancelButton: false,
				showConfirmButton: false,
				timer: 3500,
			})
		}
	}

	const facebookSignIn = async () => {
		try {
			const res = await signInWithPopup(auth, facebookProvider)
			const user = res.user
			const q = query(collection(db, 'users'), where('uid', '==', user.uid))
			const docs = await getDocs(q)
			if (docs.docs.length === 0) {
				await addDoc(collection(db, 'users'), {
					uid: user.uid,
					name: user.displayName,
					authProvider: 'Facebook',
					email: user.email,
					rol: 'user',
					timestamp: serverTimestamp(),
					photoURL: user.photoURL,
				})
				setTimeout(() => {
					Swal.fire({
						icon: 'success',
						title: '¡Bienvenido!',
						text: `Hola ${user.displayName}, bienvenido a la plataforma`,
						showCancelButton: false,
						showConfirmButton: false,
						timer: 2500,
					})
				}, 300)
				navigate('/Dashboard')
			} else {
				Swal.fire({
					icon: 'success',
					title: '¡Bienvenido!',
					text: `Hola ${user.displayName}, un gusto tenerte de nuevo en la plataforma.`,
					showCancelButton: false,
					showConfirmButton: false,
					timer: 2500,
				})
				navigate('/Dashboard')
			}
		} catch (err) {
			Swal.fire({
				title: '¡Atención!',
				icon: 'info',
				text: `Se ha generado el siguiente error ${err.message}. Por lo que NO se podrá ingresar con su cuenta de Facebook. \n Favor de comunicar este error al equipo de TI.`,
				showCancelButton: false,
				showConfirmButton: false,
				timer: 3500,
			})
		}
	}

	const passwordReset = async email => {
		try {
			await sendPasswordResetEmail(auth, email)
			Swal.fire({
				icon: 'success',
				title: '¡Éxito!',
				text: `Se ha enviado el link para reestablecer la contraseña al siguiente correo ${email}.\n Favor de vericiar su correo basura y/o no deseado.`,
				showCancelButton: false,
				showConfirmButton: false,
				timer: 3000,
			})
		} catch (err) {
			Swal.fire({
				icon: 'error',
				title: '¡Atención!',
				text: `No se ha podido enviar el link para reestablcer la contraseña. \n Favor de comunicar el siguiente error ${err.message} al equipo de TI.`,
				showCancelButton: false,
				showConfirmButton: false,
				timer: 3000,
			})
		}
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			setUser(currentUser)
		})
		return () => {
			unsubscribe()
		}
	}, [])

	return (
		<AuthContext.Provider
			value={{
				signUp,
				logIn,
				logOut,
				passwordReset,
				googleSignIn,
				facebookSignIn,
				user,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const UserAuth = () => {
	return useContext(AuthContext)
}
