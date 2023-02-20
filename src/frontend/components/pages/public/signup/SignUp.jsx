import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Button } from '../../../index/atoms/index'
import * as PublicRouting from '../../../../features/routes/public/PublicRoutes'
import * as Regex from '../../../../constants/regexs/regexs'
import errorMap from '../../../../../backend/security/errors/errorMap'
import { useSignUpState } from '../../../../features/hooks/useSignUpState/useSignUpState'
import { UserAuth } from '../../../../../backend/security/authentication/context/authContext'
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore'
import app from '../../../../../backend/firebase/firebase'

const SignUp = () => {
	const {
		email,
		setEmail,
		password,
		setPassword,
		repeatpassword,
		setRepeatPassword,
		// eslint-disable-next-line no-unused-vars
		error,
		setError,
	} = useSignUpState()
	const { signUp } = UserAuth()
	const navigate = useNavigate()
	const firestore = getFirestore(app)

	const errorHandler = err => {
		const error = errorMap[err.code]
		if (typeof error === 'function') {
			Swal.fire(error(err.email))
		} else {
			Swal.fire(error)
		}
	}

	const handleSubmitRegister = async e => {
		e.preventDefault()
		setError('')
		try {
			if (!email || !password || !repeatpassword) {
				Swal.fire({
					title: '¡Atención!',
					icon: 'info',
					text: 'Ningún campo debe de estar vacio. Favor de verificarlos',
					showCancelButton: false,
					showConfirmButton: false,
					timer: 5000,
				})
			} else if (!email.match(Regex.Email)) {
				Swal.fire({
					title: '¡Atención!',
					icon: 'info',
					text: 'El formato del correo electrónico  es invalido. Favor de verificarlo..',
					showCancelButton: false,
					showConfirmButton: false,
					timer: 3000,
				})
			} else if (
				!password.match(Regex.Password) ||
				!repeatpassword.match(Regex.Password)
			) {
				Swal.fire({
					title: '¡Atención!',
					icon: 'info',
					text: 'La contraseña deberá de tener: \n Mayúsculas, minúsculas, números y carácteres especiales con una longitud minima de 8. Favor de verificarlos',
					showCancelButton: false,
					showConfirmButton: false,
					timer: 3000,
				})
			} else if (password !== repeatpassword) {
				Swal.fire({
					title: '¡Atención!',
					icon: 'info',
					text: 'Ambas contraseñas deben de coincidir. Favor de verificarlo',
					showCancelButton: false,
					showConfirmButton: false,
					timer: 3000,
				})
			} else {
				const infoUsuario = await signUp(email, password, repeatpassword)
				const docuRef = doc(firestore, `users/${infoUsuario.user.uid}`)
				setDoc(docuRef, {
					uid: infoUsuario.user.uid,
					correo: email,
					password,
					repeatpassword,
					timestamp: serverTimestamp(),
				})
				Swal.fire({
					title: 'Éxito',
					icon: 'success',
					text: `Bienvenido: ${email}. Aqui encontrara el CRUD que se especifico en los requerimientos`,
					showCancelButton: false,
					showConfirmButton: false,
					timer: 3000,
				})
				navigate('/Dashboard')
			}
		} catch (err) {
			errorHandler(err)
			setError(err.message)
		}
		console.clear()
	}

	const togglePassword = () => {
		const inputType = document.querySelector('#password')
		inputType.type === 'password'
			? (inputType.type = 'text')
			: (inputType.type = 'password')
	}

	return (
		<>
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-sm-12 col-md-6 register-left center'>
						<h1>Registro</h1>
						<Link to={PublicRouting.Login}>
							<Button
								type='button'
								text='Regresar al inicio'
								className='btn btn-open'
							/>
						</Link>
					</div>
					<div className='col-sm-12 col-md-6 register-right'></div>
					<div className='col-12 register-bottom'>
						<form onSubmit={handleSubmitRegister}>
							<div className='form-group pt-1'>
								<label
									htmlFor='email'
									className='form-label label-inmersive-blue'
								>
									Correo electrónico
								</label>
								<input
									className='form-control'
									type='text'
									inputMode='email'
									name='email'
									id='email'
									placeholder='Correo electrónico'
									onChange={e => setEmail(e.target.value)}
								/>
							</div>
							<div className='form-group pt-1'>
								<label
									htmlFor='password'
									className='form-label label-inmersive-blue'
								>
									Contraseña
								</label>
								<input
									className='form-control'
									type='password'
									inputMode='text'
									name='password'
									id='password'
									placeholder='Contraseña'
									autoComplete='off'
									onChange={e => setPassword(e.target.value)}
								/>
							</div>
							<div className='form-group pt-1'>
								<label
									htmlFor='repeatpassword'
									className='form-label label-inmersive-blue'
								>
									Repetir Contraseña
								</label>
								<input
									className='form-control'
									type='password'
									inputMode='text'
									name='repeatpassword'
									id='repeatpassword'
									placeholder='Repetir contraseña'
									autoComplete='off'
									onChange={e => setRepeatPassword(e.target.value)}
								/>
							</div>
							<div className='form-group pt-3'>
								<label>
									<input
										type='checkbox'
										className='form-check-input'
										onClick={togglePassword}
									/>
									Mostrar contraseña
								</label>
							</div>
							<Button
								id='submit'
								name='submit'
								text='Registrarse'
								className='btn btn-submit mt-2'
								type='submit'
								disabled={!email || !password || !repeatpassword}
							/>
						</form>
						<div className='form-group pt-3'>
							<Link to='/Login'>
								¿Ya tiene una cuenta con nosotros? Inicie sesión aquí.
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default SignUp
