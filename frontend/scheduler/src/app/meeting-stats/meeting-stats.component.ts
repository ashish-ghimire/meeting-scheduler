import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meeting } from '../meetings/meetings.component';
import { MeetingDataService } from '../service/meeting-data.service';

@Component({
  selector: 'app-meeting-stats',
  templateUrl: './meeting-stats.component.html',
  styleUrls: ['./meeting-stats.component.css']
})
export class MeetingStatsComponent implements OnInit {
  // private meetingTime;
  // private meetingDescription: string;
  // private meetingTitle;
  private meeting: Meeting;
  private meetingId: number;

  private usersWhoAcccepted: Array<String>;
  private usersWhoDeclined: Array<String>;
  private usersWhoStalled: Array<String>;

  constructor(
    // Need this dependency to get the value of parameter in the url
    private route: ActivatedRoute,
    private meetingDataService: MeetingDataService  
  ) { }

  ngOnInit() {
    this.meetingId = this.route.snapshot.params['id'];
    this.importRelevantMeeting( );
    this.importMeetingStats( );
  }

  importRelevantMeeting(){
    this.meetingDataService.getMeeting( this.meetingId ).subscribe(
      response=> this.meeting = response,
      error=>console.log( error )
    );
  }

  importMeetingStats( ){
    this.meetingDataService.getAllUsernamesOfUsersWhoAcceptedAMeeting( this.meetingId ).subscribe(
      response=> {
        this.usersWhoAcccepted = response;
        console.log( response );
      },
      error=> this.handleError( error )
    )

    this.meetingDataService.getAllUsernamesOfUsersWhoDeclinedAMeeting( this.meetingId ).subscribe(
      response=> {
        this.usersWhoDeclined = response;
        console.log( response );
      },
      error=> this.handleError( error )
    )

    this.meetingDataService.getAllUsernamesOfUsersWhoStalledAMeeting( this.meetingId ).subscribe(
      response=> {
        this.usersWhoStalled = response;
        console.log( response )
      },
      error=> this.handleError( error )
    )
  }

  handleError( error ){
    console.log( error );
  }
}
