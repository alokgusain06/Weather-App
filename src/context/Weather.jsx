import  { createContext, useContext, useState } from "react";


import { getWeatherDataForCity,  getWeatherDataForLocation} from "../api";
const  WeatherContext = createContext(null);
export const useWeather =()=>{
  return useContext(WeatherContext);   // reading context using hook
}
export const WeatherProvider =(props) => {
    const [data, setData] = useState(null);            ///Context state  
    const [searchCity, setSearchCity] = useState("");

    const fetchData = async ()=> {
      const response = await getWeatherDataForCity(searchCity);

      setData(response);

    };



    const fetchCurrentUserLocationData = () => {
      navigator.geolocation.getCurrentPosition((position) => {
           getWeatherDataForLocation(position.coords.latitude,
             position.coords.longitutde).then((data) => setData(data));
      });
    }; // is function se lat and lon ayegeya
  return  ( <WeatherContext.Provider
              value={{ searchCity,data, setSearchCity, fetchData, fetchCurrentUserLocationData}}>
    {props.children}
    </WeatherContext.Provider>
  );
}; 