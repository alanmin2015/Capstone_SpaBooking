import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Account = () => {
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [user, setUser] = useState(null); // New state to store user data 
  const [showConfirmation, setShowConfirmation] = useState(false);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5000/api/users');
        const users = res.data;
        if (users.length > 0) {
          const user = users[0];
          setUser(user);
          setPassword(user.password);
          setFirstName(user.first);
          setLastName(user.last);
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.put('http://127.0.0.1:5000/api/users', {
        email: user.email,
        password,
        first: firstName,
        last: lastName
      });
      toast.success('Account updated successfully');;
    } catch (error) {
      console.error('Error updating account: ', error);
      toast.error('Error updating account');
    }
  };

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const confirmDelete  = async () => {
    try {
      await axios.delete('http://127.0.0.1:5000/api/users', {
        data: { email: user.email }
      });
      toast.success('Account deleted successfully');
      setTimeout(() => {
        window.location.href = '/'; // Redirect to login page
      }, 2000);
    } catch (error) {
      console.error('Error deleting account: ', error);
      toast.error('Error deleting account');
    }
    finally {
      setShowConfirmation(false);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  if (!user) {
    return <div>Loading...</div>; // Add loading state while user data is being fetched
  }

  

  return (
    <div>
      <h2>Account</h2>
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <input placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
      <input placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
      <button onClick={handleUpdate}>Update Account</button>
      <button onClick={handleDelete}>Delete Account</button>
      {showConfirmation && (
        <div>
          <p>Are you sure you want to delete your account?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      )}
      <ToastContainer /> {/* Add ToastContainer component */}
    </div>
  );
}

export default Account;
