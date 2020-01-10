import { Component, OnInit } from '@angular/core';
import { JwtAuthenticationService } from '../service/jwt-authentication.service';
import { WeatherDataService } from '../service/weather-data.service';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authenticationService: JwtAuthenticationService,
    private weatherService: WeatherDataService,
    private modalService: NgbModal,
    private router: Router ) { 
      
      this.modalOptions = {
        backdrop:'static',
        backdropClass:'customBackdrop'
      }
    
    }
  
  private modalOptions:NgbModalOptions;
  private closeResult: string;
  private username: string;
  private zipCode: string = "";
  private gotWeatherData: boolean = false;
  private temperature: string;
  private temperatureIconUrl: string;
  private weatherIcon: string;
  private weatherDescription: string;

  ngOnInit() {
    this.username = this.authenticationService.getAuthenticatedUser();
    this.resetWeatherData();
    // console.log("The username is ", this.username);
  }

  displayWeather(  ){
    // if( navigator.geolocation ){
    //   navigator.geolocation.getCurrentPosition( 
    //     position=> this.handleSuccess(position),
    //     error=> console.log( error ) 
    //   );
    // }

    this.weatherService.getCurrentWeather( this.zipCode ).subscribe(
      data => this.processWeatherData( data ),
      error=>console.log(error)
    );
  }

  processWeatherData( data ) {
    // console.log( data );
    this.temperature = data.main.temp + ' F';
    let weatherArray = data.weather;

    if( weatherArray ){
      let relevantWeatherObject = weatherArray[0];
      this.weatherIcon = relevantWeatherObject.icon;
      this.weatherDescription = relevantWeatherObject.description;

      // console.log(relevantWeatherObject);

      if(this.temperature && relevantWeatherObject){
        // console.log("Reached here ");
        this.gotWeatherData = true;
      }
    }
  }

  // handleSuccess( position ){
  //   // console.log("The coordinates are ", position );
  //   // this.weatherService.getCurrentWeather('17050').subscribe(
  //   //   data => console.log( data ),
  //   //   error=>console.log(error)
  //   // );
  // }

  openModal( content ){
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log("Pressed ok");

      // Verify zip code before doing this
      this.displayWeather(  );
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log("Pressed dismiss");
    });
  }

  resetWeatherData(){
    this.gotWeatherData = false;
  }

  logout(){
    this.resetWeatherData();
    this.router.navigate(['/logout']);
  }
}
