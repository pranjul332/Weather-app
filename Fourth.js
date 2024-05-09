import React, { useEffect, useState } from 'react';
import './Fourth.css';
import clear_icon from "./background.jpg"  // image is present in src folder of project 

const Fourth = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null); // Added error state , for showing the error
  const [backgroundImage, setBackgroundImage] = useState('');

  const handleClick = async () => {
    
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fc965d5d007766f037330c68691bed66`);
      const data = await response.json();

      console.log('API Response:', data);

      if (response.ok) {
        setWeatherData(data);
        setError(null)

       // for changing the image
        if(weatherData   ){
          if ( weatherData.weather[0].icon==="01d" || weatherData.weather[0].icon==="01n" ){
            setBackgroundImage(`url(${clear_icon})`);
           }
         }
      } else {
        console.error(`Error fetching weather data. Status: ${response.status}`);
        setError({ message: `Error fetching weather data. ` });
        setWeatherData(null);

      }
      
    
  };

  // for work on enter button
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // If the Enter key is pressed, trigger the search function
      handleClick();
    }
  };
  
  

  return (
    <div className='weather'>
      <div className='city'>
      {weatherData &&<h2>  {weatherData.name}</h2>}
      </div>
      
      {/* <button onClick={handleClick}>Search</button> */}
      <div className='in'>
      <input
        type='text'
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder=' Enter city name'
        onKeyPress={handleKeyPress}
      />
      </div>
      
      <div className='data' style={{backgroundImage:backgroundImage}}>
        {/* <div className='image'><img src={wicon}/></div> */}
        
      {error&&<p>Error : {error.message}</p>}  
      {/*  for printing the error */}

{weatherData && (
  // above statement is used as the logical condition that render the content only if the weatherData is true
        <div className='forecast'>
          
          <p className='temp'> {Math.round(weatherData.main.temp-273)} °</p>
          {/* This will round the result of weatherData.main.temp - 273.15 to the nearest integer before displaying it in the <p> element.
           Adjust the rounding method based on your specific requirements (e.g., Math.floor() for rounding down, Math.ceil() for rounding up). */}
          <p className='weath'> {weatherData.weather[0].main}</p>
          <p className='humid'>Humidity   <span className='humid-value'>{weatherData.main.humidity}%</span></p>
          <p className='wind'>Wind <span className='wind-value'> {weatherData.wind.speed.toFixed(1)} m/s</span></p>
          {/* toFixed is used for printing decimale value upto 1 */}
          <p className='press'>Pressure <span className='press-value'>{weatherData.main.pressure}mBar</span></p>
        </div>
      )}
      </div>
    </div>
  );
};

export default Fourth;
