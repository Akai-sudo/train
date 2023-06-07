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

extend(THREE)

const Space = (props) => {
    // const state = useThree()
    const [hovered, hover] = useState(false);
    const [bloomEnabled, setBloomEnabled] = useState(true);
    const weights = props.weights; //allweights je weightsdict, weights je magnitudes
    const layers = props.layers;
    const neurons = props.neurons;
    const slider = props.slider;

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

    console.log("Epoch: ", currentEpoch)

    function getRandomPointOnSphere(radius) {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        return [x, y, z];
    }

    useEffect(() => {
        const newStars = [];
        const newStarLines = [];

        for (let layer in currentEpoch) {
            if (currentEpoch.hasOwnProperty(layer)) {
                // const magnitudes = currentEpoch[layer];
                // const min = Math.min(...magnitudes);
                // const max = Math.max(...magnitudes);
                // let scaled = magnitudes;
                // if (magnitudes.length > 1) {
                //     const range = max - min;
                //     scaled = magnitudes.map((value) => (2 * (value - min) / range) - 1);
                // }
                const layer_neurons = currentEpoch[layer]
                for (let index = 0; index < layer_neurons.length; index++) {
                    // for (let index = 0; index < scaled.length; index++) {
                    const neuron_connections = layer_neurons[index]
                    for (let neuron_index = 0; neuron_index < neuron_connections.length; neuron_index++) {
                        newStars.push({
                            // position: [layer, Math.random(), Math.random()],
                            // position: [index % 10, Math.floor(index / 10), 0],
                            position: getRandomPointOnSphere(2),
                            brightness: neuron_connections[neuron_index],
                        });

                        if (index > 0) {
                            // if (index < scaled.length - 1) {
                            newStarLines.push({
                                startPosition: newStars[index - 1].position,
                                endPosition: newStars[index].position,
                            });
                        }
                    }

                    if (index > 0) {
                        // if (index < scaled.length - 1) {
                        newStarLines.push({
                            startPosition: newStars[index - 1].position,
                            endPosition: newStars[index].position,
                        });
                    }


                    // newStars.push({
                    //     position: [layer, Math.random(Math.cos(layer)), Math.random(Math.cos(index))],
                    //     brightness: scaled[index],
                    // });
                    // if (index > 0) {
                    //     // if (index < scaled.length - 1) {
                    //     newStarLines.push({
                    //         startPosition: newStars[index - 1].position,
                    //         endPosition: newStars[index].position,
                    //     });
                    // }
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
        console.log("New stars: ", newStars);
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
            <mesh visible userData={{ hello: 'world' }} position={position} rotation={[Math.PI / 2, 0, 0]}>
                {/* <pointLight intensity={brightness} /> */}
                <pointLight intensity={brightness * 2} />
                <sphereGeometry args={[0.02, 64, 64]} />
                <meshBasicMaterial color="white" toneMapped={false} />
                {/* <meshPhongMaterial flatShading={true} scale={10} metalness={0.2} roughness={0.2} /> */}
                {/* <meshNormalMaterial color={"white"} flatShading={true} scale={10} metalness={0.2} roughness={0.2} /> */}
            </mesh>
        );
    };




    return (
        <div style={{ height: '400px' }}>
            <Canvas frameloop="demand">

                <Stars depth={10} saturation={0} factor={4} fade speed={0} />
                <EffectComposer>

                    <Bloom intensity={0.5} luminanceThreshold={0.3} luminanceSmoothing={0} />
                    <ambientLight intensity={100} />
                    <pointLight intensity={2} position={[0, 0, 0]} />
                    {/* <SpaceBloom> */}
                    {stars.map((star, index) => (
                        <Star key={index} position={star.position} brightness={star.brightness} />
                    ))}
                    {starLines.map((line, index) => (
                        <StarLine key={index} startPosition={line.startPosition} endPosition={line.endPosition} />
                    ))}


                    <OrbitControls />
                </EffectComposer>

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

export default Space;
