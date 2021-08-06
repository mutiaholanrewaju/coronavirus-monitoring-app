// import React from 'react';

// // scoped style for this file
// import './home.css';

// function Home() {
// 	return <div className="home">This is the home Page.</div>;
// }

// export default Home;


import React, { useState, useEffect } from "react";
import './home.css';

import {
	MenuItem,
	FormControl,
	Select,
	Card,
	CardContent,
} from "@material-ui/core";

import Infobox from "../../components/Infobox";
import Map from "../../components/Map";
import Table from "../../components/Table";
import { sortData } from "../../components/utility";
import LineGraph from "../../components/LineGraph";
import numeral from "numeral";

function Home() {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState("worldwide");
	const [countryInfo, setCountryInfo] = useState({});
	const [tableData, setTableData] = useState([]);
	// const [casesType, setCasesType] = useState("cases");

	//Fetching of the all countries record
	useEffect(() => {
		fetch("https://disease.sh/v3/covid-19/all")
			.then((response) => response.json())
			.then((data) => {
				setCountryInfo(data);
			});
	}, [])

	// The code inside the useEffect will run each and everytime the component app loads and there is changes in countries
	//UseEffect runs a piece of code base on its given condition and an empty [] will make it runs just onces
	useEffect(() => {
		const getCountriesData = async () => {
			await fetch("https://disease.sh/v3/covid-19/countries")
				//then(response) get the entire response from the API fetched and take the json from it
				.then((response) => response.json())
				// Restructuring the response to display on the country name and the iso2
				.then((data) => {
					const countries = data.map((country) => (
						{
							name: country.country, //Name of the country like United State
							value: country.countryInfo.iso2, // The country code like UK, US
						}
					));

					const sortedData = sortData(data);
					setTableData(sortedData);
					setCountries(countries);
				});
		};

		getCountriesData();
	}, []);

	const onCountryChange = async (event) => {
		const countryCode = event.target.value;

		console.log("YOOOOOO  >>>>>>>", countryCode);

		setCountry(countryCode);
		//Using a ternary condition to select the url for all countries and individual countries
		const url =
			countryCode === "worldwide"
				? "https://disease.sh/v3/covid-19/all"
				: `https://disease.sh/v3/covid-19/countries/${countryCode}`;

		await fetch(url)
			.then(response => response.json())
			.then(data => {
				setCountryInfo(countryCode);
				//set all of the data from the country response
				setCountryInfo(data);


			})
	};
	console.log("CountryInfo>>>>>>>>", countryInfo);
	return (

		<div className="home">
			<div className="home_left">
				<div className="home_header"><p><h2>COVID-19 MONITORING APP </h2></p>
					<FormControl className="app_dropdown">
						<Select
							variant="outlined"
							onChange={onCountryChange}
							value={country}

						>
							<MenuItem value="worldwide">All Countries</MenuItem>
							{countries.map((country) => (
								<MenuItem value={country.value}>{country.name}</MenuItem>

							))}

						</Select>
					</FormControl>
				</div>

				<div className="home_stats">
					<Infobox title="Number of New Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />

					<Infobox title="Number of Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />

					<Infobox title="Number of Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
				</div>

				<Card>
					<CardContent>
						<h3>Countries news </h3>
						<LineGraph />
					</CardContent>

				</Card>
				{/* <Map /> */}
				<p className="home">This is a mini project for the software development track designed by Elvia group.</p>

			</div>

			<Card className="home_right">
				<CardContent>
					<h3>Countries by highest live cases</h3>
					<Table countries={tableData} />
					<h3>Worldwide News</h3>
					<LineGraph className="app__graph" />
					<Map />
				</CardContent>
			</Card>
		</div >
	)
}

export default Home;
