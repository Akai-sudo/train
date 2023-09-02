// // import React, { useRef, useEffect } from 'react';
import React, { useRef, useEffect, useState } from 'react';

// const Signal = (props) => {
//     const currentEpoch = props.slider;
//     const activation_amplitudes = props.activations;
//     console.log("A", activation_amplitudes[currentEpoch][0].flat())
//     const flat_amplitudes = activation_amplitudes[currentEpoch][0].flat() //prvi layer
//     const canvasRef = useRef(null);
//     const animationRef = useRef(null);

//     const frequency = 0.02;
//     const canvasWidth = 700;
//     const canvasHeight = 400;
//     const color = "#E7842D";
//     //const frameDelay = 100;

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext('2d');

//         const drawSignal = (amplitude_array) => {
//             ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//             ctx.beginPath();
//             ctx.moveTo(0, ctx.canvas.height / 2);
//             ctx.strokeStyle = color;

//             for (let x = 0; x < ctx.canvas.width; x++) {
//                 const index = Math.floor((x / ctx.canvas.width) * amplitude_array.length);
//                 const amplitude = amplitude_array[index];
//                 const y = Math.cos(x * frequency) * (amplitude * (canvasHeight / 2)) + ctx.canvas.height / 2;
//                 ctx.lineTo(x, y);
//             }

//             ctx.stroke();
//         };

//         const animateSignal = (layer_activations) => {
//             let frame = 0;

//             const animate = () => {
//                 const amplitude_array = layer_activations

//                 drawSignal(amplitude_array);

//                 // frame++;
//                 // if (frame < layer_activations.length) {
//                 //     animationRef.current = setTimeout(animate, frameDelay);
//                 // }
//                 frame++;
//                 animationRef.current = setTimeout(animate,)
//             };

//             animate();
//         };

//         animateSignal(flat_amplitudes);

//         return () => cancelAnimationFrame(animationRef.current);
//     }, [flat_amplitudes, currentEpoch]);

//     return <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />;
// };

// export default Signal;



const Signal = (props) => {
    const currentEpoch = props.slider;
    const activation_amplitudes = props.activations;

    const canvasRef = useRef(null);
    // const [ampl, setAmpl] = useState(0)

    const layer_activations = activation_amplitudes[currentEpoch]; // 3*120


    const amplitude_activations = layer_activations[0]; //1-120
    const amplitude_activations1 = layer_activations[1]; //1-120
    const amplitude_activations2 = layer_activations[2]; //1-120

    const amplitude_array = [];
    const amplitude_array1 = [];
    const amplitude_array2 = [];
    for (let i = 0; i < amplitude_activations.length; i++) {
        amplitude_array[i] = amplitude_activations[i][0];
        amplitude_array1[i] = amplitude_activations1[i][0];
        amplitude_array2[i] = amplitude_activations2[i][0];
    }

    // console.log("UNSCALED AMPS", amplitude_array)
    let min = -1;
    let max = 1;
    let range = max - min;
    let scaled_amps = amplitude_array.map((value) => (2 * (value - min) / range) - 1);
    const scaled_amps1 = amplitude_array1.map((value) => (2 * (value - min) / range) - 1);
    const scaled_amps2 = amplitude_array2.map((value) => (2 * (value - min) / range) - 1);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.font = "30px Arial";
        const color = "#E7842D";
        let time = 0;

        function animate() {
            time += 0.04;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            for (let cnt = 0; cnt < canvas.width; cnt++) {
                const index = Math.floor((cnt / ctx.canvas.width) * scaled_amps.length);

                const amp = (scaled_amps[index]) * Math.floor(Math.cos(time + cnt * 0.05));
                // const easedAmp = cubicInOut(amp);
                ctx.lineTo(
                    cnt,
                    canvas.height * 0.25 - (20 * amp)
                );

            }
            ctx.strokeStyle = "#ff9e4a";
            ctx.stroke()

            ctx.beginPath();
            // ctx.fillText("Hello World", 10, 50);
            for (let cnt = 0; cnt < canvas.width; cnt++) {
                const index = Math.floor((cnt / ctx.canvas.width) * scaled_amps1.length);
                const amp = (scaled_amps1[index]) * Math.floor(Math.cos(time + cnt * 0.05));
                // const easedAmp = cubicInOut(amp);

                ctx.lineTo(
                    cnt,
                    canvas.height * 0.5 - (20 * amp)
                );

            }
            ctx.strokeStyle = "#E7842D";
            ctx.stroke();


            ctx.beginPath();
            // ctx.fillText("Hello World", 10, 50);
            for (let cnt = 0; cnt < canvas.width; cnt++) {
                const index = Math.floor((cnt / ctx.canvas.width) * scaled_amps2.length);
                const amp = (scaled_amps2[index]) * Math.floor(Math.cos(time + cnt * 0.05));
                // const easedAmp = cubicInOut(amp);

                ctx.lineTo(
                    cnt,
                    canvas.height * 0.75 - (20 * amp)
                );

            }
            ctx.strokeStyle = "#ff8820";
            ctx.stroke();

            requestAnimationFrame(animate);
        }

        animate();
    }, [scaled_amps, scaled_amps1, scaled_amps2]);

    return (
        <>
            {/* <div>Amplitude: {ampl}</div> */}
            <div className="activations">

                <div className="layers">
                    <p>Layer 1</p>
                    <p>Layer 2</p>
                    <p>Layer 3</p>
                </div>

                <canvas ref={canvasRef} width={500} height={400} />
            </div>
        </>
    );
};

export default Signal;
