import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const CostCalculator = () => {
	const [ userProfiles, setUserProfiles ] = useState([]);

	const fetchCost = () => {
		axios({
			method: 'post',
			url: 'http://localhost:8090/api/v1/car/cost',
			headers: {},
			data: {
				type: 'coupe',
				selectedOptions: [ 'v8', 'automatic', 'navigation' ],
				destinationZip: '12345'
			}
		}).then((response) => {
			setUserProfiles(response.data);
			console.log(response);
		});
	};
	useEffect(() => {
		fetchCost();
	}, []);

	return (
		<div>
			<h1>{userProfiles.cost}</h1>
		</div>
	);
};

export default CostCalculator;
