package com.seekretsanta.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
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

    public Participant() {
    }

    public Participant(String name, String email, Seekret seekret) {
        this.name = name;
        this.email = email;
        this.seekret = seekret;
    }
}
