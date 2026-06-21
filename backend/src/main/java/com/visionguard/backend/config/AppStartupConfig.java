package com.visionguard.backend.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.Arrays;
import java.util.List;

@Component
public class AppStartupConfig implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(AppStartupConfig.class);

    @Override
    public void run(String... args) throws Exception {
        List<String> directoriesToCreate = Arrays.asList(
                "./data",
                "./uploads",
                "./evidence",
                "./logs",
                "./reports"
        );

        for (String dirPath : directoriesToCreate) {
            File dir = new File(dirPath);
            if (!dir.exists()) {
                boolean created = dir.mkdirs();
                if (created) {
                    logger.info("Successfully created directory: {}", dirPath);
                } else {
                    logger.error("Failed to create directory: {}", dirPath);
                }
            } else {
                logger.info("Directory already exists: {}", dirPath);
            }
        }
    }
}
