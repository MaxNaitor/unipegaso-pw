package uni.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import uni.models.dtos.Asset;
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
	public List<Asset> getAvailableAssets() {
		return marketService.getAvailableAssets();
	}

	@PostMapping("/ordine")
	public boolean eseguiOrdine(@RequestBody Ordine ordine,
			@RequestHeader(name = "Authorization", required = true) String authHeader) throws Exception {
		String token = jwtUtils.extractBearerToken(authHeader);
		String username = jwtUtils.extractUsername(token);
		return marketService.eseguiOrdine(ordine, username);
	}
}
