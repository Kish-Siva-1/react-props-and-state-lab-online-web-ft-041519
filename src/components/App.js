import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = { pets: [],
      filters: {
        type: 'all'
      }}
  }

  changeSetType = (new_type) => {
    this.setState = ({
      filters: {
        ...this.state.filters, type: new_type.target.value
      }
    }) 
  }

  findPets = () => {

    if (this.state.filters.type === 'all'){
    fetch(`/api/pets`)
    .then(results => {results.json()})
    .then(pets => this.setState = ({
      pets
    }))
    }

    else {
    fetch(`/api/pets?type=${this.state.filters.type}`)
    .then(results => {results.json()})
    .then(pets => this.setState = ({
      pets
    }))
    }

  }

  onAdoptPet = (petId) => {
   // debugger;
    // let newIds = this.state.pets.slice() 
    // newIds.map(pet => {
    //   if (pet.id === pet_id) {
    //     pet.isAdopted = true  
    //   }
    //   return pet
    // }) 
    // this.setState({pets: newIds})

    const pets = this.state.pets.map(p => {
      return p.id === petId ? { ...p, isAdopted: true } : p;
    });
    this.setState({ pets });


  } 

  // componentDidMount() {
  //   const type = 'Dogs'
  //   this.changeSetType(type)
  // }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.changeSetType} onFindPetsClick={this.findPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
