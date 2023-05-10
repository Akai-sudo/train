import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useSpring, animated, config } from '@react-spring/three';


export default function ColorSpace(props) {
    const ref = React.useRef();
    useFrame((state, delta) => (ref.current.rotation.z += delta, ref.current.rotation.y += delta))
    return (
        <mesh
            {...props}
            ref={ref}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={'orange'} />
        </mesh>
    );
}