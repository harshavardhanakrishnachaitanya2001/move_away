import React, { useState, useEffect } from "react";
import toySpaceship from "../imags/toy_space_ship.png";
import { motion, useMotionValue } from "framer-motion";
import astroids from "../imags/astroids.png";

const asteroidVariants = {
  animate: {
    y: "100vh",
    transition: {
      duration: 5,
      ease: "linear",
    },
  },
};

const Game = ({setScore, setGameComplete }) => {
  const x = useMotionValue(0);
  const [rocks, setRocks] = useState([]);

  const addRock = () => {
    const newRock = {
      id: Date.now(),
      x: Math.random() * window.innerWidth,
      y: -50,
    };
    setRocks((prevRocks) => [...prevRocks, newRock]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const numRocks = Math.floor(Math.random() * 5) + 1;
      for (let i = 0; i < numRocks; i++) {
        addRock();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (event) => {
    x.set(event.clientX);
  };

  const handleFireClick = () => {
    setScore((prevScore) => prevScore + 2);
  };

  const restartGame = () => {
    setGameComplete(false);
    setScore(0);
  };

  return (
    <div className="h-screen">
      {/* Asteroid field */}
      {rocks.map((rock) => (
        <motion.img
          key={rock.id}
          variants={asteroidVariants}
          animate="animate"
          src={astroids}
          alt=""
          className="absolute"
          style={{ left: rock.x, top: rock.y, width: 40, height: 40 }}
        />
      ))}

      {/* Spaceship */}
      <motion.div
        onClick={handleFireClick}
        className="absolute bottom-28 left-auto right-auto w-full h-14"
        onMouseMove={handleMouseMove}
      >
        <motion.img
          style={{ x }}
          src={toySpaceship}
          alt=""
          animate={{ y: [2, -2, 2, -2, 2, -2, 2, -2, 2, -2, 2] }}
          transition={{ y: { duration: 2, repeat: Infinity, repeatDuration: 1, ease: "easeInOut" } }}
          className="w-14 h-14"
        />
      </motion.div>

      {/* Restart button */}
      <div className="justify-center flex items-end fixed bottom-4 w-11/12">
        <motion.button
          variants={{ click: { scale: 0.9 } }}
          onClick={restartGame}
          whileTap="click"
          className="leading-relaxed italic bg-red-400 border rounded-lg p-2 text-xl text-white font-bold mx-auto w-32 "
        >
          RESTART
        </motion.button>
      </div>
    </div>
  );
};

export default Game;
