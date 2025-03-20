package uni.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import uni.models.dtos.Ordine;
import uni.services.MarketService;
import uni.utils.JwtUtils;

@RestController
@RequestMapping("/market")
public class MarketController {

	@Autowired
	private MarketService marketService;

	@Autowired
	private JwtUtils jwtUtils;

	@GetMapping("/available-assets")
	public ResponseEntity<?> getAvailableAssets() {
		return ResponseEntity.ok(marketService.getAvailableAssets());
	}

	@PostMapping("/ordine")
	public ResponseEntity<?> eseguiOrdine(@RequestBody Ordine ordine,
			@RequestHeader(name = "Authorization", required = true) String authHeader) throws Exception {
		String token = jwtUtils.extractBearerToken(authHeader);
		String username = jwtUtils.extractUsername(token);
		return ResponseEntity.ok(marketService.eseguiOrdine(ordine, username));
	}

	@GetMapping("/transazioni/{usernameUtente}")
	public ResponseEntity<?> getTransazioniUtente(@PathVariable String usernameUtente) {
		return ResponseEntity.ok(marketService.getTransazioniUtente(usernameUtente));
	}
}
