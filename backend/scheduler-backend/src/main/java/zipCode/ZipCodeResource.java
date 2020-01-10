package zipCode;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ZipCodeResource {
	@Autowired
	private ZipCodeRepository zipCodeRepository;
	
	@PostMapping("/zipCode")
	public ResponseEntity<ZipCode> saveZipCode( @RequestBody ZipCode aZip ) {
		ZipCode newlySavedZip = zipCodeRepository.save( aZip );
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{uri}")
				.buildAndExpand(newlySavedZip.getZip()).toUri();

		return ResponseEntity.created(uri).build();
	}
	
	@GetMapping("/zipCode/{zip}")
	public ZipCode getZipCode(@PathVariable String zip) { //
		return zipCodeRepository.findById( zip ).get();
	}
}
