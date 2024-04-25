// Timer.jsx
import React, { useState, useEffect } from "react";
import moneySound from "./assets/money.mp3"; // Assuming the file path is correct
import "./Timer.css";

const Stopwatch = ({ inputValue }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const [amount, setAmount] = useState(0);
    const [isRaining, setIsRaining] = useState(false); // New state to control the raining animation
    const [currentTime, setCurrentTime] = useState(new Date());

    const emojis = ["💸", "💲", "🤑", "💰", "💵"];
    const arrayLength = emojis.length;

    useEffect(() => {
        let intervalId;

        if (isRunning) {
            intervalId = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
                if (time > 9 && time % 10 === 0) {
                    setAmount((prevAmount) => {
                        const newAmount = prevAmount + inputValue * 100; // Use inputValue instead of salary
                        if (newAmount % inputValue === 0) {
                            setIsRaining(true); // Trigger the animation when amount increments by salary
                            playSound();
                            setTimeout(() => setIsRaining(false), 5000); // Stop the animation after 5 seconds
                        }
                        return newAmount;
                    });
                }
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isRunning, time, inputValue]);

    // Update current time every second
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleStartStop = () => {
        setIsRunning((prevState) => !prevState);
    };

    const handleReset = () => {
        setTime(0);
        setIsRunning(false);
        setAmount(0);
    };

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        return `${hours < 10 ? "0" : ""}${hours}:${
            minutes < 10 ? "0" : ""
        }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const playSound = () => {
        const audio = new Audio(moneySound);
        audio.play();
    };

    // Calculate the number of dollar bills needed to fill the width of the screen
    const dollarBillCount = Math.ceil(window.innerWidth);

    return (
        <div className="container">
            <h1>Daily Total</h1>
            <div className="amount">${(amount / 100).toFixed(2)}</div>
            <h2>Work Timer</h2>
            <div className="timer">{formatTime(time)}</div>
            <h2>Day Time</h2>
            <div className="current-time">
                {currentTime.toLocaleTimeString()}
            </div>{" "}
            {/* Display current time */}
            <button className="button" onClick={handleStartStop}>
                {isRunning ? "Stop" : "Start"}
            </button>
            <button className="button" onClick={handleReset}>
                Reset
            </button>
            {isRaining && (
                <div className="dollar-bills-container">
                    {Array.from({ length: arrayLength }).map((_, rowIndex) => (
                        <div className="row" key={rowIndex}>
                            {[...Array(dollarBillCount)].map((_, index) => (
                                <h2 key={index} className="dollar-bill">
                                    {emojis[rowIndex]}
                                </h2>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Stopwatch;
