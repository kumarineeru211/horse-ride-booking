import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { setBookingDetails, confirmBooking } from '../store/bookingSlice';
import { useForm } from 'react-hook-form';

import { createEvent } from 'ics';
import Popup from './Popup'; 
import './BookingForm.css'; 

const horses = [
  { name: 'Benny', image: '/images/horse1.jpg' },
  { name: 'Angus', image: '/images/horse2.jpg' },
  { name: 'Denny', image: '/images/horse3.jpg' },
  { name: 'Marvin', image: '/images/horse4.jpg' }
];

const BookingForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [date, setDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);
  const [selectedHorse, setSelectedHorse] = useState('');

  const onSubmit = (data) => {
    const bookingDetails = { ...data, date, selectedHorse };
    dispatch(setBookingDetails(bookingDetails));
    dispatch(confirmBooking());

    const [year, month, day] = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    ];
    const [hour, minute] = data.timeSlot.split(':').map(Number);

    const event = {
      start: [year, month, day, hour, minute],
      duration: { hours: 1 },
      title: `Horse Riding with ${selectedHorse}`,
      description: 'Enjoy your horse ride!',
      location: 'Horse Stable',
      attendees: [{ name: data.name, email: data.email }],
    };

    

    createEvent(event, (error, value) => {
      if (error) {
        console.log(error);
        return;
      }

      const blob = new Blob([value], { type: 'text/calendar' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'invite.ics';
      a.click();
      window.URL.revokeObjectURL(url);
    });

    setShowPopup(true);
    reset(); // Reset the form fields
    setDate(new Date()); 
    setSelectedHorse(''); 
  };

  const isValidDate = (date) => {
    const day = date.getDay();
    return day !== 0; // Exclude Sundays
  };

  const generateTimeSlots = () => {
    const slots = [];
    const day = date.getDay();

    if (day === 6) { // Saturday
      for (let hour = 15; hour < 24; hour++) {
        slots.push(`${hour}:00`);
      }
    } else if (day >= 1 && day <= 2) { // Monday to Tuesday
      for (let hour = 9; hour < 24; hour++) {
        slots.push(`${hour}:00`);
      }
    }

    return slots;
  };

  return (
    <div className="booking-form-container">
      <div className="form-background">
        <div className="form-content">
          <h1>Book Your Horse Ride</h1>
          <p>Select a horse from our beautiful collection and book your ride now!</p>
        </div>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-field">
            <span><label>Select a horse:</label></span>
            <select 
              {...register('selectedHorse', { required: true })} 
              value={selectedHorse}
              onChange={e => setSelectedHorse(e.target.value)}
            >
              <option value="">Select a horse</option>
              {horses.map(horse => (
                <option key={horse.name} value={horse.name}>{horse.name}</option>
              ))}
            </select>
          </div>
          <div className='error'>{errors.selectedHorse && <span>Please select a horse</span>}</div>

          <div className="form-field">
            <label>Date:</label>
            <DatePicker 
              selected={date} 
              onChange={date => setDate(date)} 
              filterDate={isValidDate}
              minDate={new Date()} 
            />
          </div>

          <div className="form-field">
            <label>Time Slot:</label>
            <select {...register('timeSlot', { required: true })}>
              <option value="">Select a time slot</option>
              {generateTimeSlots().map((slot, index) => (
                <option key={index} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
          <div className='error'>
            {errors.timeSlot && <span>This field is required</span>}
          </div>

          <div className="form-field">
            <label>Name:</label>
            <input type="text" {...register('name', { required: true })} />
          </div>
          <div className='error'>
            {errors.name && <span>This field is required</span>}
          </div>

          <div className="form-field">
            <label>Email:</label>
            <input type="email" {...register('email', {
              required: 'This field is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address'
              }
            })} />
          </div>
          <div className='error'>
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div className="form-field">
            <label>Phone:</label>
            <input type="tel" {...register('phone', {
              required: 'This field is required',
              pattern: {
                value: /^\d{10}$/,
                message: 'Invalid phone number, must be 10 digits'
              }
            })} />
          </div>
          <div className='error'>
            {errors.phone && <span>{errors.phone.message}</span>}
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
      {showPopup && <Popup horse={selectedHorse} onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default BookingForm;
