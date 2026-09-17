package ma.khssnawa7d.api.user;

import ma.khssnawa7d.api.user.dto.RegisterRequest;
import ma.khssnawa7d.api.user.dto.UserResponse;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@RequestMapping("/api/users")
@RestController
public class UserController {    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping
    public UserResponse createUser(@RequestBody RegisterRequest request) {
        return userService.createUser(request);
    }



    @GetMapping("/me")
    public UserResponse getCurrentUser(Authentication authentication) {

        Long userId = Long.valueOf(authentication.getName());

        return userService.getUserById(userId);
    }
}
