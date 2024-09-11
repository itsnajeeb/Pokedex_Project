import { useEffect, useState } from "react";
import axios from "axios";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
function PokemonList() {

    //const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    //const [pokemonList, setPokemonList] = useState(0)
    //const [isLoading, setIsLoading] = useState(true)
    //const [nextUrl, setNextUrl] = useState('')
    //const [prevUrl, setPrevUrl] = useState('')

    //cleaned up the state
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
        isLoading: true,
        nextUrl: '',
        prevUrl: ''
    })

    async function downloadPokemons() {

        //  setIsLoading(true)
        setPokemonListState((state) => ({ ...state, isLoading: true }));
        const response = await axios.get(pokemonListState.pokedexUrl);//here we downloads list of 20 pokemon

        const pokemonResults = response.data.results; //we get the array of pokemon from result 
        console.log("Find next Url", response.data);


        // setNextUrl(response.data.next)
        //setPrevUrl(response.data.previous)
        setPokemonListState((state) => ({
            ...state,
            nextUrl: response.data.next,
            prevUrl: response.data.prevUrl
        }))

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

        //console.log(pokeListResult);
        //setPokemonList(pokeListResult)
        //setIsLoading(false)

        setPokemonListState((state) => ({
            ...state,
            pokemonList: pokeListResult,
            isLoading: false
        }))
    }
    useEffect(() => {
        downloadPokemons();
    }, [pokemonListState.pokedexUrl])


    return (
        <div className="pokemonList-wrapper">
            {(pokemonListState.isLoading) ? <p>Loading...</p> : pokemonListState.pokemonList.map((pokemon) => <Pokemon name={pokemon.name} image={pokemon.image} key={pokemon.id} id={pokemon.id} />)}

            <div className="controlls">
                <button disabled={pokemonListState.prevUrl == null} onClick={() => {
                    const urlToSet = pokemonListState.prevUrl;
                    setPokemonListState({...pokemonListState, pokedexUrl:urlToSet})
                }
                }>Prev</button>


                <button disabled={pokemonListState.nextUrl == null} onClick={() => {
                    const urlToSet = pokemonListState.nextUrl;
                    setPokemonListState({ ...pokemonListState, pokedexUrl: urlToSet})

                }
                }>Next</button>
            </div>
        </div>
    )
}
export default PokemonList;