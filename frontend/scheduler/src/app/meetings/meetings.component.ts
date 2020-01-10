import { Component, OnInit } from '@angular/core';
import { MeetingDataService } from '../service/meeting-data.service';
import { JwtAuthenticationService } from '../service/jwt-authentication.service';
import { UserDataService, User } from '../service/user-data.service';
import { Router } from '@angular/router';


export class UserMeetingKey{
  constructor(
    public userId: number,
    public meetingId: number
  ){

  }
};

export class UserMeeting{
  
  constructor(
    public id: UserMeetingKey,
    public user: User,
    public meetingStatus: number
  ){

  }
};



export class Meeting{

  // public STATUS_INVITED: number = 1;
  // public STATUS_ACCEPTED: number = 2;
  // public STATUS_REJECTED: number = 3;

  constructor(
    public id: number,
    public title: string,
    public description: string,
    public time,
    public userMeetingStatus: Array<UserMeeting>
  )
  {}

  // getStatusInvited(){
  //   return 1;
  // }
  // getStatusAccepted(){
  //   return 2;
  // }

  // getStatusRejected(){
  //   return 3;
  // }
};


@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {

  // private title: string;
  // private time;
  // private description: string;

  private meeting: Meeting;
  private allUsernames;
  private search1 = '';
  private meetingInvitees: Array<string> = [];
  private allUsers: Array<User> = [];

  private usernameOfCurrentlyLoggedInUser : string;

  // private meetingInviteesContainer = {
  //   meetingInvitees: []
  // };


  // selected = [
  //   {id: 2, name: 'Node Js'},
  //   {id: 8, name: 'ReactJs'}
  // ];

  constructor(private meetingDataService: MeetingDataService,
    private authenticationService: JwtAuthenticationService,
    private userDataService: UserDataService,
    private router: Router
    ) { }

  ngOnInit() {
    this.meeting = new Meeting(-1, "", "", "", [] );

    this.getAllRegisteredUsers();
    this.usernameOfCurrentlyLoggedInUser = this.authenticationService.getAuthenticatedUser();
  }

  getAllRegisteredUsers(){
    this.userDataService.getAllUsers().subscribe(
      response=>{
        console.log( response );
        this.allUsers = response;
        this.allUsernames = this.extractAllUsernamesFromUsers( response );
      },
      error=>console.log(error)
    )
  }

  extractAllUsernamesFromUsers( response ){
    let res = [];

    for(let oneUser of response)
      res.push(oneUser.username);

    return res;
  }

  saveMeeting(){
    console.log("The line below contains all the meeting invitees");
    console.log(this.meetingInvitees);

    // console.log(this.meeting.time);
    let username = this.authenticationService.getAuthenticatedUser();
    this.meeting.userMeetingStatus = this.createUserMeetingStatusFromUsernames();

    this.meetingDataService.createNewMeeting(this.meeting, username).subscribe(
      response=>this.handleSuccessfulResponse(response),
      error=>this.handleError( error )
    )
  }

  // createUserObjectsFromUsernames(){
  //   let res = [];

  //   for( let oneUsername of this.meetingInvitees ){
  //     for( let oneUser of this.allUsers ){
  //       if(oneUser.username == oneUsername){
  //         res.push( oneUser );
  //       }
  //     }
  //   }

  //   return res;
  // }

  // public userMeetingStatus: Array<UserMeeting>
  createUserMeetingStatusFromUsernames(){
    let res = [];

    // Add the meeting organizer to a list of invitees. Ideally, meeting should have two different type of
    // users. One should be the meeting organizer while the other type of users should be the meeting
    //attendees. But, this fix is better than not including the meeting organizer in the meeting at all
    this.meetingInvitees.push( this.usernameOfCurrentlyLoggedInUser );

    for( let oneUsername of this.meetingInvitees ){
      for( let oneUser of this.allUsers ){
        if(oneUser.username == oneUsername){
          // res.push( oneUser );
          let userMeetingKey = new UserMeetingKey( oneUser.id, -1);
          let userMeeting = new UserMeeting( null, oneUser, 1 ); //One means invited
          res.push( userMeeting );
        }
      }
    }

    return res;
  }

  handleSuccessfulResponse(response){
    console.log("Successfully saved the meeting");
    console.log( response );
    this.router.navigate([`/${this.usernameOfCurrentlyLoggedInUser}/meetings/pending`]);
  }

  handleError( error ){
    console.log("Error occured while saving");
    console.log(error);
  }

  selectedStatic(result) {
    this.search1 = result;
    this.meetingInvitees.push(result);
    console.log(this.meetingInvitees);
  }
}
