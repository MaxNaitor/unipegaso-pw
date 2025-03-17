package uni.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import uni.models.dtos.Utente;
import uni.models.dtos.AssetUtente;
import uni.models.entities.UtenteEntity;
import uni.repositories.UtenteAssetRepository;
import uni.repositories.UtenteRepository;

@Service
public class UtenteService implements UserDetailsService {

	@Autowired
	private UtenteRepository utenteRepository;

	@Autowired
	private UtenteAssetRepository utenteAssetRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Utente utente = getUtenteByUsername(username);

		return User.builder().username(utente.getUsername())
				.password(new BCryptPasswordEncoder().encode(utente.getPassword())).build();
	}

	public Utente getUtenteByUsername(String username) {
		UtenteEntity entity = utenteRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("Utente non trovato: " + username));
		return new Utente(entity);
	}

	public List<AssetUtente> getAssetDellUtente(String username) {
		return utenteAssetRepository.findByUtenteUsername(username).stream().map(uaEntity -> new AssetUtente(uaEntity))
				.collect(Collectors.toList());
	}
}
