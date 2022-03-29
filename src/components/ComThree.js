import 'chart.js/auto';
import React from "react";
import { Bar, Doughnut, PolarArea } from 'react-chartjs-2';
import {useState, useEffect, useRef} from 'react';
import axios from "axios";

const ComThree = () => {
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
        <div className="CompThree">
            <h1>Comparative Data</h1>
            <h4>Here you can see the comparison between COVID19 confirmed cases and deaths.</h4>
            <select className="CountrySelect" ref={selectedCountry}>
                { 
                    country.map(item => <option key={item.ID} >{item.Country}</option>)
                }
            </select>
            <div className="content-container">
                <div className="confirmedCases">
                    <h3>Confirmed Cases</h3>
                    <div className="chart">
                        <Bar 
                            data={{
                                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                                datasets: [{
                                    label: '# of Votes',
                                    data: [12, 19, 3, 5, 2, 3],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)'
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)'
                                    ],
                                    borderWidth: 1
                                },
                            
                            ],
                            }} 
                            height={200} 
                            width={400} 
                            options={{maintainAspectRatio: false,}}
                        />
                    </div>
                </div>
                
                <div className="Deaths">
                    <h3>Deaths</h3>
                    <div className="chart">
                        <Doughnut 
                            data={{
                                labels: ['Red', 'Blue', 'Yellow'],
                                datasets: [{
                                    label: '# of Deaths',
                                    data: [300, 50, 100],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)'
                                    ],
                                    backgroundColor: [
                                        'rgb(255, 99, 132)',
                                        'rgb(54, 162, 235)',
                                        'rgb(255, 205, 86)'
                                    ],
                                    hoverOffset: 4
                                },
                            
                            ],
                            }} 
                            height={200} 
                            width={400} 
                            options={{maintainAspectRatio: false,}}
                        />
                    </div>                    
                </div>
                <div className="comparativeBlock chart">
                    <PolarArea
                            data={{
                                labels: ['Red',
                                'Green',
                                'Yellow',],
                                datasets: [{
                                    label: 'Covid Cases',
                                    data: [11, 16, 7],
                                    backgroundColor: [
                                        'rgb(255, 99, 132)',
                                        'rgb(75, 192, 192)',
                                        'rgb(255, 205, 86)',
                                    ]
                                },
                            ],
                            }} 
                            height={50} 
                            width={250} 
                            options={{maintainAspectRatio: false,}} 
                        />
                </div>
            </div>
        </div>
    );
}

export default ComThree;