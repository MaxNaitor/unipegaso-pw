package uni.models.dtos;

import java.util.List;

import uni.models.entities.UtenteEntity;

public class Utente {

	private Integer id;

	private String username;

	private String password;

	private Double liquidita;

	private Integer tipoUtente;

	private List<AssetUtente> assetPosseduti;

	public Utente() {

	};

	public Utente(UtenteEntity entity) {
		this.id = entity.getId();
		this.username = entity.getUsername();
		this.password = entity.getPassword();
		this.liquidita = entity.getLiquidita();
		this.tipoUtente = entity.getTipoUtente();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Double getLiquidita() {
		return liquidita;
	}

	public void setLiquidita(Double liquidita) {
		this.liquidita = liquidita;
	}

	public List<AssetUtente> getAssetPosseduti() {
		return assetPosseduti;
	}

	public void setAssetPosseduti(List<AssetUtente> assetPosseduti) {
		this.assetPosseduti = assetPosseduti;
	}

	public Integer getTipoUtente() {
		return tipoUtente;
	}

	public void setTipoUtente(Integer tipoUtente) {
		this.tipoUtente = tipoUtente;
	}

}
