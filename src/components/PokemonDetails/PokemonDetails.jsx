import axios from "axios";
import './pokemonDetails.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PokemonDetails() {
    const [pokemon, setPokemon] = useState([])
    const { id } = useParams();
    console.log(`https://pokeapi.co/api/v2/pokemon/`);

    async function downloadPokemons() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            height: response.data.height,
            weight: response.data.weight,
            types: response.data.types.map((t) => t.type.name)

        })
    }

    useEffect(() => {
        downloadPokemons();
    }, [])
    return (
        <div className="pokemonDetails-wrapper">
            <img className="pokemon-datails-image" src={pokemon.image} alt="Pokemon Image" />
            <div className="pokemon-details-name"> Name : {pokemon.name}</div>
            <div className="pokemon-details-height"> Height : {pokemon.height}</div>
            <div className="pokemon-details-weight"> Weight : {pokemon.weight}</div>
            <div className="pokemon-details-types"> {pokemon.types && pokemon.types.map((t) => <div key={t} >  {t} </div>)}</div>


        </div>
    )
}
export default PokemonDetails;