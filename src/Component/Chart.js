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

    return (
        <LineChart width={600} height={300} data={lossyarray} >
            <Line type="monotone" dataKey="Loss" stroke="#E7842D" strokeWidth={1.5} dot={false} />
            {/* <CartesianGrid stroke="#ccc" strokeDasharray="10 10" /> */}
            <XAxis dataKey="name"

            />
            <YAxis type="number"
                tickFormatter={(value) => value.toFixed(2)} />
            <Tooltip formatter={(value) => value.toFixed(5)}
            />
        </LineChart>
    );
}
