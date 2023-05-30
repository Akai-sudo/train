import React, { useEffect } from 'react';
import { animated, to, useSpring } from '@react-spring/web';

const Signal = ({ amplitude, frequency }) => {
    const { amplitudeValue } = useSpring({
        amplitudeValue: 0,
        to: { amplitudeValue: 1 },
        config: { duration: 2000 },
        reset: true,
        loop: { reverse: true },
    });

    const generatePath = (amplitudeValue) => {
        const numPoints = Math.floor(amplitudeValue * frequency * 500);
        let path = 'M0 100';
        for (let i = 0; i <= numPoints; i++) {
            const x = (i / numPoints) * 500;
            const angle = (i / numPoints) * (frequency * 2 * Math.PI);
            const y = 100 - amplitude * Math.sin(angle);
            path += ` L${x} ${y}`;
        }
        return path;
    };

    useEffect(() => {
        amplitudeValue.start();
    }, [amplitudeValue]);

    return (
        <svg height="200" width="500">
            <animated.path
                d={to(amplitudeValue, generatePath)}
                stroke="#000"
                strokeWidth="2"
                fill="none"
            />
        </svg>
    );
};

export default Signal;




// const Signal = ({ amplitude, frequency }) => {

//     const generatePath = (amplitude) => {
//         let path = 'M0 100';
//         for (let x = 1; x <= 500; x++) {
//             const angle = (x / 500) * (frequency * 2 * Math.PI);
//             const y = 100 - amplitude * Math.sin(angle);
//             path += ` L${x} ${y}`;
//         }
//         return path;
//     };
//     const { amplitudeValue } = useSpring({
//         // from: { path: 'M0 100' },
//         // to: { path: generatePath(amplitude) },
//         // config: { duration: 2000 },
//         // reset: true,
//         // loop: { reverse: true },
//         from: { amplitudeValue: -10 },
//         to: { amplitudeValue: 10 },
//         config: { duration: 2000 },
//         reset: true,
//         loop: { reverse: true },
//     });

//     // useEffect(() => {
//     //     path.start();
//     // }, [path]);
//     useEffect(() => {
//         amplitudeValue.start();
//     }, [amplitudeValue]);

//     return (
//         <svg height="200" width="500">
//             <animated.path d={amplitudeValue.to((amplitudeValue) => generatePath(amplitudeValue))} stroke="#E7842D" strokeWidth="2" fill="none" />
//         </svg>
//     );
// };

// export default Signal;
