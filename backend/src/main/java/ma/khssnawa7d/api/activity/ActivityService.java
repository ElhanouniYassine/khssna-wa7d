package ma.khssnawa7d.api.activity;

import ma.khssnawa7d.api.activity.dto.ActivityResponse;
import ma.khssnawa7d.api.activity.dto.CreateActivityRequest;
import ma.khssnawa7d.api.user.User;
import ma.khssnawa7d.api.user.UserRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static ma.khssnawa7d.api.activity.ActivityStatus.FULL;
import static ma.khssnawa7d.api.activity.ActivityStatus.OPEN;

@Service
public class ActivityService {
    private final ActivityRepository activityRepository;
    private final UserRepository userRepository;
    public ActivityService(ActivityRepository activityRepository,UserRepository userRepository){
        this.activityRepository=activityRepository;
        this.userRepository=userRepository;
    }

    public ActivityResponse createActivity(Long userId,CreateActivityRequest activityRequest) {
        Instant currentTime=Instant.now();
        Integer spotsNeeded=activityRequest.getSpotsNeeded();
        Instant startsAt=activityRequest.getStartsAt();
        String city=activityRequest.getCity();
        String title=activityRequest.getTitle();
        String description=activityRequest.getDescription();
        ActivityCategory category=activityRequest.getCategory();
        String locationName=activityRequest.getLocationName();

        List<ActivityStatus> activityListStatus=List.of(FULL,OPEN);

        boolean hasActiveActivity=activityRepository.existsByCreatorIdAndStatusIn(userId,activityListStatus);
        if (hasActiveActivity){
            throw new IllegalArgumentException("Cannot create new activity , you either have an OPEN one or FULL one!");
        }

        User creator=userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));


        if (spotsNeeded == null || spotsNeeded < 1) {
            throw new IllegalArgumentException(
                    "Spots needed must be greater than or equal to 1"
            );
        }

        if (startsAt == null || !startsAt.isAfter(currentTime)) {
            throw new IllegalArgumentException(
                    "Start time must exist and must be in the future"
            );
        }

        if (title == null || title.isBlank()) {
            throw new IllegalArgumentException(
                    "Title must be mentioned"
            );
        }

        if (city == null || city.isBlank()) {
            throw new IllegalArgumentException(
                    "City must be mentioned"
            );
        }

        if (locationName == null || locationName.isBlank()) {
            throw new IllegalArgumentException(
                    "Location name must be mentioned"
            );
        }

        if (category == null) {
            throw new IllegalArgumentException(
                    "Category must be mentioned"
            );
        }

        Activity newActivity=new Activity();
        newActivity.setCreator(creator);
        newActivity.setCategory(category);
        newActivity.setCity(city);
        newActivity.setDescription(description);
        newActivity.setLocationName(locationName);
        newActivity.setSpotsNeeded(spotsNeeded);
        newActivity.setStartsAt(startsAt);
        newActivity.setTitle(title);
        newActivity.setStatus(OPEN);
        newActivity.setCreatedAt(currentTime);

        Activity savedActivity = activityRepository.save(newActivity);
        ActivityResponse response = new ActivityResponse();
        response.setId(savedActivity.getId());
        response.setTitle(title);
        response.setCity(city);
        response.setCategory(category);
        response.setLocationName(locationName);
        response.setStartsAt(startsAt);
        response.setSpotsNeeded(spotsNeeded);
        response.setStatus(OPEN);
        return response;
    }


}
