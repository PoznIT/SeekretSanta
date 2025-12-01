package com.seekretsanta.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "constraints")
@Getter
@Setter
@NoArgsConstructor
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

    public Constraint(Participant giver, Participant cannotReceive, Seekret seekret) {
        this.giver = giver;
        this.cannotReceive = cannotReceive;
        this.seekret = seekret;
    }

}
