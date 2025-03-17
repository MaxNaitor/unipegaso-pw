package uni.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import uni.models.entities.AssetEntity;

@Repository
public interface AssetRepository extends JpaRepository<AssetEntity, Integer> {

}
