import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import Loading from './Loading';

const Space = ({ props }) => {
    return (
        <Canvas>
            {/* {props.neurons ? <Stars count={props.neurons} /> : <Loading />} */}
            <Stars count={64} />
        </Canvas>
    );
};

export default Space;