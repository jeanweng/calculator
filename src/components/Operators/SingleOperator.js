import React from 'react';
import "./index.css";

const SingleOperator = ({onClick, children}) => 
	<button 
		className="operators"
		type="button"
		onClick={onClick}
	>
		{children}
	</button>

export default SingleOperator;
