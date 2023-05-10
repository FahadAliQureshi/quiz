import React from "react";
import "./question.css";
import HintButton from "./HintButton";

const Question = ({ item, setData, index,setElapsedTime }) => {
  return (
    <>
      <div className="questionsMain">
        <p className="questions">{item.question}</p>
        <div className="btnpara">
          {/* <button>Hint</button> */}

          <HintButton
          setElapsedTime={setElapsedTime}
          hint={item.hint} />

          <input
            onChange={(text) => setData(text.target.value, index)}
            type="text"
            className="inputUnderline"
            placeholder="רמז"
          />
        </div>
      </div>
    </>
  );
};

export default Question;
