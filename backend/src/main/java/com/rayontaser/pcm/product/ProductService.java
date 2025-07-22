package com.rayontaser.pcm.product;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(UUID id) {
        return productRepository.findById(id);
    }

    public Product createProduct(ProductRequestDto product) {
        Product product1 = new Product();
        product1.setTitle(product.getTitle());
        product1.setDescription(product.getDescription());
        product1.setPrice(product.getPrice());
        product1.setCategory(product.getCategory());
        product1.setImageUrl(product.getImageUrl());
        return productRepository.save(product1);
    }

    public Optional<Product> updateProduct(UUID id, ProductRequestDto updatedProduct) {
        return productRepository.findById(id).map(existing -> {
            existing.setTitle(updatedProduct.getTitle());
            existing.setDescription(updatedProduct.getDescription());
            existing.setPrice(updatedProduct.getPrice());
            existing.setCategory(updatedProduct.getCategory());
            existing.setImageUrl(updatedProduct.getImageUrl());
            return productRepository.save(existing);
        });
    }

    public boolean deleteProduct(UUID id) {
        return productRepository.findById(id).map(product -> {
            productRepository.delete(product);
            return true;
        }).orElse(false);
    }
}
