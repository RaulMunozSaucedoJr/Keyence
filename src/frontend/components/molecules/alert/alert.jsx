/**
 * It returns a div with a class, role, strong, text, and a button
 * @returns A React component
 */
const Alert = ({ className, text, textStrong, role }) => {
	return (
		<>
			<div className={className} role={role}>
				<strong>{textStrong}</strong> {text}
				<button
					type='button'
					className='btn-close'
					data-bs-dismiss='alert'
					aria-label='Close'
				></button>
			</div>
		</>
	)
}

export default Alert
