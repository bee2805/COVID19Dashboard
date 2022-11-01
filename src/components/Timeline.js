import 'chart.js/auto';
import React from "react";
import {useState, useEffect, useRef} from 'react';
import axios from "axios";
import { Line } from 'react-chartjs-2';

const Timeline = () => {
    const [data, setData] = useState([]);
    const [caseDates, setCaseDates] = useState([]);
    const [caseNumbers, setCaseNumbers] = useState([]);
    const [dateLabels, setDateLabels] = useState([]);
    const [timeStamps, setTimeStamps] = useState([]);

    let selectedCountry = useRef();
    
    useEffect(()=>{
        axios.get('https://api.covid19api.com/summary')
        .then((response)=>{
            setData(response.data.Countries);
        });
    },  []);

    // const historyLink = "https://covid-api.mmediagroup.fr/v1//history?country=" + data.Country +;
    const getCountry = () => {

        let countryName = selectedCountry.current.value;
        const countryData = data.filter((Country) => Country.Country === countryName)[0];
        // console.log("CountryData:" , countryData);

        const historyURL = "https://covid-api.mmediagroup.fr/v1//history?country=" + countryData.Country + '&status=confirmed';

        axios.get(historyURL)
        .then((histRes) => {
            const historyDates = histRes.data.All.dates;
            // console.log(historyDates);

            const dates = Object.keys(historyDates);
            // console.log(dates);

            const confirmedCases = Object.values(historyDates);
            // console.log(confirmedCases);

            let timelineDates = [
                dates
            ]
            console.log(timelineDates);
            setCaseDates(timelineDates)

            for(let i = 0; i = histRes.length; i++){
                dates.push({date : dates[i]});
                confirmedCases.push({caseTotal: confirmedCases[i]});
            }

            const sortedDates = dates.sort();

            setDateLabels(sortedDates);
            setTimeStamps(confirmedCases);

            let timelineCases =  [
                confirmedCases
            ]
            console.log(timelineCases);
            setCaseNumbers(timelineCases)
        })

    }

    const lineGraph = {
        labels: dateLabels,
        datasets: [{
            label: 'Covid Cases from the beginning of the Year to Now',
            data: timeStamps,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        },
    ],
    }

    return(
        <div className="Timeline">
            <div className='pageIntro'>
                <h1>Timeline Data</h1>
                <p>See how the COVID-19 infections have changed over time</p>
            </div>

            <select className="CountrySelect" ref={selectedCountry} onChange={getCountry}>
                <option>Select A Country!</option>
                { data.map(item => <option key={item.ID} >{item.Country}</option>)}
            </select>

            <div className="TimelineBlock">
                <div className="chart">
                    <Line
                        data={lineGraph} 
                        height={50} 
                            width={100}
                        options={{maintainAspectRatio: false,}} 
                    />
                </div>
            </div>
        </div>
    );
}


export default Timeline;