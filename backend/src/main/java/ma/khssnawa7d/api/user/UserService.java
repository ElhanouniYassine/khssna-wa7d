package ma.khssnawa7d.api.user;



import ma.khssnawa7d.api.user.dto.RegisterRequest;
import ma.khssnawa7d.api.user.dto.UserResponse;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;



@Service
public class UserService {
    private final UserRepository userRepo;

    public UserService(UserRepository userRepo){
        this.userRepo=userRepo;
    }
    public String hashPassword(String password){
        String salt= BCrypt.gensalt(12);
        return BCrypt.hashpw(password,salt);
    }

    public UserResponse createUser(RegisterRequest request){
        User newPerson=new User();

        if(userRepo.findByEmail(request.getEmail()).isPresent()){
            throw new IllegalArgumentException("User with email :"+request.getEmail()+" Already exist");
        }
        newPerson.setName(request.getName());
        newPerson.setCity(request.getCity());
        newPerson.setEmail(request.getEmail());
        newPerson.setPassword(hashPassword(request.getPassword()));

        User savedUser=userRepo.save(newPerson);

        UserResponse finalUser=new UserResponse();
        finalUser.setCity(savedUser.getCity());
        finalUser.setEmail(savedUser.getEmail());
        finalUser.setName(savedUser.getName());
        return finalUser;
    }
}
