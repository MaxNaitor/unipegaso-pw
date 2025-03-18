package uni.filters;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import uni.services.UtenteService;
import uni.utils.JwtUtils;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
	@Autowired
	private JwtUtils jwtUtils;

	@Autowired
	private UtenteService utenteService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {

		// ENDPOINT CHE NON RICHIEDONO AUTORIZZAZIONE
		if (request.getRequestURI().equals("/user/login") || request.getRequestURI().equals("/user/registra")
				|| request.getRequestURI().equals("/market/available-assets")) {
			chain.doFilter(request, response);
			return;
		}

		final String authorizationHeader = request.getHeader("Authorization");

		String username = null;
		String jwt = jwtUtils.extractBearerToken(authorizationHeader);

		if (jwt != null) {
			username = jwtUtils.extractUsername(jwt);
		}
		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			if (jwtUtils.validateToken(jwt, username)) {

				// CREA UN'AUTENTICAZIONE VALIDA PER SPRING SECURITY
				UserDetails userDetails = utenteService.loadUserByUsername(username);
				UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());

				// IMPOSTA L'AUTENTICAZIONE NEL SECURITY CONTEXT
				SecurityContextHolder.getContext().setAuthentication(authenticationToken);

				chain.doFilter(request, response);
				return;
			}
		}
	}
}
