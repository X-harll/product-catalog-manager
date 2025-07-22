package com.rayontaser.pcm.security;

import com.rayontaser.pcm.user.Role;
import com.rayontaser.pcm.user.User;
import com.rayontaser.pcm.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class AdminInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.username1}")
    private String adminUsername1;
    @Value("${admin.password1}")
    private String adminPassword1;

    @Value("${admin.username2}")
    private String adminUsername2;
    @Value("${admin.password2}")
    private String adminPassword2;

    @Value("${admin.username3}")
    private String adminUsername3;
    @Value("${admin.password3}")
    private String adminPassword3;

    @Bean
    public CommandLineRunner initializeAdminUsers() {
        return args -> {
            createAdminIfNotExists(adminUsername1, adminPassword1);
            createAdminIfNotExists(adminUsername2, adminPassword2);
            createAdminIfNotExists(adminUsername3, adminPassword3);
        };
    }

    private void createAdminIfNotExists(String username, String rawPassword) {
        if (!userRepository.existsByUsername(username)) {
            User admin = User.builder()
                    .username(username)
                    .password(passwordEncoder.encode(rawPassword))
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(admin);
            log.info("✅ Admin user created: {}", username);
        } else {
            log.info("ℹ️ Admin already exists: {}", username);
        }
    }
}
