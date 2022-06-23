import React from "react";

function Current(props) {
      
    function geticon(icon){
      return `http://openweathermap.org/img/wn/${icon}.png`
    }
  
    return (
      <div className="current">
        <h3>{props.city}</h3>
        <h1>{props.temp}°</h1>
        <h4><img className="weather-icon" src={geticon(props.icon)} width="70" height="70" />{props.weather}</h4>
      </div>
    );
}

export default Current;