package com.rayontaser.pcm.product;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class ProductRequestDto {
    private String title;

    private String description;

    private Double price;

    private String category;

    private String imageUrl;
}
