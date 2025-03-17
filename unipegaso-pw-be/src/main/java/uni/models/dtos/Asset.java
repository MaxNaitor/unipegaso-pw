package uni.models.dtos;

import uni.models.entities.AssetEntity;

public class Asset {

	private Integer id;
	private String ticker;
	private String nome;
	private String logo;

	public Asset() {

	}

	public Asset(AssetEntity entity) {
		this.id = entity.getId();
		this.ticker = entity.getTicker();
		this.nome = entity.getNome();
		this.logo = entity.getLogo();
	}

	public String getTicker() {
		return ticker;
	}

	public void setTicker(String ticker) {
		this.ticker = ticker;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

}
