import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'

const DashboardActions = () => {
	return (
		<Container>
			<Row>
				<Link to="/edit-team-name" className="btn btn-primary">
					Edit Team Name
				</Link>

				<Link to="/add-team-members" className="btn btn-primary">
					Add Members
				</Link>
			</Row>
			</Container>
		
	)
}

export default DashboardActions
