package com.example.treatwell.webControllers;

import com.example.treatwell.model.User;
import com.example.treatwell.service.TestDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
@Profile("cypress")
@RequiredArgsConstructor
public class TestController {
    private final TestDataService testDataService;

    @PostMapping("/cleanup")
    public ResponseEntity<Void> cleanupDatabase() {
        testDataService.cleanupDatabase();
        return ResponseEntity.ok().build();
    }

    @PostMapping("/seed/user")
    public ResponseEntity<User> seedTestUser() {
        User testUser = testDataService.createTestUser();
        return ResponseEntity.ok(testUser);
    }
}