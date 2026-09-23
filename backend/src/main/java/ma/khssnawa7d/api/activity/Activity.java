package ma.khssnawa7d.api.activity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ma.khssnawa7d.api.user.User;

import java.time.Instant;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="activity")
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;

    @Column(nullable = false)
    private String title;

    private String description;

    @Column(nullable = false)
    private String city;
    private ActivityCategory category;

    @Column(nullable = false)
    private String locationName;

    @Column(nullable = false)
    private Instant startsAt;

    @Column(nullable = false)
    private Integer spotsNeeded;

    @Column(nullable = false)
    private ActivityStatus status;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

}
