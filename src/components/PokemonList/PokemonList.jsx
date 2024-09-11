import { useEffect, useState } from "react";
import axios from "axios";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
function PokemonList() {
    const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    const [pokemonList, setPokemonList] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [nextUrl, setNextUrl] = useState('')
    const [prevUrl, setPrevUrl] = useState('')


    async function downloadPokemons() {
        setIsLoading(true)
        const response = await axios.get(pokedexUrl);//here we downloads list of 20 pokemon

        const pokemonResults = response.data.results; //we get the array of pokemon from result 
        console.log("Find next Url", response.data);
        setNextUrl(response.data.next)
        setPrevUrl(response.data.previous)

        //console.log(pokemonResults);
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url))
        const pokemonData = await axios.all(pokemonResultPromise)
        //console.log(pokemonData);


        const pokeListResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
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
    }, [pokedexUrl])


    return (
        <div className="pokemonList-wrapper">
                {(isLoading) ? <p>Loading...</p> : pokemonList.map((pokemon) => <Pokemon name={pokemon.name} image={pokemon.image} key={pokemon.id} id={pokemon.id}/>)}

            <div className="controlls">
                <button disabled={prevUrl == null} onClick={() => setPokedexUrl(prevUrl)}>Prev</button>
                <button disabled={nextUrl == null} onClick={() => setPokedexUrl(nextUrl)}>Next</button>
            </div>
        </div>
    )
}
export default PokemonList;