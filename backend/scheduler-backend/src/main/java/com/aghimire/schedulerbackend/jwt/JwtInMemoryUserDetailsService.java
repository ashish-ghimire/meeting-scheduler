package com.aghimire.schedulerbackend.jwt;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.aghimire.schedulerbackend.user.User;
import com.aghimire.schedulerbackend.user.UserRepository;

@Service
@Repository
public class JwtInMemoryUserDetailsService  implements UserDetailsService {
	
	// May need to delete this role later cause what's the point of having
	// a role if every user is going to have the same role. This line was added
	// just to make the code compatible with the format of the project from 
	// with the idea for implementation of this task was taken
	private static final String HARDCODED_ROLE = "ROLE_USER_2";
	
	private static boolean addTestUsers = false; 

//  public static List<JwtUserDetails> inMemoryUserList = new ArrayList<>();
  private static BCryptPasswordEncoder encoder;
  
  @Autowired // If things don't work, comment this line
  private UserRepository userRepository;

//  static {
//    inMemoryUserList.add(new JwtUserDetails(1L, "in28minutes",
//        "$2a$10$3zHzb.Npv1hfZbLEU5qsdOju/tk2je6W6PnNnY.c1ujWPcZh4PL6e", "ROLE_USER_2"));
//  }
  
  static {
	  encoder = new BCryptPasswordEncoder();
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//    Optional<JwtUserDetails> findFirst = userRepository.stream()
//        .filter(user -> user.getUsername().equals(username)).findFirst();
//
//    if (!findFirst.isPresent()) {
//      throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username));
//    }
    
    List<User> users = this.userRepository.findByUsername( username );
    
    if( users == null || users.size() == 0 ) {
    	return null;
    }
    
    User existingUser = users.get(0); // Assumption: There are no two users with the same username
    JwtUserDetails res = new JwtUserDetails(existingUser.getId(), existingUser.getUsername(),
    		existingUser.getPassword(), HARDCODED_ROLE );
    
    return res;
  }
  
  public static User addUserToDatabase(User user, UserRepository userRepository ){
	  
	// Start of test code -----------------------
//		  if( !addTestUsers) {
//			  
//			  System.out.println("Entered test block ");
//			  User user1 = new User( -1, "jared", encoder.encode("jared") );
//			  User user2 = new User( -1, "maya", encoder.encode("maya") );
//			  User user3 = new User( -1, "in28minutes", encoder.encode("dummy") );
//			  
//		      userRepository.save(user1);
//		      userRepository.save(user2);
//		      userRepository.save(user3);
//			  
//			  addTestUsers = true;
//		  }
		// End of test code -----------------------
	  
	  
	  List<User> existingUsers = userRepository.findByUsername( user.getUsername() );
	  
	  if( existingUsers != null && existingUsers.size() > 0) {
		  // There is already an existing user with the same username as the new user.
		  // No two users can have the same username
		  return null;
	  }
	  
	  String usersUnencryptedPassword = user.getPassword();
	  String usersEncryptedPassword = encoder.encode(usersUnencryptedPassword);
	  user.setPassword( usersEncryptedPassword );
	  
	  User newlyAddedUser = userRepository.save(user);
	  
	  return newlyAddedUser;
  }
  
}


