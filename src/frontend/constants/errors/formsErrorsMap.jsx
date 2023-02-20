import { useSignUpState } from '../../features/hooks/useSignUpState/useSignUpState'
import * as Regex from '../regexs/regexs'

const {
	email,
	password,
	repeatpassword,
	// eslint-disable-next-line no-unused-vars
	error,
} = useSignUpState()

const validations = [
	{
		condition: !email || !password || !repeatpassword,
		message: 'Ningún campo debe de estar vacio. Favor de verificarlos',
		timer: 5000,
	},
	{
		condition: !email.match(Regex.Email),
		message:
			'El formato del correo electrónico es invalido. Favor de verificarlo..',
		timer: 3000,
	},
	{
		condition:
			!password.match(Regex.Password) || !repeatpassword.match(Regex.Password),
		message: 'El formato de la contraseña es invalido. Favor de verificarlo.',
		timer: 3000,
	},
]

export default validations
