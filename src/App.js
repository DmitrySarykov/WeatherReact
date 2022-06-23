import React, { useState } from "react";

import "./styles/App.css";
import Info from "./components/Info";
import Form from "./components/Form";
import Weather from "./components/Weather";
import Current from "./components/Current";

function App() { 
    // function success(pos) {
    //     var crd = pos.coords;
    //     lat = crd.latitude;
    //     lon = crd.longitude;
    //     console.log(lat, lon)
    // };
    //navigator.geolocation.getCurrentPosition(success);
    var [info, setInfo] = useState(
        {
            date: undefined,
            city: undefined,
            temp: undefined,
            weather: undefined
        });
    var [weather_minutely, setWeatherMinutely] = useState([]);
    var [weather_hourly, setWeatherHourly] = useState([]);  
    var [weather_week, setWeatherWeek] = useState([]);        
    const API_key = "40de902abd8f89adaea2ff465595028c";
    var lat = 0;
    var lon = 0;
    
    async function gettingWeather(e){
        e.preventDefault();
        const city = e.target.city.value;
        //https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=ru
        const geo = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&lang=ru`)
        .then((res) => res.json())
        //console.log(geo);
        lat = geo.coord.lat;
        lon = geo.coord.lon;

        const data = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=ru&appid=${API_key}`)
        .then((res) => res.json());
        //console.log("data",data);
        
        const minute = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily&appid=${API_key}`)
        .then((res) => res.json());
        //console.log("minute",minute);    
        
        let data_hourly = data.hourly;
        let data_minutely = minute.minutely;
        let data_week = data.daily;

        const temp = (value) => (Math.round(value - 273.15));
        let obj = {
            date: geo.dt,
            city: geo.name,
            temp: temp(geo.main.temp),
            weather: geo.weather[0].description,
            icon: geo.weather[0].icon
        }
        setInfo(obj);
        let arr_hourly = [];
        let arr_minutely = [];
        let arr_week = [];

        function getdate(value){
            let date = new Date(value * 1000);
            return date.getMinutes()
        }
        try{
            data_minutely.forEach(element => {
                let date = getdate(element.dt);
                if (date % 5 == 0){
                    arr_minutely.push(element);
                }
            });
            setWeatherMinutely(arr_minutely);
        } catch{}
        
        data_week.forEach(element => {
            arr_week.push(element);
        });
        
        data_hourly.forEach(element => {
            arr_hourly.push(element);
        });
        setWeatherHourly(arr_hourly);
        setWeatherWeek(arr_week);
    }
    return (
        <div className="app">
            <section className="main">
                <div className="main-text">
                    <Info/>
                    <Form method={gettingWeather} />
                </div>
                <img src="/src/images/background.jpg" />
            </section>
            <section className="weather">
                <div className="weather-text">
                    {info.city ? 
                    <>
                        <Current date={info.date} city = {info.city} temp = {info.temp} weather = {info.weather} icon={info.icon} />
                        <Weather weather_minutely={weather_minutely} weather_hourly={weather_hourly} weather_week={weather_week}/>
                    </>:
                    <div className="empty">
                        <h3>Город не выбран</h3>
                    </div>
                    } 
                </div>
                <img src="/src/images/clouds.jpg" />
            </section>
        </div>
    );
}

export default App;