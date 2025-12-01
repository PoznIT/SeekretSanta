package com.seekretsanta.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seekretsanta.dto.CreateSeekretRequest;
import com.seekretsanta.dto.SeekretDto;
import com.seekretsanta.dto.UpdateSeekretRequest;
import com.seekretsanta.model.User;
import com.seekretsanta.service.SeekretService;
import com.seekretsanta.service.UserService;

@RestController
@RequestMapping("/seekrets")
public class SeekretController {

    private final SeekretService seekretService;

    private final UserService userService;

    public SeekretController(SeekretService seekretService, UserService userService) {
        this.seekretService = seekretService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<SeekretDto> createSeekret(
            @RequestBody CreateSeekretRequest request,
            Authentication authentication) {
        try {
            User owner = userService.findByEmail(authentication.getName());
            SeekretDto seekret = seekretService.createSeekret(request, owner);
            return ResponseEntity.ok(seekret);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/update")
    public ResponseEntity<SeekretDto> updateSeekret(
            @RequestBody UpdateSeekretRequest request,
            Authentication authentication) {
        try {
            User owner = userService.findByEmail(authentication.getName());
            SeekretDto seekret = seekretService.updateSeekret(request, owner);
            return ResponseEntity.ok(seekret);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/my")
    public ResponseEntity<List<SeekretDto>> getMySeekrets(Authentication authentication) {
        try {
            User user = userService.findByEmail(authentication.getName());
            List<SeekretDto> seekrets = seekretService.getUserSeekrets(user);
            return ResponseEntity.ok(seekrets);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/view/{uniqueLink}")
    public ResponseEntity<SeekretDto> getSeekretByLink(@PathVariable String uniqueLink, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        try {
            SeekretDto seekret = seekretService.getSeekretByLink(uniqueLink);
            return ResponseEntity.ok(seekret);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/view/{uniqueLink}/name")
    public ResponseEntity<String> getSeekretByName(@PathVariable String uniqueLink) {
        try {
            String name = seekretService.getSeekretNameByLink(uniqueLink);
            return ResponseEntity.ok(name);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/view/{uniqueLink}/participant/{participantId}")
    public ResponseEntity<String> getAssignmentForParticipant(
            @PathVariable String uniqueLink,
            @PathVariable Long participantId) {
        try {
            return ResponseEntity.ok(seekretService.getAssignedParticipant(uniqueLink, participantId).getName());
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/generate/{uniqueLink}")
    public ResponseEntity<SeekretDto> generateAssignments(
            @PathVariable String uniqueLink,
            Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        try {
            SeekretDto seekret = seekretService.generateAssignments(uniqueLink);
            return ResponseEntity.ok(seekret);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
