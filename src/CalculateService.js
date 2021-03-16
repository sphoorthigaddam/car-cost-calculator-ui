import React, { useState } from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function CalculateService() {
	const [ type, setType ] = useState('');
	const [ cost, setCost ] = useState(0.0);
	const [ boolOptions, setBoolOptions ] = useState({
		towPackage: false,
		navigation: false
	});
	const [ engine, setEngine ] = useState('');
	const [ audio, setAudio ] = useState('');
	const [ transmission, setTransmission ] = useState('');
	const [ roofType, setRoofTyoe ] = useState('');
	const [ zip, setZip ] = useState('');

	function handleSubmit(type) {
		var config = {
			method: 'post',
			url: 'https://car-cost-calculator.herokuapp.com/api/v1/car/cost',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				type: type,
				selectedOptions: {
					navigation: boolOptions.navigation,
					towPackage: boolOptions.towPackage,
					audio: audio,
					engine: engine,
					transmission: transmission,
					roofType: roofType
				},
				destinationZip: zip
			}
		};

		axios(config)
			.then(function(response) {
				console.log(JSON.stringify(response.data));
				setCost(response.data.cost);
			})
			.catch(function(error) {
				console.log(error.message);
				alert(error.message);
			});
	}

	function handleCheckbox(checkboxType, event) {
		let temp = boolOptions;
		temp[checkboxType] = event.target.checked + '';
		setBoolOptions(temp);
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<Container fixed>
				<div>
					<strong> Choose a car type </strong>
					<select onChange={(event) => setType(event.target.value)} defaultValue={'DEFAULT'}>
						<option value='DEFAULT' disabled>
							select
						</option>
						<option value='coupe'>Coupe</option>
						<option value='suv'>Suv</option>
						<option value='truck'>Truck</option>
						<option value='luxury_sedan'>Luxury Sedan</option>
					</select>
				</div>
				<div>
					<div>
					<strong> Choose an engine type </strong>
					<select id={engine} onChange={(event) => setEngine(event.target.value)} defaultValue={'DEFAULT'}>
						<option value=''>select</option>
						<option value='v8'>V8</option>
					</select>
					</div>

					<div>
					<strong> Choose an audio type </strong>
					<select id={audio} onChange={(event) => setAudio(event.target.value)} defaultValue={'DEFAULT'}>
						<option value=''>select</option>
						<option value='premiumaudio'>Premium Audio</option>
					</select>
					</div>

					<div>
					<strong> Choose an audio type </strong>
					<select
						id={transmission}
						onChange={(event) => setTransmission(event.target.value)}
						defaultValue={'DEFAULT'}
					>
						<option value=''>select</option>
						<option value='automatic'>Automatic</option>
					</select>
					</div>

					<div>
					<strong> Choose an audio type </strong>
					<select
						id={roofType}
						onChange={(event) => setRoofTyoe(event.target.value)}
						defaultValue={'DEFAULT'}
					>
						<option value=''>rooftype</option>
						<option value='sunroof'>Sun roof</option>
					</select>
					</div>
				</div>
				<div>
					{Object.keys(boolOptions).map((checkbox) => {
						return (
							<div key={checkbox + 'div'}>
								<label>
									{checkbox.toUpperCase() + ' : '}
									<input
										type="checkbox"
										id={checkbox}
										key={checkbox}
										onChange={(event) => handleCheckbox(checkbox, event)}
									/>
								</label>
							</div>
						);
					})}
				</div>
				<div>
					<label> Zipcode <input type="text" id={zip} onChange={(event) => setZip(event.target.value)}/> </label>
				</div>
				<div>
					<button onClick={() => handleSubmit(type)}>Click me</button>
				</div>
				{cost ? <h1>Cost of the car is {cost}</h1> : null}
			</Container>
		</React.Fragment>
	);
}
