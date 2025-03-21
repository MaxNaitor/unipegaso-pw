package uni.models.dtos;

public class AuthResponse {
	private String token;
	private Integer tipoUtente;

	public AuthResponse(String token, Integer tipoUtente) {
		this.token = token;
		this.tipoUtente = tipoUtente;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Integer getTipoUtente() {
		return tipoUtente;
	}

	public void setTipoUtente(Integer tipoUtente) {
		this.tipoUtente = tipoUtente;
	}

}
