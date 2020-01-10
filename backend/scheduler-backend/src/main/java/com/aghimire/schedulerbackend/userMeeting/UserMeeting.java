package com.aghimire.schedulerbackend.userMeeting;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

import com.aghimire.schedulerbackend.meeting.Meeting;
import com.aghimire.schedulerbackend.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class UserMeeting {
	// Symbolic constants
	public static int STATUS_INVITED = 1;
	public static int STATUS_ACCEPTED = 2;
	public static int STATUS_REJECTED = 3;

	@EmbeddedId
	UserMeetingKey id;

	@ManyToOne
	@MapsId("user_id")
	@JoinColumn(name = "user_id")
//	@JsonIgnore
	User user;

	@ManyToOne
	@MapsId("meeting_id")
	@JoinColumn(name = "meeting_id")
	@JsonIgnore
	Meeting meeting;

	int meetingStatus;

	// standard constructors, getters, and setters

	public UserMeeting() {

	}

	public UserMeeting(UserMeetingKey id, User user, Meeting meeting, int meetingStatus) {
		super();
		this.id = id;
		this.user = user;
		this.meeting = meeting;
		this.meetingStatus = meetingStatus;
	}

	public UserMeetingKey getId() {
		return id;
	}

	public void setId(UserMeetingKey id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Meeting getMeeting() {
		return meeting;
	}

	public void setMeeting(Meeting meeting) {
		this.meeting = meeting;
	}

	public int getMeetingStatus() {
		return meetingStatus;
	}

	public void setMeetingStatus(int meetingStatus) {
		this.meetingStatus = meetingStatus;
	}
}