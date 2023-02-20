import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Button from '../../../atoms/button/button'
import * as PublicRouting from '../../../../features/routes/public/PublicRoutes'
import { UserAuth } from '../../../../../backend/security/authentication/context/authContext'

const Mobile = () => {
	const { logOut, user } = UserAuth()
	const navigate = useNavigate()
	const handleLogout = async () => {
		try {
			await logOut()
			Swal.fire({
				icon: 'success',
				title: 'Sesión cerrada',
				text: 'La sesión se ha cerrado correctamente',
				showCancelButton: false,
				showConfirmButton: false,
				timer: 3000,
			})
			navigate('/')
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'La sesión NO se ha podido cerrado correctamente. Contacte al equipo de ayuda en la barra lateral de contacto.',
				showCancelButton: false,
				showConfirmButton: false,
				timer: 3000,
			})
			console.log(error.message)
		}
	}

	return (
		<>
			<div className='container-fluid fixed-bottom' id='mobile-nav'>
				<div className='row'>
					<div className='col-12'>
						{user ? (
							<Link to={PublicRouting.Login}>
								<Button
									type='button'
									text='Salir'
									className='btn btn-open mt-4'
									onClick={handleLogout}
								/>
							</Link>
						) : (
							<Link to={PublicRouting.SignUp}>
								<Button
									type='button'
									text='Registrate'
									className='btn btn-open mt-4'
								/>
							</Link>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default Mobile
