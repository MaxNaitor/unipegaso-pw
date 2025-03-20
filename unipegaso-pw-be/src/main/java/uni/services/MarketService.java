package uni.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import uni.models.dtos.Asset;
import uni.models.dtos.Ordine;
import uni.models.dtos.Transazione;
import uni.models.entities.AssetUtenteEntity;
import uni.models.entities.AssetUtenteEntity.UtenteAssetId;
import uni.models.entities.UtenteEntity;
import uni.repositories.AssetRepository;
import uni.repositories.AssetUtenteRepository;

@Service
public class MarketService {

	@Autowired
	private AssetRepository assetRepository;

	@Autowired
	private AssetUtenteRepository assetUtenteRepository;

	@Autowired
	private UtenteService utenteService;

	public List<Asset> getAvailableAssets() {
		return assetRepository.findAll().stream().map(assetEntity -> new Asset(assetEntity))
				.collect(Collectors.toList());
	}

	public boolean eseguiOrdine(Ordine ordine, String usernameUtente) throws Exception {
		UtenteEntity utente = utenteService.getUtenteEntityByUsername(usernameUtente);
		Double importo = ordine.getQuote() * ordine.getPrezzo();

		AssetUtenteEntity assetUtente = null;

		List<AssetUtenteEntity> assetsUtente = utenteService.getAssetUtenteEntity(usernameUtente).stream()
				.filter(asset -> asset.getAsset().getTicker().equalsIgnoreCase(ordine.getTicker()))
				.collect(Collectors.toList());

		if (assetsUtente.size() > 0) {
			assetUtente = assetsUtente.get(0);
		}

		if (ordine.getIsAcquisto()) {
			if (importo > utente.getLiquidita()) {
				throw new Exception("Liquidità non sufficiente per l'acquisto");
			}
			if (assetUtente == null) {
				assetUtente = new AssetUtenteEntity();
				assetUtente.setUtente(utente);
				assetUtente.setAsset(assetRepository.findByTicker(ordine.getTicker()));
				UtenteAssetId id = new UtenteAssetId();
				id.setUtenteId(utente.getId());
				id.setAssetId(assetUtente.getAsset().getId());
				assetUtente.setId(id);
			}
			assetUtente.aggiungiQuote(ordine.getQuote());
			utente.rimuoviLiquidita(importo);
		} else {
			if (assetUtente == null || ordine.getQuote() > assetUtente.getQuotePossedute()) {
				throw new Exception("Quote possedute non sufficienti per la vendita");
			}
			assetUtente.rimuoviQuote(ordine.getQuote());
			utente.aggiungiLiquidita(importo);
		}

		if (assetUtente.getQuotePossedute() > 0) {
			assetUtente = assetUtenteRepository.save(assetUtente);
		} else {
			assetUtenteRepository.delete(assetUtente);
		}

		utente = utenteService.saveUtente(utente);
		utenteService.salvaNuovaTransazione(utente, assetUtente.getAsset(), ordine.getIsAcquisto(), importo,
				ordine.getQuote());
		return true;
	}

	public List<Transazione> getTransazioniUtente(String username) {
		return utenteService.getTransazioniUtente(username);
	}
}
