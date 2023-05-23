import Loading from './Loading';
import { useEffect, useState } from "react";
import { useSpring, animated } from '@react-spring/web'
import Dropdown from 'react-bootstrap/Dropdown';

export default function Params({ data }) {
    // const [selectedDataset, setDataset] = useState('moons')


    // // const datasetHandler = (event) => {
    // //     console.log("changed!")
    // //     setDataset(event.target.value);
    // //     console.log(selectedDataset);
    // // };

    // const datasetHandler = (dataset) => {

    //     setDataset(dataset);
    // };
    //console.log(selectedDataset)

    // useEffect(() => {
    //     const sendToFlask = async () => {
    //         //setLoading(true);
    //         await fetch(process.env.REACT_APP_URL, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json'
    //             },
    //             body: JSON.stringify({ selectedDataset }),
    //             mode: 'cors'
    //         })
    //             .then(res => res.json())
    //             .then(data => {

    //             }).catch((e) => {
    //                 console.log(e);
    //             })
    //     }
    //     sendToFlask();
    // }, [])


    const opacityProps = useSpring({
        config: { duration: 1000 },
        textShadow: `0 25px 50px -12px #000;`,
        from: { opacity: 0, x: 30 },
        to: { opacity: 1, x: 0 }
    });

    return (


        <div>
            <b>Neural Network parameters: </b>
            <ul className="no-bullets">
                <li>Epochs: {data ? data["epochs"] : <Loading />} </li>
                <li>Batch size: {data ? data["batches"] : <Loading />}</li>
                <li>Layers: {data ? data["layers"] : <Loading />}</li>
                {/* <li>Number of iterations: {data ? data["iter"] : <Loading />} </li> */}
                <li>Neurons per layer: {data ? data["neurons"] : <Loading />} </li>
                {/* <li>Accuracy: </li>
              <li>Loss rate: </li>
              <li>Dataset: </li> */}
            </ul>
        </div>

    );
}