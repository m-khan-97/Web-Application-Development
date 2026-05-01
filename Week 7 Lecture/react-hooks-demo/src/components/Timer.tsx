import { useRef, useState } from "react";

export default function Timer() {
    const timerHandle = useRef<number | null>(null);
    const [startTime, setStartTime] = useState(0);
    const [currentTime, SetCurrentTime] = useState(0);

    function startTimer() {
        if(timerHandle.current == null) {
            const initialTime = Math.round(Date.now());
            setStartTime(initialTime);
            SetCurrentTime(initialTime);

            timerHandle.current = setInterval(() => {
                const timeNow = Math.round(Date.now());
                SetCurrentTime(timeNow);
            }, 1000)
        }
    }

    function stopTimer() {
        if (timerHandle.current != null) {
            clearInterval(timerHandle.current);
            timerHandle.current = null;
        }
    }

    return (
        <div>
            <h2>Timer</h2>
            <p>Time : {Math.round((currentTime - startTime) / 1000)} seconds</p>
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
        </div>
    );

}