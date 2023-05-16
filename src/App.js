import { useRef, useEffect, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";

import { Canvas } from "@react-three/fiber";
import ReactApexChart from 'react-apexcharts'

import Shape from "./Component/Shape";
import ColorSpace from "./Component/ColorSpace";
import Chart from "./Component/Chart";

import Loading from "./Component/Loading";

//import moize from 'moize';

import { useSpring, animated } from '@react-spring/web'

import * as THREE from "three";
import { Stats, OrbitControls } from '@react-three/drei'
import h337 from "heatmap.js";


export default function App() {
  const [data, setData] = useState(null)

  // const [loading, setLoading] = useState(false);

  const [clicked, setClicked] = useState(false)

  const [lossdata, setLossData] = useState([])

  const [options, setOptions] = useState({
    options: {
      chart: {
        height: 350,
        type: 'heatmap',
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#008FFB"],
      title: {
        text: 'HeatMap Chart (Single color)'
      },
    },
  })

  const [series, setSeries] = useState([
    {
      name: "Series 1",
      data: [{
        x: 'W1',
        y: 22
      }, {
        x: 'W2',
        y: 29
      }, {
        x: 'W3',
        y: 13
      }, {
        x: 'W4',
        y: 32
      }]
    },
    {
      name: "Series 2",
      data: [{
        x: 'W1',
        y: 43
      }, {
        x: 'W2',
        y: 43
      }, {
        x: 'W3',
        y: 43
      }, {
        x: 'W4',
        y: 43
      }]
    }
  ]);


  //const canvasRef = useRef(null);
  // ####################################################################################################################################

  //sprint za text ani
  const titleProps = useSpring({
    config: { duration: 1000 },
    textShadow: `0 25px 50px -12px #000;`,
    from: { opacity: 0, y: -30 },
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

  //const handleClick = () => setClicked(s => !s)


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

  const wobble = useSpring({
    config: { duration: 250 },
    from: { y: -1, x: 0 },
    to: async (next, cancel) => {
      await next({ x: 0, y: -2 })
      await next({ x: -1, y: -1 })
      await next({ x: -2, y: 0 })
      await next({ x: -1, y: 1 })
      await next({ x: 0, y: 2 })
      await next({ x: 1, y: 1 })
      await next({ x: 2, y: 0 })
      await next({ x: 1, y: -1 })
    },
    loop: true,
  })

  //const functiondata = [{w: 100, pv: 2400, amt: 2400 }, {w: 200, pv: 2400, amt: 2400 }, {w: 300, pv: 2400, amt: 2400 }, {w: 400, pv: 2400, amt: 2400 }];



  // useEffect(() => {
  //   var heatmapInstance = h337.create({
  //     // only container is required, the rest will be defaults
  //     container: document.querySelector('.Heatmap'),
  //     backgroundColor: "#353535",
  //     radius: 10,
  //     maxOpacity: .5,
  //     minOpacity: 0,
  //     blur: .75


  //   });
  //   // now generate some random data
  //   var points = [];
  //   var max = 0;
  //   var width = 840;
  //   var height = 400;
  //   var len = 200;

  //   while (len--) {
  //     var val = Math.floor(Math.random() * 100);
  //     max = Math.max(max, val);
  //     var point = {
  //       x: Math.floor(Math.random() * width),
  //       y: Math.floor(Math.random() * height),
  //       value: val
  //     };
  //     points.push(point);
  //   }
  //   // heatmap data format
  //   var data = {
  //     max: max,
  //     data: points
  //   };
  //   // if you have a set of datapoints always use setData instead of addData
  //   // for data initialization
  //   heatmapInstance.setData(data);
  // })

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

          console.log(data)

          console.log("We got: ")
          console.log(data ? data["loss"] : "/")

          setLossData(data["loss"])
        }).catch((e) => {
          console.log(e);
        })
    }
    makeAPICall();
    //console.log(data);
  }, [])

  console.log("ja brt: ")
  console.log(data ? lossdata : 0)

  const lossy = lossdata;
  // for (var i = 0; i < 10; i++) {
  //   if (lossdata[i] !== undefined || lossdata[i] != null) {
  //     lossy.push(data ? lossdata[i] : 0)
  //   }
  // }

  console.log("Moj lossy je: " + lossy);

  const lossyarray = lossy.map(x => ({ w: x }));


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

        </div>

        <div className="subscreen">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <div>
            The plot represents the loss function of our neural network.
          </div>

          <div>
            {/* <code>Flask</code> is connected to backend. */}
            <Canvas orthographic camera={{ zoom: 50, position: [0, 0, 100] }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />
              <ColorSpace position={[-1.2, 0, 0]} />
              <OrbitControls />
            </Canvas>
            Data: {data ? data["confusion"] : <Loading />}

            <div>
              {/* <Canvas className="Heatmap" /> */}
              <Chart data={lossyarray} />
            </div>

            <div>
              {/* <ReactApexChart options={this.state.options} series={this.state.series} type="heatmap" height={350} /> */}

              <ReactApexChart options={options} series={series} type="heatmap" />
            </div>

          </div>

          <div>
            <b>Neural Network parameters: </b>
            <ul className="no-bullets">
              <li>Epoch: </li>
              <li>Number of layers: </li>
              <li>Number of iterations: {data ? data["iter"] : <Loading />} </li>
              <li>Number of weights per layer: </li>
              <li>Accuracy: </li>
              <li>Loss rate: </li>
              <li>Dataset: </li>
            </ul>
          </div>
        </div>


        <input type="range" min="1" max="100" defaultValue="50" className="slider"></input>

        <p>Choose visualization</p>

        {/* <div class="radio-pillbox">
          <radiogroup>
          </radiogroup>

        </div> */}

        {/* <div class="radio-pillbox">
          <radiogroup>
            <div>
              <input type="radio" name="radio-group" className="js" value="JavaScript" class="first" />
              <label for="js" class="radio-label">JavaScript</label>

            </div>
            <div>
              <input type="radio" name="radio-group" className="html5" value="HTML5" />
              <label for="tricky">HTML5</label>

            </div>
            <div>
              <input type="radio" name="radio-group" className="css" value="CSS3" />
              <label for="css">CSS/CSS3</label>

            </div>
            <div>
              <input type="radio" name="radio-group" className="angularjs" value="AngularJS" />
              <label for="angularjs">AngularJS</label>

            </div>
            <div>
              <input type="radio" name="radio-group" className="jquery" value="jQuery" />
              <label for="jquery">jQuery</label>

            </div>
            <div>
              <input type="radio" name="radio-group" className="rn" value="React Native" class="last" />
              <label for="rn">React Native</label>

            </div>
          </radiogroup>
        </div> */}

        <div className="carousel">
          <div>


            {/* onClick={handleClick} */}
            <animated.div
              style={{
                width: 80,
                height: 80,
                margin: 30,
                background: "#E7842D",
                borderRadius: 100,

                ...carouselspring,
                ...wobble,
              }}
            />
          </div>
        </div>
      </header>
    </div>
  );
}
