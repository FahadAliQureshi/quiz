import React, { useState } from "react";
import "./hintButton.css";
import Hint from "./Hint";
import { Tooltip } from "react-tooltip";

const HintButton = ({ hint, setElapsedTime }) => {
  const [showHint, setShowHint] = useState(false);

  const handleHint = () => {
    setShowHint(true);
    setTimeout(() => {
      setShowHint(false);
    }, 99999999999999999999);
    setElapsedTime((prev) => prev + 300);
  };

  return (
    <div>
    <div className="questionsMainMain"
      style={{
        height: "70px",
        marginBottom: "20px",
        width: "150px",
        justifyContent: "center",
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      <div className="questionsMain">
        <button
          onClick={() => {
            handleHint();
            // plusFive()
          }}
        >
          רמז
        </button>
      </div>
     
    </div>
    {showHint && (
        <div
        style={{
          position:"absolute",
        marginTop:-17
        }}
        className="hintPop">
          <span>רמז: {hint}</span>
        </div>
      )}
    </div>

  );
};

export default HintButton;
