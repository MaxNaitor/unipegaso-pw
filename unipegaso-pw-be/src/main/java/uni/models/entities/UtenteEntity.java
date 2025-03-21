package uni.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "utente")
public class UtenteEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String username;

	private String password;

	private Double liquidita = 0D;

	@Column(name = "tipo_utente")
	private Integer tipoUtente;

	public void aggiungiLiquidita(Double importo) {
		this.liquidita += importo;
	}

	public void rimuoviLiquidita(Double importo) {
		this.liquidita -= importo;
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

	public Integer getTipoUtente() {
		return tipoUtente;
	}

	public void setTipoUtente(Integer tipoUtente) {
		this.tipoUtente = tipoUtente;
	}

}
