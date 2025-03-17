package uni.models.entities;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name = "utente_asset")
public class UtenteAssetEntity {

	@EmbeddedId
	private UtenteAssetId id;

	@ManyToOne
	@MapsId("utenteId") // Mappa la chiave primaria composta
	@JoinColumn(name = "id_utente", nullable = false)
	private UtenteEntity utente;

	@ManyToOne
	@MapsId("assetId")
	@JoinColumn(name = "id_asset", nullable = false)
	private AssetEntity asset;

	@Column(name = "quote_possedute", nullable = false)
	private Double quotePossedute;

//	@Column(name = "prezzo_medio", nullable = false)
//	private BigDecimal prezzoMedio = BigDecimal.ZERO;

	@Embeddable
	public static class UtenteAssetId implements Serializable {
		private Long utenteId;
		private Long assetId;
	}

	public UtenteAssetId getId() {
		return id;
	}

	public void setId(UtenteAssetId id) {
		this.id = id;
	}

	public UtenteEntity getUtente() {
		return utente;
	}

	public void setUtente(UtenteEntity utente) {
		this.utente = utente;
	}

	public AssetEntity getAsset() {
		return asset;
	}

	public void setAsset(AssetEntity asset) {
		this.asset = asset;
	}

	public Double getQuotePossedute() {
		return quotePossedute;
	}

	public void setQuotePossedute(Double quotePossedute) {
		this.quotePossedute = quotePossedute;
	}

//	public BigDecimal getPrezzoMedio() {
//		return prezzoMedio;
//	}
//
//	public void setPrezzoMedio(BigDecimal prezzoMedio) {
//		this.prezzoMedio = prezzoMedio;
//	}

}
