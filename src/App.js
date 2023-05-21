import logo from "./logo.svg";
import "./App.css";
import Quiz from "./quiz/Quiz";
import Quiz2 from "./quiz/Quiz2";
import Stopwatch from "./quiz/Stopwatch";
import HintButton from "./quiz/HintButton";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import StoreProvider from "../src/context/contextStore";

function App() {
  return (
    <>
      <StoreProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Quiz />} />
            <Route path="/page2" element={<Quiz2 />} />

            {/* <HintButton/> */}
            {/* <Stopwatch/> */}
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </>
  );
}

export default App;
