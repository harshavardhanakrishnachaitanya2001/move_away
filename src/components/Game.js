import React, { useState, useEffect, useCallback } from "react";
import toySpaceship from "../imags/toy_space_ship.png";
import { motion, useMotionValue } from "framer-motion";
import spongebob from "../imags/spongebob.png";
import Laser from "./Laser";

const imageVariant = {
  initial: {
    x: "-100vw",
  },
  animate: {
    x: 0,
    transition: {
      delay: 1,
      type: "spring",
      duration: 0.5,
      stiffness: 200,
    },
  },
  
};

const Game = ({ setScore, setGameComplete }) => {
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const [removedLasers, setRemovedLasers] = useState([]);
  const [lasers, setLasers] = useState([]);
  const newImageList = [];
  for (let i = 0; i < 100; i++) {
    newImageList.push({
      id: i,
      visible: true,
      image: (
        <motion.img
          variants={imageVariant}
          id={`target-${i}`}
          key={i}
          src={spongebob}
          alt=""
          className="w-14 h-14"
          initial="initial"
          animate="animate"
        />
      ),
    });
  }
  const [images, setImages] = useState(newImageList);
  const imagePerRow = 10;
  const x = useMotionValue(0);

  const shootLaser = () => {
    setLasers((prevLasers) => [
      ...prevLasers,
      { key: `laser-${prevLasers.length}`, x: x.get() },
    ]);
  };

  const handleMouseMove = (event) => {
    const cursorPosition = event.clientX;
    x.set(cursorPosition);
  };

  const findLastIndex = (array, callback) => {
    for (let i = array.length - 1; i >= 0; i--) {
      if (callback(array[i], i, array)) {
        return i;
      }
    }
    return -1;
  }
  const restartGame = () => {
    setGameComplete(false);
  setScore(0);
  setRemovedLasers([]);
  setLasers([]);
  setImages(newImageList);
  setAnimationTrigger((prevTrigger) => !prevTrigger);
  };
  

  const checkCollision = useCallback(
    (laser) => {
      if (removedLasers.includes(laser.key)) return;

      const laserElement = document.getElementById(`laser-${laser.key}`);
      const laserRect = laserElement
        ? laserElement.getBoundingClientRect()
        : null;

      if (laserRect && laserRect.y < 0) {
        setRemovedLasers((prevRemovedLasers) => [
          ...prevRemovedLasers,
          laser.key,
        ]);
        return;
      }

      const hitImageIndex = findLastIndex(images,(image) => {
        const imageElement = document.getElementById(`target-${image.id}`);
        const imageRect = imageElement
          ? imageElement.getBoundingClientRect()
          : null;
         
        return (
          image.visible &&
          imageRect &&
          laserRect &&
          laserRect.x < imageRect.x + imageRect.width &&
          laserRect.x + laserRect.width > imageRect.x 
        );
      });

      if (hitImageIndex !== -1) {
        const spaceshipElement = document.querySelector(".w-14.h-14");
        const spaceshipRect = spaceshipElement
          ? spaceshipElement.getBoundingClientRect()
          : null;
        const hitImageElement = document.getElementById(`target-${hitImageIndex}`);
        const hitImageRect = hitImageElement
          ? hitImageElement.getBoundingClientRect()
          : null;
          if (spaceshipRect && hitImageRect) {
            const distance = Math.abs(hitImageRect.y - spaceshipRect.y);
            const delay = distance / 2;
            setTimeout(() => {
              setScore((prevScore) => prevScore + 1);
              setImages((prevImages) =>
                prevImages.map((image, index) => {
                  if (index === hitImageIndex) {
                    return { ...image, visible: false };
                  }
                  return image;
                })
              );
              setRemovedLasers((prevRemovedLasers) => [
                ...prevRemovedLasers,
                laser.key,
              ]);
            }, delay)
          }
      }
    },
    [images, removedLasers, setScore]
  );

  useEffect(() => {
    const newImageRows = [];
    for (let i = 0; i < images.length; i += imagePerRow) {
      newImageRows.push(images.slice(i, i + imagePerRow));
    }

    lasers.forEach((laser) => {
      checkCollision(laser);
    });
  }, [lasers, checkCollision, images]);

  return (
    <div className="h-screen my-auto">
      {/* Targets */}
      <div className="grid grid-cols-10 gap-x-5 gap-y-5 max-w-6xl mx-auto" key={animationTrigger.toString()}>
        {images.map((image) =>
          image.visible ? (
            <motion.div key={image.id}>
              <motion.img
                variants={imageVariant}
                id={`target-${image.id}`}
                key={image.id}
                src={spongebob}
                alt=""
                className="w-14 h-14"
                initial="initial"
                animate="animate"
              />
            </motion.div>
          ) : (
            <div key={image.id} className="w-14 h-14" />
          )
        )}
      </div>
      {/* Spaceship */}
      <motion.div
        className="absolute bottom-28  w-full h-14"
        onMouseMove={handleMouseMove}
        onClick={shootLaser}
      >
        <motion.img
          style={{ x }}
          src={toySpaceship}
          alt=""
          animate={{ y: [2, -2, 2, -2, 2, -2, 2, -2, 2, -2, 2] }}
          transition={{
            y: {
              duration: 2,
              repeat: Infinity,
              repeatDuration: 1,
              ease: "easeInOut",
            },
          }}
          className="w-14 h-14"
        />
      </motion.div>

      {/* Lasers */}
      {lasers
        .filter((laser) => !removedLasers.includes(laser.key))
        .map((laser) => (
          <Laser key={laser.key} id={`laser-${laser.key}`} x={laser.x} />
        ))}

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
