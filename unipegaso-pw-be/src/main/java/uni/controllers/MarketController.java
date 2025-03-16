package uni.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import uni.models.dtos.Asset;

@RestController
@RequestMapping("/market")
public class MarketController {

	@GetMapping("/available-assets")
	public List<Asset> getAvailableAssets() {
		Asset asset = new Asset();
		asset.setTicker("AAPL");
		return List.of(asset);
	}
}
