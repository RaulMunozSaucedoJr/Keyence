/**
 * This function returns an object with the state variables and their setters.
 * @returns An object with the following properties:
 * email, setEmail, password, setPassword, repeatpassword, setRepeatPassword, error, setError
 */
import { useState } from 'react'
export const useSignUpState = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [repeatpassword, setRepeatPassword] = useState('')
	// eslint-disable-next-line
	const [error, setError] = useState('')

	return {
		email,
		setEmail,
		password,
		setPassword,
		repeatpassword,
		setRepeatPassword,
		error,
		setError,
	}
}
