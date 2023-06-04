import React, { useRef, useEffect } from 'react';

const Signal = () => {
    const canvasRef = useRef(null);

    const frequency = 0.02; // Frequency of the wave
    const amplitude = Math.random(frequency); // Amplitude of the wave

    const canvasWidth = 700; // Desired canvas width
    const canvasHeight = 300; // Desired canvas height
    const color = "#E7842D";

    useEffect(() => {
        const canvas = canvasRef.current;

        const ctx = canvas.getContext('2d');
        let phase = 0;

        const generateSignal = () => {
            const { width, height } = canvas;
            ctx.clearRect(0, 0, width, height);

            ctx.beginPath();
            ctx.moveTo(0, height / 2);
            ctx.strokeStyle = color;

            for (let x = 0; x < width; x++) {
                const y = x * Math.cos(x * frequency + phase) + height / 2;
                ctx.lineTo(x, y);
            }

            ctx.stroke();

            phase += 0.05; // Control the animation speed
            requestAnimationFrame(generateSignal);
        };

        generateSignal();

        return () => cancelAnimationFrame(generateSignal);
    }, []);

    return <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />;
};

export default Signal;




// const Signal = () => {
//     const lineCount = 100; // Number of lines in the wave
//     const waveLength = 800; // Length of the wave
//     const amplitude = 50; // Amplitude of the wave

//     const lines = useSprings(
//         lineCount,
//         Array.from({ length: lineCount }, (_, index) => ({
//             from: { x: 0 },
//             to: async (next) => {
//                 while (true) {
//                     await next({ x: waveLength });
//                     await next({ x: 0 });
//                 }
//             },
//             config: { duration: 2000 },
//         }))
//     );

//     return (
//         <svg>
//             {lines.map((props, index) => (
//                 <animated.line
//                     key={index}
//                     x1={0}
//                     y1={100 + amplitude * index}
//                     x2={props.x}
//                     y2={100 + amplitude * index}
//                     stroke="black"
//                     strokeWidth={2}
//                 />
//             ))}
//         </svg>
//     );
// };

// export default Signal;


// const Signal = ({ amplitude, frequency }) => {
//     const { amplitudeValue } = useSpring({
//         amplitudeValue: 0,
//         to: { amplitudeValue: 1 },
//         config: { duration: 2000 },
//         reset: true,
//         loop: { reverse: true },
//     });

//     const generatePath = (amplitudeValue) => {
//         const numPoints = Math.floor(amplitudeValue * frequency * 500);
//         let path = 'M0 100';
//         for (let i = 0; i <= numPoints; i++) {
//             const x = (i / numPoints) * 500;
//             const angle = (i / numPoints) * (frequency * 2 * Math.PI);
//             const y = 100 - amplitude * Math.sin(angle);
//             path += ` L${x} ${y}`;
//         }
//         return path;
//     };

//     useEffect(() => {
//         amplitudeValue.start();
//     }, [amplitudeValue]);

//     return (
//         <svg height="200" width="500">
//             <animated.path
//                 d={to(amplitudeValue, generatePath)}
//                 stroke="#000"
//                 strokeWidth="2"
//                 fill="none"
//             />
//         </svg>
//     );
// };

// export default Signal;




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
