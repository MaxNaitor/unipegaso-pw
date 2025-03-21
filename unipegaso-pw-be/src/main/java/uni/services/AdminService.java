package uni.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import uni.models.dtos.Utente;

@Service
public class AdminService {

	@Autowired
	private UtenteService utenteService;

	public List<Utente> getAllUsers() {
		List<Utente> utenti = utenteService.getAllUsers(true);
		for (Utente utente : utenti) {
			utente.setAssetPosseduti(utenteService.getAssetDellUtente(utente.getUsername()));
		}
		return utenti;
	}
}
