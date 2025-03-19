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
public class AssetUtenteEntity {

	@EmbeddedId
	private UtenteAssetId id;

	@ManyToOne
	@MapsId("utenteId")
	@JoinColumn(name = "id_utente", nullable = false)
	private UtenteEntity utente;

	@ManyToOne
	@MapsId("assetId")
	@JoinColumn(name = "id_asset", nullable = false)
	private AssetEntity asset;

	@Column(name = "quote_possedute", nullable = false)
	private Integer quotePossedute = 0;

	@Embeddable
	public static class UtenteAssetId implements Serializable {
		private Integer utenteId;
		private Integer assetId;

		public Integer getUtenteId() {
			return utenteId;
		}

		public void setUtenteId(Integer utenteId) {
			this.utenteId = utenteId;
		}

		public Integer getAssetId() {
			return assetId;
		}

		public void setAssetId(Integer assetId) {
			this.assetId = assetId;
		}

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

	public Integer getQuotePossedute() {
		return quotePossedute;
	}

	public void setQuotePossedute(Integer quotePossedute) {
		this.quotePossedute = quotePossedute;
	}

	public void aggiungiQuote(Integer quotePossedute) {
		this.quotePossedute += quotePossedute;
	}

	public void rimuoviQuote(Integer quotePossedute) {
		this.quotePossedute -= quotePossedute;
	}

//	public BigDecimal getPrezzoMedio() {
//		return prezzoMedio;
//	}
//
//	public void setPrezzoMedio(BigDecimal prezzoMedio) {
//		this.prezzoMedio = prezzoMedio;
//	}

}
