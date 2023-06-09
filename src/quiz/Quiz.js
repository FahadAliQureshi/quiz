import React, { useContext, useEffect, useState } from "react";
import "./quiz.css";
import Question from "./Question";
import Stopwatch from "./Stopwatch";
import QuestionsData from "../constants/Data";
import header from "../assets/images/header.jpeg";
import footer1 from "../assets/images/footer1.jpeg";
import footer2 from "../assets/images/footer2.jpeg";

import { Outlet, Link } from "react-router-dom";
import { StoreContext } from "../context/contextStore";

// const {
//     FormWithConstraints,
//     FieldFeedbacks,
//     FieldFeedback
//   } = ReactFormWithConstraints;

function redirectToPage2() {
  // Change the window location to "page2"
  window.location.href = "/page2";
}

const Quiz = () => {
  const [questionsData, setQuestionsData] = useState([]);

  useEffect(() => {
    setQuestionsData(QuestionsData);
  }, []);

  const [elapsedTime, setElapsedTime] = useState(0);

  // import React, { useState } from "react";
  // import "./quiz.css";
  // import Question from "./Question";
  // import Stopwatch from "./Stopwatch";
  // import QuestionsData from "../constants/Data";

  // const Quiz = () => {
  //   const [questionsData, setQuestionsData] = useState(QuestionsData);
  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFullNameValid, setIsFullNameValid] = useState(true);
  const [isIdNumberValid, setIsIdNumberValid] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

  const [isNextPage, setIsNextPage] = useState(false);

  const { correctAnswers, setCorrectAnswers } = useContext(StoreContext);

  useEffect(() => {
    localStorage.setItem("value1", "0");
    localStorage.setItem("value2", "0");
  }, []);
  const updateAnswer = (text, index) => {
    const updatedQuestionsData = [...questionsData];
    updatedQuestionsData[index].answer = text;
    setQuestionsData(updatedQuestionsData);
  };

  const checkForSubmit = () => {
    // const newData = questionsData.map((item, index) => {
    //   if (item.answer == item.solution) {
    //     console.log("CORRECT ========", item);
    //     return {
    //       ...item,
    //       isCorrect: true,
    //     };
    //   } else if (item.answer != item.solution) {
    //     return {
    //       ...item,
    //       isCorrect: false,
    //     };
    //   }
    //   return {
    //     ...item,
    //   };
    // });
    // setQuestionsData(newData);
    // const correctItems = newData.filter((item) => item?.isCorrect === true);
    // setCorrectAnswers(correctItems.length);
    // const final = correctItems.length;
    // localStorage.setItem("value1", final.toString());

    // localStorage.setItem("timer1", elapsedTime.toString());
    const isAnyQuestionUnanswered = questionsData.some(
      (question) => question.answer === ""
    );

    console.log(
      "IS VALIDs ================",
      isFullNameValid,
      isIdNumberValid,
      isPhoneNumberValid
    );

    if (fullName && idNumber && phoneNumber && !isAnyQuestionUnanswered) {
      redirectToPage2();
      // setIsNextPage(true);
    }

    if (isAnyQuestionUnanswered) {
      alert("Please answer all the questions before submitting.");
    } else if (fullName && idNumber && phoneNumber) {
      console.log(questionsData);
      const newData = questionsData.map((item, index) => {
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
      setQuestionsData(newData);
      const correctItems = newData.filter((item) => item?.isCorrect === true);
      setCorrectAnswers(correctItems.length);
      const final = correctItems.length;
      localStorage.setItem("value1", final.toString());

      localStorage.setItem("timer1", elapsedTime.toString());
      // setIsNextPage(true);

      // alert("Submitted");
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Optional: Add smooth scrolling animation
      });
      alert("Some credentials are missings");
    }
  };

  const handleFullNameChange = (event) => {
    const { value } = event.target;
    console.log("NAME ==========", value);

    setFullName(value);
    if (value == "") {
      console.log("FALSEsdakmdk");
      setIsFullNameValid(false);
    } else {
      setIsFullNameValid(true);
    }
  };

  const handleIdNumberChange = (event) => {
    const { value } = event.target;
    setIdNumber(value);
    if (value == "") {
      setIsIdNumberValid(false);
    } else {
      setIsIdNumberValid(true);
    }
  };

  const handlePhoneNumberChange = (event) => {
    const { value } = event.target;
    setPhoneNumber(value);
    if (value == "") {
      setIsPhoneNumberValid(false);
    } else {
      setIsPhoneNumberValid(true);
    }
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
                    <div className="nameLabelDiv" style={{ width: "169px" }}>
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
                    <div className="nameLabelDiv" style={{ width: "169px" }}>
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
                    <div className="nameLabelDiv" style={{ width: "169px" }}>
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
              {questionsData.map((item, index) => (
                <Question
                  setElapsedTime={setElapsedTime}
                  setData={updateAnswer}
                  myArray={questionsData}
                  setMyArray={setQuestionsData}
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
              הבא
            </button>
          </div>
          {/* <div>{correctAnswers}</div> */}
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
              {questionsData.map((item, index) => (
                <Question
                  setElapsedTime={setElapsedTime}
                  setData={updateAnswer}
                  myArray={questionsData}
                  setMyArray={setQuestionsData}
                  index={index}
                  item={item}
                />
              ))}
            </div>
          </div>
          <div className="page">
            {/* <link to="/page2"> */}
            <button
              disabled={
                !isFullNameValid || !isIdNumberValid || !isPhoneNumberValid
              }
              className="send"
              onClick={() => {
                checkForSubmit();
                redirectToPage2();
              }}
              title="Send"
            >
              הַבָּא
            </button>
            {/* </link> */}
          </div>
          {/* <div>{correctAnswers}</div> */}
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

export default Quiz;

//   const [elapsedTime, setElapsedTime] = useState(0);

//   const updateAnswer = (text, index) => {
//     const updatedQuestionsData = [...questionsData];
//     updatedQuestionsData[index].answer = text;
//     setQuestionsData(updatedQuestionsData);
//   };

//   const checkForSubmit = () => {
//     const isAnyQuestionUnanswered = questionsData.some(
//       (question) => question.answer === ""
//     );

//     if (isAnyQuestionUnanswered) {
//       alert("Please answer all the questions before submitting.");
//     } else {
//       console.log(questionsData);
//       alert("Submitted");
//     }
//   };

//   const sendButtonDisabled = questionsData.some(
//     (question) => question.answer === ""
//   );

//   return (
//     <>
//       <div className="wrapper">
//         <div className="navbar">
//           <h1 className="isra">ישראלי ישראלי</h1>
//           <h1 className="sw">
//             סטוֹפֶּר
//             <div
//               style={{
//                 marginLeft: 10,
//               }}
//             >
//               <Stopwatch
//                 elapsedTime={elapsedTime}
//                 setElapsedTime={setElapsedTime}
//               />
//             </div>
//           </h1>
//         </div>
//         <div className="page">
//           <div className="quizpage">
//             <div className="nameID">
//               <div
//                 style={{
//                   flexDirection: "row",
//                   display: "flex",
//                   marginTop: "20px",
//                 }}
//               >
//                 <input type="text" required />
//                 <div className="nameLabel">
//                   <div style={{ width: "169px" }}>
//                     <label htmlFor="">שם מלא</label>
//                   </div>
//                 </div>
//               </div>
//               <div
//                 style={{
//                   flexDirection: "row",
//                   display: "flex",
//                   marginTop: "20px",
//                 }}
//               >
//                 <input type="text" required />
//                 <div className="nameLabel">
//                   <div style={{ width: "169px" }}>
//                     <label htmlFor="">תעודת זהות</label>
//                   </div>
//                 </div>
//               </div>

//               <div
//                 style={{
//                   flexDirection: "row",
//                   display: "flex",
//                   marginTop: "20px",
//                 }}
//               >
//                 <input type="text" required />
//                 <div className="nameLabel">
//                   <div style={{ width: "169px" }}>
//                     <label htmlFor="">מספר טלפון</label>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <h1>שאלות</h1>
//             {questionsData.map((item, index) => (
//               <Question
//                 setElapsedTime={setElapsedTime}
//                 setData={updateAnswer}
//                 index={index}
//                 item={item}
//               />
//             ))}
//           </div>
//         </div>
//         <div className="page">
//           <button
//             // disabled={sendButtonDisabled}
//             className="send"
//             onClick={checkForSubmit}
//             title="Send"
//           >
//             שלח
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Quiz;

// import React, { useState } from "react";
// import "./quiz.css";
// import Question from "./Question";
// import Stopwatch from "./Stopwatch";
// import QuestionsData from "../constants/Data";

// const Quiz = () => {
//   const [questionsData, setQuestionsData] = useState(QuestionsData);
//   const [sendButton, setSendButton] = useState(true);

//   const updateAnswer = (text, index) => {
//     let data = questionsData[index];
//     data.answer = text;

//     console.log({data})

//     let allQuestions = questionsData;
//     questionsData[index] = data;

//     let check = true;
//     for (var i = 0; i < questionsData.length; i++) {
//       if (questionsData[i].answer === "") {
//         check = true;
//         return;
//       }
//       check = false;
//     }
//     setSendButton(check);
//     setQuestionsData(allQuestions);
//   };

//   const checkForSubmit = () => {
//     console.log(questionsData)
//     alert("Submitted");
//   };

//   return (
//     <>
//       <div className="wrapper">
//         <div className="navbar">
//           <h1 className="isra">Israeli Israeli</h1>
//           <h1 className="sw">
//             StopWatch <Stopwatch />
//           </h1>
//         </div>
//         <div className="page">
//           <div className="quizpage">
//             <h1>questions</h1>
//             {questionsData.map((item, index) => {
//               return (
//                 <>
//                   <Question setData={updateAnswer} index={index} item={item} />
//                 </>
//               );
//             })}
//           </div>
//         </div>
//         <div className="page">
//           {/* <p className="send">Send</p> */}
//           <button
//             disabled={sendButton}
//             className="send"
//             onClick={() => {
//               checkForSubmit();
//             }}
//             title="Send"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Quiz;
