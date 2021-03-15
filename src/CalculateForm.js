import React, { Component } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import axios from 'axios';

export default class CalculateForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			zipcode: '',
			type: '',
            categories: [
                { id: 'automatic', name: 'Automatic'},
                { id: 'v8', name: 'V8' },
                { id: 'sunroof', name: 'Sunroof' },
                { id: 'towpackage', name: 'TowPackage' }
            ],
			selCategories: [''],
            cost: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleTypeChange = this.handleTypeChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onRemove = this.onRemove.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(event) {
        event.preventDefault(event);
        console.log('A form was submitted: ' + this.state.selCategories);
        let strinarr = [];
        this.state.selCategories.forEach(i => {strinarr.push(i.id)});
        console.log(strinarr)
        axios({
			method: 'post',
			url: 'http://localhost:8092/api/v1/car/cost',
			headers: {},
			data: {
				type: this.state.type,
				selectedOptions: strinarr,
				destinationZip: this.state.zipcode
			}
		}).then((response) => {
			this.setState({cost: response.data});
			console.log(response);
		});
	}

	handleChange(event) {
		this.setState({ zipcode: event.target.value });
		console.log('A zipcode was submitted');
	}
	handleTypeChange(event) {
		this.setState({ type: event.target.value });
		console.log('A type was submitted ');
	}

	onSelect(data) {
       this.setState ({selCategories : data});
	}
    onRemove(data) {
        this.setState ({selCategories : data});
     }
	render() {
		return (
            <div>
			<form onSubmit={this.handleSubmit}>
				<select onChange={this.handleTypeChange} defaultValue={'DEFAULT'}>
                    <option value="DEFAULT" disabled>Choose a car type ...</option>
					<option value="coupe">Coupe</option>
					<option value="suv">Suv</option>
					<option value="truck">Truck</option>
					<option value="luxury_sedan">Luxury Sedan</option>
				</select>
				<strong>Select Category:</strong>
				<Multiselect
					options= {this.state.categories}// Options to display in the dropdown
					selectedValues="" // Preselected value to persist in dropdown
					onSelect={this.onSelect} // Function will trigger on select event
					onRemove={this.onRemove} // Function will trigger on remove event
					displayValue="name" 
                    showCheckbox={true}// Property name to display in the dropdown options
				/>
				<label>
					DestinationZip:
					<input type="text" value={this.state.zipcode} onChange={this.handleChange} />
				</label>
				<input type="submit" value="Submit" />
               
			</form>
             <h1>{this.setState.cost}</h1>
             </div>
		);
	}
}