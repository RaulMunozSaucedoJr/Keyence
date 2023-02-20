import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import * as Regex from '../../constants/regexs/regexs'
import { errorHandler } from '../functions/errorHandlers'
import { useAuthState } from '../../features/hooks/useAuthState/useAuthState'
import { UserAuth } from '../../../backend/security/authentication/context/authContext'
const { email, password, setError, isLogin } = useAuthState()
const { logIn } = UserAuth()
const navigate = useNavigate()

export const loginSubmit = async e => {
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
				timer: 7000,
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
