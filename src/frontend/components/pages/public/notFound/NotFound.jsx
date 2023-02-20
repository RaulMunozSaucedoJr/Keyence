import * as PublicRouting from '../../../../features/routes/public/PublicRoutes'
import { Button } from '../../../index/atoms/index'
import { Link } from 'react-router-dom'

const NotFound = () => {
	return (
		<>
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-md-6 error-left center'>
						<h1>
							<strong>¡Lo sentimos!</strong>
						</h1>
						<h1>No encontramos el recurso que buscas.</h1>
						<Link to={PublicRouting.Login}>
							<Button
								id='button'
								text='Volver al inicio'
								className='btn btn-open'
								type='button'
							/>
						</Link>
					</div>
					<div className='col-md-6 error-right'></div>
				</div>
			</div>
		</>
	)
}

export default NotFound
