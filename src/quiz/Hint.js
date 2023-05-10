import React from 'react';
import './hint.css'

const Hint = ({ hint }) => {
  return
  <div>Hint: {hint}</div>;
};

export default Hint;





// import React, { useState, useEffect } from 'react';
// import './hintButton.css';

// const HintButton = () => {
//   const [showHint, setShowHint] = useState(false);

//   const handleHint = () => {
//     setShowHint(true);
//   };

//   useEffect(() => {
//     let timer;

//     if (showHint) {
//       timer = setTimeout(() => {
//         setShowHint(false);
//       }, 3000);
//     }

//     return () => clearTimeout(timer);
//   }, [showHint]);

//   return (
//     <div>
//       <div className='questionsMain'>
//         <button onClick={handleHint}>Hint</button>
//       </div>
//       {showHint && (
//         <div className='hintPop'>
//           <span>Hint: This is a hint message!</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HintButton;

    