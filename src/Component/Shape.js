import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated, config } from '@react-spring/three';

function Shape(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = React.useRef();
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);
    // Subscribe this component to the render-loop, rotate the mesh every frame
    //useFrame((state, delta) => (ref.current.rotation.x += 0.01));
    // Return the view, these are regular Threejs elements expressed in JSX

    // const { roughness } = useControls({ roughness: { value: 1, min: 0, max: 1 } })
    const { roughness } = 0.8
    const { active } = true
    useFrame(({ clock }) => {
        const a = clock.getElapsedTime()
        // ref.current.scale.x = Math.sin(clock.getElapsedTime())
        // ref.current.scale.y = Math.sin(clock.getElapsedTime())
        // ref.current.scale.z = Math.sin(clock.getElapsedTime())
        //ref.current.position.y = clock.getElapsedTime()
        //console.log(a) // the value will be 0 at scene initialization and grow each frame
    })

    //const { scale } = useSpring({ scale: active ? 1.5 : 1 })
    const multiAnimation = useSpring({
        from: { opacity: 0, color: 'red' },
        to: [
            { opacity: 1, color: '#ffaaee' },
            { opacity: 1, color: 'red' },
            { opacity: .5, color: '#008000' },
            { opacity: .8, color: 'black' }
        ]
    });


    const { scale } = useSpring({
        scale: 3,
        config: config.wobbly,
    })

    return (
        <animated.mesh castShadow
            {...props}
            ref={ref}
            scale={scale}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}
        >

            <sphereGeometry args={[0.75, 64, 64]} />
            <meshPhongMaterial scale={scale} metalness={1} roughness={roughness} color={hovered ? "hotpink" : "orange"} />
            {/* <sphereGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          wireframe={props.wireframe}
          color={hovered ? "hotpink" : "orange"}
        /> */}
        </animated.mesh>
    );
}

export default Shape;