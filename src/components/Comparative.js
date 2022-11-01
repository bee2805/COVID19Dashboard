import 'chart.js/auto';
import React from "react";
import { Bar, Doughnut, PolarArea } from 'react-chartjs-2';
import {useState, useEffect, useRef} from 'react';
import axios from "axios";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Comparative = () => {
    const [data, setData] = useState([]);
    const [casesChart, setCasesChartInfo] = useState({});
    const [deathRecoveryChart, setDeathRecoveryChart] = useState([]);
    const [comparingDataChart, setCompararingDataChart] = useState([]);

    let selectedCountry = useRef();
    
    useEffect(()=>{
        axios.get('https://api.covid19api.com/summary')
        .then((response)=>{
            setData(response.data.Countries);
        });
    },  []);

    //Get the country
    const getCountry = () => {

        let countryName = selectedCountry.current.value;
        const countryData = data.filter((Country) => Country.Country === countryName)[0];
        // console.log("CountryData:" , countryData);

        const totalCases = countryData.TotalConfirmed;
        const totalDeaths = countryData.TotalDeaths;

        const historyURL = "https://covid-api.mmediagroup.fr/v1//history?country=" + countryData.Country + '&status=confirmed';

        axios.get(historyURL)
        .then((histRes) => {
            const population = histRes.data.All.population;
            console.log(population);

            let caseData = [
                population,
                totalCases
            ]
    
            let recoveries = totalCases - totalDeaths;
    
            let DeathRecoveries = [
                totalDeaths,
                recoveries
            ]
    
            let comparatives = [
                population,
                totalCases,
                recoveries
            ]

            console.log(comparatives);

            setCasesChartInfo(caseData);

            setDeathRecoveryChart(DeathRecoveries);

            setCompararingDataChart(comparatives);

        })
    }

    // ChartData
    // CaseChart
    const cases = {
        labels: ['Population', 'Cases'],
        datasets: [{
            label: ['# COVID19 Cases'],
            data: casesChart,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        },
    
    ],
    }

    //Death/Recoveries Chart
    const deathsAndRecoveries = {
        labels: ['Deaths', 'Recoveries'],
        datasets: [{
            label: '# of Deaths',
            data: deathRecoveryChart,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
            ],
            hoverOffset: 4
        },
    
    ],
    }

    // Comparing cases, deaths and recoveries
    const comparativeChart = {
        labels: ['Population', 'Cases', 'Recoveries'],
        datasets: [{
            label: 'Covid Cases',
            data: comparingDataChart,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(75, 192, 192)',
                'rgb(255, 205, 86)',
            ]
        },
    ],
    }

    // IMPORTANT: Deaths do show on the comparative chart, there just weren't many deaths in comparison, so some don't really show up. If you keep clicking through countries you'll find one that shows.

    return(
        <div className="Comparative">

            <div className='pageIntro'>
                <h1>Comparative Data</h1>
                <h4>Here you can see the comparison between COVID19 confirmed cases and deaths.</h4>
            </div>

            {/* Country Dropdown */}
            <select className="CountrySelect" onChange={getCountry} ref={selectedCountry}>
                <option>Select A Country!</option>
                {data.map(item => <option key={item.ID} >{item.Country}</option>)}
            </select>{/* Country Dropdown */}

            <div className='leftContainer'>
                {/* Cases */}
                <div className="confirmedCases">
                    <h3>Confirmed Cases</h3>
                    <div className="chart barChart">
                        <Bar data={cases}/>
                    </div>
                </div> {/* Cases */}
            </div>

            <div className='rightContainer'>
                {/* Deaths */}
                <div className="Deaths">
                    <h3>Deaths and Recoveries</h3>
                    <div className="chart">
                        <Doughnut 
                            data={deathsAndRecoveries} 
                            height={200} 
                            width={400} 
                            options={{maintainAspectRatio: false,}}
                        />
                    </div>                    
                </div> {/* Deaths */}

                {/* Comparing all the data */}
                <div className="comparativeBlock chart">
                    <PolarArea
                        data={comparativeChart} 
                        height={200} 
                        width={400}
                        options={{maintainAspectRatio: false,}} 
                    />
                </div> {/* Comparing all the data */}
            </div>

        </div>
    );
}

export default Comparative;