import React, { useState } from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(1)
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	root: {
		'& > *': {
			margin: theme.spacing(1)
		}
	}
}));
export default function CalculateService() {
	const classes = useStyles();

	const [ type, setType ] = useState('');
	const [ cost, setCost ] = useState(0.0);
	const [ boolOptions, setBoolOptions ] = useState({
		towPackage: false,
		navigation: false
	});
	const [ engine, setEngine ] = useState('');
	const [ audio, setAudio ] = useState('');
	const [ transmission, setTransmission ] = useState('');
	const [ roofType, setRoofType ] = useState('');
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
				alert(error.response.data.message);
			});
	}

	function handleCheckbox(checkboxType, event) {
		let temp = boolOptions;
		temp[checkboxType] = event.target.checked + '';
		setBoolOptions(temp);
	}

	function handleReset(checkboxType, event) {
		let temp = boolOptions;
		temp[checkboxType] = event.target.checked + '';
		setBoolOptions(temp);
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<Container maxWidth="xl">
				<FormControl className={classes.formControl}>
					<InputLabel htmlFor="choose-car-type">Car Type</InputLabel>
					<NativeSelect
						onChange={(event) => setType(event.target.value)}
						inputProps={{
							name: 'car type',
							id: 'choose-car-type'
						}}
					>
						<option aria-label="None" value="" />
						<option value="coupe">Coupe</option>
						<option value="suv">Suv</option>
						<option value="truck">Truck</option>
						<option value="luxury_sedan">Luxury Sedan</option>
					</NativeSelect>
					<FormHelperText>Choose car type</FormHelperText>
				</FormControl>

				<FormGroup row>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="choose-engine-type">Engine</InputLabel>
						<NativeSelect
							onChange={(event) => setEngine(event.target.value)}
							inputProps={{
								name: 'engine type',
								id: 'choose-engine-type'
							}}
						>
							<option aria-label="None" value="" />
							<option value="v8">V8</option>
						</NativeSelect>
						<FormHelperText>Choose engine</FormHelperText>
					</FormControl>

					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="choose-transmission-type">Transmission</InputLabel>
						<NativeSelect
							onChange={(event) => setTransmission(event.target.value)}
							inputProps={{
								name: 'transmission type',
								id: 'choose-engine-type'
							}}
						>
							<option aria-label="None" value="" />
							<option value="automatic">Automatic</option>
						</NativeSelect>
						<FormHelperText>Choose transmission</FormHelperText>
					</FormControl>
				</FormGroup>

				<FormGroup row>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="choose-audio-type">Audio</InputLabel>
						<NativeSelect
							onChange={(event) => setAudio(event.target.value)}
							inputProps={{
								name: 'audio type',
								id: 'choose-audio-type'
							}}
						>
							<option aria-label="None" value="" />
							<option value="premiumaudio">Premium Audio</option>
						</NativeSelect>
						<FormHelperText>Choose audio</FormHelperText>
					</FormControl>

					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="choose-roof-type">Roof</InputLabel>
						<NativeSelect
							onChange={(event) => setRoofType(event.target.value)}
							inputProps={{
								name: 'roof type',
								id: 'choose-roof-type'
							}}
						>
							<option aria-label="None" value="" />
							<option value="sunroof">Sun Roof</option>
						</NativeSelect>
						<FormHelperText>Choose roof type</FormHelperText>
					</FormControl>
				</FormGroup>

				<FormControl className={classes.formControl}>
					<FormGroup row>
						{Object.keys(boolOptions).map((checkbox, index) => {
							return (
								<FormControlLabel
									control={
										<Checkbox
											id={checkbox}
											key={checkbox}
											onChange={(event) => handleCheckbox(checkbox, event)}
											color="primary"
										/>
									}
									label={checkbox.toUpperCase()}
								/>
							);
						})}
					</FormGroup>
				</FormControl>

				<form className={classes.root} noValidate autoComplete="off">
					<FormGroup row>
						<TextField id={zip} label="Enter zip code" onChange={(event) => setZip(event.target.value)} />
					</FormGroup>
				</form>

				<FormControl>
					<FormGroup row>
						<Button
							variant="contained"
							color="primary"
							onClick={() => handleSubmit(type)}
							className={classes.margin}
						>
							Calculate Cost
						</Button>
						<Button variant="outlined" color="secondary" className={classes.margin}>
							Reset
						</Button>
					</FormGroup>
				</FormControl>

				{cost ? (
					<div className={classes.root}>
						<Typography variant="h5" gutterBottom>
							Cost of the car is <strong>${cost}</strong>
						</Typography>
					</div>
				) : null}
			</Container>
		</React.Fragment>
	);
}
