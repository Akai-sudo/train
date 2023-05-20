import Loading from './Loading';
import { useSpring, animated } from '@react-spring/web'

export default function Params({ data }) {
    const opacityProps = useSpring({
        config: { duration: 1000 },
        textShadow: `0 25px 50px -12px #000;`,
        from: { opacity: 0, x: 30 },
        to: { opacity: 1, x: 0 }
    });

    return (
        <animated.div
            style={{
                ...opacityProps,
            }}
        >
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
        </animated.div>
    );
}