/*
 * * An object where we controlled all of the posible errors from firebase backend
 */
const errorMap = {
	'auth/internal-error': {
		title: 'Error',
		icon: 'error',
		text: 'Ha ocurrido un error en el servidor. \n Favor de comunicarlo al personal de TI mediante correo electrónico.',
		showCancelButton: false,
		showConfirmButton: false,
		timer: 3000,
	},
	'auth/email-already-in-use': {
		title: 'Error',
		icon: 'error',
		text: `El correo que intenta registrar ya se encuentra en uso. \n Registre uno nuevo ó reestablezca su contraseña.`,
		showCancelButton: false,
		showConfirmButton: false,
		timer: 3000,
	},
	'auth/invalid-email': {
		title: '¡Atención!',
		icon: 'warning',
		text: 'La contraseña y/o email son incorrectos. Favor de verificarlo',
		showCancelButton: false,
		showConfirmButton: false,
		timer: 3000,
	},
	'auth/user-disabled': {
		title: '¡Atención!',
		icon: 'info',
		text: `El correo: El correo con el que intenta ingresar se encuentra inactivo por el momento. \n Favor de contactar al servicio de ayuda para habilitar nuevamente su usuario`,
		showCancelButton: false,
		showConfirmButton: false,
		timer: 3000,
	},
	'auth/user-not-found': {
		title: '¡Atención!',
		icon: 'warning',
		text: `El correo electrónico con el que intenta ingresar NO se encuentra registrado. Favor de dirigirse a la sección de registro.`,
		showCancelButton: false,
		showConfirmButton: false,
		timer: 3000,
	},
	'auth/wrong-password': {
		title: '¡Atención!',
		icon: 'warning',
		text: 'Correo electrónico y/o contraseña incorrecto(s). Favor de verificar sus credenciales.',
		showCancelButton: false,
		showConfirmButton: false,
		timer: 3000,
	},
	'auth/weak-password': {
		title: '¡Atención!',
		icon: 'warning',
		text: 'El formato de la contraseña deberá de tener: Mayúsculas, minúsculas, números y carácteres especiales con una longitud de 6. Favor de verificarlo',
		showCancelButton: false,
		showConfirmButton: false,
		timer: 3000,
	},
}

export default errorMap
