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
    const [ampl, setAmpl] = useState(0)

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

    // min = 0;
    // max = 100;
    // range = max - min;

    // scaled_amps = scaled_amps.map((value) => (2 * (value - min) / range) - 1);
    //const scaled_amps = amplitude_array.map((value) => (10 * value));
    // console.log("SCALED AMPS", scaled_amps)
    // console.log(scaled_amps)
    // const canvasWidth = 200;
    // const canvasHeight = 400;

    // useEffect(() => {
    //     const canvas = canvasRef.current;
    //     const ctx = canvas.getContext("2d");
    //     // ctx.font = "30px Arial";
    //     // canvas.width = canvasWidth
    //     // canvas.height = canvasHeight;
    //     const color = "#E7842D";
    //     let time = 0;


    //     function animate() {

    //         ctx.lineWidth = 2;
    //         const frequency = (2 * Math.PI) / canvas.width;




    //         //ctx.save();
    //         //ctx.translate(0, canvas.height / 2);
    //         // while (x < canvas.width) {

    //         //     ctx.lineTo(x, y);
    //         //     x++;
    //         // }
    //         // const amps = [10, 1, 10];
    //         // let rand = Math.random()
    //         for (let current_amp = 0; current_amp < scaled_amps.length; current_amp++) {
    //             // let amp = 0;
    //             // ctx.closePath();
    //             ctx.clearRect(0, 0, canvas.width, canvas.height);
    //             ctx.beginPath()
    //             // ctx.moveTo(0, canvas.height / 2);
    //             // ctx.lineTo(0, canvas.height / 2);
    //             let amplitude = 10 * scaled_amps[current_amp];
    //             // const amplitude = current_amp
    //             //console.log("AMP", amplitude)
    //             // amp += 30 * amplitude
    //             console.log("AMPA", amplitude)
    //             for (let x = 0; x <= canvas.width; x++) {
    //                 let amp;
    //                 if (x < 200) {
    //                     amp = 50;
    //                 } else if (x >= 200 && x < 350) {
    //                     amp = 100;
    //                 } else if (x >= 350) {
    //                     amp = 10;
    //                 }
    //                 //console.log("TRENUTNA", amplitude)
    //                 const y = amplitude * Math.cos(frequency * x + time);
    //                 ctx.lineTo(x, canvas.height * 0.5 - y);

    //                 // const index = x % scaled_amps.length; //tale dela
    //             }
    //             // ctx.lineTo(canvas.width, canvas.height / 2);

    //         }

    //         //fill pod wave
    //         // ctx.lineTo(canvas.width, canvas.height);
    //         // ctx.lineTo(0, canvas.height);
    //         // ctx.closePath();

    //         // ctx.fillStyle = "#f8994ca2";
    //         // ctx.fill();

    //         ctx.strokeStyle = color;
    //         ctx.stroke()
    //         // ctx.restore()
    //         // ctx.closePath();
    //         time += 0.8
    //         requestAnimationFrame(animate)
    //     }

    //     animate();

    //     // for (let w = 0; w < canvas.width; w++) {
    //     //     const cos = Math.cos(2* Math.PI / canvas.width + time)
    //     //     ctx.lineTo(w, )
    //     // }
    //     // return () => cancelAnimationFrame(animate)
    //     // cancelAnimationFrame()

    // }, [scaled_amps])

    // useEffect(() => {
    //     const canvas = canvasRef.current;
    //     const ctx = canvas.getContext("2d");
    //     const color = "#E7842D";
    //     let time = 0;

    //     function animate() {
    //         ctx.clearRect(0, 0, canvas.width, canvas.height);
    //         ctx.lineWidth = 2;

    //         const frequency = (2 * Math.PI) / canvas.width;
    //         const period = scaled_amps.length;

    //         for (let currentPeriod = 0; currentPeriod < period; currentPeriod++) {
    //             ctx.beginPath();
    //             ctx.moveTo(0, canvas.height / 2);

    //             const current_amp = scaled_amps[currentPeriod];
    //             const next_amp = scaled_amps[(currentPeriod + 1) % period];

    //             for (let x = 0; x <= canvas.width; x++) {
    //                 const t = (x / canvas.width) * (2 * Math.PI);
    //                 const current_amp = scaled_amps[currentPeriod];
    //                 const next_amp = scaled_amps[(currentPeriod + 1) % period];
    //                 const amplitude =
    //                     current_amp + ((next_amp - current_amp) * t) / (2 * Math.PI);
    //                 const y = 30 * amplitude * Math.cos(frequency * x + time);
    //                 ctx.lineTo(x, canvas.height / 2 - y);
    //             }

    //             ctx.strokeStyle = color;
    //             ctx.stroke();
    //         }

    //         time += 1;
    //         requestAnimationFrame(animate);
    //     }

    //     animate();
    // }, [scaled_amps]);


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.font = "30px Arial";
        const color = "#E7842D";
        let time = 0;
        let current = 0;

        function animate() {
            time += 0.04;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            // ctx.fillText("Hello World", 10, 50);
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
            // if (current === 0) {
            //     ctx.strokeStyle = "#fff";
            //     ctx.stroke();

            // } else {
            //     ctx.strokeStyle = "#fff";
            //     ctx.stroke();
            // }

            //ctx.stroke();



            requestAnimationFrame(animate);
        }

        animate();
    }, [scaled_amps, scaled_amps1, scaled_amps2]);

    return (
        <>
            {/* <div>Amplitude: {ampl}</div> */}
            <canvas ref={canvasRef} width={500} height={400} />
        </>
    );
};

export default Signal;


// const Signal = (props) => {

//     const currentEpoch = props.slider
//     const activation_amplitudes = props.activations

//     console.log("mja", currentEpoch)
//     console.log("nja", activation_amplitudes[currentEpoch])
//     const canvasRef = useRef(null);

//     const frequency = 0.02; // Frekvenca
//     const layer_activations = activation_amplitudes[currentEpoch]; // Amplituda

//     const aktivacije_layerja = layer_activations[0];

//     const canvasWidth = 700;
//     const canvasHeight = 300;
//     const color = "#E7842D";


//     useEffect(() => {
//         const canvas = canvasRef.current;

//         const ctx = canvas.getContext('2d');
//         let phase = 0;

//         const generateSignal = () => {
//             const { width, height } = canvas;
//             ctx.clearRect(0, 0, width, height);

//             ctx.beginPath();
//             ctx.moveTo(0, height / 2);
//             ctx.strokeStyle = color;

//             // for (let x = 0; x < width; x++) {
//             //     const y = 1 * Math.cos(x * frequency + phase) + height / 2;
//             //     ctx.lineTo(x, y);
//             // }

//             for (let x = 0; x < width; x++) {
//                 const y = 4 * Math.cos(x * frequency + phase) + height / 2;

//                 ctx.lineTo(x, y);
//             }

//             ctx.stroke();

//             phase += 0.05; // hitrost animacije
//             requestAnimationFrame(generateSignal);
//         };

//         generateSignal();

//         return () => cancelAnimationFrame(generateSignal);
//     }, []);

//     return <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />;
// };

// export default Signal;

