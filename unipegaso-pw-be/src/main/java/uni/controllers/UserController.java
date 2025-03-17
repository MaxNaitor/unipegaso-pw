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
import uni.services.CustomUserDetailsService;
import uni.utils.JwtUtils;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtils jwtUtils;

	@Autowired
	private CustomUserDetailsService userDetailsService;

	@PostMapping("/login")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest) throws Exception {
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
		} catch (BadCredentialsException e) {
			throw new Exception("Incorrect username or password", e);
		}

		final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
		final String jwt = jwtUtils.generateToken(userDetails);

		return ResponseEntity.ok(new AuthResponse(jwt));
	}

	@GetMapping("/validate-token")
	public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authorizationHeader)
			throws Exception {

		String jwt = jwtUtils.extractBearerToken(authorizationHeader);
		String username = jwtUtils.extractUsername(jwt);
		UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
		return ResponseEntity.ok("Token di " + username + " valido: " + jwtUtils.validateToken(jwt, userDetails));
	}
}
