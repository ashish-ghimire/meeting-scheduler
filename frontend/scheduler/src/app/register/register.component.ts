import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../service/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  invalidRegister: boolean = false;
  invalidRegisterMessage: string = "The username you selected already exisits. Please register with a new username";
  username = "";
  password = ""

  constructor(private userDataService: UserDataService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    // console.log( "The username is ", this.username );
    // console.log( "The password is ", this.password );
    this.userDataService.createNewUser(this.username, this.password).subscribe(
      data => {
        this.handleSuccessfulRegister(data);
      },
      error => {
        this.handleUnsuccessfulRegister(error);
      }
    )
  }

  handleSuccessfulRegister(data) {
    console.log("Successfully registered a new user");
    console.log(data);
    this.router.navigate(['login']);
  }

  handleUnsuccessfulRegister(error) {
    this.invalidRegister = true;
    console.log("Oops. Error while trying to register a new user. Try again ");
    console.log(error);
  }
}