import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Button, Input } from '../../../index/atoms/index'
import * as PublicRouting from '../../../../features/routes/public/PublicRoutes'
import * as Regex from '../../../../constants/regexs/regexs'
import { useForm } from '../../../../features/hooks/useForm/useForm'
import errorMap from '../../../../../backend/security/errors/errorMap'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

const initialForm = {
	email: '',
}
const RecoverPassword = () => {
	const { form, errors, handleChange, handleBlur, handleSubmit } =
		useForm(initialForm)
	const errorHandler = err => {
		const error = errorMap[err.code]
		if (typeof error === 'function') {
			Swal.fire(error(err.email))
		} else {
			Swal.fire(error)
		}
	}
	const auth = getAuth()
	const triggerResetEmail = async () => {
		try {
			if (!form.email) {
				Swal.fire({
					title: '¡Atención!',
					icon: 'info',
					text: 'Este campo NO debe de estar vacio. \n Favor de verificarlo',
					showCancelButton: false,
					showConfirmButton: false,
					timer: 3000,
				})
			} else if (!form.email.match(Regex.Email)) {
				Swal.fire({
					title: '¡Atención!',
					icon: 'info',
					text: 'El formato del correo electrónico es incorrecto. Favor de verificarlo.',
					showCancelButton: false,
					showConfirmButton: false,
					timer: 3000,
				})
			} else {
				console.log(form.email)
				await sendPasswordResetEmail(auth, form.email)
				Swal.fire({
					title: '¡Éxito!',
					icon: 'success',
					text: `Se ha enviado el link para recuperación de contraseña al siguiente correo: ${form.email}`,
					showCancelButton: false,
					showConfirmButton: false,
					timer: 5000,
				})
				console.clear()
			}
		} catch (err) {
			errorHandler(err)
		}
	}
	return (
		<>
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-sm-12 col-md-6 recover-left center'>
						<h1>Recuperar contraseña</h1>
						<Link to={PublicRouting.Login}>
							<Button
								className='btn btn-open'
								type='button'
								text='Volver al inicio'
							/>
						</Link>
					</div>
					<div className='col-sm-12 col-md-6 recover-right'>
						<div className='row'>
							<div className='col-12 recover-right-1'></div>
							<div className='col-12 recover-right-2'>
								<form onSubmit={handleSubmit}>
									<div className='form-group'>
										<Input
											type='email'
											name='email'
											titleLabel='form-label label-inmersive-blue'
											label='Correo electronico'
											value={form.email}
											autoComplete='off'
											className='form-control'
											placeholder='Correo electronico'
											onChange={handleChange}
											onBlur={handleBlur}
											required
										/>
										<div className='form-group pt-2'>
											{errors.email && <small>{errors.email}</small>}
										</div>
										<button
											className='btn btn-submit mt-4'
											type='submit'
											onClick={triggerResetEmail}
											value='Enviar'
										>
											Restaurar contrraseña
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default RecoverPassword
