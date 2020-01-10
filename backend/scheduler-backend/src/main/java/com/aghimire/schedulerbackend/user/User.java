package com.aghimire.schedulerbackend.user;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import com.aghimire.schedulerbackend.meeting.Meeting;
import com.aghimire.schedulerbackend.userMeeting.UserMeeting;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable=false)
	private String username;
	
	@Column(nullable=false)
	private String password; // Store a hashed password in the database
	
	private String role; // This is a user's role. Don't know how I will use this but it's default
	// value is a hardcoded value 
	
//	@ManyToMany(mappedBy = "attendingUsers")
//	@JsonIgnore
////	@JoinTable(
////		name = "user_meetings",
////		joinColumns={@JoinColumn(name="user_id", referencedColumnName="id")}, 
////		inverseJoinColumns = @JoinColumn(name = "course_id")
////	)
//	private List<Meeting> meetings;
	
	
	@OneToMany(mappedBy = "user")
    List <UserMeeting> userMeetingStatus;

	public User(long id, String username, String password) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
	}
	
	public User() {

	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (id ^ (id >>> 32));
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + "]";
	}

//	public List<Meeting> getMeetings() {
//		return meetings;
//	}
//
//	public void setMeetings(List<Meeting> meetings) {
//		this.meetings = meetings;
//	}
}
