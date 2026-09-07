package ma.khssnawa7d.api.auth;

import ma.khssnawa7d.api.auth.dto.LoginRequest;
import ma.khssnawa7d.api.user.User;
import ma.khssnawa7d.api.user.UserRepository;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.Optional;



@Service
public class AuthService {
    private final UserRepository userRepository;
    public AuthService(UserRepository userRepository){
        this.userRepository=userRepository;
    }



    public String login(LoginRequest loginRequest){
        Optional<User> user=userRepository.findByEmail(loginRequest.getEmail());
        if(user.isPresent()){
            if(BCrypt.checkpw(loginRequest.getPassword(),user.get().getPassword())){
                return "Auth success";
            }
            return "Invalid email or password";
        }
        return "Invalid email or password";
    }
}
