import React from "react";

function Weather(props) {
    function getdate(value){
      let date = new Date(value * 1000);
      return date.getHours() + ":" + date.getMinutes()
    }
    function getday(value){
      let date = new Date(value * 1000);
      return  date.getDate() + " " + date.toLocaleDateString("ru-RU", {weekday:"long"})
    }
    function settemp(value) {
      return Math.round(value - 273.15)
    };
    function geticon(icon){
      return `http://openweathermap.org/img/wn/${icon}.png`
    }

    return (
    <>
      <section className="weather-block">
        <h3>Сейчас</h3>
        <div className="weather-minutely">
          {props.weather_minutely.map(item => 
              <div key={item.dt} className="weather-item">
                <span>{getdate(item.dt)}</span>
                <span>{item.precipitation}</span>
              </div>
          )}
        </div>
      </section>
      <section className="weather-block">
        <h3>На 2 дня</h3>    
        <div className="weather-hourly">
        {props.weather_hourly.map(item => 
            <div key={item.dt} className="weather-item">
              <span>{getdate(item.dt)}</span>
              <img className="weather-icon" src={geticon(item.weather[0].icon)} width="50" height="50" />
              <span>{settemp(item.temp)}°</span>
            </div>
          )}
        </div>
      </section>
      <section className="weather-block">
        <h3>На 7 дней</h3>
        <div className="weather-week">
        {props.weather_week.map(item => 
            <div key={item.dt} className="weather-day">
              <h4>{getday(item.dt)}<img className="weather-icon" src={geticon(item.weather[0].icon)} width="50" height="50" /></h4>
              <ul>
                <li><span>Утром</span> <span>{settemp(item.temp.morn)}°</span></li>
                <li><span>Днем</span> <span>{settemp(item.temp.day)}°</span></li>
                <li><span>Вечером</span> <span>{settemp(item.temp.eve)}°</span></li>
                <li><span>Ночью</span> <span>{settemp(item.temp.night)}°</span></li> 
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
    );
}

export default Weather;