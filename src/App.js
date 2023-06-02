import { useEffect, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

// import loss from "./loss.svg"
// import heatmap from "./heatmap.svg"

// import { Canvas } from "@react-three/fiber";
//import Shape from "./Component/Shape";
// import ColorSpace from "./Component/ColorSpace";
// import Chart from "./Component/Chart";
// import Heatmap from "./Component/Heatmap";
import Loading from "./Component/Loading";
import LayoutSwitcher from "./Component/LayoutSwitcher"


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

  const [lossdata, setLossData] = useState([])

  const [allWeights, setAllWeights] = useState([])
  const [weights, setWeights] = useState([])
  const [layers, setLayers] = useState(0)
  const [neurons, setNeurons] = useState(0)
  const [activations, setActivations] = useState(0)

  const [selectedDataset, setDataset] = useState('Moons')

  // const datasetHandler = (event) => {
  //     console.log("changed!")
  //     setDataset(event.target.value);
  //     console.log(selectedDataset);
  // };

  const datasetHandler = (dataset) => {
    //console.log(dataset)
    setDataset(dataset);
    //console.log("yaas")
  };

  //console.log(selectedDataset)
  console.log(JSON.stringify({ selectedDataset }))

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

  const [externalValue, setExternalValue] = useState(0);

  const handleSliderValueChange = (value) => {
    setExternalValue(value);
  };

  useEffect(() => {
    const makeAPICall = async () => {
      await fetch(process.env.REACT_APP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ selectedDataset }),
        mode: 'cors'
      })
        .then(res => res.json())
        .then(data => {
          //localStorage.setItem('data', stringdata);
          setData(data)
          setLayers(data["layers"])
          setAllWeights(data["all_weights"])
          setNeurons(data["neurons"])
          setWeights(data["weights"])
          setLossData(data["loss"])
          setActivations(data["activations"])
        }).catch((e) => {
          console.log(e);
        })
    }
    makeAPICall();
    //console.log(data);
  }, [selectedDataset])


  console.log("Magnitude:", weights)
  //console.log(weights)

  // console.log("Activations are: " + activations)
  const lossy = lossdata;
  const lossyarray = lossy.map(x => ({ w: x }));


  return (
    <div className="App">

      <div className="title-container">
        <div className="title">
          <animated.div
            style={{
              ...titleProps,
            }}
          >
            <span>Tr</span>
            <span style={{ color: "#E7842D" }}>AI</span>
            <span>n </span>
            <span> your </span>
            <span>br</span>
            <span style={{ color: "#E7842D" }}>AI</span>
            <span>n</span>

            <div>
              <a href="https://github.com/Akai-sudo/train">GitHub</a>
            </div>
          </animated.div>

        </div>
      </div>
      <header className="App-header">


      </header>

      <div className="main">




        {/* <div className="boxGroup">
          <div className="box"><img src={loss} alt="loss" />Loss</div>
          <div className="box"><img src={heatmap} alt="heatmap" />Heatmap</div>
          <div className="box">Space</div>
          <div className="box"><img width="50" height="50" src="https://img.icons8.com/ios/50/000000/sine--v1.png" alt="sine--v1" />Signal</div>
        </div> */}

        <LayoutSwitcher slider={externalValue} data={data} lossyarray={lossyarray} neurons={neurons} weights={weights} allweights={allWeights} layers={layers} />

        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div className="subscreen">


          <animated.div
            style={{
              ...opacityProps,
            }}
          >

          </animated.div>

          <div>
            <button className="circle" value="Circles" onClick={() => datasetHandler("Circles")}>Circles</button>
            <button className="moon" value="Moons" onClick={() => datasetHandler("Moons")}>Moons</button>
            <button className="class" value="Classification" onClick={() => datasetHandler("Classification")}>Classify</button>
            {/* You can add any content inside the button */}
            {/* <MoonButton onClick={() => datasetHandler("circles")} />
            <MoonButton onClick={() => datasetHandler("moons")} /> */}
          </div>
          {data ? <Params data={data} dataset={selectedDataset} /> : <Loading />}
        </div>


        {/* <span>Epoch: {Slider.returnValue() + 1}</span> */}

      </div>
      <Slider onSliderValueChange={handleSliderValueChange} />
    </div >
  );
}
