package ma.khssnawa7d.api.auth;

import ma.khssnawa7d.api.auth.dto.LoginRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    public AuthController(AuthService authService){
        this.authService=authService;
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody LoginRequest loginRequest){
        return authService.login(loginRequest);
    }


}
