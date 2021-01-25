import React from 'react';
import './index.css';

const ResultDisplay = ({value, display}) =>
	<div className="result-display">
		<div className="all-enter">{display}</div>
		<div className="result">{value}</div>
	</div>

export default ResultDisplay;
