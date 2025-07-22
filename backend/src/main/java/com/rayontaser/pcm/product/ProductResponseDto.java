package com.rayontaser.pcm.product;

import jakarta.persistence.Column;

import java.util.UUID;

public class ProductResponseDto {
    private UUID id;

    private String title;

    private String description;

    private Double price;

    private String category;

    private String imageUrl;
}
