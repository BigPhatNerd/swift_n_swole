import React, { useState, useEffect } from 'react'
import Ticker from 'react-ticker'
import axios from 'axios'

const GetStuff = () => {
	const [results, setResults] = useState([]);
	const [message, setMessage] = useState([]);

	const [show, setShow] = useState(false);

	useEffect(() => {
		async function getAll() {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			}
			const allScores = await axios.get('/api/profile/all', config)
			console.log('allScores.data: ', allScores.data)
			setResults(allScores.data)
			var arr = []
			allScores.data.map((result, index) => {
				if(result.eventId === 101){
				arr.push(`TeamName: ${result.teamName} has ${result.miles.total} total miles`)
			}
			})
			setMessage(arr)
		}
		getAll()
	}, [])

	return results ? (
		<p>{message.join(' ')} +</p>
	) : (
		<p style={{ visibility: 'hidden' }}>Placeholder</p>
	)
}

const Scroll101 = () => {
	return (
		
		<Ticker offset="run-in" speed={7} move={true}>
			{() => <GetStuff />}
		</Ticker>
	)
}

export default Scroll101
