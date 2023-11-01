import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function handleFilterChange(filter) {
    setFilters({ type: filter })
  }

  const API_URL = filters.type === "all" ?
  "http://localhost:3001/pets" : `http://localhost:3001/pets?type=${filters.type}`

  function handleFindPetsClick() {
    fetch(API_URL)
    .then(r => r.json())
    .then(petData => setPets(petData))
  }

  function handleAdoptPet(petId) {
    // const adoptedPet = pets.find(pet => pet.id === petId);
    // adoptedPet.isAdopted = true;
    const updatedPets = pets.map(pet => {
      if (pet.id === petId) {
        // Create a new object to avoid mutating the original object
        return { ...pet, isAdopted: true };
      }
      return pet;
    });
  
    setPets(updatedPets);
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={handleFilterChange} onFindPetsClick={handleFindPetsClick}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleAdoptPet}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;