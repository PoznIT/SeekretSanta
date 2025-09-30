package com.seekretsanta.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Setter
@Getter
@Entity
@Table(name = "seekrets")
public class Seekret {
    // Getters and setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "unique_link", unique = true, nullable = false)
    private String uniqueLink;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "assignments_generated")
    private boolean assignmentsGenerated = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany(mappedBy = "seekret", cascade = CascadeType.ALL)
    private List<Participant> participants = new ArrayList<>();

    @OneToMany(mappedBy = "seekret", cascade = CascadeType.ALL)
    private List<Assignment> assignments = new ArrayList<>();

    @OneToMany(mappedBy = "seekret", cascade = CascadeType.ALL)
    private List<Constraint> constraints = new ArrayList<>();

    public Seekret() {
        this.uniqueLink = UUID.randomUUID().toString();
        this.createdAt = LocalDateTime.now();
    }

    public Seekret(String name, User owner) {
        this();
        this.name = name;
        this.owner = owner;
    }

}
