import React from 'react';
import { useDispatch } from 'react-redux';
import { setBookingDetails } from '../store/bookingSlice';
import HorseCard from './HorseCard';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import horse1 from '../assets/horse1.jpg';
import horse2 from '../assets/horse2.jpg';
import horse3 from '../assets/horse3.jpg';
import horse4 from '../assets/horse4.jpg';
import bannerImg from '../assets/bannerimg.jpg'; 

const horses = [
  { name: 'Benny', image: horse1 },
  { name: 'Angus', image: horse2 },
  { name: 'Denny', image: horse3 },
  { name: 'Marvin', image:  horse4 }
];

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectHorse = (horse) => {
    dispatch(setBookingDetails({ selectedHorse: horse.name }));
    navigate('/booking');
  };

  return (
    <motion.div 
      className="landing-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="banner">
        <img src= {bannerImg} alt="Horse Ride Banner" loading="lazy" />
        <div className="banner-content">
          <h1>Start Your Horse Riding Adventure</h1>
          <p>Book a ride with one of our beautiful horses and enjoy an unforgettable experience.</p>
        </div>
      </div>

     <div className="horsescol">
     <div className="horses">
        {horses.map(horse => (
          <HorseCard key={horse.name} horse={horse} onSelect={handleSelectHorse} />
        ))}
      </div>
      <button className="book-now-btn" onClick={() => navigate('/booking')}>Book Now</button>
     </div>
    </motion.div>
  );
};

export default LandingPage;
