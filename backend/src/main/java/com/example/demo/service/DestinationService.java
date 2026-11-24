package com.TravelGo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TravelGo.Repository.DestinationRepository;
import com.TravelGo.entity.Destination;

@Service
public class DestinationService {

    @Autowired
    private DestinationRepository destinationRepository;

    // Add Destination
    public Destination addDestination(Destination destination) {
        return destinationRepository.save(destination);
    }

    // Get All Destinations
    public List<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }

    // Get Destination By ID
    public Optional<Destination> getDestinationById(Long id) {
        return destinationRepository.findById(id);
    }

    // Update Destination
    public Destination updateDestination(Long id, Destination destination) {

        Destination existing = destinationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Destination not found"));

        existing.setName(destination.getName());
        existing.setLocation(destination.getLocation());
        existing.setCategory(destination.getCategory());
        existing.setDescription(destination.getDescription());
        existing.setPrice(destination.getPrice());
        existing.setImageUrl(destination.getImageUrl());

        return destinationRepository.save(existing);
    }

    // Delete Destination
    public void deleteDestination(Long id) {
        destinationRepository.deleteById(id);
    }
}
