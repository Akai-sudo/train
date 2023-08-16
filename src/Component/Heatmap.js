import ReactApexChart from 'react-apexcharts';
import { useEffect, useState } from "react";
import React from "react";

function Heatmap(props) {
    const weights = props.weights
    const layers = props.layers
    const neurons = props.neurons
    const slider = props.slider

    const currentEpoch = weights[slider]


    const [series, setSeries] = useState([]);


    useEffect(() => {

        const mappedWeights = [];

        for (let layer in currentEpoch) {
            if (currentEpoch.hasOwnProperty(layer)) {
                const magnitudes = currentEpoch[layer];
                const min = Math.min(...magnitudes);
                const max = Math.max(...magnitudes);
                let scaled = magnitudes;
                if (magnitudes.length > 1) {

                    const range = max - min;
                    scaled = magnitudes.map((value) => (2 * (value - min) / range) - 1);
                    //console.log("SKALA", scaled)
                }


                mappedWeights.push({
                    name: `Layer ${layer}`,
                    //data: [{ x: `W${index}`, y: magnitude }],
                    data: scaled.map((value, weight_index) => ({ x: `W${weight_index + 1}`, y: value }))
                });

            }
        }
        //console.log(mappedWeights)
        setSeries(mappedWeights);

    }, [currentEpoch, weights]);


    const [options, setOptions] = useState({

        chart: {
            height: 500,
            width: 1000,
            type: 'heatmap',
            background: '#353535', // Set the background color here
            animations: {
                disabled: false,
            },
        },
        // theme: {
        //     monochrome: {
        //         enabled: true,
        //         color: '#E7842D',
        //         shadeTo: 'black',
        //         shadeIntensity: 1
        //     }
        // },
        // theme: {
        //     mode: 'light',
        //     //palette: 'palette1',
        // },
        plotOptions: {
            heatmap: {
                radius: 4,
                enableShades: true,
                inverse: false,
                shadeIntensity: 0.5,
                reverseNegativeShade: true,
                min: -1,
                max: 1,
                colorScale: {
                    ranges: [
                        {
                            from: -1,
                            to: 0,
                            color: "#989898",
                            name: 'Low magnitude',
                            style: {
                                color: "#ffffff",
                            },
                            //foreColor: "#fff",
                        },
                        {
                            from: 0,
                            to: 1,
                            color: "#E7842D",
                            name: 'High magnitude',
                            style: {
                                color: "#ffffff",
                            },
                        }
                    ],
                },

            }
        },
        grid: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        // title: {
        //     text: 'Heatmap',
        //     floating: true,
        // },

        stroke: {
            show: true,
            width: 2,
            colors: "#E7842D",
        },
        xaxis: {
            labels: {
                style: {
                    colors: '#989898',
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#989898',
                }
            },
            min: 0
        }
    });


    return (
        <React.Fragment>
            {/* <ReactApexChart options={options} series={series} type="heatmap" width={1000} height={400} background="#353535" animations={{
                enabled: true,
            }} /> */}
            <ReactApexChart height={360} type="heatmap" options={options} series={series} className="heatmap-chart" />
        </React.Fragment>
    );
}


export default React.memo(Heatmap);
