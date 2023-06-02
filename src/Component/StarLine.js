import { Line } from '@react-three/drei';

const StarLine = ({ startPosition, endPosition }) => {
    const points = [startPosition, endPosition];

    return (
        <Line points={points} color="white" lineWidth={1} />
    );
};

export default StarLine;
