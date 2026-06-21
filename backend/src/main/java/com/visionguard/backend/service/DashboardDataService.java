package com.visionguard.backend.service;

import com.visionguard.backend.dto.DashboardStats;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
@EnableScheduling
public class DashboardDataService {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private final Random random = new Random();

    // Baseline metrics
    private int totalViolations = 1229;
    private int activeCameras = 143;
    private int vehiclesScanned = 45165;
    private double detectionAccuracy = 98.6;

    private String[] violationTypes = {"Helmet Violation", "Triple Riding", "Red Light", "Speeding"};
    private String[] locations = {"Main Street Inter.", "Highway A1", "Downtown Square", "North Avenue"};

    @Scheduled(fixedRate = 3000) // Runs every 3 seconds
    public void pushDashboardData() {
        // 1. Update stats with slight randomization
        if (random.nextDouble() > 0.3) {
            totalViolations += random.nextInt(3);
            vehiclesScanned += random.nextInt(15) + 5;
            
            // Fluctuate accuracy slightly
            detectionAccuracy += (random.nextDouble() * 0.2) - 0.1;
            detectionAccuracy = Math.round(detectionAccuracy * 100.0) / 100.0;
            if (detectionAccuracy > 99.9) detectionAccuracy = 99.9;
        }

        // Randomly simulate camera offline/online
        if (random.nextDouble() > 0.9) {
            activeCameras += random.nextBoolean() ? 1 : -1;
            if (activeCameras > 150) activeCameras = 150;
            if (activeCameras < 130) activeCameras = 130;
        }

        DashboardStats stats = new DashboardStats(totalViolations, activeCameras, vehiclesScanned, detectionAccuracy);
        
        // Push Stats
        messagingTemplate.convertAndSend("/topic/dashboard/stats", stats);

        // 2. Generate and push random new violation event occasionally
        if (random.nextDouble() > 0.6) {
            Map<String, Object> violationEvent = new HashMap<>();
            String type = violationTypes[random.nextInt(violationTypes.length)];
            violationEvent.put("id", System.currentTimeMillis());
            violationEvent.put("vehicleNumber", "MH" + (10 + random.nextInt(90)) + "AB" + (1000 + random.nextInt(9000)));
            violationEvent.put("type", type);
            violationEvent.put("location", locations[random.nextInt(locations.length)]);
            violationEvent.put("time", System.currentTimeMillis());
            violationEvent.put("status", "Pending");

            messagingTemplate.convertAndSend("/topic/dashboard/feed", (Object) violationEvent);

            // Trigger notification
            Map<String, String> notification = new HashMap<>();
            notification.put("message", "🚨 " + type + " Detected");
            messagingTemplate.convertAndSend("/topic/dashboard/notifications", (Object) notification);
        }
    }
}
