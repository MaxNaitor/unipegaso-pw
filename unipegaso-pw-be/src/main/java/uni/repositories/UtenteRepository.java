package uni.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import uni.models.entities.UtenteEntity;

@Repository
public interface UtenteRepository extends JpaRepository<UtenteEntity, Integer> {

	Optional<UtenteEntity> findByUsername(String username);
}
