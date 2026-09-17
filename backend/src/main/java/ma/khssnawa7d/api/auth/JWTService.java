package ma.khssnawa7d.api.auth;

import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.util.Date;

@Service

public class JWTService {
    private final long jwtExpiration;

    private final SecretKey secretKey;

    public JWTService(
            SecretKey secretKey,
            @Value("${jwt.expiration}") long jwtExpiration
    ) {
        this.jwtExpiration = jwtExpiration;

        this.secretKey = secretKey;
    }
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
    public Long extractUserId(String token) {
        String subject = Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();

        return Long.valueOf(subject);
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