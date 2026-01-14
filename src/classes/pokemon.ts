import pokemonJson from "@/assets/json/pokemon_gen3.json"
import moveListJson from "@/assets/json/pokemon_gen3_move_list.json"

export default class Pokemon {
    pokemon: any = pokemonJson;
    moveList: any = moveListJson;

    constructor() {
    }

    getPokemonList() {
        return this.pokemon;
    }

    getPokemon(id: number) {
        return this.pokemon.find((obj: any) => obj.id == id);
    }

    getPokemonMove(pokemon: string) {
        return this.moveList.find((obj: any) => obj.pokemon == pokemon);
    }

    getLowKickPower(weight: number) {
        if (weight > 200) {
            return 120;
        } else if (weight > 100) {
            return 100;
        } else if (weight > 50) {
            return 80;
        } else if (weight > 25) {
            return 60;
        } else if (weight > 10) {
            return 40;
        } else {
            return 20;
        }
    }
}