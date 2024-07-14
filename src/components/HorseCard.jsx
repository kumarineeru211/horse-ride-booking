import React from 'react';
import { motion } from 'framer-motion';

const HorseCard = ({ horse}) => {
  return (
    <motion.div 
      className="horse-card" 
      // onClick={() => onSelect(horse)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="horse-card-image">
        <img src={horse.image} alt={horse.name} className="horse-image" loading="lazy" />
        <h3 className="horse-card-name">{horse.name}</h3>
      </div>
    </motion.div>
  );
};

export default HorseCard;
