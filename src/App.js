//import { useRef } from "react";
import { useEffect, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Canvas } from "@react-three/fiber";

//import Shape from "./Component/Shape";
import ColorSpace from "./Component/ColorSpace";
import Chart from "./Component/Chart";
import Heatmap from "./Component/Heatmap";
import Loading from "./Component/Loading";
//import { SwitchBetweenLayout, LayoutView } from "./Component/LayoutSwitcher";
import LayoutSwitcher from "./Component/LayoutSwitcher"
//import moize from 'moize';

import { useSpring, animated } from '@react-spring/web'

import { Globals } from "@react-spring/shared";
import Slider from "./Component/Slider";
import Params from "./Component/Params";

// import * as THREE from "three";
//import { OrbitControls } from '@react-three/drei'

Globals.assign({
  frameLoop: "always",
});


export default function App() {
  const [data, setData] = useState(null)

  //const [clicked, setClicked] = useState(false)

  const [lossdata, setLossData] = useState([])

  const [weights, setWeights] = useState([])
  const [layers, setLayers] = useState(0)
  const [neurons, setNeurons] = useState(0)



  //const sliderRef = useRef();

  // function LayoutView(props) {
  //   const layout = props.layout;

  //   return (
  //     layout === 'gridView' ? <GridView /> : <ListView />
  //   )
  // }


  //const canvasRef = useRef(null);
  // ####################################################################################################################################

  //sprint za text ani
  const titleProps = useSpring({
    config: { duration: 1000 },
    textShadow: `0 25px 50px -12px #000;`,
    from: { opacity: 0, y: -30 },
    to: { opacity: 1, y: 0 }
  });

  const opacityProps = useSpring({
    config: { duration: 1000 },
    textShadow: `0 25px 50px -12px #000;`,
    from: { opacity: 0, x: 30 },
    to: { opacity: 1, x: 0 }
  });

  useEffect(() => {
    const makeAPICall = async () => {
      //setLoading(true);
      await fetch('http://localhost:5000/', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors'
      })
        .then(res => res.json())
        .then(data => {
          //const stringdata = JSON.stringify(data)
          //localStorage.setItem('data', stringdata);
          //console.log(data["neurons"])
          //console.log(data["iter"])
          //setData(stringdata);  //prej je blo data.data zrd unga header
          //console.log(data["loss"])
          setData(data)

          //console.log("Use effect invoked! " + data)
          setLayers(data["layers"])
          setNeurons(data["neurons"])
          setWeights(data["weights"])
          setLossData(data["loss"])
        }).catch((e) => {
          console.log(e);
        })
    }
    makeAPICall();
    //console.log(data);
  }, [])

  const lossy = lossdata;
  // for (var i = 0; i < 10; i++) {
  //   if (lossdata[i] !== undefined || lossdata[i] != null) {
  //     lossy.push(data ? lossdata[i] : 0)
  //   }
  // }

  //console.log("Moj lossy je: " + lossy);

  const lossyarray = lossy.map(x => ({ w: x }));
  console.log(lossyarray)
  // const weightsarray = weights.map((x, i) => ({ x: `W${i + 1}` }))
  // console.log("UTEŽI: " + weightsarray[1])
  // console.log("NYA " + weights)
  // const lossdataarray = Object.values(lossdata)
  // console.log("nima " + weights)
  // console.log("alo " + lossdataarray)

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

        {/* 
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

          {/* <LayoutSwitcher data={data ? data : 0} lossyarray={lossyarray ? lossyarray : []} /> */}

          <LayoutSwitcher data={data} lossyarray={lossyarray} neurons={neurons} weights={weights} layers={layers} />

          {/* <Canvas>
            <pointLight position={[10, 10, 10]} />
            <ambientLight />
            <Shape position={[-1.2, 0, 0]} />
            <Shape position={[1.2, 0, 0]} />
          </Canvas> */}

          <div className="subscreen">
            {/* <img src={logo} className="App-logo" alt="logo" /> */}

            <div>
              {/* <code>Flask</code> is connected to backend. */}
              {/* <Canvas orthographic camera={{ zoom: 50, position: [0, 0, 100] }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />
              <ColorSpace position={[-1.2, 0, 0]} />
              <OrbitControls />
            </Canvas> */}
              {data ? LayoutSwitcher.layoutComponent : <Loading />}
            </div>

            {data ? <Params data={data} /> : <Loading />}
          </div>

        </div>



        {/* <input type="range" ref="sliderRef" min="1" max="200" name="epoch" defaultValue="50" className="slider" /> */}
        <Slider />

      </header>
    </div>
  );
}
