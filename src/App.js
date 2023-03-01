import React, { useState } from "react";
import "./App.css";

function App() {
  const [boxes, setBoxes] = useState(Array(16).fill(false));
  const [redBoxes, setRedBoxes] = useState([]);

  const handleClick = (index) => {
    // Check if clicked box is already red
    if (redBoxes.includes(index)) {
      // Turn it back to blue
      setBoxes((prevBoxes) =>
        prevBoxes.map((box, i) => (i === index ? false : box))
      );
      setRedBoxes((prevRedBoxes) =>
        prevRedBoxes.filter((box) => box !== index)
      );
    } else {
      // Turn it red
      setBoxes((prevBoxes) =>
        prevBoxes.map((box, i) => (i === index ? true : box))
      );

      // If two boxes are already red, turn the first one back to blue
      if (redBoxes.length >= 2) {
        const firstRedIndex = redBoxes[0];
        setBoxes((prevBoxes) =>
          prevBoxes.map((box, i) => (i === firstRedIndex ? false : box))
        );
        setRedBoxes((prevRedBoxes) =>
          prevRedBoxes.filter((box) => box !== firstRedIndex)
        );
      }

      // Add clicked box to the redBoxes array
      setRedBoxes((prevRedBoxes) => [...prevRedBoxes, index]);
    }
  };

  return (
    <div className='container'>
      {boxes.map((box, index) => (
        <div
          key={index}
          className={`box ${box ? "red" : "blue"}`}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
}

export default App;
