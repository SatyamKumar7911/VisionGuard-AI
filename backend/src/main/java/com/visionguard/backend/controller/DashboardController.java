package com.visionguard.backend.controller;

import com.visionguard.backend.dto.DashboardStats;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*") // Allows the React frontend to fetch data
public class DashboardController {

    private final Random random = new Random();

    @GetMapping("/stats")
    public DashboardStats getDashboardStats() {
        // Generate some slightly randomized mock data so it looks like it's "charging"
        int totalViolations = 1200 + random.nextInt(50);
        int activeCameras = 140 + random.nextInt(5);
        int vehiclesScanned = 45000 + random.nextInt(500);
        double detectionAccuracy = 98.0 + (random.nextDouble() * 1.5); // Between 98.0 and 99.5
        
        // Round accuracy to 1 decimal place
        detectionAccuracy = Math.round(detectionAccuracy * 10.0) / 10.0;

        return new DashboardStats(totalViolations, activeCameras, vehiclesScanned, detectionAccuracy);
    }
}
