import { useEffect, useState } from "react";
import axios from "axios";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
function PokemonList() {
    const POKEDEX_URL='https://pokeapi.co/api/v2/pokemon';
    const [pokemonList, setPokemonList] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    async function downloadPokemons() {
        const response = await axios.get(POKEDEX_URL);
        const pokemonResults = response.data.results;
        //console.log(pokemonResults);
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url))
        const pokemonData = await axios.all(pokemonResultPromise)
        //console.log(pokemonData);


        const pokeListResult=pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id:pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types
            }

        });

        console.log(pokeListResult);
        setPokemonList(pokeListResult)

        setIsLoading(false)

    }
    useEffect(() => {
        downloadPokemons();
    }, [])


    return (
        <div className="pokemonList-wrapper">
            <h3>Pokemon List</h3>
            {(isLoading) ? "Loading" : pokemonList.map((pokemon)=> <Pokemon  name={pokemon.name} image={pokemon.image} key={pokemon.id}/>)}
        </div>
    )
}
export default PokemonList;