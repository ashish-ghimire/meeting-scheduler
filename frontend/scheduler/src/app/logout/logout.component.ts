import { Component, OnInit } from '@angular/core';
import { JwtAuthenticationService } from '../service/jwt-authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authenticationService: JwtAuthenticationService) { }

  ngOnInit() {
    this.authenticationService.logout();
  }

}
