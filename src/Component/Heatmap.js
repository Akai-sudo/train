import ReactApexChart from 'react-apexcharts';
import { useState } from "react";
import { scaleLinear } from 'd3-scale';
import { interpolateRgb } from 'd3-interpolate';


export default function Heatmap(props) {

    // const seriesNames = props.layers;
    // const values = props.weights;

    // if (values !== undefined) {
    //     const dataStructure = seriesNames.map((name, index) => ({
    //         name,
    //         data: values[index].map((value, i) => ({ x: `W${i + 1}`, y: value }))
    //     }));
    //     console.log(dataStructure)
    // }


    const [options, setOptions] = useState({
        chart: {
            height: 500,
            width: 500,
            type: 'heatmap',
            background: '#353535', // Set the background color here
        },
        theme: {
            monochrome: {
                enabled: true,
                color: '#E7842D',
                shadeTo: 'light',
                shadeIntensity: 1
            }
        },
        // theme: {
        //     mode: 'light',
        //     //palette: 'palette1',
        // },
        plotOptions: {
            heatmap: {
                radius: 9999,
                enableShades: true,
                inverse: true,
                colorScale: {
                    ranges: [

                        // from: 0,
                        // to: 100,
                        // color: (value) => {
                        //     const colorScale = scaleLinear()
                        //         .domain([0, 100])
                        //         .range(['#989898', '#E7842D'])
                        //         .interpolate(interpolateRgb);

                        //     return colorScale(value);
                        // }
                        // color: (value) => {
                        //     const colorScale = scaleLinear()
                        //         .domain([0, 100])
                        //         .range(['#989898', '#E7842D'])
                        //         .interpolate(interpolateRgb);

                        //     return colorScale(value);
                        // },
                        {
                            from: 0,
                            to: 0,
                            color: "#989898" // Gray color at value 0
                        },
                        {
                            from: 1,
                            to: 100,
                            color: "#E7842D" // #E7842D color at value 1 to 100
                        }
                    ]
                },
                // colorScale: {
                //     ranges: [
                //         {
                //             from: 0,
                //             to: 100,
                //             //color: '#E7842D' // Set the color for the heatmap
                //             //colors: ['#989898', '#E7842D']
                //             color: [
                //                 {
                //                     value: 0,
                //                     color: '#989898'
                //                 },
                //                 {
                //                     value: 100,
                //                     color: '#E7842D'
                //                 }
                //             ]
                //         }
                //     ]
                // },


                stroke: {
                    show: false,
                    width: 0,
                    colors: undefined
                }
            }
        },
        grid: {
            show: false,
        },
        dataLabels: {
            enabled: true,
        },
        title: {
            text: 'Weight values',
            floating: false,
            style: {
                fontSize: '18px',
                fontFamily: 'Satoshi',
                fontWeight: 'medium',
                color: '#E7842D' // Set the text color here
            }
        },
        strokeOpacity: 0,
        //colors: ["#E7842D"],

        stroke: {
            show: false,
        },
        xaxis: {
            labels: {
                style: {
                    colors: '#989898',
                }
            }
        },
        yaxis: {
            // grid: {
            //     lines: [] // Set to false to remove the horizontal grid lines
            // },
            labels: {
                style: {
                    colors: '#989898',
                }
            },
            min: 0
        }
    });

    // const [series, setSeries] = useState(
    //     [

    //     ]


    // );

    const [series, setSeries] = useState(

        [
            {
                name: "Series 1",
                data: [
                    { x: 'W1', y: 0 },
                    { x: 'W2', y: 10 },
                    { x: 'W3', y: 13 },
                    { x: 'W4', y: 32 }
                ]
            },
            {
                name: "Series 2",
                data: [
                    { x: 'W1', y: 43 },
                    { x: 'W2', y: 43 },
                    { x: 'W3', y: 43 },
                    { x: 'W4', y: 43 }
                ]
            },
            {
                name: "Series 3",
                data: [
                    { x: 'W1', y: 50 },
                    { x: 'W2', y: 65 },
                    { x: 'W3', y: 75 },
                    { x: 'W4', y: 88 }
                ]
            }
        ]
    );

    return (
        <ReactApexChart options={options} series={series} type="heatmap" />
    );
}





