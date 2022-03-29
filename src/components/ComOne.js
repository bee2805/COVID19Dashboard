import 'chart.js/auto';
import React from "react";
import { Line, Bar, PolarArea } from 'react-chartjs-2';

const ComOne = () => {
    return(
        <div className="CompOne">
        <div className="AboutBlock"></div>    
            <div className="ComparativeData">
                <h3 className="">ComparativeData</h3>
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
            <div className="ComparativeData">
                <h3>ComparativeData</h3>
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
            </div>
            <div className="UIelement">
                <h3>UI Element</h3>
            </div>
        </div>
    );
}

export default ComOne;