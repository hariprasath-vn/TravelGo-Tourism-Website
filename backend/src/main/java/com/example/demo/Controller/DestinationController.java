package com.TravelGo.Controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.TravelGo.entity.Destination;
import com.TravelGo.service.DestinationService;

@RestController
@RequestMapping("/api/destinations")
@CrossOrigin(origins = "http://localhost:5173")
public class DestinationController {

    @Autowired
    private DestinationService destinationService;

    // Add Destination
    @PostMapping
    public Destination addDestination(@RequestBody Destination destination) {
        return destinationService.addDestination(destination);
    }

    // Get All Destinations
    @GetMapping
    public List<Destination> getAllDestinations() {
        return destinationService.getAllDestinations();
    }

    // Get Destination By ID
    @GetMapping("/{id}")
    public Optional<Destination> getDestinationById(@PathVariable Long id) {
        return destinationService.getDestinationById(id);
    }

    // Update Destination
    @PutMapping("/{id}")
    public Destination updateDestination(
            @PathVariable Long id,
            @RequestBody Destination destination) {
        return destinationService.updateDestination(id, destination);
    }

    // Delete Destination
    @DeleteMapping("/{id}")
    public String deleteDestination(@PathVariable Long id) {
        destinationService.deleteDestination(id);
        return "Destination deleted successfully";
    }
}
