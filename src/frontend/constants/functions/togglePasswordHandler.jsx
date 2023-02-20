export const togglePassword = () => {
	const input = document.querySelector('#password')
	input.type === 'password' ? (input.type = 'email') : (input.type = 'password')
}
