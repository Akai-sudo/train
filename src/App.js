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

  const waitDatasetLoad = {
    visibility: "hidden",
  };

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

        <LayoutSwitcher data={data} lossyarray={lossdata} activations={activations} neurons={neurons} weights={weights} allweights={allWeights} layers={layers} />

        <div className="subscreen">



          <animated.div
            style={{
              ...titleProps,
            }}
          >
          </animated.div>

          {data ?
            <div >
              <button className="circle" value="Circles" onClick={() => datasetHandler("Circles")}>Circles</button>
              <button className="moon" value="Moons" onClick={() => datasetHandler("Moons")}>Moons</button>
              <button className="class" value="Classification" onClick={() => datasetHandler("Classification")}>Classify</button>

            </div> :
            <div style={waitDatasetLoad}>
              <button className="circle" value="Circles" onClick={() => datasetHandler("Circles")}>Circles</button>
              <button className="moon" value="Moons" onClick={() => datasetHandler("Moons")}>Moons</button>
              <button className="class" value="Classification" onClick={() => datasetHandler("Classification")}>Classify</button>

            </div>

          }
          {/* <div style={waitDatasetLoad}>
            <button className="circle" value="Circles" onClick={() => datasetHandler("Circles")}>Circles</button>
            <button className="moon" value="Moons" onClick={() => datasetHandler("Moons")}>Moons</button>
            <button className="class" value="Classification" onClick={() => datasetHandler("Classification")}>Classify</button>

          </div> */}


          {data ? <Params data={data} dataset={selectedDataset} /> : <Loading />}
        </div>



      </div>

      <div className="textContainer">
        <div className="textInfo">
          <h4>Loss Curve</h4><br></br>
          <p>The loss curve represents the optimisation of error rate throughout all epochs. This is achieved by optimising the loss curve by
            searching for local minima with gradient descent.
          </p>
        </div>

        <div className="textInfo">
          <h4>Heatmap</h4><br></br>
          <p>The heatmap represents the values of weights for every neuron in every layer. The weight values are a high dimensional tensor so to
            visualize the importance of weights in 2D we apply a dimensionality reduction method by calculating the weight magnitudes. The weights are then
            layed out along the X axis, for every layer on the Y axis. The color scale helps us quickly extract which neurons were of
            significant importance and which weren't.
          </p>
        </div>

        <div className="textInfo">
          <h4>Stars</h4><br></br>
          <p>The loss curve represents the optimisation of error rate throughout all epochs. This is achieved by optimising the loss curve by
            searching for local minima with gradient descent.
          </p>
        </div>

        <div className="textInfo">
          <h4>Activation signal</h4><br></br>
          <p>The loss curve represents the optimisation of error rate throughout all epochs. This is achieved by optimising the loss curve by
            searching for local minima with gradient descent.
          </p>
        </div>
      </div>

    </div >
  );
}
