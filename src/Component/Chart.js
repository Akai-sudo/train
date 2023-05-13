import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

export default function Chart({ data }) {
    return (
        <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="uv" stroke="#E7842D" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
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