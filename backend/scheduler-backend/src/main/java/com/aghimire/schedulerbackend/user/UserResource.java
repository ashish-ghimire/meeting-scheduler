package com.aghimire.schedulerbackend.user;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.aghimire.schedulerbackend.jwt.JwtInMemoryUserDetailsService;
import com.aghimire.schedulerbackend.jwt.JwtUserDetails;

//import com.in28minutes.rest.webservices.restfulwebservices.todo.Todo;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class UserResource {
	@Autowired // If things don't work, comment this line
	private UserRepository userRepository;
	
	@PostMapping(path="/users")
	public ResponseEntity<User> addNewUser(
			// In the line below, RequestBody would have new User content
			@RequestBody User user ){

//		User newlyAddedUser = userRepository.save(user);
		
		User newlyAddedUser = JwtInMemoryUserDetailsService.addUserToDatabase(user, this.userRepository );
		
		if( newlyAddedUser == null ) {
//			return ResponseEntity.badRequest().build();
			return new ResponseEntity<>(
			          null, HttpStatus.BAD_REQUEST );
		}
		
		// This is a random gibberish password. Tryna make it just a little more secure. Not full proof
		newlyAddedUser.setPassword("gibberish");
	
		// For a newly created resource, you would typically return the url of that resource
		
		// Get current resource url
		// Append id to the url
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().
			path("/{id}").buildAndExpand( newlyAddedUser.getId() ).toUri();
		
		return ResponseEntity.created(uri).build();
	}
	
	@GetMapping(path="/users")
	public List<User> getAllUserNames(){
		return userRepository.findAll();
//		List<String> allUsernames = new ArrayList<>();
//		
//		for(User oneUser: allUsers) 
//			allUsernames.add( oneUser.getUsername() );
//		
//		return allUsernames;
	}
}
