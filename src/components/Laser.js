import { motion } from "framer-motion";
const Laser = ({ x, id }) => {
    const halfSpaceshipWidth = 32;

    return (
      <motion.div
        id={id}
        className="bg-red-500 h-16 w-1 absolute bottom-28"
        style={{ x:x-2 + halfSpaceshipWidth, y:"calc(100%-11rem)" }}
        initial={{ y: 0 }}
        animate={{ y: -1000 }}
        transition={{ duration: 1, ease: "linear" }}
      ></motion.div>
    );
  }; 
export default Laser;