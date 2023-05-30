import Loading from './Loading';
import { useEffect, useState } from "react";
import { useSpring, animated } from '@react-spring/web'
import Dropdown from 'react-bootstrap/Dropdown';

export default function Params({ data, dataset }) {



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
                <li>Dataset: {dataset}</li>
                <li>Epochs: {data["epochs"]} </li>
                <li>Samples: {data["batches"]}</li>
                <li>Hidden layers: {data["layers"]}</li>
                {/* <li>Number of iterations: { data["iter"]} </li> */}
                <li>Neurons per layer: {data["neurons"]} </li>
                {/* <li>Accuracy: </li>
              <li>Loss rate: </li>
              <li>Dataset: </li> */}
            </ul>
        </div>

    );
}