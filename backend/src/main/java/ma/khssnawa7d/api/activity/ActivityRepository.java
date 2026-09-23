package ma.khssnawa7d.api.activity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface ActivityRepository extends JpaRepository<Activity,Long> {
    List<Activity> findByCategory(ActivityCategory category);

    List<Activity> findByCity(String city);

    List<Activity> findByStartsAt(Instant startsAt);

    List<Activity> findBySpotsNeeded(Integer spotsNeeded);

    boolean existsByCreatorIdAndStatusIn(
            Long creatorId,
            Collection<ActivityStatus> statuses
    );
}
