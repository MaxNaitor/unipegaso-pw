package uni.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import uni.models.dtos.Asset;
import uni.repositories.AssetRepository;

@Service
public class MarketService {

	@Autowired
	private AssetRepository assetRepository;

	public List<Asset> getAvailableAssets() {
		return assetRepository.findAll().stream().map(assetEntity -> new Asset(assetEntity))
				.collect(Collectors.toList());
	}
}
