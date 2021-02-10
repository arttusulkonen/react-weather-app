import React, {Component} from 'react';
import './App.css';
import InputForm from "../input-form";
import WeatherData from "../weather-data";

//get api-key
const API = '6e1acbd3d9d9c85dca6b27db42890fff';

export default class App extends Component {

    //create state and declare the variables that will be used
    state = {
        temp: null,
        temp_max: null,
        temp_min: null,
        description: '',
        city: '',
        country: '',
        error: '',
        cod: '',
        icon: '',
    }

    // Create a function that contains the application logic
    getWeather = async () => {
        //get a response from the server
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Helsinki&appid=${API}&units=metric`);

        //save the response from the server to data
        const data = await res.json();
    }

    render(){
        return (
            <div className='container'>
                <div className="App">
                    <InputForm />
                    <WeatherData />
                </div>
            </div>
        );
    }

}
