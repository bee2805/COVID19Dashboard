import 'chart.js/auto';
import React from "react";
import {useState, useEffect, useRef} from 'react';
import axios from "axios";
import { Line } from 'react-chartjs-2';

const ComTwo = () => {
    const [country, setCountry] = useState([]);

    let selectedCountry = useRef();
    
    useEffect(()=>{
        console.log("hello")
        axios.get('https://api.covid19api.com/summary')
        .then((response)=>{
            console.log(response.data.Countries);
            setCountry(response.data.Countries);
        });
    },  []);


    return(
        <div className="CompTwo">
            <h1>Timeline Data</h1>
            <h4>See how the COVID-19 infections have changed over time</h4>
            <select className="CountrySelect" ref={selectedCountry}>
                { 
                    country.map(item => <option key={item.ID} >{item.Country}</option>)
                }
            </select>
            <div className="TimelineBlock">
                <div className="chart">
                    <Line
                        data={{
                            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                            datasets: [{
                                label: 'Covid Cases',
                                data: [12, 19, 3, 5, 2, 3],
                                fill: false,
                                borderColor: 'rgb(75, 192, 192)',
                                tension: 0.1
                            },
                        ],
                        }} 
                        height={400} 
                        width={600} 
                        options={{maintainAspectRatio: false,}} 
                    />
                </div>
            </div>
            <p>There will be informatin here about the graph</p>
        </div>
    );
}


export default ComTwo;