package uni.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import uni.models.dtos.Asset;
import uni.services.MarketService;

@RestController
@RequestMapping("/market")
public class MarketController {

	@Autowired
	private MarketService marketService;

	@GetMapping("/available-assets")
	public List<Asset> getAvailableAssets() {
		return marketService.getAvailableAssets();
	}

	@GetMapping("/test")
	public String test() {
		return "test";
	}
}
