// NewComponent.jsx
import React, { useState } from "react";
import Timer from "./Timer";
import "./GetSalary.css"; // Import CSS file

const GetSalary = () => {
    const [inputValue, setInputValue] = useState(0);
    const [showTimer, setShowTimer] = useState(false);

    const handleButtonClick = () => {
        setShowTimer(true);
    };

    const handleInputChange = (e) => {
        setInputValue(parseInt(e.target.value));
    };

    return (
        <div className="get-salary-container">
            {!showTimer && (
                <div className="input-container">
                    <h2>Input your hourly salary</h2>
                    <input
                        className="salary-input"
                        type="number"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <button
                        className="start-button"
                        onClick={handleButtonClick}
                    >
                        Start Timer
                    </button>
                </div>
            )}
            {showTimer && <Timer inputValue={inputValue} />}
        </div>
    );
};

export default GetSalary;
