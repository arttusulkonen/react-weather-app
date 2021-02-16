import React, {Component} from 'react';
import './App.css';
import InputForm from "../input-form";
import WeatherData from "../weather-data";
import Welcome from "../welcome/"

//api-key
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
        welcomeBox: true, // by default welcomeBox == true..,
        loading: false
    }

    getWeather = async (event) => {
        //get location from input
        let place = event.target.elements.location.value;

         //cancel page reload
        event.preventDefault();

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${API}&units=metric`

        // Get data from the API
        await fetch(url)

            .then((res) => {
                this.setState({ // while the server is sending data..
                    loading: true // spinner
                })
                    res.json() // decode the response in JSON format
                        .then((data) => {  // If the request was successful assign the data to state
                        this.setState({
                            temp: data.main.temp,
                            temp_max: data.main.temp_max,
                            temp_min: data.main.temp_min,
                            city: data.name,
                            country: data.sys.country,
                            descr: data.weather[0].description,
                            icon: data.weather[0].icon,
                            error: '',
                            welcomeBox: false, // and when we get response from server, set welcomeBox to false
                            loading: false // and spinner
                        })
                    }).catch((err) => {
                        //if server response '404' 'city not found'
                        //or incorrect value entered
                        this.setState({ // set default value to state..
                            temp: '',
                            city: '',
                            country: null,
                            descr: null,
                            icon: null,
                            error: `"${place}" not found, please enter the correct city.`, // and show error
                            welcomeBox: false,
                            loading: false
                        })
                        console.log(err);
                    })
                }
            )
    }


    render() {
        return (
            <div className='container'>
                <div className='wrapper'>
                    <div className='data'>
                        <InputForm getWeather={this.getWeather}/>

                        {/*by default show welcome box, if the server responds show weather or error and welcomeBox set to false */}
                        {this.state.welcomeBox ?  <Welcome />: <WeatherData {...this.state}/> }
                    </div>
                <div>
            </div>
        </div>
    </div>
        );
    }
}
