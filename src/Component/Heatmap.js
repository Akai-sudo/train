import ReactApexChart from 'react-apexcharts';
import { useState } from "react";

export default function Heatmap() {
    const [options, setOptions] = useState({
        chart: {
            height: 250,
            type: 'heatmap',
            background: '#353535', // Set the background color here
        },
        // theme: {
        //     monochrome: {
        //         enabled: true,
        //         color: '#E7842D',
        //         shadeTo: 'black',
        //         shadeIntensity: 1
        //     }
        // },
        theme: {
            mode: 'light',
            //palette: 'palette1',
            monochrome: {
                enabled: true,
                color: '#E7842D',
                shadeTo: 'light',
                shadeIntensity: 0.65,
                inverseShade: true
            },
        },
        plotOptions: {
            heatmap: {
                radius: 20,
                enableShades: false,
                // inverse: true,
                // colorScale: {
                //     ranges: [
                //         {
                //             from: 0,
                //             to: 100,
                //             color: '#E7842D' // Set the color for the heatmap
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
            enabled: false
        },
        title: {
            text: 'Weight values',
            floating: false,
            style: {
                fontSize: '18px',
                fontFamily: 'Satoshi',
                fontWeight: 'semi-bold',
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
                    colors: ["E7842D"],
                }
            }
        },
        yaxis: {
            // grid: {
            //     lines: [] // Set to false to remove the horizontal grid lines
            // },
            labels: {
                style: {
                    colors: ["E7842D"],
                }
            },
            min: 0
        }
    });

    const [series, setSeries] = useState([
        {
            name: "Series 1",
            data: [
                { x: 'W1', y: 22, color: "#E7842D" },
                { x: 'W2', y: 29, color: "#E7842D" },
                { x: 'W3', y: 13, color: "#E7842D" },
                { x: 'W4', y: 32, color: "#E7842D" }
            ]
        },
        {
            name: "Series 2",
            data: [
                { x: 'W1', y: 43, color: "#E7842D" },
                { x: 'W2', y: 43, color: "#E7842D" },
                { x: 'W3', y: 43, color: "#E7842D" },
                { x: 'W4', y: 43, color: "#E7842D" }
            ]
        },
        {
            name: "Series 3",
            data: [
                { x: 'W1', y: 50, color: "#E7842D" },
                { x: 'W2', y: 65, color: "#E7842D" },
                { x: 'W3', y: 75, color: "#E7842D" },
                { x: 'W4', y: 88, color: "#E7842D" }
            ]
        }
    ]);

    return (
        <ReactApexChart options={options} series={series} type="heatmap" />
    );
}



// import ReactApexChart from 'react-apexcharts';
// import { useEffect, useState } from "react";

// export default function Heatmap() {

//     const [options, setOptions] = useState({
//         options: {
//             chart: {
//                 height: 350,
//                 type: 'heatmap',
//             },
//             dataLabels: {
//                 enabled: false
//             },
//             title: {
//                 text: 'Weight values'
//             },
//             colors: ["#E7842D"] // Update the colors property here
//         },
//     })

//     const [series, setSeries] = useState([
//         {
//             name: "Series 1",
//             data: [
//                 { x: 'W1', y: 22, color: "#E7842D" },
//                 { x: 'W2', y: 29, color: "#E7842D" },
//                 { x: 'W3', y: 13, color: "#E7842D" },
//                 { x: 'W4', y: 32, color: "#E7842D" }
//             ]
//         },
//         {
//             name: "Series 2",
//             data: [
//                 { x: 'W1', y: 43, color: "#E7842D" },
//                 { x: 'W2', y: 43, color: "#E7842D" },
//                 { x: 'W3', y: 43, color: "#E7842D" },
//                 { x: 'W4', y: 43, color: "#E7842D" }
//             ]
//         },
//         {
//             name: "Series 3",
//             data: [
//                 { x: 'W1', y: 50, color: "#E7842D" },
//                 { x: 'W2', y: 65, color: "#E7842D" },
//                 { x: 'W3', y: 75, color: "#E7842D" },
//                 { x: 'W4', y: 88, color: "#E7842D" }
//             ]
//         }
//     ]);

//     // const colors = ['#E7842D']
//     // series.forEach((data, index) => {
//     //     data.data.forEach((point) => {
//     //         point.color = colors[index % colors.length];
//     //     });
//     // });

//     // useEffect(() => {
//     //     setOptions(options)
//     //     setSeries(series)
//     // }, [options, series])


//     return (
//         <ReactApexChart options={options} series={series} type="heatmap" />);
// }

// import ReactApexChart from 'react-apexcharts';
// import { useState } from "react";

// export default function Heatmap() {
//     const [options, setOptions] = useState({
//         options: {
//             chart: {
//                 height: 350,
//                 type: 'heatmap',
//             },
//             plotOptions: {
//                 heatmap: {
//                     radius: 0,
//                     enableShades: false,
//                     colorScale: {
//                         mode: "withoutBorder",
//                         ranges: [
//                             {
//                                 from: 0,
//                                 to: 100,
//                                 color: '#E7842D' // Set the color for the heatmap
//                             }
//                         ]
//                     }
//                 }
//             },

//             dataLabels: {
//                 enabled: false
//             },
//             title: {
//                 text: 'Weight values'
//             },
//             plotOptions: {
//                 heatmap: {
//                     colorScale: {
//                         mode: "withoutBorder"
//                     }
//                 }
//             },
//         },
//         colors: ["#E7842D"]
//     });

//     const [series, setSeries] = useState([
//         {
//             name: "Series 1",
//             data: [
//                 { x: 'W1', y: 22 },
//                 { x: 'W2', y: 29 },
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
//     ]);

//     return (
//         <ReactApexChart options={options} series={series} type="heatmap" />
//     );
// }

// import ReactApexChart from 'react-apexcharts';
// import { useState } from "react";

// export default function Heatmap() {
//     const [options, setOptions] = useState({
//         chart: {
//             height: 350,
//             type: 'heatmap',
//         },
//         plotOptions: {
//             heatmap: {
//                 radius: 0,
//                 enableShades: false,
//                 colorScale: {
//                     mode: "withoutBorder",
//                     ranges: [
//                         {
//                             from: 0,
//                             to: 100,
//                             color: '#E7842D', // Set the color for the heatmap
//                             borderWidth: 0
//                         }
//                     ]
//                 }
//             }
//         },
//         dataLabels: {
//             enabled: false
//         },
//         title: {
//             text: 'Weight values'
//         },
//         colors: ["#E7842D"]
//     });

//     const [series, setSeries] = useState([
//         {
//             name: "Series 1",
//             data: [
//                 { x: 'W1', y: 22 },
//                 { x: 'W2', y: 29 },
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
//     ]);

//     return (
//         <ReactApexChart options={options} series={series} type="heatmap" />
//     );
// }

// import ReactApexChart from 'react-apexcharts';
// import { useState } from "react";

// export default function Heatmap() {
//     const [options, setOptions] = useState({
//         chart: {
//             height: 350,
//             type: 'heatmap',
//             toolbar: {
//                 show: false // Hide the default toolbar
//             }
//         },
//         plotOptions: {
//             heatmap: {
//                 radius: 0,
//                 enableShades: false,
//                 colorScale: {
//                     ranges: [
//                         {
//                             from: 0,
//                             to: 100,
//                             color: '#E7842D', // Set the color for the heatmap
//                         }
//                     ]
//                 }
//             }
//         },
//         dataLabels: {
//             enabled: false
//         },
//         title: {
//             text: 'Weight values'
//         },
//         colors: ["#E7842D"],
//         stroke: {
//             colors: ['#353535'] // Set the stroke color for grid lines
//         }
//     });

//     const [series, setSeries] = useState([
//         {
//             name: "Series 1",
//             data: [
//                 { x: 'W1', y: 22 },
//                 { x: 'W2', y: 29 },
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
//     ]);

//     // Custom CSS styles
//     const chartStyle = {
//         '& .apexcharts-gridline': {
//             stroke: 'none' // Remove the stroke (border) of grid lines
//         }
//     };

//     return (
//         <div style={chartStyle}>
//             <ReactApexChart options={options} series={series} type="heatmap" />
//         </div>
//     );
// }


