import React from "react";
import "./question.css";
import HintButton from "./HintButton";
import { useState } from "react";

const Question = ({
  item,
  setData,
  index,
  setElapsedTime,
  myArray,
  setMyArray,
}) => {
  function checkans() {
    console.log("MY ARRAY ==================", myArray);
    const newData = myArray?.map((item, index) => {
      if (item.answer == item.solution) {
        console.log("CORRECT ========", item);
        return {
          ...item,
          isCorrect: true,
        };
      } else if (item.answer != item.solution) {
        return {
          ...item,
          isCorrect: false,
        };
      }
      return {
        ...item,
      };
    });
    setMyArray(newData);
  }

  return (
    <>
      <div className="questionsMain">
        <p className="questions">{item.question}</p>
        <div className="btnpara">
          {/* <button>Hint</button> */}

          <HintButton setElapsedTime={setElapsedTime} hint={item.hint} />

          <input
            onChange={(text) => {
              setData(text.target.value, index);
              checkans();
            }}
            type="text"
            className="inputUnderline"
            placeholder="רמז"
          />
        </div>
        <div>
          {item?.isCorrect && "Correct"}
          {/* {
              item?.isCorrect === false && "Incorrect"
            } */}
        </div>
      </div>
    </>
  );
};

export default Question;
