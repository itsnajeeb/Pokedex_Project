import { useState } from 'react'
import './App.css'
import Pokedex from './components/Pokedex/Pokedex'
import PokemonList from './components/PokemonList/PokemonList'

function App() {

  return (
    <>
     <h1 className='pokedex-heading'>PokeDex</h1>
     <Pokedex />
    </>
  )
}

export default App
