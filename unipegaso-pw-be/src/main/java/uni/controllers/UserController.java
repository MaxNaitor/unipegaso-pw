package uni.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import uni.models.dtos.AuthRequest;
import uni.models.dtos.AuthResponse;
import uni.models.dtos.Utente;
import uni.services.UtenteService;
import uni.utils.JwtUtils;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtils jwtUtils;

	@Autowired
	private UtenteService utenteService;

	@PostMapping("/login")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest) throws Exception {
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
		} catch (BadCredentialsException e) {
			throw new Exception("Incorrect username or password", e);
		}

		final UserDetails userDetails = utenteService.loadUserByUsername(authRequest.getUsername());
		final String jwt = jwtUtils.generateToken(userDetails);

		return ResponseEntity.ok(new AuthResponse(jwt));
	}

	@GetMapping
	public ResponseEntity<?> getUser(@RequestHeader(name = "Authorization", required = true) String authHeader) {
		String token = jwtUtils.extractBearerToken(authHeader);
		String username = jwtUtils.extractUsername(token);
		Utente utente = utenteService.getUtenteByUsername(username);
		utente.setAssetPosseduti(utenteService.getAssetDellUtente(username));
		return ResponseEntity.ok(utente);
	}

}
