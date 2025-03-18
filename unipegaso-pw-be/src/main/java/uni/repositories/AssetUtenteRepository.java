package uni.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import uni.models.entities.AssetUtenteEntity;
import uni.models.entities.AssetUtenteEntity.UtenteAssetId;

public interface AssetUtenteRepository extends JpaRepository<AssetUtenteEntity, UtenteAssetId> {

	List<AssetUtenteEntity> findByUtenteUsername(String username);
}
