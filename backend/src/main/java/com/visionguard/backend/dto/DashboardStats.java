package com.visionguard.backend.dto;

public class DashboardStats {
    private int totalViolations;
    private int activeCameras;
    private int vehiclesScanned;
    private double detectionAccuracy;
    
    public DashboardStats(int totalViolations, int activeCameras, int vehiclesScanned, double detectionAccuracy) {
        this.totalViolations = totalViolations;
        this.activeCameras = activeCameras;
        this.vehiclesScanned = vehiclesScanned;
        this.detectionAccuracy = detectionAccuracy;
    }

    // Getters and Setters
    public int getTotalViolations() {
        return totalViolations;
    }

    public void setTotalViolations(int totalViolations) {
        this.totalViolations = totalViolations;
    }

    public int getActiveCameras() {
        return activeCameras;
    }

    public void setActiveCameras(int activeCameras) {
        this.activeCameras = activeCameras;
    }

    public int getVehiclesScanned() {
        return vehiclesScanned;
    }

    public void setVehiclesScanned(int vehiclesScanned) {
        this.vehiclesScanned = vehiclesScanned;
    }

    public double getDetectionAccuracy() {
        return detectionAccuracy;
    }

    public void setDetectionAccuracy(double detectionAccuracy) {
        this.detectionAccuracy = detectionAccuracy;
    }
}
