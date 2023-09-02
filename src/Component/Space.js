import React, { useEffect, useState } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { Stars, OrbitControls, Line } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

import * as THREE from 'three';
extend({ EffectComposer });
extend(THREE)

const Space = (props) => {
    const weights = props.weights; //allweights je weightsdict, weights je magnitudes
    const layers = props.layers;
    //const neurons = props.neurons;
    const slider = props.slider;

    const currentEpoch = weights[slider];
    const [stars, setStars] = useState([]);
    const [starLines, setStarLines] = useState([]);

    const StarLine = ({ startPosition, endPosition, color }) => {
        if (!startPosition || !endPosition) return null;

        const start = new THREE.Vector3(...startPosition);
        const end = new THREE.Vector3(...endPosition);

        return (
            <Line points={[start, end]} color={color} toneMapped={false} linewidth={2} />
        );
    };

    const generateStarLines = (stars) => {
        const starLines = [];
        for (let layer = 0; layer < stars.length; layer++) {
            const layerStarLines = [];
            const layerStars = stars[layer];
            let color;

            for (let i = 0; i < layerStars.length - 1; i++) {
                if (layerStars[i].brightness < 0.5) {
                    color = "#76A4E8"
                } else {
                    color = "#E7842D"
                }

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


    useEffect(() => {
        const GetStarPositions = (flat_stars) => {
            const generated_stars = []

            //pripravi matriko za vsak layer
            for (let layer = 0; layer < flat_stars.length; layer++) {
                generated_stars[layer] = [];
            }

            //star generation
            for (let layer = 0; layer < flat_stars.length - 1; layer++) {

                for (let neuron = 0; neuron < flat_stars[layer].length; neuron++) {

                    generated_stars[layer].push({
                        position: [layer, flat_stars[layer][neuron], neuron],
                        brightness: flat_stars[layer][neuron],
                    });
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

        let emissiveColor = "#E7842D";
        let meshColor = "#E7842D";
        let emissiveIntensity = brightness;
        //console.log(brightness)

        if (brightness <= 0.5) {
            meshColor = "#4c6b89"
            emissiveColor = "#4c6b89"; // modra emisija
            emissiveIntensity = 2 * brightness;
        } else if (brightness > 0.5) {
            emissiveColor = "#E7842D";  // rumena emisija
            emissiveIntensity = 20 * brightness;
        }

        return (
            <mesh position={position}>
                <ambientLight position={[0, 0, 0]} intensity={0.1} />
                <sphereGeometry args={[0.02, 64, 64]} />
                <meshPhongMaterial color={meshColor} emissive={emissiveColor} emissiveIntensity={emissiveIntensity} toneMapped={false} />
            </mesh>
        );
    };

    return (
        <div style={{ height: '400px' }}>
            <Canvas frameloop="demand" >

                <Stars depth={1} saturation={1} factor={3} fade speed={0} />
                <EffectComposer>

                    <Bloom intensity={1} luminanceThreshold={0.01} luminanceSmoothing={1} />

                    {stars.map((layerStars, layer_idx) =>
                        layerStars.map((star, star_idx) => (
                            <Star key={`${layer_idx}-${star_idx}`} position={star.position} brightness={star.brightness} />
                        ))
                    )}

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
