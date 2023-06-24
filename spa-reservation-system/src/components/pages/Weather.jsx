import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Weather.css';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [temperature, setTemperature] = useState('');
  const [conditions, setConditions] = useState('');
  const [feels, setFeels] = useState('');
  const [icon, setIcon] = useState('');
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const getWeatherData = () => {
      const id = 'Toronto'; 
      const myAPIkey = '838ad7ccc906c867180a815bf6a07c75';
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${id}&appid=${myAPIkey}&units=metric`;
      
      axios
        .get(url)
        .then((response) => {
          const data = response.data;
          setLocation(data.city.name);
          setConditions(data.list[0].weather[0].description);
          setTemperature(data.list[0].main.temp + '°C');
          setFeels(data.list[0].main.feels_like + '°C');
          setIcon('http://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '.png');

          const filteredData = data.list.filter((data) => data.dt_txt.includes('12:00:00')).slice(0, 5);
          setWeatherData(filteredData);
        })
        .catch((error) => {
          console.log('API call was unsuccessful', error);
          toast.error('Failed to fetch weather data');
        });
    };

    getWeatherData();
  }, []);

  return (
    <div className='weather-container'>
      <h2>Weather</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Temperature</th>
              <th>Conditions</th>
              <th>Icon</th>
            </tr>
          </thead>
          <tbody>
            {weatherData.map((data, index) => (
              <tr key={index}>
                <td>{data.dt_txt.split(" ")[0]}</td>
                <td>{data.main.temp}°C</td>
                <td>{data.weather[0].description}</td>
                <td><img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="Weather Icon" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} />
    </div>
  );
};

export default Weather;
