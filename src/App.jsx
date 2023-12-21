import { useEffect, useState, useMemo } from "react";
import "./app.css";
import Quiz from "./components/Quiz.jsx";
import quizData from "./quizData.js";
import Timer from "./components/Timer.jsx";
import StartGame from "./components/StartGame.jsx";

// Function to shuffle an array
// In this context, it is used for shuffling the question order
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function App() {
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [moneyEarned, setMoneyEarned] = useState("$ 0");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [shuffledData, setShuffledData] = useState(() => shuffleArray(quizData));

  const data = shuffledData;

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "$ 100" },
        { id: 2, amount: "$ 200" },
        { id: 3, amount: "$ 300" },
        { id: 4, amount: "$ 500" },
        { id: 5, amount: "$ 1,000" },
        { id: 6, amount: "$ 2,000" },
        { id: 7, amount: "$ 4,000" },
        { id: 8, amount: "$ 8,000" },
        { id: 9, amount: "$ 16,000" },
        { id: 10, amount: "$ 32,000" },
        { id: 11, amount: "$ 64,000" },
        { id: 12, amount: "$ 125,000" },
        { id: 13, amount: "$ 250,000" },
        { id: 14, amount: "$ 500,000" },
        { id: 15, amount: "$ 1,000,000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 && 
      setMoneyEarned(moneyPyramid.find((m)=> m.id === questionNumber - 1).amount)
  }, [moneyPyramid, questionNumber]);


  useEffect(()=>{
    if (correctCount === 15){
      setStop(true);
    }
  }, [correctCount]);


  const resetGame = () => {
    setUsername(null);
    setQuestionNumber(1);
    setStop(false);
    setMoneyEarned("$ 0");
    setCorrectCount(0);
    setSelectedAnswer(null);
    setShuffledData(shuffleArray(quizData));
  };

  return (
    <div className="app">
      {username? (
        <>
          <div className="main">
            {stop ? 
            // Game stops
            <>
            <div className="endGameContainer">
              <h1 className="endGameMessage"> You earned {moneyEarned}</h1>
              {correctCount === 15 && (
                <p className="celebrationText">Congratulations! You won one million dollar!</p>
                )
              }
              <button className="playAgain" onClick={resetGame}>Play Again</button>
            </div>

            </>
            // Game continues
            : 
              <>
                <div className="top">
                  <div className="username">Username: {username}</div>
                  <div className="correctCount">You scored {correctCount}/15</div>
                  <button className="resetBtn" onClick={resetGame}>Reset Game</button>
                  <div className="timer"> 
                    <Timer
                      setStop = {setStop}
                      questionNumber = {questionNumber}
                      selectedAnswer = {selectedAnswer}
                    />
                
                  </div>
                </div>
                <div className="bottom">
                  <Quiz 
                    data = {data} 
                    setStop = {setStop} 
                    questionNumber = {questionNumber} 
                    setQuestionNumber = {setQuestionNumber}
                    selectedAnswer = {selectedAnswer}
                    setSelectedAnswer = {setSelectedAnswer}
                    setCorrectCount = {setCorrectCount}
                  />
                </div>
              </>
            }
          </div>

          <div className="pyramid">
            <ul className="rewardList">
              {moneyPyramid.map((money) => (
                <li className={questionNumber === money.id ? "rewardListItem active": "rewardListItem"}>
                  <span class="rewardListItemNumber">{money.id}</span>
                  <span class="rewardListItemAmount">{money.amount}</span>
                </li>
              ))}
            </ul>

          </div>
        
        </>
      ): <StartGame setUsername= {setUsername}/>
      }
    </div>
  );
}

export default App;
