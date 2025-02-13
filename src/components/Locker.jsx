import React, { useState, useRef } from "react";
import "./Locker.css"; // Import du fichier CSS

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const Locker = ({ correctCombination, onUnlock }) => {
  const [combination, setCombination] = useState(["A", "A", "A", "A"]);
  const startY = useRef(null);
  const startIndex = useRef(null);

  const handleMouseDown = (index, event) => {
    startY.current = event.clientY;
    startIndex.current = alphabet.indexOf(combination[index]);

    const handleMouseMove = (moveEvent) => {
      if (startY.current === null || startIndex.current === null) return;

      const deltaY = moveEvent.clientY - startY.current;
      const step = Math.round(deltaY / 10);
      let newIndex = (startIndex.current + step) % alphabet.length;

      if (newIndex < 0) newIndex += alphabet.length;

      setCombination((prev) => {
        const newCombination = [...prev];
        newCombination[index] = alphabet[newIndex];
        return newCombination;
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleValidate = () => {
    if (combination.join("") === correctCombination) {
      onUnlock(true);

    } else {
      alert("❌ WRONG !");
    }
  };

  return (
    <div className="locker-container">
      {combination.map((letter, index) => (
        <div
          key={index}
          className="locker-wheel"
          onMouseDown={(e) => handleMouseDown(index, e)}
        >
          {letter}
        </div>
      ))}
      <button className="validate-button" onClick={handleValidate}>
        Validate
      </button>
    </div>
  );
};

export default Locker;