import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  constructor( private http: HttpClient ) { }

  environment = {
    production: false,
    apiKey: 'f6166922011b152d4b4c26f942e21010',
    apiUrl: 'http://api.openweathermap.org/data/2.5',
    corsPrepend: 'https://cors-anywhere.herokuapp.com',
    temperatureSystem: 'imperial'
  };

  getCurrentWeather(zip: string) {
    return this.http.get( `${this.environment.corsPrepend}/${this.environment.apiUrl}/weather?zip=${zip}\
&units=${this.environment.temperatureSystem}\
&APPID=${this.environment.apiKey}`);
  }
}
