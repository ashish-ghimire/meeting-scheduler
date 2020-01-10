package com.aghimire.schedulerbackend.meeting;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.aghimire.schedulerbackend.user.User;
import com.aghimire.schedulerbackend.user.UserRepository;
import com.aghimire.schedulerbackend.userMeeting.UserMeeting;
import com.aghimire.schedulerbackend.userMeeting.UserMeetingKey;
import com.aghimire.schedulerbackend.userMeeting.UserMeetingRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class MeetingResource {
	@Autowired
	private MeetingRepository meetingRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserMeetingRepository userMeetingRepository;

	@PostMapping(path = "{username}/meetings")
	private ResponseEntity<Meeting> addMeeting(@PathVariable String username, @RequestBody Meeting meeting) {

		Meeting newlyAddedMeeting = meetingRepository.save(meeting);
		saveNewUserMeeting(meeting, newlyAddedMeeting);

		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{uri}")
				.buildAndExpand(newlyAddedMeeting.getId()).toUri();

		return ResponseEntity.created(uri).build();
	}
	
	@GetMapping(path="meetings/{id}")
	public Meeting getMeeting( @PathVariable long id ){
		return meetingRepository.findById( id ).get();
	}

	private void saveNewUserMeeting(Meeting meetingRaw, Meeting meetingInDatabase) {
		List<UserMeeting> userMeetingStatus = meetingRaw.getUserMeetingStatus();

		for (UserMeeting oneUserMeeting : userMeetingStatus) {
			User user = oneUserMeeting.getUser();
			UserMeetingKey key = new UserMeetingKey(user.getId(), meetingInDatabase.getId());

			// If we have a meeting with at least one attendee, the meeting's status for
			// that 
			// attendee should be set to invited
			UserMeeting toSave = new UserMeeting(key, user, meetingInDatabase, UserMeeting.STATUS_INVITED);
			userMeetingRepository.save(toSave);
		}
	}

	@GetMapping(path = "{username}/meetings/pending")
	public List<Meeting> getPendingMeetings(@PathVariable String username) {
		return getMeetings(username, UserMeeting.STATUS_INVITED);
	}

	@GetMapping(path = "{username}/meetings/accepted")
	public List<Meeting> getAcceptedMeetings(@PathVariable String username) {
		return getMeetings(username, UserMeeting.STATUS_ACCEPTED);
	}

	@PutMapping(path = "{username}/meetings/change-status")
	public ResponseEntity<UserMeeting> updateMeeting(@PathVariable String username,
			/*
			 * @PathVariable long id,
			 */ @RequestBody UserMeeting userMeeting) {

		UserMeetingKey key = userMeeting.getId();
		UserMeeting toUpdate = userMeetingRepository.findById(key).get();
		toUpdate.setMeetingStatus(userMeeting.getMeetingStatus());
		UserMeeting updatedUserMeeting = userMeetingRepository.save(toUpdate);

		return new ResponseEntity<>(updatedUserMeeting, HttpStatus.OK);
	}

	private List<Meeting> getMeetings(String aUsername, int aMeetingStatus) {
		List<User> users = userRepository.findByUsername(aUsername);
		User relevantUser = users.get(0);

		List<Meeting> res = new ArrayList<>();
		List<UserMeeting> pendingUserMeetings = userMeetingRepository.findByMeetingStatus(aMeetingStatus);

		for (UserMeeting oneUserMeeting : pendingUserMeetings) {
			UserMeetingKey key = oneUserMeeting.getId();

			if (key.getUserId() == relevantUser.getId())
				res.add(meetingRepository.findById(key.getMeetingId()).get());
		}

		return res;
	}
	
	@GetMapping(path = "meetings/{meetingid}/stats/users/accept")
	public List<String> getUsernamesOfUsersWhoAccepted( 
			@PathVariable long meetingid ){
		return this.getUsernamesForGivenMeetingStatus( 
				meetingid, UserMeeting.STATUS_ACCEPTED );
	}
	
	@GetMapping(path = "meetings/{meetingid}/stats/users/decline")
	public List<String> getUsernamesOfUsersWhoDeclined( 
			@PathVariable long meetingid ){
		return this.getUsernamesForGivenMeetingStatus( 
				meetingid, UserMeeting.STATUS_REJECTED );
	}
	
	@GetMapping(path = "meetings/{meetingid}/stats/users/pend")
	public List<String> getUsernamesOfUsersWhoPended( 
			@PathVariable long meetingid ){
		return this.getUsernamesForGivenMeetingStatus( 
				meetingid, UserMeeting.STATUS_INVITED );
	}


	private Meeting getMeetingToUpdate(User aUser, Long aId) {

//		List<Meeting> meetings = aUser.getMeetings();

//		for(Meeting meeting: meetings) {
//			if( meeting.getId() == aId )
//				return meeting;
//		}

		return null;
	}
	
	List<String> getUsernamesForGivenMeetingStatus( long meetingId, int meetingStatus ){
		ArrayList<String> res = new ArrayList<>();
		Meeting relevantMeeting = meetingRepository.findById( meetingId ).get();
				
		List<UserMeeting> relevantUserMeetings = this.userMeetingRepository.findByMeeting( relevantMeeting );
		
		for( UserMeeting userMeeting: relevantUserMeetings ) {
			if( userMeeting.getMeetingStatus() == meetingStatus ) {
				User relevantUser = userMeeting.getUser();
				res.add( relevantUser.getUsername() );
			}
		}
		
		return res; 
	}
}
