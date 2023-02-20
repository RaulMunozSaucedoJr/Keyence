/**
 * It returns an object with the following properties: email, setEmail, password, setPassword, error,
 * setError
 * @returns An object with the following properties:
 * email, setEmail, password, setPassword, error, setError
 */
import { useState } from 'react'

export const useAuthState = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [isLogin] = useState(false)

	return { email, setEmail, password, setPassword, error, setError, isLogin }
}
