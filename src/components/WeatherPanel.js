import React, {useState} from 'react';
import Form from './Form';
import Card from './Card';

const WeatherPanel = () => {

    let urlWeather = "https://api.openweathermap.org/data/2.5/weather?appid=&lang=es";
    let cityUrl = "&q=";

    let urlForecast = "https://api.openweathermap.org/data/2.5/forecast?appid=&lang=es"

    const [weather, setWeather] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const getLocation = async(loc) => {
        setLoading(true);

        //weather

        urlWeather = urlWeather + cityUrl + loc;

        await fetch(urlWeather).then((response) =>{
            return response.json();
        }).then((weatherData) =>{
            setWeather(weatherData);
        }).catch(() =>{
            setLoading(false);
            setShow(false);
        });

        //Forecast

        urlForecast = urlForecast + cityUrl + loc;

        await fetch(urlForecast).then((response) =>{
            return response.json();
        }).then((forecastData) =>{
            setForecast(forecastData);
            setLoading(false);
            setShow(true);
        }).catch(() =>{
            setLoading(false);
            setShow(false);
        });

        
    }


    return(

        <React.Fragment>
    
            <Form
                newLocation = {getLocation}
            />

            <Card
                showData = {show}
                loadingData = {loading}
                weather = {weather}
                forecast = {forecast}
            />


        </React.Fragment>

    );

}

export default WeatherPanel;
