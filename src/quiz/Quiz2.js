import React, { useContext, useEffect, useState } from "react";
import "./quiz.css";
import Question from "./Question";
import Stopwatch from "./Stopwatch";
import QuestionsData2 from "../constants/Data2";
import header from "../assets/images/header.jpeg";
import footer1 from "../assets/images/footer1.jpeg";
import footer2 from "../assets/images/footer2.jpeg";
import { StoreContext } from "../context/contextStore";
import Modal from "react-modal";

const Quiz2 = () => {
  useEffect(() => {
    const handleBackButtonPress = (event) => {
      event.preventDefault();
      // Add your custom logic here
      // Perform any actions you want when the back button is pressed
      window.location.href = "/";
      console.log("Back button pressed");
    };

    // Add an event listener to the "popstate" event
    window.addEventListener("popstate", handleBackButtonPress);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("popstate", handleBackButtonPress);
    };
  }, []);
  const [questionsData2, setQuestionsData2] = useState(QuestionsData2);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [elapsedTimeFinal, setElapsedTimeFinal] = useState(0);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }
  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFullNameValid, setIsFullNameValid] = useState(true);
  const [isIdNumberValid, setIsIdNumberValid] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

  const [isNextPage, setIsNextPage] = useState(false);

  const [finalResult, setFinalResult] = useState(0);
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  const [firstTime, setFirstTime] = useState(true);
  useEffect(() => {
    setElapsedTime(Number(localStorage.getItem("timer1")));
  }, []);
  useEffect(() => {
    const storedValue = localStorage.getItem("value1");
    const storedValue2 = localStorage.getItem("value2");
    console.log("STORED VALUE==================", storedValue, storedValue2);
    setFinalResult(Number(storedValue) + Number(storedValue2));
    // Use the retrieved value as needed
  }, [localStorage.getItem("value2")]);

  const { correctAnswers2, correctAnswers, setCorrectAnswers2 } =
    useContext(StoreContext);
  console.log("MY COCOCOCO ===============", correctAnswers);
  const updateAnswer = (text, index) => {
    const updatedQuestionsData2 = [...questionsData2];
    updatedQuestionsData2[index].answer = text;
    setQuestionsData2(updatedQuestionsData2);
  };

  const checkForSubmit = () => {
    const newData = questionsData2.map((item, index) => {
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
    setQuestionsData2(newData);
    const correctItems = newData.filter((item) => item?.isCorrect === true);
    setCorrectAnswers2(correctItems.length);
    const final = correctItems.length;

    // localStorage.setItem("result", elapsedTimeFinal.toString());
    // localStorage.setItem("result", finalResult.toString());

    localStorage.setItem("value2", final.toString());
    setElapsedTimeFinal(elapsedTime);
    const isAnyQuestionUnanswered = questionsData2.some(
      (question) => question.answer === ""
    );

    if (
      isFullNameValid &&
      isIdNumberValid &&
      isPhoneNumberValid &&
      !isAnyQuestionUnanswered
    ) {
      //   setIsNextPage(true);
    }

    if (isAnyQuestionUnanswered) {
      alert("Please answer all the questions before submitting.");
    } else {
      console.log(questionsData2);
      openModal();
      //   alert("Submitted");
    }
  };

  const handleFullNameChange = (event) => {
    const { value } = event.target;
    setFullName(value);
    setIsFullNameValid(value !== "");
  };

  const handleIdNumberChange = (event) => {
    const { value } = event.target;
    setIdNumber(value);
    setIsIdNumberValid(value !== "");
  };

  const handlePhoneNumberChange = (event) => {
    const { value } = event.target;
    setPhoneNumber(value);
    setIsPhoneNumberValid(value !== "");
  };

  return (
    <>
      <header className="header">
        <div className="header__logo">
          <img src={header} alt="logo" />
        </div>
      </header>

      {!isNextPage ? (
        <div className="wrapper">
          <div className="navbar">
            <h1 className="isra">ישראלי ישראלי</h1>
            <h1 className="sw">
              סטופר
              <div
                style={{
                  marginLeft: 10,
                }}
              >
                <Stopwatch
                  elapsedTime={elapsedTime}
                  setElapsedTime={setElapsedTime}
                />
              </div>
            </h1>
          </div>
          <div className="page">
            <div className="quizpage">
              {/* <div className="nameID">
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    marginTop: "20px",
                  }}
                >
                  <input
                    type="text"
                    value={fullName}
                    onChange={handleFullNameChange}
                    required
                  />
                  <div className="nameLabel">
                    <div style={{ width: "169px" }}>
                      <label htmlFor="">שם מלא</label>
                    </div>
                  </div>
                </div>
                {!isFullNameValid && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      marginRight: "50px",
                    }}
                    className="error-message"
                  >
                    שם מלא הוא שדה חובה
                  </div>
                )}
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    marginTop: "20px",
                  }}
                >
                  <input
                    type="text"
                    value={idNumber}
                    onChange={handleIdNumberChange}
                    required
                  />
                  <div className="nameLabel">
                    <div style={{ width: "169px" }}>
                      <label htmlFor="">תעודת זהות</label>
                    </div>
                  </div>
                </div>
                {!isIdNumberValid && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      marginRight: "50px",
                    }}
                    className="error-message"
                  >
                    תעודת זהות היא שדה חובה
                  </div>
                )}
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    marginTop: "20px",
                  }}
                >
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    required
                  />
                  <div className="nameLabel">
                    <div style={{ width: "169px" }}>
                      <label htmlFor="">מספר טלפון</label>
                    </div>
                  </div>
                </div>
                {!isPhoneNumberValid && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      marginRight: "50px",
                    }}
                    className="error-message"
                  >
                    מספר טלפון הוא שדה חובה
                  </div>
                )}
              </div> */}
              <h1>שאלות</h1>
              {questionsData2.map((item, index) => (
                <Question
                  setElapsedTime={setElapsedTime}
                  setData={updateAnswer}
                  myArray={questionsData2}
                  setMyArray={setQuestionsData2}
                  index={index}
                  item={item}
                />
              ))}
            </div>
          </div>
          <div className="page">
            <button
              disabled={
                !isFullNameValid || !isIdNumberValid || !isPhoneNumberValid
              }
              className="send"
              onClick={checkForSubmit}
              title="Send"
            >
              שלח
            </button>
          </div>
          {/* <div>{correctAnswers2 + correctAnswers}</div>
           */}
          {/* <div>{finalResult}</div> */}
          {/* <div>Completion Time: {formatTime(elapsedTimeFinal)}</div> */}

          {/* <div>sadasdsa</div> */}
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={() => {
              closeModal();
              window.location.href = "/";
            }}
            // style={customStyles}
            contentLabel="Example Modal"
          >
            {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
            <div
              style={{
                alignItems: "center",
                display: "flex",

                alignSelf: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  //   alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",

                  //   alignSelf: "center",
                  //   justifyContent: "flex-end",
                }}
              >
                <h2>זמן השלמה</h2>

                <h3>{formatTime(elapsedTimeFinal)}</h3>

                <h2>ציון</h2>
                <h3>{finalResult}</h3>
              </div>
            </div>
          </Modal>
        </div>
      ) : (
        <div className="wrapper">
          <div className="navbar">
            <h1 className="isra">ישראלי ישראלי</h1>
            <h1 className="sw">
              סטופר
              <div
                style={{
                  marginLeft: 10,
                }}
              >
                <Stopwatch
                  elapsedTime={elapsedTime}
                  setElapsedTime={setElapsedTime}
                />
              </div>
            </h1>
          </div>
          <div className="page">
            <div className="quizpage">
              <div className="nameID">
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    marginTop: "20px",
                  }}
                >
                  <input
                    type="text"
                    value={fullName}
                    onChange={handleFullNameChange}
                    required
                  />
                  <div className="nameLabel">
                    <div style={{ width: "169px" }}>
                      <label htmlFor="">שם מלא</label>
                    </div>
                  </div>
                </div>
                {!isFullNameValid && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      marginRight: "50px",
                    }}
                    className="error-message"
                  >
                    שם מלא הוא שדה חובה
                  </div>
                )}
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    marginTop: "20px",
                  }}
                >
                  <input
                    type="text"
                    value={idNumber}
                    onChange={handleIdNumberChange}
                    required
                  />
                  <div className="nameLabel">
                    <div style={{ width: "169px" }}>
                      <label htmlFor="">תעודת זהות</label>
                    </div>
                  </div>
                </div>
                {!isIdNumberValid && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      marginRight: "50px",
                    }}
                    className="error-message"
                  >
                    תעודת זהות היא שדה חובה
                  </div>
                )}
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    marginTop: "20px",
                  }}
                >
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    required
                  />
                  <div className="nameLabel">
                    <div style={{ width: "169px" }}>
                      <label htmlFor="">מספר טלפון</label>
                    </div>
                  </div>
                </div>
                {!isPhoneNumberValid && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      marginRight: "50px",
                    }}
                    className="error-message"
                  >
                    מספר טלפון הוא שדה חובה
                  </div>
                )}
              </div>
              <h1>שאלות</h1>
              {questionsData2.map((item, index) => (
                <Question
                  setElapsedTime={setElapsedTime}
                  setData={updateAnswer}
                  myArray={questionsData2}
                  setMyArray={setQuestionsData2}
                  index={index}
                  item={item}
                />
              ))}
            </div>
          </div>
          <div className="page">
            <button
              disabled={
                !isFullNameValid || !isIdNumberValid || !isPhoneNumberValid
              }
              className="send"
              onClick={checkForSubmit}
              title="Send"
            >
              שלח
            </button>
          </div>
          {/* <div>{correctAnswers2 + correctAnswers}</div> */}
          {/* <div>{finalResult}</div> */}
          {/* <div>Completion Time: {formatTime(elapsedTimeFinal)}</div> */}
        </div>
      )}

      <footer className="footer">
        <div className="footer__logo">
          <img src={footer1} alt="footer1" />
        </div>
        <div className="footer__logo">
          <img src={footer2} alt="footer2" />
        </div>
      </footer>
    </>
  );
};

export default Quiz2;
