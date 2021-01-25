import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SingleOperator from './SingleOperator';
import "./index.css";

class Operators extends Component{
	constructor(props){
		super(props);

		this.onChange = this.onChange.bind(this);
	}

	onChange(op){
		this.props.onUpdate(op);
	}

	render(){
		return (
			<div className="op-box">
			 	<SingleOperator onClick={() => this.onChange("+")}>+</SingleOperator>
			 	<SingleOperator onClick={() => this.onChange("-")}>-</SingleOperator>
			 	<SingleOperator onClick={() => this.onChange("*")}>*</SingleOperator>
			 	<SingleOperator onClick={() => this.onChange("/")}>/</SingleOperator>
			</div>
		);
	}
}

Operators.propTypes = {
	onUpdate: PropTypes.func.isRequired
}


export default Operators;