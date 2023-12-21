import { useState, useEffect } from 'react';

export default function Timer({ setStop, questionNumber, selectedAnswer }) {
    const [timer, setTimer] = useState(30);

    useEffect(() => {
        if (timer === 0) {
            return setStop(true);
        }

        // Check if selectedAnswer is not null before updating the timer
        // if no answer has been selected, the timer keeps counting down
        // the timer stops counting down and remains in the same second the moment an answer has been selected
        if (selectedAnswer === null) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            // Cleanup function to clear the interval when the component unmounts or selectedAnswer is not null
            return () => clearInterval(interval);
        }
    }, [setStop, timer, selectedAnswer]);

    // when question number changes, the timer is reset to 30 seconds
    useEffect(() => {
        setTimer(30);
    }, [questionNumber]);

    return timer;
}
