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

@Entity
@Table(name = "assignments")
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "giver_id")
    private Participant giver;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id")
    private Participant receiver;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seekret_id")
    private Seekret seekret;

    public Assignment() {}

    public Assignment(Participant giver, Participant receiver, Seekret seekret) {
        this.giver = giver;
        this.receiver = receiver;
        this.seekret = seekret;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Participant getGiver() { return giver; }
    public void setGiver(Participant giver) { this.giver = giver; }

    public Participant getReceiver() { return receiver; }
    public void setReceiver(Participant receiver) { this.receiver = receiver; }

    public Seekret getSeekret() { return seekret; }
    public void setSeekret(Seekret seekret) { this.seekret = seekret; }
}
