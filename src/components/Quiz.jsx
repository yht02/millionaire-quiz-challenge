import { useEffect, useState } from "react";
import { useSound } from "use-sound";
import countdown_music from "../assets/countdown_music.mp3";
import correct from "../assets/correct.mp3";
import wrong from "../assets/wrong.mp3";

export default function Quiz({ data, setStop, questionNumber, setQuestionNumber, setSelectedAnswer, selectedAnswer, setCorrectCount }) {

  const [question, setQuestion] = useState(null);
  // const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("option");
  const [playMusic, { stop: stopMusic }] = useSound(countdown_music, {
    volume: 1,
    loop: true, // Loop the music
  });
  const [correctSound] = useSound(correct);
  const [wrongSound] = useSound(wrong);

  useEffect(() => {
    playMusic();
    return () => {
      // Cleanup function to stop the music when the component unmounts
      stopMusic();
    };
  }, [playMusic, stopMusic]);



  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);


  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };


  const handleClick = (a) => {
    setSelectedAnswer(a);
    setClassName("option active");
    delay(3000, () => {
      setClassName(a.correct ? "option correct" : "option wrong")
    });
    delay(5000, () => {
      if (a.correct) {
        correctSound();
        delay(1000, () => {
          // increment the question number
          setQuestionNumber((prev) => prev + 1);
          // refresh the selected choice
          setSelectedAnswer(null);
          setCorrectCount((prev) => prev + 1);
        });

      } else {
        wrongSound();
        delay(1000, () => {
          stopMusic();
          // terminate the quiz if the answer is wrong
          setStop(true);
        })
      }
    });

  };

  return (
    <div className="quiz">
      <div className="question">{question?.question}</div>
      <div className="options">
        {question?.options.map((a) => (
          <div className={selectedAnswer === a ? className : "option"}
            onClick={() => handleClick(a)}>
            {a.content}
          </div>
        ))}
      </div>
    </div>
  );
}
