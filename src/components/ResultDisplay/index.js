import React from 'react';
import './index.css';

const ResultDisplay = ({allEnter, value}) =>
	<div className="result-display">
		// <div className="all-enter">{allEnter}</div>
		<div className="result">{value}</div>
	</div>

export default ResultDisplay;