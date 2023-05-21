import React, { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

export default ({ children }) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [correctAnswers2, setCorrectAnswers2] = useState(0);

  const store = {
    correctAnswers,
    setCorrectAnswers,
    correctAnswers2,
    setCorrectAnswers2,
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
