import { useEffect, useState } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from "./Component/Loading";
import LayoutSwitcher from "./Component/LayoutSwitcher"


import { useSpring, animated } from '@react-spring/web'


import { Globals } from "@react-spring/shared";
import Params from "./Component/Params";


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

  const datasetHandler = (dataset) => {
    //console.log(dataset)
    setDataset(dataset);
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

  // const [externalValue, setExternalValue] = useState(0);

  // const handleSliderValueChange = (value) => {
  //   setExternalValue(value);
  // };

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


  //console.log("Magnitude:", weights)
  //console.log(weights)
  console.log("Aktivacije outputov nevronov ", activations)
  // console.log("Activations are: " + activations)
  // const lossy = lossdata;
  // const lossyarray = lossy.map(x => ({ w: x }));

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


          </animated.div>

        </div>
        <div className="git">
          <a href="https://github.com/Akai-sudo/train" target="_blank" rel="noreferrer">GitHub</a>
        </div>

      </div>
      <header className="App-header">


      </header>

      <div className="main">

        <LayoutSwitcher data={data} lossyarray={lossdata} neurons={neurons} weights={weights} allweights={allWeights} layers={layers} />

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

          </div>
          {data ? <Params data={data} dataset={selectedDataset} /> : <Loading />}
        </div>



      </div>

      <div className="textContainer">
        <div className="textInfo">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>

    </div >
  );
}
