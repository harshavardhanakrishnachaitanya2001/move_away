import { motion } from "framer-motion";

const scoreVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3, delay: 0.2, ease: "easeIn" },
};

const gameCompleteVariants = {
  stopGame: {
    fontSize: "200px",
    x: -500,
    y: 100,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const headingVariants = {
  initial: { y: -100 },
  animate: {
    y: 0,
    transition: {
      ease: "easeInOut",
    },
  },
};

const Header = ({ score, gameComplete }) => {

    

  return (
    <div className="flex items-center justify-between font-semibold w-full">
      {/* Heading */}
      <div className="my-2 w-full text-center">
        <motion.h1
          className="text-4xl text-white"
          variants={headingVariants}
          initial="initial"
          animate="animate">
            The Game
        </motion.h1>
      </div>

      {/* Score */}
      <motion.div
        key={score}
        variants={scoreVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        
      >
        <motion.p
          className="text-white font-semi-bold text-2xl leading-relaxed pr-10"
          variants={gameComplete ? gameCompleteVariants : scoreVariants}
          initial="initial"
          animate={gameComplete ? "stopGame" : "animate"}
        >
          {gameComplete ? "Game Complete" : score}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Header;
