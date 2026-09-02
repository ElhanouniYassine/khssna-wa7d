package ma.khssnawa7d.api.user;

import ma.khssnawa7d.api.user.dto.RegisterRequest;
import ma.khssnawa7d.api.user.dto.UserResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


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
}
