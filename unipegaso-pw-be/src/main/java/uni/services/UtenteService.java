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

import uni.models.dtos.AssetUtente;
import uni.models.dtos.AuthRequest;
import uni.models.dtos.AuthResponse;
import uni.models.dtos.Utente;
import uni.models.entities.UtenteEntity;
import uni.repositories.UtenteAssetRepository;
import uni.repositories.UtenteRepository;
import uni.utils.JwtUtils;

@Service
public class UtenteService implements UserDetailsService {

	@Autowired
	private UtenteRepository utenteRepository;

	@Autowired
	private UtenteAssetRepository utenteAssetRepository;

	@Autowired
	private PasswordService passwordService;

	@Autowired
	private JwtUtils jwtUtils;

	public AuthResponse login(AuthRequest authRequest) throws Exception {
		Utente utente = getUtenteByUsername(authRequest.getUsername());
		if (!passwordService.verifyPassword(authRequest.getPassword(), utente.getPassword()))
			throw new Exception("Credenziali errate");
		return buildAuthResponse(authRequest.getUsername(), authRequest.getPassword());
	}

	public AuthResponse registraUtente(AuthRequest authRequest) {
		UtenteEntity utente = new UtenteEntity();
		utente.setUsername(authRequest.getUsername());
		utente.setPassword(passwordService.hashPassword(authRequest.getPassword()));
		utente = utenteRepository.save(utente);
		return buildAuthResponse(authRequest.getUsername(), authRequest.getPassword());
	}

	private AuthResponse buildAuthResponse(String username, String password) {
		UserDetails userDetails = User.builder().username(username)
				.password(new BCryptPasswordEncoder().encode(password)).build();
		final String jwt = jwtUtils.generateToken(userDetails);
		return new AuthResponse(jwt);
	}

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

	public Double versaPrelevaLiquidita(String usernameUtente, Double importo) throws Exception {
		UtenteEntity utente = utenteRepository.findByUsername(usernameUtente)
				.orElseThrow(() -> new UsernameNotFoundException("Utente non trovato: " + usernameUtente));
		Double nuovaLiquidita = utente.getLiquidita() + importo;
		if (nuovaLiquidita < 0) {
			throw new Exception("La liquidità non può essere minore di 0");
		}
		utente.setLiquidita(nuovaLiquidita);
		utenteRepository.save(utente);
		return nuovaLiquidita;
	}

}
