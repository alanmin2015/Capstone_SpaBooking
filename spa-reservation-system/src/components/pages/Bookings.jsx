import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Booking.css';
import { AuthContext } from '../../AuthContext';
import ConfirmationModel from './ConfirmationModel';
import { useNavigate } from 'react-router-dom';


const useBookingConfirmation = (userId, date, people) => {
  const navigate = useNavigate();

  const handleConfirmation = async (confirmed) => {
    if (confirmed) {
      try {
        await axios.post('http://localhost:5000/api/booking', {
          date,
          people,
          userID: userId,
        });
        toast.success('Booking created successfully');
        navigate(`/Home/${userId}`);
      } catch (error) {
        console.error('Error creating booking: ', error);
        toast.error('Error creating booking');
      }
    }
  };

  return handleConfirmation;
};

const Booking = () => {
  const { userId } = useContext(AuthContext);
  const [date, setDate] = useState('');
  const [people, setPeople] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handlePeopleChange = (event) => {
    setPeople(event.target.value);
  };

  const handleBooking = async () => {
    // Validate date and number of people
    if (date === '' || new Date(date) < new Date().setHours(0, 0, 0, 0)) {
      toast.error('Please select a valid date');
      return;
    }
    if (people === '' || parseInt(people) <= 0) {
      toast.error('Please enter a valid number of people');
      return;
    }

    setShowConfirmation(true);
  };

  const handleConfirmation = useBookingConfirmation(userId, date, people);

  return (
    <div className="booking-container">
      <h2 className="booking-heading">Booking</h2>
      <div className="form-group">
        <label htmlFor="date" className="form-label">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={handleDateChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="people" className="form-label">
          Number of People
        </label>
        <input
          type="number"
          id="people"
          value={people}
          onChange={handlePeopleChange}
          className="form-input"
        />
      </div>
      <button onClick={handleBooking} className="booking-button">
        Book
      </button>
      {showConfirmation && (
        <ConfirmationModel
          onConfirmation={handleConfirmation}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Booking;
