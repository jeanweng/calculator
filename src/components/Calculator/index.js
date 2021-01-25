import React, { Component } from 'react';
import ResultDisplay from '../ResultDisplay';
import Numbers from '../Numbers';
import Operators from '../Operators';
import EqualOperator from '../Operators/EqualOperator';
import Reset from '../Reset';
import Decimal from '../Numbers/Decimal';
import './index.css';

class Calculator extends Component{
	constructor(props){
	    super(props);

	    this.state = {
	      result: 0,
	      prevVal: 0,
	      newVal: 0,
	      operator: "",
	      isNewNumberEntered: false,
	      isOperatorEntered: false,
	      isCompleted: false,
        isDecimalAdded: false,

	    }

	    this.onEnterNumber = this.onEnterNumber.bind(this);
	    this.onAddDecimalPoint = this.onAddDecimalPoint.bind(this);
	    this.onEnterOperator = this.onEnterOperator.bind(this);
	    this.onReset = this.onReset.bind(this);
	    this.updateResult = this.updateResult.bind(this);
	    this.onEqualTo = this.onEqualTo.bind(this);
  	}

  	onEnterNumber(num){
  		if(this.state.isCompleted){
  			this.setState({
  				newVal: num,
	  			isNewNumberEntered: false,
	  			isOperatorEntered: false,
	  			isCompleted: false,
	  			operator: "",
	  			//equation: num + ""
  			});
  		}else if(!this.state.isNewNumberEntered){
  			this.setState({
	  			newVal: this.state.newVal * 10 + num,
	  			isNewNumberEntered: false,
	  			isOperatorEntered: false,
	  			//equation: this.state.equation + num
  			});
  		}else{
  			this.setState({

  				newVal: this.state.newVal * 10 + num,
  				isNewNumberEntered: false,
  				isOperatorEntered: true,
  				// equation: this.state.equation + num
  			});
  		}

  	}

  	onAddDecimalPoint(){

  	}

  	onEnterOperator(op) {
  		if(this.state.isCompleted){
  			this.setState({
  				isNewNumberEntered: false,
  				isOperatorEntered: true,
  				isCompleted: false,
  				operator: op,
  				newVal: this.state.result,
  				// equation: this.state.result + op
  			});
  		}else if(!this.state.isOperatorEntered){
	  		const updatedResult = this.updateResult();
	  		this.setState({
	  			isNewNumberEntered: true,
          isOperatorEntered: true,
	  			operator: op,
	  			prevVal: this.state.newVal,
	  			newVal: 0,
	  			result: updatedResult,
	  			// equation: this.state.equation + op
	  		});
  		}else{
  			const updatedResult = this.updateResult();
  			this.setState({
  				isNewNumberEntered: false,
  				isOperatorEntered: false,
  				operator: op,
  				prevVal: this.state.newVal,
  				result: updatedResult,
  				// equation: this.state.equation + op
  			});
  		}
  	}

  	updateResult(){
  		const {result, newVal, prevVal, operator} = this.state;
  		let updatedResult = 0;
  		switch(operator){
  			case "+":
  				updatedResult = prevVal + newVal;
  				break;
  			case "-":
  				updatedResult = prevVal - newVal;
  				break;
  			case "*":
  				updatedResult = prevVal * newVal;
  				break;
  			case "/":
  				updatedResult = prevVal / newVal;
  				break;
  			default:
  				updatedResult = result;
  		}
  		return updatedResult;
  	}

  	onEqualTo(){
  		const updatedResult = this.updateResult();
  		this.setState({
  			isNewNumberEntered: true,
  			isOperatorEntered: true,
  			result: updatedResult,
  			newVal: 0,
  			prevVal: 0,
  			operator: "",
  			// equation: this.state.equation + "=" + updatedResult,
  			isCompleted: true
  		});
  	}

  	onReset(){
  		this.setState({
  			isNewNumberEntered: false,
  			isOperatorEntered: false,
        isDecimalAdded: false,
  			result: 0,
  			newVal: 0,
  			prevVal: 0,
  			operator: "",
        isCompleted: false
  			//equation: ""
  		});
  	}

	render(){
		const {result, newVal, isNewNumberEntered, operator, isOperatorEntered} = this.state;
		return (
			<div className="calculator">
				<ResultDisplay
					// allEnter={equation}
					value={
						isNewNumberEntered && isOperatorEntered ? result
						: !isNewNumberEntered && !isOperatorEntered ? newVal
						: isNewNumberEntered && !isOperatorEntered ? operator
						: newVal}
				/>
				<div className="box">
					<Reset onClick={this.onReset}/>
					<EqualOperator onClick={this.onEqualTo}/>
				</div>
				<Numbers onUpdate={this.onEnterNumber}/>
        <Decimal onClick={this.onAddDecimalPoint}/>
				<Operators onUpdate={this.onEnterOperator}/>
			</div>
		);
	}
}

export default Calculator;
