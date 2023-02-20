import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import * as Regex from '../../../../constants/regexs/regexs'
import { errorHandler } from '../../../../constants/functions/errorHandlers'
import { useAuthState } from '../../../../features/hooks/useAuthState/useAuthState'
import { Button, Input } from '../../../index/atoms/index'
import { UserAuth } from '../../../../../backend/security/authentication/context/authContext'

const Login = () => {
	const { email, setEmail, password, setPassword, error, setError, isLogin } =
		useAuthState()
	const { logIn, googleSignIn, facebookSignIn, user } = UserAuth()
	const navigate = useNavigate()

	const togglePassword = () => {
		const input = document.querySelector('#password')
		input.type === 'password'
			? (input.type = 'email')
			: (input.type = 'password')
	}

	const loginSubmit = async e => {
		e.preventDefault()
		setError('')
		try {
			if (!email || !password) {
				Swal.fire({
					title: '¡Atención!',
					icon: 'info',
					text: 'Ningún campo debe de estar vacio. Favor de verificarlos',
					showCancelButton: false,
					showConfirmButton: false,
					timer: 3000,
				})
			} else if (!email.match(Regex.Email)) {
				Swal.fire({
					title: '¡Atención!',
					icon: 'info',
					text: 'El formato del correo electrónico es incorrecto. Favor de verificarlo.',
					showCancelButton: false,
					showConfirmButton: false,
					timer: 3000,
				})
			} else {
				if (!isLogin) {
					await logIn(email, password)
					Swal.fire({
						icon: 'success',
						title: `¡Bienvenido: ${email}`,
						text: 'Aqui encontrará el CRUD que se pidió en los requerimientos',
						footer:
							'En caso de que se presente alguna falla, favor de comunicarlo al creador de este repositorio',
						showCancelButton: false,
						showConfirmButton: false,
						timer: 3000,
					})
					navigate('/Dashboard')
				}
			}
		} catch (err) {
			errorHandler(err)
			setError(err.message)
		}
	}

	useEffect(() => {
		if (user != null) {
			navigate('/')
		}
	}, [user])

	return (
		<>
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-sm-12 col-md-6 login-left'>
						<div className='row'>
							<div className='col-sm-12 col-md-12'>
								<h1>Keyence MX</h1>
								{error && (
									<div
										className='alert alert-warning alert-dismissible fade show d-none'
										role='alert'
									>
										<strong>{error}</strong>
										<button
											type='button'
											className='btn-close'
											data-bs-dismiss='alert'
											aria-label='Close'
										></button>
									</div>
								)}
								<form onSubmit={loginSubmit} id='login' noValidate>
									<div className='form-group pt-2'>
										<Input
											type='email'
											name='email'
											id='email'
											titleLabel='form-label label-inmersive-blue'
											label='Correo electronico'
											value={email}
											autoComplete='off'
											className='form-control'
											placeholder='Correo electronico'
											onChange={e => setEmail(e.target.value)}
											required
										/>
									</div>
									<div className='form-group pt-2'>
										<Input
											type='password'
											name='password'
											id='password'
											titleLabel='form-label label-inmersive-blue'
											label='Contraeña'
											value={password}
											autoComplete='off'
											className='form-control'
											placeholder='Contraseña'
											onChange={e => setPassword(e.target.value)}
											required
										/>
									</div>
									<div className='form-group pt-2'>
										<label>
											<input
												type='checkbox'
												className='form-check-input'
												onClick={togglePassword}
											/>
											Mostrar contraseña
										</label>
									</div>
									<div className='form-group pt-3'>
										<Link to='/RecoverPassword'>Recuperar contraseña</Link>
									</div>
									<div className='form-group pt-2'>
										<Button
											type='submit'
											text='Ingresar'
											id='Login'
											name='Login'
											value={isLogin ? 'Iniciar sesión' : 'Iniciar sesión'}
											className='btn btn-submit'
											disabled={!email || !password}
										/>
									</div>
								</form>
							</div>

							<div className='col-4 pt-2'>
								<hr className='rounded' />
							</div>
							<div className='col-4 pt-2'>
								<p>O ingresa con:</p>
							</div>
							<div className='col-4 pt-2'>
								<hr className='rounded' />
							</div>

							<div className='col-sm-12 col-md-6 pt-2'>
								<Button
									id='modal'
									text='Google'
									className='btn btn-google mt-2'
									type='button'
									onClick={googleSignIn}
								/>
							</div>
							<div className='col-sm-12 col-md-6 pt-2'>
								<Button
									id='modal'
									text='Facebook'
									className='btn btn-facebook mt-2'
									type='button'
									onClick={facebookSignIn}
								/>
							</div>
						</div>
					</div>
					<div className='col-sm-12 col-md-6 login-right'></div>
				</div>
			</div>
		</>
	)
}

export default Login
