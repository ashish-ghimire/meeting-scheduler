import { Component, OnInit } from '@angular/core';
import { Meeting, UserMeeting } from '../meetings/meetings.component';
import { MeetingDataService } from '../service/meeting-data.service';
import { JwtAuthenticationService } from '../service/jwt-authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-meetings',
  templateUrl: './pending-meetings.component.html',
  styleUrls: ['./pending-meetings.component.css']
})
export class PendingMeetingsComponent implements OnInit {

  private meetings: Meeting[] = [];
  private username: string = "";

  constructor( private meetingDataService: MeetingDataService,
              private authenticationService: JwtAuthenticationService,
              private router: Router ) 
    { }

  ngOnInit() {
    this.refreshPage();
  }

  refreshPage(){
    this.importPendingMeetings();
    this.username = this.authenticationService.getAuthenticatedUser();
  }

  acceptMeeting(meeting: Meeting) {
    console.log("Accept meeting with id", meeting.id);
    // meeting.status = meeting.STATUS_ACCEPTED;
    // meeting.status = 2;
    let meetingStatus: number = 2; 
    // let meetingStatus: number = STATUS_ACCEPTED; 
    this.updateMeetingStatus( meetingStatus, meeting );
  }

  getUserMeetingStatusToUpdate( userMeetingList: Array<UserMeeting>, username: string ){
    for( let oneUserMeeting of userMeetingList ){
      if( oneUserMeeting.user.username == this.username )
        return oneUserMeeting;
    }

    return null;
  }

  updateMeetingStatus( meetingStatus: number, meeting: Meeting ){
    let userMeetingStatusToUpdate = this.getUserMeetingStatusToUpdate( meeting.userMeetingStatus, this.username );
    userMeetingStatusToUpdate.meetingStatus = meetingStatus;

    this.meetingDataService.changeMeetingStatus( this.username, userMeetingStatusToUpdate ).subscribe(
      response=>{
        console.log(response);
        // console.log("Successfully changed the meeting status to", response.meetingStatus );
        this.refreshPage();
      },
      error=> console.log( error )
    );
  }

  declineMeeting(meeting: Meeting) {
    console.log("Decline meeting with id", meeting.id);
    let meetingStatus: number = 3; 
    // let meetingStatus: number = STATUS_REJECTED; 
    this.updateMeetingStatus( meetingStatus, meeting );
  }

  importPendingMeetings(){
    let username = this.authenticationService.getAuthenticatedUser();
    this.meetingDataService.getPendingMeetings( username ).subscribe(
      response=> this.handleImportSuccess( response ),
      error=> this.handleError( error )
    )
  }

  handleError( error ){
    console.log(error);
  }

  handleImportSuccess( data ){
    console.log( data );
    this.meetings = data;
  }

  viewMeetingStats( meeting ){
    // Navigate to page to view the meeting stats
    let url = `${this.username}/meetings/${meeting.id}/stats`;
    this.router.navigate([url]);
  }
}
