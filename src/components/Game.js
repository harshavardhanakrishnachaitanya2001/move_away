import React from "react";
import toySpaceship from "../imags/toy_space_ship.png";
import { motion, useMotionValue } from "framer-motion";
import astroids from "../imags/astroids.png";


const astroidVariants = {
  initial:{
    y:-1000,
    x:Math.random()*window.innerWidth,
  },
  animate:{
    y:1000,
    transition:{
      duration:3,
      delay:2,
      repeat:Infinity,
      repeatDuration:3
    },
  }
}

const buttonVariants = {
  click: {
    scale: 0.9,
  },
};
const spaceshipVariants = {
  animate: {
    y: [2, -2, 2, -2, 2, -2, 2, -2, 2, -2, 2],
    transition: {
      y: {
        duration: 2,
        repeat: Infinity,
        repeatDuration: 1,
        ease: "easeInOut",
      },
    },
  },
};

const Game = ({ score, setScore, setGameComplete }) => {
  const x = useMotionValue(0);
  const restartGame = () => {
    setGameComplete(false);
    setScore(0);
  };
  const handleMouseMove = (event) => {
    x.set(event.clientX);
  };
  const handleFireClick = () => {
    setScore(prevScore => prevScore + 2);
  };
  return (
  <div className="h-screen">
    {/* Game */}

      {/* Astroid field */}
      <div className="flex flex-wrap">
        <motion.img variants={astroidVariants} initial="initial" animate="animate" src={astroids} alt="" className="h-40 w-30"/>
        <motion.img variants={astroidVariants} initial="initial" animate="animate" src={astroids} alt="" className="h-40 w-30"/>
        <motion.img variants={astroidVariants} initial="initial" animate="animate" src={astroids} alt="" className="h-40 w-30"/>
        <motion.img variants={astroidVariants} initial="initial" animate="animate" src={astroids} alt="" className="h-40 w-30"/>
        <motion.img variants={astroidVariants} initial="initial" animate="animate" src={astroids} alt="" className="h-40 w-30"/>
        <motion.img variants={astroidVariants} initial="initial" animate="animate" src={astroids} alt="" className="h-40 w-30"/>
        <motion.img variants={astroidVariants} initial="initial" animate="animate" src={astroids} alt="" className="h-40 w-30"/>
        
      </div>

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
          variants={spaceshipVariants}
          animate="animate"
          className="w-14 h-14"
        />
      </motion.div>
      {/* Restart button */}
      <div className="justify-center flex items-end fixed bottom-4 w-11/12">
        <motion.button
          variants={buttonVariants}
          onClick={restartGame}
          whileTap="click"
          className=" leading-relaxed italic bg-red-400 border rounded-lg p-2 text-xl text-white font-bold mx-auto w-32 "
        >
          RESTART
        </motion.button>
      </div>
  </div>
  );
};

export default Game;