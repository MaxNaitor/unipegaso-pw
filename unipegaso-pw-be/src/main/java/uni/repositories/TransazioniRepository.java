package uni.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import uni.models.entities.TransazioneEntity;

@Repository
public interface TransazioniRepository extends JpaRepository<TransazioneEntity, Integer> {

	List<TransazioneEntity> findByUtenteUsername(String username);
}
