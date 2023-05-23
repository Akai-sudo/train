import ReactApexChart from 'react-apexcharts';
import { useEffect, useState } from "react";
import { scaleLinear } from 'd3-scale';
import { interpolateRgb } from 'd3-interpolate';


export default function Heatmap(props) {

    const weights = props.weights
    const layers = props.layers
    const neurons = props.neurons

    //console.log(weights[0])
    //console.log("alo" + weights[0].length)
    // const seriesNames = props.layers;
    // const values = props.weights;

    // if (values !== undefined) {
    //     const dataStructure = seriesNames.map((name, index) => ({
    //         name,
    //         data: values[index].map((value, i) => ({ x: `W${i + 1}`, y: value }))
    //     }));
    //     console.log(dataStructure)
    // }

    const [series, setSeries] = useState(

        [

        ]
    );

    // const mappedWeights = []
    // for (let i = 0; i < weights[0].length; i++) {

    //     mappedWeights.push({ name: `Layer ${i + 1}`, data: weights[0][i] });
    // }
    // console.log(mappedWeights);

    // setSeries(mappedWeights);

    useEffect(() => {

        const mappedWeights = []
        for (let i = 0; i < weights[0].length; i++) {

            // mappedWeights.push({
            //     name: `Layer ${i + 1}`, data: [{ x: `W${i + 1}`, w: weights[0][i] }]
            // });
            mappedWeights.push({
                name: `Layer ${i + 1}`,
                data: weights[0][i].map((value, j) => ({ x: `W${j + 1}`, y: value }))
            });
        }
        console.log(mappedWeights)

        setSeries(mappedWeights);
    }, []);



    // const series = weights[0].map((data, index) => {
    //     const newData = [];

    //     for (let i = 0; i < data.data.length; i++) {
    //         // Perform additional logic here
    //         // You can access each data point using data.data[i]
    //         // Modify or process the data as needed

    //         newData.push({ x: `W${i + 1}`, y: data.data[i] });
    //     }

    //     return {
    //         name: data.name,
    //         data: newData
    //     };
    // });


    // const [series, setSeries] = useState(

    //     [
    //         {
    //             name: "Series 1",
    //             data: [
    //                 { x: 'W1', y: 0 },
    //                 { x: 'W2', y: 10 },
    //                 { x: 'W3', y: 13 },
    //                 { x: 'W4', y: 32 }
    //             ]
    //         },
    //         {
    //             name: "Series 2",
    //             data: [
    //                 { x: 'W1', y: 43 },
    //                 { x: 'W2', y: 43 },
    //                 { x: 'W3', y: 43 },
    //                 { x: 'W4', y: 43 }
    //             ]
    //         },
    //         {
    //             name: "Series 3",
    //             data: [
    //                 { x: 'W1', y: 50 },
    //                 { x: 'W2', y: 65 },
    //                 { x: 'W3', y: 75 },
    //                 { x: 'W4', y: 88 }
    //             ]
    //         }
    //     ]
    // );


    const [options, setOptions] = useState({
        chart: {
            height: 500,
            width: 1000,
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
                            from: -1,
                            to: 0,
                            color: "#989898" // Gray color at value 0
                        },
                        {
                            from: 0,
                            to: 1,
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
            enabled: false,
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


    return (
        <ReactApexChart options={options} series={series} type="heatmap" />
    );
}
