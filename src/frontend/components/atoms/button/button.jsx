const Button = ({
	id,
	text,
	className,
	type,
	value,
	onClick,
	onSubmit,
	disabled,
}) => {
	return (
		<button
			id={id}
			className={className}
			type={type}
			value={value}
			onClick={onClick}
			onSubmit={onSubmit}
			disabled={disabled}
		>
			{text}
		</button>
	)
}

export default Button
