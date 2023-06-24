import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const { setIsAuthenticated, setUserId, setIsAdmin } = useContext(AuthContext); 
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const navigate = useNavigate();

  // Fetch users data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  // Login handler
  const handleLogin = () => {
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
      toast.success('Login successful!');
      setIsAuthenticated(true);
      setUserId(user.id);  // Set user id in context
      setIsAdmin(user.admin);
      navigate(`/Home/${user.id}`);  // Navigate to the home page with user id
    } else {
      toast.error('Invalid email or password');
    }
  };

  // Create account handler
  const handleCreateAccount = async () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/users', { email, password }); // Send plain password
      setIsCreateAccount(false);
      window.location.reload();  // Add this line to refresh the page
    } catch (error) {
      console.error('Error creating account', error);
      toast.error('Error creating account');
    }
  };

  // Toggle form view handler
  const handleToggleForm = () => {
    setIsCreateAccount(!isCreateAccount);
  };

  return (
    <div className="login-container">
      <h2>{isCreateAccount ? 'Create Account' : 'Login'}</h2>
      <form className="login-form">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        
        <label htmlFor="password">Password</label>
        <input id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        
        {isCreateAccount && (
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input className='confirmPassword' id="confirmPassword" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
        )}
        
        <button type="button" onClick={isCreateAccount ? handleCreateAccount : handleLogin}>
          {isCreateAccount ? 'Create Account' : 'Login'}
        </button>
      </form>

      <button className="toggle-form" onClick={handleToggleForm}>
        {isCreateAccount ? 'Back to login' : 'Create new account'}
      </button>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} />
    </div>
  );
};

export default Login;
