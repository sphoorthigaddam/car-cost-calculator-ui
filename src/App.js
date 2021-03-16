import './App.css';
import CalculateService from './CalculateService';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


export default function App() {
	return (
		<Grid container spacing={0} direction="row" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
			<Grid item xs={3}>
				<Typography variant="h3" gutterBottom>
					Car Cost Calculator
				</Typography>
				<CalculateService />
			</Grid>
		</Grid>
	);
}
