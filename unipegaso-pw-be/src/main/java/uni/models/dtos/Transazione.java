package uni.models.dtos;

import java.time.LocalDate;

import uni.models.entities.TransazioneEntity;

public class Transazione {

	private Integer id;

	private Utente utente;

	private Asset asset;

	private Integer quote;

	private Double prezzo;

	private LocalDate data;

	private boolean acquisto;

	public Transazione() {

	}

	public Transazione(TransazioneEntity entity) {
		this.id = entity.getId();
		this.quote = entity.getQuote();
		this.prezzo = entity.getPrezzo();
		this.data = entity.getData();
		this.acquisto = entity.isAcquisto();
		this.utente = new Utente(entity.getUtente());
		this.asset = new Asset(entity.getAsset());
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Utente getUtente() {
		return utente;
	}

	public void setUtente(Utente utente) {
		this.utente = utente;
	}

	public Asset getAsset() {
		return asset;
	}

	public void setAsset(Asset asset) {
		this.asset = asset;
	}

	public Integer getQuote() {
		return quote;
	}

	public void setQuote(Integer quote) {
		this.quote = quote;
	}

	public Double getPrezzo() {
		return prezzo;
	}

	public void setPrezzo(Double prezzo) {
		this.prezzo = prezzo;
	}

	public LocalDate getData() {
		return data;
	}

	public void setData(LocalDate data) {
		this.data = data;
	}

	public boolean isAcquisto() {
		return acquisto;
	}

	public void setAcquisto(boolean acquisto) {
		this.acquisto = acquisto;
	}

}
