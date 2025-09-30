package com.seekretsanta.model;

import jakarta.persistence.*;

@Entity
@Table(name = "participants")
public class Participant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seekret_id")
    private Seekret seekret;

    public Participant() {}

    public Participant(String name, String email, Seekret seekret) {
        this.name = name;
        this.email = email;
        this.seekret = seekret;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Seekret getSeekret() { return seekret; }
    public void setSeekret(Seekret seekret) { this.seekret = seekret; }
}
