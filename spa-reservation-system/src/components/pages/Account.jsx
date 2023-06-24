import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bcrypt from 'bcryptjs';
import './Account.css';
import { AuthContext } from '../../AuthContext'; 
import { useParams } from 'react-router-dom';

const Account = () => {
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [user, setUser] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const { userId } = useContext(AuthContext); // Get userId from AuthContext

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/api/users/${userId}`);
        setUser(res.data);
        setPassword(res.data.password);
        setFirstName(res.data.first);
        setLastName(res.data.last);
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleUpdate = async () => {
    try {
      
      const hashedPassword = await bcrypt.hash(password, 10);
      await axios.put(`http://127.0.0.1:5000/api/users/${userId}`, {
        password: hashedPassword,
        first: firstName,
        last: lastName
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

  if (!userId) {
    return <div>Loading...</div>;
  }

  return (
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
        <div>
          <p>Are you sure you want to delete your account?</p>
          <button className="confirm" onClick={confirmDelete}>
            Yes
          </button>
          <button onClick={cancelDelete}>No</button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Account;
