package ma.khssnawa7d.api.auth;

import ma.khssnawa7d.api.auth.dto.AuthResponse;
import ma.khssnawa7d.api.auth.dto.LoginRequest;
import ma.khssnawa7d.api.user.User;
import ma.khssnawa7d.api.user.UserRepository;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.Optional;



@Service
public class AuthService {
    private final UserRepository userRepository;
    private final JWTService jwtService;

    public AuthService(UserRepository userRepository,JWTService jwtService){
        this.userRepository=userRepository;
        this.jwtService=jwtService;
    }





    public AuthResponse login(LoginRequest loginRequest){
        Optional<User> user=userRepository.findByEmail(loginRequest.getEmail());
        if(user.isPresent()){
            if(BCrypt.checkpw(loginRequest.getPassword(),user.get().getPassword())){
                String token=jwtService.generateToken(user.get().getId());
                return new AuthResponse(token);
            }
            throw new IllegalArgumentException("Invalid email or password");
        }
        throw new IllegalArgumentException("Invalid email or password");
    }
}
