import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { Stars, OrbitControls, Line } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

//tale dela
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

import * as THREE from 'three';


import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

//tale dela
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass';



// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

// import StarLine from './StarLine';

extend({ EffectComposer, UnrealBloomPass, RenderPass });

const Space = (props) => {
    const [hovered, hover] = useState(false);
    const [bloomEnabled, setBloomEnabled] = useState(true); // State variable to track bloom effect
    const weights = props.weights;
    const layers = props.layers;
    const neurons = props.neurons;
    const slider = props.slider;

    console.log(weights)

    const currentEpoch = weights[slider];
    const [stars, setStars] = useState([]);
    const [starLines, setStarLines] = useState([]);

    const StarLine = ({ startPosition, endPosition }) => {
        const start = new THREE.Vector3(...startPosition);
        const end = new THREE.Vector3(...endPosition);
        return (
            <Line points={[start, end]} color="white" linewidth={2} />
        );
    };

    useEffect(() => {
        const newStars = [];
        const newStarLines = []; // Array to store the star lines

        for (let layer in currentEpoch) {
            if (currentEpoch.hasOwnProperty(layer)) {
                const magnitudes = currentEpoch[layer];
                const min = Math.min(...magnitudes);
                const max = Math.max(...magnitudes);
                let scaled = magnitudes;
                if (magnitudes.length > 1) {
                    const range = max - min;
                    scaled = magnitudes.map((value) => (2 * (value - min) / range) - 1);
                }

                for (let index = 0; index < scaled.length; index++) {
                    newStars.push({
                        position: [layer, Math.random(Math.cos(layer)), Math.random(Math.cos(index))],
                        brightness: scaled[index],
                    });
                    if (index > 0) {
                        // if (index < scaled.length - 1) {
                        newStarLines.push({
                            startPosition: newStars[index - 1].position,
                            endPosition: newStars[index].position,
                        });
                    }
                }
                // for (let magnitude in scaled) {
                //     newStars.push({
                //         position: [layer, -1, 2],
                //         brightness: scaled[magnitude],
                //     });
                // }
            }
        }
        setStars(newStars);
        setStarLines(newStarLines);
    }, [currentEpoch, weights, layers, neurons, slider]);



    // for (let layer in currentEpoch) {
    //     if (currentEpoch.hasOwnProperty(layer)) {
    //         const magnitudes = currentEpoch[layer];
    //         const min = Math.min(...magnitudes);
    //         const max = Math.max(...magnitudes);
    //         let scaled = magnitudes;
    //         if (magnitudes.length > 1) {
    //             const range = max - min;
    //             scaled = magnitudes.map((value) => (2 * (value - min) / range) - 1);
    //         }

    //         for (let magnitude in scaled) {
    //             stars.push({
    //                 position: [layer, -1, 2],
    //                 brightness: scaled[magnitude],
    //             });
    //         }
    //     }
    // }

    const Star = ({ position, brightness }) => {
        return (
            <mesh position={position}>
                {/* <pointLight intensity={brightness} /> */}
                <pointLight intensity={brightness * 120} />
                <sphereGeometry args={[0.02, 64, 64]} />
                {/* <meshBasicMaterial color="white" toneMapped={false} /> */}
                <meshPhongMaterial shininess={200} flatShading={true} scale={10} metalness={0.2} roughness={0.2} />
                {/* <meshNormalMaterial color={"white"} flatShading={true} scale={10} metalness={0.2} roughness={0.2} /> */}
            </mesh>
        );
    };

    // const composer = useRef();
    // const bloomPass = useRef();



    // useEffect(() => {
    //     if (composer.current && bloomEnabled) {
    //         const pass = new BloomPass({
    //             strength: 1.5,
    //             radius: 1,
    //             threshold: 0,
    //         });

    //         composer.current.addPass(pass);
    //         bloomPass.current = pass;
    //     } else {
    //         if (composer.current && bloomPass.current) {
    //             composer.current.removePass(bloomPass.current);
    //             bloomPass.current = null;
    //         }
    //     }
    // }, [bloomEnabled]);



    return (
        <div style={{ height: '400px' }}>
            <Canvas>
                {/* <EffectComposer ref={composer}>
                    <RenderPass args={[null, null]} />
                    {bloomEnabled && <Bloom />}
                </EffectComposer> */}
                {/* <EffectComposer>
                    <Bloom />
                </EffectComposer>

                <Stars /> */}
                <Stars depth={10} saturation={0} factor={4} fade speed={0} />
                <EffectComposer>

                    <Bloom intensity={0.5} luminanceThreshold={0} luminanceSmoothing={0.9} />
                    <ambientLight intensity={0.1} />
                    <pointLight intensity={2} position={[0, 0, 0]} />
                    {/* <SpaceBloom> */}
                    {stars.map((star, index) => (
                        <Star key={index} position={star.position} brightness={star.brightness} />
                    ))}


                    {/* </SpaceBloom> */}

                    <OrbitControls />
                    {/* <EffectComposer> */}
                    {/* <EffectComposer ref={composer}> */}
                    {/* {bloomEnabled && <Bloom />} */}
                    {/* <Bloom /> */}
                    {/* </EffectComposer> */}
                    {/* <axesHelper args={[2, 2, 2]} /> */}
                </EffectComposer>
                {starLines.map((line, index) => (
                    <StarLine key={index} startPosition={line.startPosition} endPosition={line.endPosition} />
                ))}
            </Canvas>
            {/* <label>
                <input
                    type="checkbox"
                    checked={bloomEnabled}
                    onChange={() => setBloomEnabled(!bloomEnabled)}
                />
                Enable Bloom
            </label> */}
        </div>
    );
};

// const SpaceBloom = ({ enabled, children }) => {
//     // const { gl, scene, camera, size } = useThree();
//     // const composer = useRef();

//     // useEffect(() => {
//     //     composer.current.setSize(size.width, size.height);
//     // }, [size]);

//     // useFrame(() => {
//     //     if (composer.current) {
//     //         composer.current.render();
//     //     }
//     // }, 1);

//     return (
//         <>
//             {enabled && (
//                 <EffectComposer>
//                     <RenderPass attachArray="passes" />
//                     <BloomPass attachArray="passes" args={[1, 25, 5, 512]} />
//                 </EffectComposer>
//             )}
//             {/* <scene ref={scene} />
//             <camera ref={camera} /> */}
//             {children}
//         </>
//     );
// };

export default Space;

// import React, { useRef, useEffect } from 'react';
// import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
// import { Stars, OrbitControls } from '@react-three/drei';
// import { Bloom, EffectComposer, DepthOfField } from '@react-three/postprocessing';
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';


// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

// extend({ EffectComposer, UnrealBloomPass });

// const Space = (props) => {

//     const weights = props.weights
//     const layers = props.layers
//     const neurons = props.neurons
//     const slider = props.slider

//     const currentEpoch = weights[slider];

//     const stars = [];
//     const { gl } = useThree(); // Access the WebGL renderer



//     for (let layer in currentEpoch) {
//         if (currentEpoch.hasOwnProperty(layer)) {
//             const magnitudes = currentEpoch[layer];
//             //console.log("ADA", magnitudes)
//             //const scaled_magnitudes = scale_interval(magnitudes)
//             const min = Math.min(...magnitudes);
//             const max = Math.max(...magnitudes);
//             let scaled = magnitudes;
//             if (magnitudes.length > 1) {
//                 const range = max - min;
//                 scaled = magnitudes.map((value) => (2 * (value - min) / range) - 1);
//                 //console.log("SKALA", scaled)
//             }

//             for (let magnitude in scaled) {
//                 stars.push({
//                     position: [layer, 0, 0],
//                     brightness: scaled[magnitude],
//                     //data: [{ x: `W${index}`, y: magnitude }],
//                     // data: scaled.map((value, weight_index) => ({ x: `W${weight_index + 1}`, y: value }))
//                 });
//             }


//         }
//     }

//     // const stars = [
//     //     { position: [-2, 0, 0], brightness: 1 },
//     //     { position: [0, 0, 0], brightness: 0.5 },
//     //     { position: [2, 0, 0], brightness: 0.2 },
//     //     // Add more stars with their positions and brightness values
//     // ];
//     const Star = ({ position, brightness }) => {
//         return (
//             <mesh position={position}>
//                 <pointLight intensity={brightness} />
//                 <sphereBufferGeometry args={[0.05, 16, 16]} />
//                 <meshBasicMaterial color="#ffffff" />
//             </mesh>
//         );
//     };
//     const composer = useRef();

//     useEffect(() => {
//         if (composer.current) {
//             const bloomPass = new UnrealBloomPass();
//             bloomPass.strength = 1.5;
//             bloomPass.radius = 1;
//             bloomPass.threshold = 0;

//             composer.current.addPass(bloomPass);

//             return () => {
//                 composer.current.removePass(bloomPass);
//             };
//         }
//     }, [composer.current]);


//     return (

//         // <>
//         //     <EffectComposer>
//         //         <RenderPass />
//         // <Bloom />
//         <Canvas>

//             <Stars>
//                 {stars.map((star, index) => (
//                     <Star key={index} position={star.position} brightness={star.brightness} />
//                 ))}
//             </Stars>
//             <OrbitControls />
//             <EffectComposer ref={composer} args={[gl]}>
//                 <unrealBloomPass attachArray="passes" args={[undefined, 1.5, 0.4, 0.85]} />
//                 <depthOfFieldPass attachArray="passes" args={[undefined, 0.5, 0.1, 0.1]} />
//             </EffectComposer>
//         </Canvas>
//         //     </EffectComposer>
//         // </>

//     );
// };

// export default Space;