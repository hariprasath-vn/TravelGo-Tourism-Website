package com.TravelGo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.TravelGo.entity.Destination;

@Repository
public interface DestinationRepository extends JpaRepository<Destination, Long> {

}