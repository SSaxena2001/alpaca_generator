import React, { useState } from "react";
import Button from "./Button";
import Alpaca from "./Alpaca";
import domtoimage from "dom-to-image-more";

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

function App() {
  const forceUpdate = useForceUpdate();
  const options = {
    Background: [
      "Blue50",
      "Blue60",
      "Blue70",
      "DarkBlue30",
      "DarkBlue50",
      "DarkBlu70",
      "Green50",
      "Green60",
      "Green70",
      "Grey40",
      "Grey70",
      "Grey80",
      "Red50",
      "Red60",
      "Red70",
      "Yellow50",
      "Yellow60",
      "Yellow70",
    ],
    Neck: ["Bend-Backward", "Bend-Forward", "Default", "Thick"],
    Nose: ["Nose"],
    Mouth: ["Astonished", "Default", "Eating", "Laugh", "Tongue"],
    Ears: ["Default", "Tilt-Backward", "Tilt-Forward"],
    Hair: ["Bang", "Curls", "Default", "Elegant", "Fancy", "Quiff", "Short"],
    Eyes: ["Angry", "Default", "Naughty", "Panda", "Smart", "Star"],
    Leg: [
      "Bubble-Tea",
      "Cookie",
      "Default",
      "Game-Console",
      "Tilt-Backward",
      "Tilt-Forward",
    ],
    Accessories: ["Earings", "Flower", "Glasses", "Headphone"],
  };
  const designDefault = {
    background: ["blue70"],
    neck: ["default"],
    nose: ["nose"],
    mouth: ["default"],
    ears: ["default"],
    hair: ["default"],
    eyes: ["default"],
    leg: ["default"],
    accessories: ["headphone"],
  };
  const headers = Object.keys(options);
  const [selectedHeader, setSelectedHeader] = useState("Hair");
  const styles = options.hasOwnProperty(selectedHeader)
    ? options[selectedHeader]
    : [];
  const [design, setDesign] = useState(designDefault);

  const randomDesign = () => {
    let randomDesign = {};
    for (const key in options) {
      let randomLength = Math.floor(Math.random() * options[key].length);
      randomDesign[key.toLowerCase()] = [
        options[key][randomLength].toLowerCase(),
      ];
    }
    setDesign(randomDesign);
  };

  const downloadAlpaca = () => {
    var node = document.getElementById("alpaca");
    domtoimage
      .toPng(node)
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "alpaca.jpeg";
        link.href = dataUrl;
        link.click();
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  return (
    <div className="m-auto box-border container font-roboto">
      <h1 className="font-bold text-6xl my-[36px] text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-600">
        Alpaca Generator
      </h1>
      <div className="flex justify-between items-center md:block md:space-y-4 ml-8 md:ml-0">
        <div className="container space-y-2">
          <Alpaca design={design} />
          <div className="flex justify-between items-center w-[42%] mx-auto py-4 md:w-[80%]">
            <button
              className="px-4 py-2 bg-slate-50 text-xl rounded-xl hover:bg-slate-200"
              onClick={randomDesign}
            >
              🔀Random
            </button>
            <button
              className="px-4 py-2 bg-slate-50 text-xl rounded-xl hover:bg-slate-200"
              onClick={downloadAlpaca}
            >
              🖼️Download
            </button>
          </div>
        </div>
        <div className="container md:p-2 md:text-center">
          <div className="container mb-4">
            <h1 className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-600">
              ACCESSORIZE THE ALPACA'S
            </h1>
            <div className="space-x-3 space-y-3">
              {headers.map((header) => (
                <Button
                  title={header}
                  key={header}
                  onFocused={(title) => {
                    setSelectedHeader(title);
                  }}
                />
              ))}
            </div>
          </div>
          <div>
            <h1 className=" font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-600">
              STYLE
            </h1>
            <div className="space-x-2 space-y-2 md:mb-6">
              {styles.map((style) => (
                <Button
                  title={style}
                  key={style}
                  onFocused={(title) => {
                    const newTitle = title.toLowerCase();
                    const newHeader = selectedHeader.toLowerCase();
                    const newDesign = design;
                    newDesign[newHeader] = [newTitle];
                    setDesign(newDesign);
                    forceUpdate();
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
