package com.aghimire.schedulerbackend.userMeeting;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aghimire.schedulerbackend.meeting.Meeting;

@Repository
public interface UserMeetingRepository extends JpaRepository<UserMeeting, UserMeetingKey> {
	List<UserMeeting> findByMeetingStatus( int meetingStatus );
	List<UserMeeting> findByMeeting( Meeting meeting );
}
