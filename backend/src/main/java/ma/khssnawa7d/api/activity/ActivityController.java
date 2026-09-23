package ma.khssnawa7d.api.activity;


import ma.khssnawa7d.api.activity.dto.ActivityResponse;
import ma.khssnawa7d.api.activity.dto.CreateActivityRequest;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/activities")
@RestController

public class ActivityController {
    private final ActivityService activityService;
    public ActivityController(ActivityService activityService){
        this.activityService=activityService;
    }

    @PostMapping
    public ActivityResponse createActivity(
            Authentication authentication,
            @RequestBody CreateActivityRequest activityRequest
    ){
        Long userId=Long.valueOf(authentication.getName());
        return activityService.createActivity(userId,activityRequest);
    }
}
