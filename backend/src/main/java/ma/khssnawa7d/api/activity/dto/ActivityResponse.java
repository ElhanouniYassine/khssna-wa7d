package ma.khssnawa7d.api.activity.dto;

import lombok.Getter;
import lombok.Setter;
import ma.khssnawa7d.api.activity.ActivityCategory;
import ma.khssnawa7d.api.activity.ActivityStatus;

import java.time.Instant;

@Getter
@Setter
public class ActivityResponse {
    private Long id;
    private String title;
    private String city;
    private ActivityCategory category;
    private String locationName;
    private Instant startsAt;
    private Integer spotsNeeded;
    private ActivityStatus status;
}
