package uni.models.dtos;

public class Ordine {
	private String ticker;
	private Double prezzo;
	private Double quote;
	private boolean isAcquisto;

	public String getTicker() {
		return ticker;
	}

	public void setTicker(String ticker) {
		this.ticker = ticker;
	}

	public Double getPrezzo() {
		return prezzo;
	}

	public void setPrezzo(Double prezzo) {
		this.prezzo = prezzo;
	}

	public Double getQuote() {
		return quote;
	}

	public void setQuote(Double quote) {
		this.quote = quote;
	}

	public boolean getIsAcquisto() {
		return isAcquisto;
	}

	public void setAcquisto(boolean isAcquisto) {
		this.isAcquisto = isAcquisto;
	}

}
