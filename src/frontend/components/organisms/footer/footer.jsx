import { Link } from 'react-router-dom'

const Footer = () => {
	return (
		<div className='footer fixed'>
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-sm-12 col-md-12 col-xl-12 center'>
						<Link to='https://www.keyence.com.mx/'>
							<h1>Keyence México</h1>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Footer
