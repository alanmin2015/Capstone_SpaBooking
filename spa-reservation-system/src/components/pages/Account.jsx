import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bcrypt from 'bcryptjs';
import './Account.css';
import { AuthContext } from '../../AuthContext';
import ConfirmationModal from './ConfirmationModel';

const Account = () => {
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [bookingIdToDelete, setBookingIdToDelete] = useState(null);
  const [bookingIdToUpdate, setBookingIdToUpdate] = useState(null);
  const [updatedDate, setUpdatedDate] = useState('');
  const [updatedPeople, setUpdatedPeople] = useState('');
  const [users, setUsers] = useState('');

  const { userId, isAdmin } = useContext(AuthContext);// Get userId from AuthContext

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let userResponse;
        let bookingsResponse;
        let allUser;
        
        if (isAdmin) {
          userResponse = await axios.get(`http://127.0.0.1:5000/api/users/${userId}`);
          bookingsResponse = await axios.get(`http://127.0.0.1:5000/api/booking`);
          allUser = await axios.get(`http://127.0.0.1:5000/api/users`);
          setUsers(allUser.data);
        } else {
          userResponse = await axios.get(`http://127.0.0.1:5000/api/users/${userId}`);
          bookingsResponse = await axios.get(`http://127.0.0.1:5000/api/booking/${userId}`);
        }
  
        setUser(userResponse.data);
        setPassword(userResponse.data.password);
        setFirstName(userResponse.data.first);
        setLastName(userResponse.data.last);
        setBookings(bookingsResponse.data);
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };
  
    fetchUserData();
  }, [userId, isAdmin]);

  const handleUpdate = async () => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await axios.put(`http://127.0.0.1:5000/api/users/${userId}`, {
        password: hashedPassword,
        first: firstName,
        last: lastName,
      });

      toast.success('Account updated successfully');
    } catch (error) {
      console.error('Error updating account: ', error);
      toast.error('Error updating account');
    }
  };

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/users/${userId}`);
      toast.success('Account deleted successfully');
      setTimeout(() => {
        window.location.href = '/'; // Redirect to login page
      }, 2000);
    } catch (error) {
      console.error('Error deleting account: ', error);
      toast.error('Error deleting account');
    } finally {
      setShowConfirmation(false);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleDeleteBooking = async (bookingId) => {
    setBookingIdToDelete(bookingId);
    setShowBookingConfirmation(true);
  };

  const confirmDeleteBooking = async () => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/booking/${bookingIdToDelete}`);
      toast.success('Booking deleted successfully');
      setBookingIdToDelete(null);
      // Fetch updated bookings after deletion
      const bookingsResponse = await axios.get(`http://127.0.0.1:5000/api/booking/${userId}`);
      setBookings(bookingsResponse.data);
    } catch (error) {
      console.error('Error deleting booking: ', error);
      toast.error('Error deleting booking');
    } finally {
      setShowBookingConfirmation(false);
    }
  };

  const cancelDeleteBooking = () => {
    setShowBookingConfirmation(false);
    setBookingIdToDelete(null);
  };

  const handleUpdateBooking = async () => {
    try {
      await axios.put(`http://127.0.0.1:5000/api/booking/${bookingIdToUpdate}`, {
        date: updatedDate,
        people: updatedPeople,
      });
      toast.success('Booking updated successfully');
      setBookingIdToUpdate(null);
      setUpdatedDate('');
      setUpdatedPeople('');
      // Fetch updated bookings after update
      
      let bookingsResponse;
      if (isAdmin) {
        bookingsResponse = await axios.get(`http://127.0.0.1:5000/api/booking`);
      } else {
        bookingsResponse = await axios.get(`http://127.0.0.1:5000/api/booking/${userId}`);
      }
      
      setBookings(bookingsResponse.data);
    } catch (error) {
      console.error('Error updating booking: ', error);
      toast.error('Error updating booking');
    }
  };

  const cancelUpdateBooking = () => {
    setBookingIdToUpdate(null);
    setUpdatedDate('');
    setUpdatedPeople('');
  };

  if (!userId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-container">
    <div className="account-container">
      <h2>Account</h2>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <button onClick={handleUpdate}>Update Account</button>
      <button onClick={handleDelete}>Delete Account</button>
      {showConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to delete your account?"
          onConfirmation={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      <div className="booking-container">
        <h3>Bookings</h3>
        {bookings.length > 0 ? (
          <ul className="booking-list">
             {bookings.map((booking, index) => {
                let userInfo = "";
                if (isAdmin) {
                  let user = users.find(user => user.id === booking.userID);
                  if (user) {
                    userInfo = `User ID: ${user.id}, User Name: ${user.first} ${user.last}`;
                  }
                }

                return (
                  <li key={booking.id}>
                    <span className="booking-title">Booking {index + 1}</span>
                    <span className="booking-info">Date: {new Date(booking.date).toISOString().split('T')[0]}</span>
                    <span className="booking-info">People: {booking.people}</span>
                    {isAdmin && <span className="booking-info">{userInfo}</span>}
                    <button onClick={() => handleDeleteBooking(booking.id)}>Delete Booking</button>
                    <button onClick={() => {
                      setBookingIdToUpdate(booking.id);
                      setUpdatedDate(booking.date);
                      setUpdatedPeople(booking.people);
                    }}>Update Booking</button>
                    {bookingIdToUpdate === booking.id && (
                      <div>
                        <input
                          type="date"
                          value={new Date(updatedDate).toISOString().split('T')[0]}
                          onChange={(e) => setUpdatedDate(e.target.value)}
                        />
                        <input
                          type="number"
                          value={updatedPeople}
                          onChange={(e) => setUpdatedPeople(e.target.value)}
                        />
                        <button onClick={handleUpdateBooking}>Confirm Update</button>
                        <button onClick={cancelUpdateBooking}>Cancel</button>
                      </div>
                    )}
                  </li>
                )
              })}
          </ul>
        ) : (
          <p>No bookings found</p>
        )}
        {showBookingConfirmation && (
          <ConfirmationModal
            message="Are you sure you want to delete this booking?"
            onConfirmation={confirmDeleteBooking}
            onCancel={cancelDeleteBooking}
          />
        )}
      </div>
      <ToastContainer />
    </div>
    </div>
  );
};

export default Account;
