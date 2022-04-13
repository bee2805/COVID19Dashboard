import 'chart.js/auto';
import React from "react";
import { Line, Bar, PolarArea } from 'react-chartjs-2';
import {useState, useEffect, useRef} from 'react';
import axios from "axios";

const Home = () => {
    const [data, setData] = useState([]);
    const [cases, setCases] = useState([]);
    const [deaths, setDeaths] = useState([]);
    const [comparingDataChart, setCompararingDataChart] = useState([]);

    useEffect(()=>{
        console.log("hello")
        axios.get('https://api.covid19api.com/summary')
        .then((response)=>{
            console.log(response.data.Global);
            setData(response.data.Global);
            setCases(response.data.Global.TotalConfirmed);
            setDeaths(response.data.Global.TotalDeaths);

            let barChartData = [
                cases,
                deaths
            ]

            setCompararingDataChart(barChartData);

        });
    },  []);

    let recoveries = cases - deaths;

    return(
        <div className="Home">

            {/* ComparativeData */}
            <div className="ComparativeData">
                <h3>About Us</h3>
                <h5>Our Coronavirus dashboard shows numbers and statistics of the disease spread globally. We aim to inform people around the world on the stats of their specific country</h5>
                 
            </div> {/* ComparativeData */}

            {/* ComparativeData */}
            <div className="ComparativeData">
                <h3 className="">ComparativeData</h3>
                <div className="chart">
                    <Bar 
                        data={{
                            labels: ['Population', 'Cases'],
                            datasets: [{
                                label: '# COVID19 Cases',
                                data: [12, 5],
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
                            }} 
                            height={200} 
                            width={400}  
                            options={{maintainAspectRatio: false,}}
                    />
                </div>
            </div> {/* ComparativeData */}

            {/* AboutData */}
            <div className="AboutBlock">
                <h2>Total Global Cases</h2>
                <div className='Global justify-content-center'>
                    <h1>{cases}</h1>
                    <h4>Cases</h4>
                </div>
                <div className='Global'>
                    <h1>{deaths}</h1>
                    <h4>Deaths</h4>
                </div>
                <div className='Global'>
                    <h1>{recoveries}</h1>
                    <h4>Recoveries</h4>
                </div>
            </div>
            
            {/* TimelineData */}
            <div className="TimelineData">
                <h3>Timeline Data</h3>
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
                        height={200} 
                        width={400} 
                        options={{maintainAspectRatio: false,}} 
                    />
                </div>
            </div> {/* TimelineData */}
            
            {/* UI Element */}
            <div className="UIelement">
                <h3>UI Element</h3>
            </div>{/* UIElement */}
        </div>
    );
}

export default Home;