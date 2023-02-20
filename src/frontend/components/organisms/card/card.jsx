const Card = ({ imageUrl, alternativeText, smallText, cardBody, data }) => {
	return (
		<>
			<div className='card'>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-md-4'>
							<img src={imageUrl} className='img-fluid' alt={alternativeText} />
						</div>
						<div className='col-md-8'>
							<div className={cardBody}>
								{data}
								<h2>
									<a rel='nofollow noopener noreferrer' href={smallText}>
										<span className='badge badge-link'>{smallText}</span>
									</a>
								</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Card
