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
          setAllWeights(data["all_weights"]) //ozvezdje, utežene vsote vseh
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
          <p>The Loss curve represents the process of minimizing the error rate during training of the MLP model. This is achieved by calculating the error by
            comparing the outputs of neurons with the desired results to evaluate how close the predictions were. The Loss curve gradually converging is the result
            of using optimizations algorithms like gradient descent to minimize error while training. Based on the curve, we can conclude if our model is overfitting
            or underfitting the data learned from the dataset. By hovering over the curve we can read the actual loss values that were obtained.
          </p>
        </div>

        <div className="textInfo">
          <h4>Heatmap</h4><br></br>
          <p>The heatmap represents the values of weight magnitudes of every neuron in every layer. Weights are multi-dimensional tensors, meaning
            if we want to visualize the importance of weights on a 2D plot we will have to the calculate weight magnitudes, effectively reducing their array dimension.
            The weights are then layed out along the X axis, for every layer on the Y axis respectively. The color scale helps us quickly extract which neurons were of
            significant importance based on their magnitude value and color. By using the slider we notice the changes made to weight values.
          </p>
        </div>

        <div className="textInfo">
          <h4>Space</h4><br></br>
          <p>This 3D visualization will put you to the starting neurons of both Dense layers. The right is the first layer and the left the second. The orange and blue colored
            stars represent the average weighted sum of every neuron. These values were scaled to a 0 to 1 interval, and if it yielded an average sum lower than 0.5, the star
            and its next connecting star line will be colored blue, with lower emission values. Stars with values higher than 0.5 are orange colored and shine brighter. We can easily
            see how the weighted average sums oscillated and changed for every epoch, generating a beautiful star constellation visualization.
          </p>
        </div>

        <div className="textInfo">
          <h4>Activation Signal</h4><br></br>
          <p>The Activation Signal is represented as a periodic wave function which it's amplitude is multiplied by activation function (ReLU) constants, obtained during training. Higher activation
            values typically represent neuron connections of higher importance, meaning our model started to notice prominent patterns within the dataset, resulting in higher amplitude spikes.
            We have laid out activations for all layers of the model, by changing the slider epoch value we can see how more times neurons were activated with higher values. Different datasets
            have different sample sizes, resulting in varying densities of our waveform.

          </p>
        </div>
      </div>

    </div >
  );
}
