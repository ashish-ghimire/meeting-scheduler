import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtAuthenticationService } from '../service/jwt-authentication.service';
import { Meeting } from '../meetings/meetings.component';
import { MeetingDataService } from '../service/meeting-data.service';

@Component({
  selector: 'app-list-meetings',
  templateUrl: './list-meetings.component.html',
  styleUrls: ['./list-meetings.component.css']
})
export class ListMeetingsComponent implements OnInit {
  private defaultId: number = -1;
  private acceptedMeetings:Array<Meeting>;
  private username: string;

  constructor(
    private router: Router,
    private authenticationService: JwtAuthenticationService,
    private meetingDataService: MeetingDataService ) {

     }

  ngOnInit() {
    this.username = this.authenticationService.getAuthenticatedUser();
    this.importAcceptedMeetings();
  }

  // createNewMeeting(){
  //   // let username = this.authenticationService.getAuthenticatedUser();
  //   let url = `${this.username}/meeting/${this.defaultId}`;
  //   console.log(url);
  //   this.router.navigate([url]);
  // }

  // viewPendingMeetings(){
  //   // let username = this.authenticationService.getAuthenticatedUser();
  //   let url = `${this.username}/meetings/pending`;
  //   this.router.navigate([url]);
  // }

  importAcceptedMeetings(){
    this.meetingDataService.getAcceptedMeetings(this.username ).subscribe(
      response => {
        this.acceptedMeetings = response;
        this.sortMeetingsByDate( this.acceptedMeetings );
        console.log("Imported them meetings")
      },
      error => console.log( error )
    );
  }

  sortMeetingsByDate( meetings ){
    meetings.sort( function(a, b) {
      a = Math.abs( new Date(a.time).getTime() - new Date().getTime() );
      b = Math.abs( new Date(b.time).getTime() - new Date().getTime() );
      return a>b ? 1 : a<b ? -1 : 0;
  });
  }

  viewMeetingStats( meeting ){
    // Navigate to page to view the meeting stats
    let url = `${this.username}/meetings/${meeting.id}/stats`;
    this.router.navigate([url]);
  }
}
