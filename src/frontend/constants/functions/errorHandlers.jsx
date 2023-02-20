import errorMap from '../../../backend/security/errors/errorMap'
import Swal from 'sweetalert2'

export const errorHandler = err => {
	const error = errorMap[err.code]
	if (typeof error === 'function') {
		Swal.fire(error(err.email))
	} else {
		Swal.fire(error)
	}
}
