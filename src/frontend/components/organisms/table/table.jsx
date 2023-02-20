import PropTypes from 'prop-types'

const Table = ({ headers, rows }) => {
	return (
		<table>
			<thead>
				<tr>
					{headers.map(header => (
						<th key={header}>{header}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{rows.map(row => (
					<tr key={row.id}>
						{Object.values(row).map((cell, index) => (
							<td key={index}>{cell}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}

Table.propTypes = {
	headers: PropTypes.arrayOf(PropTypes.string).isRequired,
	rows: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Table
