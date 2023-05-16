import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

export default function Chart({ data }) {
    //const functiondata = [{ name: 'Page A', w: 100, pv: 2400, amt: 2400 }, 
    //   { name: 'Page A', w: 200, pv: 2400, amt: 2400 }, 
    //   { name: 'Page A', w: 300, pv: 2400, amt: 2400 }, 
    //   { name: 'Page A', w: 400, pv: 2400, amt: 2400 }];
    console.log("Naš chart ima data " + data)

    return (
        <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="w" stroke="#E7842D" strokeWidth={1.5} dot={false} />
            {/* <CartesianGrid stroke="#ccc" strokeDasharray="10 10" /> */}
            <XAxis dataKey="name" />
            <YAxis type="number"
                tickFormatter={(value) => value.toFixed(2)} />
        </LineChart>);
}

// const renderLineChart = (
//     <LineChart width={600} height={300} data={functiondata} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
//         <Line type="monotone" dataKey="uv" stroke="#8884d8" />
//         <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
//         <XAxis dataKey="name" />
//         <YAxis />
//     </LineChart>
// );