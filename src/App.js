import { useRef, useEffect, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import anime from 'animejs';
import Anime from "@mollycule/react-anime";

import { Canvas } from "@react-three/fiber";

import Shape from "./Component/Shape";
import ColorSpace from "./Component/ColorSpace";

import { useSpring, animated } from '@react-spring/web'

import SlideButton from 'react-slide-button';

import * as THREE from "three";
import { Stats, OrbitControls } from '@react-three/drei'


export default function App() {
  const [data, setData] = useState([])

  const [loading, setLoading] = useState(false);
  const [colorspace, setColorspace] = useState([])
  const [reset, setReset] = useState(0);
  const [mount, setAnimationMount] = useState(false);
  const [clicked, setClicked] = useState(false)


  //const canvasRef = useRef(null);
  // ####################################################################################################################################

  //sprint za text ani
  const titleProps = useSpring({
    from: { opacity: -1, y: -500 },
    to: { opacity: 1, y: 0 }
  });


  const carouselspring = useSpring({
    color: clicked ? '#E7842D' : '#ff6d6d',
    // boxShadow: `0px 5px 15px 0px rgba(0, 0, 0, 0.30)`,
    boxShadow: `inset 0 0 50px #fff,
    inset 20px 0 80px #fb9800,
    inset -20px 0 80px #fbc200,
    inset 20px 0 300px #fb9800,
    inset -20px 0 300px #fbc200,
    0 0 50px #fff,
    -10px 0 80px #fb9800,
    10px 0 80px #fbc200`

    //color: clicked ? '#569AFF' : '#ff6d6d'
    //menjava krogov na klik
  })

  const handleClick = () => setClicked(s => !s)


  //tole je za te animated dva kvadratka k se premikata
  // const springs = useSpring({
  //   from: { background: '#ff6d6d', y: 0, x: 0 },
  //   to: async (next, cancel) => {
  //     await next({ x: 40, background: '#fff59a' })
  //     await next({ y: 40, background: '#88DFAB' })
  //     await next({ x: 0, background: '#569AFF' })
  //     await next({ y: 0, background: '#ff6d6d' })
  //   },
  //   loop: true,
  // })

  // useEffect(() => {
  //   const makeAPICall = async () => {
  //     setLoading(true);
  //     await fetch('http://localhost:5000/', {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json'
  //       }
  //     })
  //       .then(res => res.json())
  //       .then(data => {
  //         const stringdata = JSON.stringify(data)
  //         setData(stringdata);  //prej je blo data.data zrd unga header
  //       }).catch((e) => {
  //         console.log(e);
  //       }).finally(() => {
  //         setLoading(false);
  //       });
  //   }
  //   makeAPICall();
  //   console.log(data)
  // }, [data])

  //   if (loading) {
  //     const loading = "Loading"
  //     return loading;
  // }






  // })();

  return (
    <div className="App">
      <header className="App-header">

        <div className="title-container">
          <div className="title">
            <animated.div
              style={{
                ...titleProps,
              }}
            >
              <span>tr</span>
              <span style={{ color: "#E7842D" }}>AI</span>
              <span>n </span>
              <span> your </span>
              <span>br</span>
              <span style={{ color: "#E7842D" }}>AI</span>
              <span>n</span>
            </animated.div>
          </div>
        </div>

        {/* <canvas ref={canvasRef} /> */}

        {/* <div>
          <animated.div
            style={{
              width: 80,
              height: 80,
              background: '#ff6d6d',
              borderRadius: 8,
              ...springs,
            }}
          />
        </div> */}


        <div className="main">

          {/* <animated.div style={{
            width: 80,
            height: 80,
            background: '#ff6d6d',
            borderRadius: 8,
            ...springs,
          }} /> */}

          {/* <Canvas>
            <pointLight position={[10, 10, 10]} />
            <ambientLight />
            <Shape position={[-1.2, 0, 0]} />
            <Shape position={[1.2, 0, 0]} />
          </Canvas> */}

          <Canvas orthographic camera={{ zoom: 50, position: [0, 0, 100] }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <ColorSpace position={[-1.2, 0, 0]} />
            <OrbitControls />
          </Canvas>

          <div>

          </div>

        </div>

        {/* <SlideButton mainText="Move epoch" overlayText="Epochs done!"></SlideButton> */}

        <div className="subscreen">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>
            <code>Flask</code> is connected to backend.
            We received the synthetic data: {data}
          </p>
          <p>Choose visualization</p>
        </div>

        <div className="carousel">
          <div>

            <animated.div onClick={handleClick}
              style={{
                width: 80,
                height: 80,
                margin: 30,
                background: "#E7842D",
                borderRadius: 100,

                ...carouselspring,
              }}
            />
          </div>
        </div>


        {/* <div className="slider"/> */}
      </header>
    </div>
  );
}
