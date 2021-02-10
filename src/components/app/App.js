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
        descr: '',
        city: '',
        country: '',
        error: '',
        cod: '',
        icon: '',
        title: 'Welcome, this is a weather app.',
        text: 'You can check weather in your city.'

    }

    // Create a function that contains the application logic
    getWeather = async (event) => {
        //get location from input
        let place = event.target.elements.location.value;

        //cancel page reload
        event.preventDefault();

        //get a response from the server
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${API}&units=metric`);

        //save the response from the server to data variable
        const data = await res.json();
        console.log(data)

        // error checking
        //if server response '404' 'city not found'
        //or incorrect value entered
        if (data.cod === '404') {
            this.setState({  // set default value to variables..
                temp: null,
                temp_max: null,
                temp_min: null,
                city: '',
                country: '',
                icon: '',
                title: '',
                text: '',
                //and display error message
                error: `"${place}" not found, please enter the correct city`
            })
        } else if (data.cod === '400') {
            // if input-field is empty
            this.setState({
                temp: null,
                temp_max: null,
                temp_min: null,
                city: '',
                country: '',
                icon: '',
                title: '',
                text: '',
                error: "Enter the place to find out what's the weather."
            })
            // if server response == 200
            // assigning data to variables
        } else {
            this.setState({
                temp: data.main.temp,
                temp_max: data.main.temp_max,
                temp_min: data.main.temp_min,
                city: data.name,
                country: data.sys.country,
                descr: data.weather[0].description,
                icon: data.weather[0].icon,
                error: '',
                title: '',
                text: '',
            })
        }
    }

    render() {
        return (
            <div className='container'>
                <div className='wrapper'>
                    <div className='data'>
                        <InputForm getWeather={this.getWeather}/>
                        <WeatherData {...this.state}/>
                    </div>
                <div>
            </div>
        </div>
    </div>
        );
    }
}
