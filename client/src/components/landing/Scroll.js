import React, { useState, useEffect } from 'react'
import Ticker from 'react-ticker'
import axios from 'axios'

const GetStuff = ({results, message}) => {
	
	return results ? (
		<p>{message.join(' ')} +</p>
	) : (
		<p style={{ visibility: 'hidden' }}>Placeholder</p>
	)
}

const Scroll = ({results, message}) => {
	return (
		
		<Ticker offset="run-in" speed={7} move={true}>
			{() => <GetStuff results={results} message={message} />}
		</Ticker>
	)
}

export default Scroll