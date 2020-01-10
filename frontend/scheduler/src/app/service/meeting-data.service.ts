import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meeting, UserMeeting } from '../meetings/meetings.component';
import { $ } from 'protractor';
import { User } from './user-data.service';


@Injectable({
  providedIn: 'root'
})
export class MeetingDataService {

  constructor( private http: HttpClient) { }

  createNewMeeting(meeting: Meeting, username: String){
    // let listOfAttendees: Array<User> = meeting.listOfAttendees;
    return this.http.post<Meeting>(`http://localhost:8080/${username}/meetings`, meeting );
  }

  getPendingMeetings( username:String ){
    return this.http.get<Meeting[]>(`http://localhost:8080/${username}/meetings/pending`);
  }

  getAcceptedMeetings( username:String ){
    return this.http.get<Meeting[]>(`http://localhost:8080/${username}/meetings/accepted`);
  }

  getMeeting( id: number ){
    return this.http.get<Meeting>(`http://localhost:8080/meetings/${id}`);
  }

  changeMeetingStatus( username:String, userMeeting: UserMeeting ){
    // console.log("Meeting status in the front end is", meeting.status );
    let url = `http://localhost:8080/${username}/meetings/change-status`;
    return this.http.put<Meeting>( url, userMeeting );
  }

  getAllUsernamesOfUsersWhoAcceptedAMeeting( meetingId: number ){
    let url = `http://localhost:8080/meetings/${meetingId}/stats/users/accept`;
    return this.http.get<String[]>( url);
  }

  getAllUsernamesOfUsersWhoDeclinedAMeeting( meetingId: number ){
    let url = `http://localhost:8080/meetings/${meetingId}/stats/users/decline`;
    return this.http.get<String[]>( url);
  }

  getAllUsernamesOfUsersWhoStalledAMeeting( meetingId: number ){
    let url = `http://localhost:8080/meetings/${meetingId}/stats/users/pend`;
    return this.http.get<String[]>( url);
  }
}
