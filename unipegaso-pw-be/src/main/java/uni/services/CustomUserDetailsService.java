package uni.services;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
//  @Autowired
//  private UserRepository userRepository;  // un repository che accede ai dati

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// Cerca l'utente nel database usando il repository
//      User user = userRepository.findByUsername(username)
//          .orElseThrow(() -> new UsernameNotFoundException("Utente non trovato: " + username));
//
//      // Costruisci l'oggetto UserDetails
//      return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), mapRolesToAuthorities(user.getRoles()));
		if (username.equals("testuser")) {
			return User.builder().username("testuser").password(new BCryptPasswordEncoder().encode("password123")) // Password
																													// encoded
					.roles("USER").build();
		} else {
			throw new UsernameNotFoundException(username);
		}
	}

	// Metodo per convertire i ruoli in authorities (autorizzazioni)
//  private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Set<Role> roles) {
//      return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(
//          Collectors.toList());
//  }
}
