import { Navigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { UserAuth } from '../authentication/context/authContext'

/**
 * If the user is not logged in, redirect to the home page. Otherwise, render the children
 * @returns The children of the component.
 */
const Protected = ({ children }) => {
	const { user } = UserAuth()
	if (!user) {
		Swal.fire({
			title: 'Info',
			icon: 'info',
			text: 'Para poder ingresar al dashboard es necesario iniciar sesión.',
			showCancelButton: false,
			showConfirmButton: false,
			timer: 3000,
		})
		return <Navigate to='/' />
	}
	return children
}

export default Protected
