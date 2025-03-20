package uni.services;

import java.time.LocalDate;
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
import uni.models.dtos.Transazione;
import uni.models.dtos.Utente;
import uni.models.entities.AssetEntity;
import uni.models.entities.AssetUtenteEntity;
import uni.models.entities.TransazioneEntity;
import uni.models.entities.UtenteEntity;
import uni.repositories.AssetUtenteRepository;
import uni.repositories.TransazioniRepository;
import uni.repositories.UtenteRepository;
import uni.utils.JwtUtils;

@Service
public class UtenteService implements UserDetailsService {

	@Autowired
	private PasswordService passwordService;

	@Autowired
	private JwtUtils jwtUtils;

	@Autowired
	private UtenteRepository utenteRepository;

	@Autowired
	private AssetUtenteRepository utenteAssetRepository;

	@Autowired
	private TransazioniRepository transazioniRepository;

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

	public UtenteEntity getUtenteEntityByUsername(String username) {
		return utenteRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("Utente non trovato: " + username));
	}

	public Utente getUtenteByUsername(String username) {
		UtenteEntity entity = getUtenteEntityByUsername(username);
		return new Utente(entity);
	}

	public List<AssetUtente> getAssetDellUtente(String username) {
		return getAssetUtenteEntity(username).stream().map(uaEntity -> new AssetUtente(uaEntity))
				.collect(Collectors.toList());
	}

	public List<AssetUtenteEntity> getAssetUtenteEntity(String username) {
		return utenteAssetRepository.findByUtenteUsername(username);
	}

	public Double versaPrelevaLiquidita(String usernameUtente, Double importo) throws Exception {
		UtenteEntity utente = getUtenteEntityByUsername(usernameUtente);
		Double nuovaLiquidita = utente.getLiquidita() + importo;
		if (nuovaLiquidita < 0) {
			throw new Exception("La liquidità non può essere minore di 0");
		}
		utente.setLiquidita(nuovaLiquidita);
		utenteRepository.save(utente);
		return nuovaLiquidita;
	}

	public UtenteEntity saveUtente(UtenteEntity utente) {
		return utenteRepository.save(utente);
	}

	public TransazioneEntity salvaNuovaTransazione(UtenteEntity utente, AssetEntity asset, boolean acquisto,
			Double prezzo, Integer quote) {
		TransazioneEntity transazione = new TransazioneEntity();
		transazione.setUtente(utente);
		transazione.setAsset(asset);
		transazione.setAcquisto(acquisto);
		transazione.setPrezzo(prezzo);
		transazione.setQuote(quote);
		transazione.setData(LocalDate.now());
		return transazioniRepository.save(transazione);
	}

	public List<Transazione> getTransazioniUtente(String username) {
		return transazioniRepository.findByUtenteUsername(username).stream().map(entity -> new Transazione(entity))
				.toList();
	}

}
