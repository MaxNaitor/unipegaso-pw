package uni.models.dtos;

import uni.models.entities.AssetUtenteEntity;

public class AssetUtente {

	private Asset asset;
	private Integer quoteAcquistate;

	public AssetUtente() {

	}

	public AssetUtente(AssetUtenteEntity entity) {
		this.asset = new Asset(entity.getAsset());
		this.quoteAcquistate = entity.getQuotePossedute();
	}

	public Asset getAsset() {
		return asset;
	}

	public void setAsset(Asset asset) {
		this.asset = asset;
	}

	public Integer getQuoteAcquistate() {
		return quoteAcquistate;
	}

	public void setQuoteAcquistate(Integer quoteAcquistate) {
		this.quoteAcquistate = quoteAcquistate;
	}

}
