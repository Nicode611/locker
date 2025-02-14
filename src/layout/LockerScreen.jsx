import React from 'react'
import { useState } from 'react';
import Locker from '../components/Locker'
import confetti from 'canvas-confetti'; // Import de la librairie
import "./LockerScreen.css"

function LockerScreen() {

    const [unlocked, setUnlocked] = useState(false);


    const handleUnlock = (isCorrect) => {
        if (isCorrect) {
          setUnlocked(true);
          launchConfetti();
          /* playUnlockSound(); */
        }
      };

// Fonction pour déclencher l'animation de confettis
const launchConfetti = () => {
    confetti({
        particleCount: 250, // Nombre de confettis
        spread: 125, // Angle d'explosion
        origin: { y: 0.6 } // Point d'origine des confettis
    });
};

// Fonction pour jouer le son
const playUnlockSound = () => {
    const audio = new Audio('./confetti.mp3').play(); // Assurez-vous que le chemin est correct
    audio.volume = 0.5; // Ajuste le volume si besoin
    audio.play();
};
    
      return (
        <div className="main-container flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="main-title text-2xl font-bold mb-4">Unlock the locker</h1>
            <Locker correctCombination="SUAY" onUnlock={handleUnlock} />
            {unlocked && (
                <div className='answer-section'>
                    <p>Go check these links :</p>
                    <a href='https://moodeng-mu.vercel.app/' className='link'>Moodeng escaped from the zoo !</a>
                    <a href='https://youtu.be/t5vghV3CQbA' className='link'>The story of Moodeng</a>
                </div>
            )}
        </div>
      );
    };
    
export default LockerScreen
