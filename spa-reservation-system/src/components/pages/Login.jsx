// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Alert } from 'react-bootstrap'; // Or any alert library you are using

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
// console.log('123',123)
//     try {
//       const response = await axios.post('http://wenbomin.ca:5000/login', { username, password });
//       localStorage.setItem('token', response.data.token);
//       navigate('/home');
//     } catch (error) {
//       setError(error.response.data.message);
//       console.log(error);
//     }
//   };

//   return (
//     <div className="App">
//       {error && <Alert variant="danger">{error}</Alert>}
//       <form onSubmit={handleLogin}>
//         <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
//         <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = () => {
  const [users, setUsers] = useState([]);

  // Fetch users data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5000/api/users');
        setUsers(res.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>email</th>
          {/* Add other column headers as per your 'users' table schema */}
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.email}</td>
            {/* Render other columns data as per your 'users' table schema */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Login;
