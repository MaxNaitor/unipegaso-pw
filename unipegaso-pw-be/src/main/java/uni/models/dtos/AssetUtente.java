package uni.models.dtos;

import uni.models.entities.UtenteAssetEntity;

public class AssetUtente {

	private Asset asset;
	private Double quoteAcquistate;

	public AssetUtente() {

	}

	public AssetUtente(UtenteAssetEntity entity) {
		this.asset = new Asset(entity.getAsset());
		this.quoteAcquistate = entity.getQuotePossedute();
	}

	public Asset getAsset() {
		return asset;
	}

	public void setAsset(Asset asset) {
		this.asset = asset;
	}

	public Double getQuoteAcquistate() {
		return quoteAcquistate;
	}

	public void setQuoteAcquistate(Double quoteAcquistate) {
		this.quoteAcquistate = quoteAcquistate;
	}

}
