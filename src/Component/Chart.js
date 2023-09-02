import { useEffect, useState } from 'react';
import { LineChart, Line, Tooltip, XAxis, YAxis } from 'recharts';

export default function Chart({ slider, data }) {
    //const functiondata = [{ name: 'Page A', w: 100, pv: 2400, amt: 2400 }, 
    //   { name: 'Page A', w: 200, pv: 2400, amt: 2400 }, 
    //   { name: 'Page A', w: 300, pv: 2400, amt: 2400 }, 
    //   { name: 'Page A', w: 400, pv: 2400, amt: 2400 }];
    //console.log("Naš chart ima data " + data)
    // console.log(slider)

    //const chart_data = data[slider];
    const lossy = data;
    const lossyarray = lossy.map(x => ({ Loss: x }));
    // const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    // const [screenHeight, setScreenHeight] = useState(window.innerHeight);

    // const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const [chartWidth, setChartWidth] = useState(600);
    const [chartHeight, setChartHeight] = useState(300);

    useEffect(() => {
        const handleResize = () => {
            if (window.matchMedia("(max-width: 767px)").matches) {
                setChartWidth(420);
                setChartHeight(225);
            } else {
                setChartHeight(300);
                setChartWidth(600);
            }
        };

        window.addEventListener('resize', handleResize);


    }, []);

    return (
        <div className="loss_chart">
            <LineChart width={chartWidth} height={chartHeight} data={lossyarray} >
                <Line type="monotone" dataKey="Loss" stroke="#E7842D" strokeWidth={1.5} dot={false} />
                {/* <CartesianGrid stroke="#ccc" strokeDasharray="10 10" /> */}
                <XAxis dataKey="name"

                />
                <YAxis type="number"
                    tickFormatter={(value) => value.toFixed(2)} />
                <Tooltip formatter={(value) => value.toFixed(5)} contentStyle={{ fontSize: '17px' }}
                />
            </LineChart>
        </div>
    );
}
