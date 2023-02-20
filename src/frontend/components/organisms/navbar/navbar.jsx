import Keyence from '../../../assets/images/svg/Keyence.svg'
export const Navbar = () => {
	return (
		<>
			<nav className='navbar navbar-expand-lg sticky-top'>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-12 center'>
							<a href='https://www.keyence.com.mx/'>
								<img
									src={Keyence}
									className='img-thumbnail'
									alt='Logo Navbar Desktop'
								/>
							</a>
						</div>
					</div>
				</div>
			</nav>
		</>
	)
}
export default Navbar
