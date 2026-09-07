package ma.khssnawa7d.api.auth;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service

public class JWTService {
    @Value("${jwt.secret}")
    private String SECRET_STRING;
    @Value("${jwt.expiration}")
    private long jwtExpiration;

    private final SecretKey secretKey= Keys.hmacShaKeyFor(SECRET_STRING.getBytes(StandardCharsets.UTF_8));

    public String generateToken(Long userId){
        String strUserId=userId.toString();
        Date now = new Date();

        Date expiration = new Date(
                now.getTime() + jwtExpiration
        );
        return Jwts.builder()
                .subject(strUserId)
                .issuedAt(now)
                .expiration(expiration)
                .signWith(secretKey,Jwts.SIG.HS256)
                .compact();
    }


}


/*

POST /api/auth/login
        │
        ▼
   AuthController
        │
        ▼
    AuthService
        │
        ├── find user
        ├── verify password
        │
        ▼
    JwtService
        │
        ▼
   generate JWT
        │
        ▼
   AuthResponse
        │
        ▼
      Client


 */