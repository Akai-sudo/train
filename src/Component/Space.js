import React, { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { Stars, OrbitControls, Line } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

import { LineDashedMaterial } from '@react-three/fiber';

//tale dela
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

import * as THREE from 'three';


import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass';


// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

// import StarLine from './StarLine';

extend({ EffectComposer, UnrealBloomPass, RenderPass });

extend(THREE)

const Space = (props) => {
    const weights = props.weights; //allweights je weightsdict, weights je magnitudes
    const layers = props.layers;
    //const neurons = props.neurons;
    const slider = props.slider;

    const currentEpoch = weights[slider];
    const [stars, setStars] = useState([]);
    const [starLines, setStarLines] = useState([]);


    // const StarLine = ({ startPosition, endPosition, color, delay }) => {
    //     const lineRef = useRef();
    //     const drawingProgress = useRef(0);
    //     const [isDrawing, setIsDrawing] = useState(false);
    //     const [points, setPoints] = useState([]);

    //     useEffect(() => {
    //         const start = new THREE.Vector3(...startPosition);
    //         const end = new THREE.Vector3(...endPosition);
    //         setPoints([start, end]);
    //     }, [startPosition, endPosition]);

    //     useEffect(() => {
    //         if (!isDrawing) return;

    //         if (drawingProgress.current >= 1) {
    //             setIsDrawing(false);
    //             return;
    //         }

    //         drawingProgress.current += 0.01;
    //         const line = lineRef.current;
    //         const positions = line.geometry.attributes.position.array;
    //         const numPoints = points.length;
    //         const drawRange = Math.floor(drawingProgress.current * numPoints);

    //         for (let i = 0; i < drawRange; i++) {
    //             const point = points[i];
    //             positions[i * 3] = point.x;
    //             positions[i * 3 + 1] = point.y;
    //             positions[i * 3 + 2] = point.z;
    //         }

    //         line.geometry.attributes.position.needsUpdate = true;
    //         line.geometry.setDrawRange(0, drawRange);
    //     });

    //     useEffect(() => {
    //         const line = lineRef.current;
    //         const numPoints = points.length;
    //         const positionsArray = new Float32Array(numPoints * 3);

    //         line.geometry.setAttribute(
    //             'position',
    //             new THREE.BufferAttribute(positionsArray, 3)
    //         );
    //         line.geometry.setDrawRange(0, 0);

    //         setTimeout(() => {
    //             setIsDrawing(true);
    //         }, delay);
    //     }, [points, delay]);

    //     useFrame(() => {
    //         // Empty frame function, required for useFrame to work
    //     });

    //     return (
    //         <line ref={lineRef}>
    //             <bufferGeometry attach="geometry">
    //                 <bufferAttribute
    //                     attachObject={['attributes', 'position']}
    //                     array={lineRef.current?.geometry?.attributes?.position?.array}
    //                     count={lineRef.current?.geometry?.attributes?.position?.count}
    //                     itemSize={3}
    //                 />
    //             </bufferGeometry>
    //             <lineBasicMaterial color={color} linewidth={2} />
    //         </line>
    //     );
    // };
    const StarLine = ({ startPosition, endPosition, color }) => {
        if (!startPosition || !endPosition) return null;

        const start = new THREE.Vector3(...startPosition);
        const end = new THREE.Vector3(...endPosition);

        //const dashed = new THREE.LineDashedMaterial()
        return (
            <Line points={[start, end]} color={color} linewidth={2} />
            // <Line points={[start, end]}>
            //     <THREE.LineBasicMaterial
            //         attach="dashed"
            //         color={color}
            //         linewidth={2}
            //         dashSize={1}
            //         gapSize={0.5}
            //     />
            // </Line>
        );
    };
    // const lineRef = useRef();
    // const drawingProgress = useRef(0);

    // // useFrame(() => {
    // //     const line = lineRef.current;
    // //     const points = line.geometry.attributes.position.array;
    // //     const totalPoints = points.length / 3;

    // //     if (drawingProgress.current < totalPoints) {
    // //         drawingProgress.current += 1;
    // //         line.geometry.setDrawRange(0, drawingProgress.current);
    // //         line.geometry.attributes.position.needsUpdate = true;
    // //     }
    // // });
    // // useFrame(() => {
    // //     const line = lineRef.current;
    // //     const positions = line.geometry.getAttribute('position');

    // //     if (positions.count !== undefined) {
    // //         if (drawingProgress.current < positions.count) {
    // //             drawingProgress.current += 1;
    // //             positions.needsUpdate = true;
    // //         }
    // //     }
    // // });

    // useEffect(() => {
    //     const line = lineRef.current;
    //     const positions = line.geometry.attributes.position;

    //     const animateLineDrawing = () => {
    //         if (drawingProgress.current < positions.count) {
    //             drawingProgress.current += 1;
    //             positions.setDrawRange(0, drawingProgress.current);
    //             positions.needsUpdate = true;
    //         }

    //         if (drawingProgress.current < positions.count) {
    //             requestAnimationFrame(animateLineDrawing);
    //         }
    //     };

    //     animateLineDrawing();
    // }, [startPosition, endPosition]);

    // // if (!startPosition || !endPosition) return null;


    // const start = new THREE.Vector3(...startPosition);
    // const end = new THREE.Vector3(...endPosition);
    // const points = [start, end];
    // const positionsArray = new Float32Array(points.flatMap((point) => point.toArray()));

    // return (
    //     <line ref={lineRef}>
    //         <bufferGeometry attach="geometry">
    //             <bufferAttribute
    //                 attachObject={['attributes', 'position']}
    //                 count={positionsArray.length / 3}
    //                 array={positionsArray}
    //                 itemSize={3}
    //             />
    //         </bufferGeometry>
    //         <lineBasicMaterial color={color} linewidth={2} />
    //     </line>
    // );
    // //const drawRange = [0, 0];
    // const positionsArray = new Float32Array(points.flatMap((point) => point.toArray()));
    //const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
    // return (
    //     <Line points={[start, end]} color={color} linewidth={2} />
    // );
    // return (
    //     <line ref={lineRef}>
    //         <bufferGeometry attach="geometry">
    //             {/* <bufferAttribute
    //                 attachObject={['attributes', 'position']}
    //                 count={drawingProgress.current}
    //                 array={positionsArray}
    //                 itemSize={3}
    //             /> */}
    //         </bufferGeometry>
    //         <lineBasicMaterial color={color} linewidth={2} />
    //     </line>
    // );
    // };

    const scaleValue = (value, min, max) => {
        return (value - min) / (max - min);
    };

    const generateStarLines = (stars) => {
        const starLines = [];
        for (let layer = 0; layer < stars.length; layer++) {
            const layerStarLines = [];
            const layerStars = stars[layer];
            let color;

            if (layer === 0) {
                color = "#4c6b89"
            }

            if (layer === 1) {
                color = "fff"
            }

            if (layer === 2) {
                color = "#E7842D"
            }

            for (let i = 0; i < layerStars.length - 1; i++) {
                const start = layerStars[i].position;
                const end = layerStars[i + 1].position;
                layerStarLines.push({
                    startPosition: start,
                    endPosition: end,
                    color: color
                });
            }
            starLines.push(layerStarLines);
        }
        return starLines;
    };


    //console.log("Epoch: ", currentEpoch)

    function generatePosition(radius) {
        const u = Math.random();
        const v = Math.random();

        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        return [
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta),
            radius * Math.cos(phi)
        ];
    }



    useEffect(() => {
        const GetStarPositions = (flat_stars) => {
            const generated_stars = []

            //pripravi matriko za vsak layer
            for (let layer = 0; layer < flat_stars.length; layer++) {
                generated_stars[layer] = [];
            }

            //star generation
            for (let layer = 0; layer < flat_stars.length; layer++) {

                const radiuslayer = 200;
                for (let neuron = 0; neuron < flat_stars[layer].length; neuron++) {
                    //const brightness = scaleValue(flat_stars[layer][neuron], 0, 1);
                    if (layer === 0 && neuron === 0) {
                        // const initial_pos = generatePosition(radiuslayer)
                        // initial_pos[0] += 5
                        // initial_pos[1] += 5
                        // initial_pos[2] += 5
                        generated_stars[layer].push({

                            // position: initial_pos,
                            position: [layer, neuron, flat_stars[layer][neuron]],
                            brightness: flat_stars[layer][neuron],
                        });
                    } else {
                        generated_stars[layer].push({
                            // position: generatePosition(radiuslayer),
                            position: [layer, neuron, flat_stars[layer][neuron]],
                            brightness: flat_stars[layer][neuron],
                        });
                    }

                }
            }
            setStars(generated_stars)

            return generated_stars;
        }

        const flat_stars = Array.from({ length: layers }, () => []);

        for (let layer in currentEpoch) {
            flat_stars[Number(layer)] = currentEpoch[layer].flat()
        }

        const generatedStars = GetStarPositions(flat_stars);
        const generatedStarLines = generateStarLines(generatedStars);
        setStarLines(generatedStarLines);

    }, [currentEpoch, layers]);

    const Star = ({ position, brightness }) => {
        if (brightness === 0) {
            brightness += 0.01
        }
        return (
            <mesh position={position}>
                <ambientLight position={[0, 0, 0]} intensity={0.2} />
                <sphereGeometry args={[0.02, 64, 64]} />
                <meshPhongMaterial color="#4c6b89" emissive="#E7842D" emissiveIntensity={20 * brightness} toneMapped={false} />
            </mesh>
        );
    };

    return (
        <div style={{ height: '400px' }}>
            <Canvas frameloop="demand" >

                <Stars depth={1} saturation={1} factor={3} fade speed={0} />
                <EffectComposer>

                    <Bloom intensity={1} luminanceThreshold={0.1} luminanceSmoothing={1} />
                    {/* <ambientLight intensity={0.1} /> */}
                    {/* <pointLight intensity={100} position={[0, 0, 0]} /> */}

                    {stars.map((layerStars, layer_idx) =>
                        layerStars.map((star, star_idx) => (
                            <Star key={`${layer_idx}-${star_idx}`} position={star.position} brightness={star.brightness} />
                        ))
                    )}
                    {/* {starLines.map((layerStarLines, layer_idx) =>
                        layerStarLines.map((line, lineIndex) => (
                            <StarLine
                                key={`${layer_idx}-${lineIndex}`}
                                startPosition={line.startPosition}
                                endPosition={line.endPosition}
                                color={line.color}
                            />
                        ))
                    )} */}
                    {starLines.map((layerStarLines, layer_idx) =>
                        layerStarLines.map((line, lineIndex) => (
                            <StarLine
                                key={`${layer_idx}-${lineIndex}`}
                                startPosition={line.startPosition}
                                endPosition={line.endPosition}
                                color={line.color}
                            // delay={lineIndex * 1000} 
                            />
                        ))
                    )}


                    <OrbitControls />
                </EffectComposer>

            </Canvas>
        </div>
    );
};

export default Space;
