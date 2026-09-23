package ma.khssnawa7d.api.activity.dto;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;
import ma.khssnawa7d.api.activity.ActivityCategory;
import ma.khssnawa7d.api.activity.ActivityStatus;

import java.time.Instant;

@Getter
@Setter
public class CreateActivityRequest {
    private String title;

    private String description;

    private String city;
    private ActivityCategory category;

    private String locationName;

    private Instant startsAt;

    private Integer spotsNeeded;

}
