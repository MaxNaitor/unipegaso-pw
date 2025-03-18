package uni.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import uni.models.dtos.AuthRequest;
import uni.models.dtos.Utente;
import uni.services.UtenteService;
import uni.utils.JwtUtils;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private JwtUtils jwtUtils;

	@Autowired
	private UtenteService utenteService;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) throws Exception {
		return ResponseEntity.ok(utenteService.login(authRequest));
	}

	@PostMapping("/registra")
	public ResponseEntity<?> registraUtente(@RequestBody AuthRequest authRequest) throws Exception {
		return ResponseEntity.ok(utenteService.registraUtente(authRequest));
	}

	@GetMapping
	public ResponseEntity<?> getUser(@RequestHeader(name = "Authorization", required = true) String authHeader) {
		String token = jwtUtils.extractBearerToken(authHeader);
		String username = jwtUtils.extractUsername(token);
		Utente utente = utenteService.getUtenteByUsername(username);
		utente.setAssetPosseduti(utenteService.getAssetDellUtente(username));
		return ResponseEntity.ok(utente);
	}

	@PostMapping("/versa-preleva")
	public ResponseEntity<?> versaPrelevaLiquidita(@RequestBody Double importo,
			@RequestHeader(name = "Authorization", required = true) String authHeader) throws Exception {
		String token = jwtUtils.extractBearerToken(authHeader);
		String username = jwtUtils.extractUsername(token);
		return ResponseEntity.ok(utenteService.versaPrelevaLiquidita(username, importo));
	}

}
