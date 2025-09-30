package com.seekretsanta.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
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

    public Constraint() {}

    public Constraint(Participant giver, Participant cannotReceive, Seekret seekret) {
        this.giver = giver;
        this.cannotReceive = cannotReceive;
        this.seekret = seekret;
    }

}
