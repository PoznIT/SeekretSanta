package com.seekretsanta.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "constraints")
public class Constraint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "giver_id")
    private Participant giver;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cannot_receive_id")
    private Participant cannotReceive;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seekret_id")
    private Seekret seekret;

    public enum Type {
        UNIDIRECTIONAL,
        BIDIRECTIONAL
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private Type type = Type.UNIDIRECTIONAL;

    public Constraint() {}

    public Constraint(Participant giver, Participant cannotReceive, Seekret seekret, Type type) {
        this.giver = giver;
        this.cannotReceive = cannotReceive;
        this.seekret = seekret;
        this.type = type;
    }

}
