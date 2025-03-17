package uni.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import uni.models.entities.UtenteAssetEntity;
import uni.models.entities.UtenteAssetEntity.UtenteAssetId;

public interface UtenteAssetRepository extends JpaRepository<UtenteAssetEntity, UtenteAssetId> {

	List<UtenteAssetEntity> findByUtenteUsername(String username);
}
