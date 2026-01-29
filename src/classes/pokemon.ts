import pokemonJson from "@/assets/json/pokemon_gen3.json"
import pokemonMinLevelJson from "@/assets/json/pokemon_min_level_gen3.json"
import moveJson from "@/assets/json/move_gen3.json"
import moveListJson from "@/assets/json/pokemon_gen3_move_list.json"

export default class Pokemon {
    pokemon: any = pokemonJson;
    pokemonMinLevelJson: any = pokemonMinLevelJson;
    move: any = moveJson;
    moveList: any = moveListJson;

    constructor() {
    }

    getPokemonList() {
        return this.pokemon;
    }

    getPokemonNameList() {
        return this.pokemon.map((obj: any) => obj.pokemon).splice(0, 386);
    }

    getMoveList() {
        return this.move;
    }

    getMoveNameList() {
        return this.move.map((obj: any) => obj.move);
    }

    getPokemon(id: number) {
        return this.pokemon.find((obj: any) => obj.id == id);
    }

    getPokemonForName(name: string) {
        return this.pokemon.find((obj: any) => obj.pokemon == name);
    }

    getPokemonMinLevel(pokemon: string) {
        return this.pokemonMinLevelJson.find((obj: any) => obj.pokemon == pokemon);
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

    checkRegulation(releaseDateStart: string, releaseDateEnd: string, banned: any, pokemon: string, level: number, move1: string, move2: string, move3: string, move4: string) {
        let startDate = (new Date(releaseDateStart)).getTime();
        let endDate = (new Date(releaseDateEnd)).getTime();
        let pokemonDetail = this.getPokemonForName(pokemon);
        let pokemonMinLevel = this.getPokemonMinLevel(pokemon);
        let pokemonMove = this.getPokemonMove(pokemon);

        let result = {
            pokemon: false,
            level: false,
            move1: false,
            move2: false,
            move3: false,
            move4: false,
            pokemon_text: '',
            level_text: '',
            move1_text: '',
            move2_text: '',
            move3_text: '',
            move4_text: '',
        };

        // 入力チェック
        if (!startDate || !endDate || (pokemon === '') || !level) {
            return result;
        }

        // ポケモンの解禁情報を確認
        let pokemonDate = (new Date(pokemonDetail.release_date)).getTime();
        if ((startDate <= pokemonDate) && (pokemonDate <= endDate)) {
            result.pokemon = true;
            result.pokemon_text = '使用可能';
        } else {
            result.pokemon = false;
            result.pokemon_text = '未解禁のポケモンです';
            return result;
        }

        // ポケモンの使用制限を確認
        for (let i in banned) {
            if ((banned[i] === 'ソーナノ・ソーナンス') && (pokemonDetail.dex === 202 || pokemonDetail.dex === 360)) {
                result.pokemon = false;
                result.pokemon_text = '使用禁止のポケモンです';
                return result;
            }
            if ((banned[i] === 'ラティオス・ラティアス') && (pokemonDetail.dex === 380 || pokemonDetail.dex === 381)) {
                result.pokemon = false;
                result.pokemon_text = '使用禁止のポケモンです';
                return result;
            }
            if ((banned[i] === '禁止伝説') && (pokemonDetail.dex === 150 || pokemonDetail.dex === 249 || pokemonDetail.dex === 250 || pokemonDetail.dex === 382 || pokemonDetail.dex === 383 || pokemonDetail.dex === 384)) {
                result.pokemon = false;
                result.pokemon_text = '使用禁止のポケモンです';
                return result;
            }
            if ((banned[i] === '幻') && (pokemonDetail.dex === 151 || pokemonDetail.dex === 251 || pokemonDetail.dex === 385 || pokemonDetail.dex === 386)) {
                result.pokemon = false;
                result.pokemon_text = '使用禁止のポケモンです';
                return result;
            }
        }

        // ポケモンのレベル情報を確認
        let minLevel = 100;
        let ditto = this.getPokemon(132);
        let dittoDate = (new Date(ditto.release_date)).getTime();
        if ((pokemonDetail.egg_group_1 !== '未発見' && pokemonDetail.egg_group_2 !== '未発見') && pokemonDetail.female !== 0) {
            if (pokemonMinLevel.default !== null && (pokemonMinLevel.default < minLevel)) {
                minLevel = pokemonMinLevel.default;
            }
        } else if (pokemonDetail.male !== 0 && pokemonDetail.female !== 0) {
            if (pokemonMinLevel.default !== null && (pokemonMinLevel.default < minLevel)) {
                minLevel = pokemonMinLevel.default;
            }
        } else if (pokemonDetail.dex === 32 || pokemonDetail.dex === 33 || pokemonDetail.dex === 34 || pokemonDetail.dex === 292 || pokemonDetail.dex === 313) {
            if (pokemonMinLevel.default !== null && (pokemonMinLevel.default < minLevel)) {
                minLevel = pokemonMinLevel.default;
            }
        } else if ((startDate <= dittoDate) && (dittoDate <= endDate)) {
            if (pokemonMinLevel.default !== null && (pokemonMinLevel.default < minLevel)) {
                minLevel = pokemonMinLevel.default;
            }
        }
        if ((startDate <= (new Date('2002-11-21')).getTime()) && ((new Date('2002-11-21')).getTime() <= endDate)) {
            if (pokemonMinLevel.rs !== null && (pokemonMinLevel.rs < minLevel)) {
                minLevel = pokemonMinLevel.rs;
            }
        }
        if ((startDate <= (new Date('2003-11-21')).getTime()) && ((new Date('2003-11-21')).getTime() <= endDate)) {
            if (pokemonMinLevel.co !== null && (pokemonMinLevel.co < minLevel)) {
                minLevel = pokemonMinLevel.co;
            }
        }
        if ((startDate <= (new Date('2004-01-29')).getTime()) && ((new Date('2004-01-29')).getTime() <= endDate)) {
            if (pokemonMinLevel.frlg !== null && (pokemonMinLevel.frlg < minLevel)) {
                minLevel = pokemonMinLevel.frlg;
            }
        }
        if ((startDate <= (new Date('2004-09-16')).getTime()) && ((new Date('2004-09-16')).getTime() <= endDate)) {
            if (pokemonMinLevel.em !== null && (pokemonMinLevel.em < minLevel)) {
                minLevel = pokemonMinLevel.em;
            }
        }
        if ((startDate <= (new Date('2005-08-04')).getTime()) && ((new Date('2005-08-04')).getTime() <= endDate)) {
            if (pokemonMinLevel.xd !== null && (pokemonMinLevel.xd < minLevel)) {
                minLevel = pokemonMinLevel.xd;
            }
        }
        if ((pokemonDetail.dex === 151) && (startDate <= (new Date('2005/06/25')).getTime()) && ((new Date('2005/06/25')).getTime() <= endDate)) {
            if (pokemonMinLevel.special < minLevel) {
                minLevel = pokemonMinLevel.special;
            }
        }
        if ((pokemonDetail.dex === 251) && (startDate <= (new Date('2003/11/21')).getTime()) && ((new Date('2003/11/21')).getTime() <= endDate)) {
            if (pokemonMinLevel.special < minLevel) {
                minLevel = pokemonMinLevel.special;
            }
        }
        if ((pokemonDetail.dex === 385) && (startDate <= (new Date('2003/06/21')).getTime()) && ((new Date('2003/06/21')).getTime() <= endDate)) {
            if (pokemonMinLevel.special < minLevel) {
                minLevel = pokemonMinLevel.special;
            }
        }
        if (minLevel <= level) {
            result.level = true;
            result.level_text = '使用可能';
        } else {
            result.level = false;
            result.level_text = '解禁されている最小レベルを下回っています';
            return result;
        }

        // ポケモンのわざ情報を確認
        let moves = {
            move1: move1,
            move2: move2,
            move3: move3,
            move4: move4
        };
        let movesCategory = {
            move1: [],
            move2: [],
            move3: [],
            move4: []
        };
        let eggMoves = {
            move1: null,
            move2: null,
            move3: null,
            move4: null
        };
        let specialMoveIds = [];
        let evolutionMoveLevels = [];

        let evolutionBeforePokemon1 = null;
        let evolutionBeforePokemonMove1 = null;
        let evolutionBeforePokemon2 = null;
        let evolutionBeforePokemonMove2 = null;
        if (pokemonDetail.evolution_before !== null) {
            evolutionBeforePokemon1 = this.getPokemonForName(pokemonDetail.evolution_before);
            if ((startDate <= (new Date(evolutionBeforePokemon1.release_date)).getTime()) && ((new Date(evolutionBeforePokemon1.release_date)).getTime() <= endDate)) {
                evolutionBeforePokemonMove1 = this.getPokemonMove(pokemonDetail.evolution_before);
            }
        }
        if (evolutionBeforePokemon1 !== null && evolutionBeforePokemon1.evolution_before !== null) {
            evolutionBeforePokemon2 = this.getPokemonForName(evolutionBeforePokemon1.evolution_before);
            if ((startDate <= (new Date(evolutionBeforePokemon2.release_date)).getTime()) && ((new Date(evolutionBeforePokemon2.release_date)).getTime() <= endDate)) {
                evolutionBeforePokemonMove2 = this.getPokemonMove(evolutionBeforePokemon1.evolution_before);
            }
        }

        let wildEncounter = false;
        if ((pokemonMinLevel.default !== null) && (level < pokemonMinLevel.default)) {
            wildEncounter = true;
        }

        let learnsetEggMove = false;
        let learnsetSpecialXDMove = false;
        let learnsetSpecialMove = false;
        let learnsetAzurillOnlyMove = false;

        for (let i in moves) {
            if (moves[i] === '') {
                movesCategory[i].push('empty');
                continue;
            }

            // レベルわざ
            if (pokemonMove.level_rs.find((obj: any) => (obj.move == moves[i]) && (obj.level <= level))) {
                movesCategory[i].push('level_rs');
            } else if (evolutionBeforePokemonMove1 !== null && evolutionBeforePokemonMove1.level_rs.find((obj: any) => (obj.move == moves[i]) && (obj.level <= level))) {
                movesCategory[i].push('level_rs');
            } else if (evolutionBeforePokemonMove2 !== null && evolutionBeforePokemonMove2.level_rs.find((obj: any) => (obj.move == moves[i]) && (obj.level <= level))) {
                movesCategory[i].push('level_rs');
            } else if (pokemonMove.level_rs.find((obj: any) => (obj.move == moves[i] && (obj.level > level)))) {
                movesCategory[i].push('over_level_rs');
            } else if (evolutionBeforePokemonMove1 !== null && evolutionBeforePokemonMove1.level_rs.find((obj: any) => (obj.move == moves[i] && (obj.level > level)))) {
                movesCategory[i].push('over_level_rs');
            } else if (evolutionBeforePokemonMove2 !== null && evolutionBeforePokemonMove2.level_rs.find((obj: any) => (obj.move == moves[i] && (obj.level > level)))) {
                movesCategory[i].push('over_level_rs');
            }
            if ((startDate <= (new Date('2004-01-29')).getTime()) && ((new Date('2004-01-29')).getTime() <= endDate)) {
                if (pokemonDetail.dex === 386) {
                    if (pokemonMove.level_fr.find((obj: any) => (obj.move == moves[i]) && (obj.level <= level))) {
                        movesCategory[i].push('level_frlg');
                    } else if (evolutionBeforePokemonMove1 !== null && evolutionBeforePokemonMove1.level_fr.find((obj: any) => (obj.move == moves[i]) && (obj.level <= level))) {
                        movesCategory[i].push('level_frlg');
                    } else if (evolutionBeforePokemonMove2 !== null && evolutionBeforePokemonMove2.level_fr.find((obj: any) => (obj.move == moves[i]) && (obj.level <= level))) {
                        movesCategory[i].push('level_frlg');
                    } else if (pokemonMove.level_fr.find((obj: any) => (obj.move == moves[i] && (obj.level > level)))) {
                        movesCategory[i].push('over_level_frlg');
                    } else if (evolutionBeforePokemonMove1 !== null && evolutionBeforePokemonMove1.level_fr.find((obj: any) => (obj.move == moves[i] && (obj.level > level)))) {
                        movesCategory[i].push('over_level_frlg');
                    } else if (evolutionBeforePokemonMove2 !== null && evolutionBeforePokemonMove2.level_fr.find((obj: any) => (obj.move == moves[i] && (obj.level > level)))) {
                        movesCategory[i].push('over_level_frlg');
                    } else if (pokemonMove.level_lg.find((obj: any) => (obj.move == moves[i]) && (obj.level <= level))) {
                        movesCategory[i].push('level_frlg');
                    } else if (evolutionBeforePokemonMove1 !== null && evolutionBeforePokemonMove1.level_lg.find((obj: any) => (obj.move == moves[i]) && (obj.level <= level))) {
                        movesCategory[i].push('level_frlg');
                    } else if (evolutionBeforePokemonMove2 !== null && evolutionBeforePokemonMove2.level_lg.find((obj: any) => (obj.move == moves[i]) && (obj.level <= level))) {
                        movesCategory[i].push('level_frlg');
                    } else if (pokemonMove.level_lg.find((obj: any) => (obj.move == moves[i] && (obj.level > level)))) {
                        movesCategory[i].push('over_level_frlg');
                    } else if (evolutionBeforePokemonMove1 !== null && evolutionBeforePokemonMove1.level_lg.find((obj: any) => (obj.move == moves[i] && (obj.level > level)))) {
                        movesCategory[i].push('over_level_frlg');
                    } else if (evolutionBeforePokemonMove2 !== null && evolutionBeforePokemonMove2.level_lg.find((obj: any) => (obj.move == moves[i] && (obj.level > level)))) {
                        movesCategory[i].push('over_level_frlg');
                    }
                } else {
                    if (pokemonMove.level_frlg.find((obj: any) => (obj.move == moves[i]) && (obj.level <= level))) {
                        movesCategory[i].push('level_frlg');
                    } else if (evolutionBeforePokemonMove1 !== null && evolutionBeforePokemonMove1.level_frlg.find((obj: any) => (obj.move == moves[i]) && (obj.level <= level))) {
                        movesCategory[i].push('level_frlg');
                    } else if (evolutionBeforePokemonMove2 !== null && evolutionBeforePokemonMove2.level_frlg.find((obj: any) => (obj.move == moves[i]) && (obj.level <= level))) {
                        movesCategory[i].push('level_frlg');
                    } else if (pokemonMove.level_frlg.find((obj: any) => (obj.move == moves[i] && (obj.level > level)))) {
                        movesCategory[i].push('over_level_frlg');
                    } else if (evolutionBeforePokemonMove1 !== null && evolutionBeforePokemonMove1.level_frlg.find((obj: any) => (obj.move == moves[i] && (obj.level > level)))) {
                        movesCategory[i].push('over_level_frlg');
                    } else if (evolutionBeforePokemonMove2 !== null && evolutionBeforePokemonMove2.level_frlg.find((obj: any) => (obj.move == moves[i] && (obj.level > level)))) {
                        movesCategory[i].push('over_level_frlg');
                    }
                }
            }
            if ((startDate <= (new Date('2004-09-16')).getTime()) && ((new Date('2004-09-16')).getTime() <= endDate)) {
                if (pokemonDetail.dex === 386) {
                    if (pokemonMove.level_em.find((obj: any) => (obj.move == moves[i]) && (obj.level <= level))) {
                        movesCategory[i].push('level_rs');
                    } else if (evolutionBeforePokemonMove1 !== null && evolutionBeforePokemonMove1.level_em.find((obj: any) => (obj.move == moves[i]) && (obj.level <= level))) {
                        movesCategory[i].push('level_rs');
                    } else if (evolutionBeforePokemonMove2 !== null && evolutionBeforePokemonMove2.level_em.find((obj: any) => (obj.move == moves[i]) && (obj.level <= level))) {
                        movesCategory[i].push('level_rs');
                    } else if (pokemonMove.level_em.find((obj: any) => (obj.move == moves[i] && (obj.level > level)))) {
                        movesCategory[i].push('over_level_rs');
                    } else if (evolutionBeforePokemonMove1 !== null && evolutionBeforePokemonMove1.level_em.find((obj: any) => (obj.move == moves[i] && (obj.level > level)))) {
                        movesCategory[i].push('over_level_rs');
                    } else if (evolutionBeforePokemonMove2 !== null && evolutionBeforePokemonMove2.level_em.find((obj: any) => (obj.move == moves[i] && (obj.level > level)))) {
                        movesCategory[i].push('over_level_rs');
                    }
                }
            }

            // わざマシン
            if (pokemonMove.machine.find((obj: any) => obj.move == moves[i])) {
                movesCategory[i].push('machine');
            } else if (evolutionBeforePokemonMove1 !== null && evolutionBeforePokemonMove1.machine.find((obj: any) => obj.move == moves[i])) {
                movesCategory[i].push('machine');
            } else if (evolutionBeforePokemonMove2 !== null && evolutionBeforePokemonMove2.machine.find((obj: any) => obj.move == moves[i])) {
                movesCategory[i].push('machine');
            }

            // タマゴわざ
            if (pokemonMove.egg.find((obj: any) => obj.move == moves[i])) {
                if (pokemonDetail.dex === 183) {
                    movesCategory[i].push('egg_marill');
                } else {
                    movesCategory[i].push('egg');
                }
            } else if (evolutionBeforePokemonMove1 !== null && evolutionBeforePokemonMove1.egg.find((obj: any) => obj.move == moves[i])) {
                if (evolutionBeforePokemon1 !== null && evolutionBeforePokemon1.dex === 183) {
                    movesCategory[i].push('egg_marill');
                } else {
                    movesCategory[i].push('egg');
                }
            } else if (evolutionBeforePokemonMove2 !== null && evolutionBeforePokemonMove2.egg.find((obj: any) => obj.move == moves[i])) {
                if (evolutionBeforePokemon2 !== null && evolutionBeforePokemon2.dex === 183) {
                    movesCategory[i].push('egg_marill');
                } else {
                    movesCategory[i].push('egg');
                }
            }
            if ((startDate <= (new Date('2004-09-16')).getTime()) && ((new Date('2004-09-16')).getTime() <= endDate)) {
                if (pokemonDetail.dex === 172 && pokemonMove.egg_em.find((obj: any) => obj.move == moves[i])) {
                    movesCategory[i].push('egg_em');
                } else if (pokemonDetail.dex === 25 && evolutionBeforePokemonMove1 !== null && evolutionBeforePokemonMove1.egg_em.find((obj: any) => obj.move == moves[i])) {
                    movesCategory[i].push('egg_em');
                } else if (pokemonDetail.dex === 26 && evolutionBeforePokemonMove2 !== null && evolutionBeforePokemonMove2.egg_em.find((obj: any) => obj.move == moves[i])) {
                    movesCategory[i].push('egg_em');
                }
            }

            // 教えわざ
            if ((startDate <= (new Date('2004-01-29')).getTime()) && ((new Date('2004-01-29')).getTime() <= endDate)) {
                if (pokemonMove.tutor_frlg.find((obj: any) => obj.move == moves[i])) {
                    movesCategory[i].push('tutor_frlg');
                } else if (evolutionBeforePokemonMove1 !== null && evolutionBeforePokemonMove1.tutor_frlg.find((obj: any) => obj.move == moves[i])) {
                    movesCategory[i].push('tutor_frlg');
                } else if (evolutionBeforePokemonMove2 !== null && evolutionBeforePokemonMove2.tutor_frlg.find((obj: any) => obj.move == moves[i])) {
                    movesCategory[i].push('tutor_frlg');
                }
            }
            if ((startDate <= (new Date('2004-09-16')).getTime()) && ((new Date('2004-09-16')).getTime() <= endDate)) {
                if (pokemonMove.tutor_em.find((obj: any) => obj.move == moves[i])) {
                    movesCategory[i].push('tutor_em');
                } else if (evolutionBeforePokemonMove1 !== null && evolutionBeforePokemonMove1.tutor_em.find((obj: any) => obj.move == moves[i])) {
                    movesCategory[i].push('tutor_em');
                } else if (evolutionBeforePokemonMove2 !== null && evolutionBeforePokemonMove2.tutor_em.find((obj: any) => obj.move == moves[i])) {
                    movesCategory[i].push('tutor_em');
                }
            }
            if ((startDate <= (new Date('2005-08-04')).getTime()) && ((new Date('2005-08-04')).getTime() <= endDate)) {
                if (pokemonMove.tutor_xd.find((obj: any) => obj.move == moves[i])) {
                    movesCategory[i].push('tutor_xd');
                } else if (evolutionBeforePokemonMove1 !== null && evolutionBeforePokemonMove1.tutor_xd.find((obj: any) => obj.move == moves[i])) {
                    movesCategory[i].push('tutor_xd');
                } else if (evolutionBeforePokemonMove2 !== null && evolutionBeforePokemonMove2.tutor_xd.find((obj: any) => obj.move == moves[i])) {
                    movesCategory[i].push('tutor_xd');
                }
            }

            // リライブわざ
            if ((startDate <= (new Date('2005-08-04')).getTime()) && ((new Date('2005-08-04')).getTime() <= endDate)) {
                if (pokemonMove.special_xd.find((obj: any) => (obj.move == moves[i]) && (obj.level <= level))) {
                    movesCategory[i].push('special_xd');
                } else if (evolutionBeforePokemonMove1 !== null && evolutionBeforePokemonMove1.special_xd.find((obj: any) => (obj.move == moves[i]) && (obj.level <= level))) {
                    movesCategory[i].push('special_xd');
                } else if (evolutionBeforePokemonMove2 !== null && evolutionBeforePokemonMove2.special_xd.find((obj: any) => (obj.move == moves[i]) && (obj.level <= level))) {
                    movesCategory[i].push('special_xd');
                }
            }

            // 特別なわざ
            if (pokemonMove.special.find((obj: any) => (obj.move == moves[i]) && (startDate <= (new Date(obj.release_date)).getTime()) && ((new Date(obj.release_date)).getTime() <= endDate))) {
                movesCategory[i].push('special');
                specialMoveIds.push((pokemonMove.special.find((obj: any) => obj.move == moves[i])).id);
            } else if (evolutionBeforePokemonMove1 !== null && evolutionBeforePokemonMove1.special.find((obj: any) => (obj.move == moves[i]) && (startDate <= (new Date(obj.release_date)).getTime()) && ((new Date(obj.release_date)).getTime() <= endDate))) {
                movesCategory[i].push('special');
                specialMoveIds.push((evolutionBeforePokemonMove1.special.find((obj: any) => obj.move == moves[i])).id);
            } else if (evolutionBeforePokemonMove2 !== null && evolutionBeforePokemonMove2.special.find((obj: any) => (obj.move == moves[i]) && (startDate <= (new Date(obj.release_date)).getTime()) && ((new Date(obj.release_date)).getTime() <= endDate))) {
                movesCategory[i].push('special');
                specialMoveIds.push((evolutionBeforePokemonMove2.special.find((obj: any) => obj.move == moves[i])).id);
            }

            // ルリリ・マリル・マリルリ
            if (pokemonDetail.dex === 183 || pokemonDetail.dex === 184 || pokemonDetail.dex === 298) {
                let azurill = this.getPokemon(298);
                let azurillDate = (new Date(azurill.release_date)).getTime();
                let marill = this.getPokemon(183);
                let marillDate = (new Date(marill.release_date)).getTime();
                let azumarill = this.getPokemon(184);
                let azumarillDate = (new Date(azumarill.release_date)).getTime();
                if ((startDate <= azurillDate && azurillDate <= endDate) && (startDate <= marillDate && marillDate <= endDate) && (startDate <= azumarillDate && azumarillDate <= endDate)) {
                    let azurillMove = this.getPokemonMove(azurill.pokemon);
                    let marillMove = this.getPokemonMove(marill.pokemon);
                    let azumarillMove = this.getPokemonMove(azumarill.pokemon);
                    if (azurillMove.level_rs.find((obj: any) => obj.move == moves[i]) &&
                        !marillMove.level_rs.find((obj: any) => obj.move == moves[i]) &&
                        !azumarillMove.level_rs.find((obj: any) => obj.move == moves[i])
                    ) {
                        learnsetAzurillOnlyMove = true;
                    } else if ((startDate <= (new Date('2004-01-29')).getTime()) && ((new Date('2004-01-29')).getTime() <= endDate) &&
                        azurillMove.level_frlg.find((obj: any) => obj.move == moves[i]) &&
                        !marillMove.level_frlg.find((obj: any) => obj.move == moves[i]) &&
                        !azumarillMove.level_frlg.find((obj: any) => obj.move == moves[i])
                    ) {
                        learnsetAzurillOnlyMove = true;
                    } else if (azurillMove.egg.find((obj: any) => obj.move == moves[i]) &&
                        !marillMove.egg.find((obj: any) => obj.move == moves[i])
                    ) {
                        learnsetAzurillOnlyMove = true;
                    }
                }
            }

            // ヌケニン
            if (pokemonDetail.dex === 292) {
                let ninjask = this.getPokemon(291);
                let ninjaskDate = (new Date(ninjask.release_date)).getTime();
                if (startDate <= ninjaskDate && ninjaskDate <= endDate) {
                    let ninjaskMove = this.getPokemonMove(ninjask.pokemon);
                    if (ninjaskMove.level_rs.find((obj: any) => (obj.move == moves[i]) && (20 <= obj.level) && (obj.level <= level))) {
                        movesCategory[i].push('evolution');
                        evolutionMoveLevels.push((ninjaskMove.level_rs.find((obj: any) => (obj.move == moves[i]) && (20 <= obj.level) && (obj.level <= level))).level);
                    } else if ((startDate <= (new Date('2004-01-29')).getTime()) && ((new Date('2004-01-29')).getTime() <= endDate) && ninjaskMove.level_frlg.find((obj: any) => (obj.move == moves[i]) && (20 <= obj.level) && (obj.level <= level))) {
                        movesCategory[i].push('evolution');
                        evolutionMoveLevels.push((ninjaskMove.level_frlg.find((obj: any) => (obj.move == moves[i]) && (20 <= obj.level) && (obj.level <= level))).level);
                    }
                }
            }

            // ドーブル
            if ((pokemonDetail.dex === 235) && (moves[i] !== 'スケッチ')) {
                movesCategory[i].push('sketch');
            }

            if (movesCategory[i].length === 1) {
                if (movesCategory[i][0] === 'egg') {
                    learnsetEggMove = true;
                }
                if (movesCategory[i][0] === 'egg_em') {
                    learnsetEggMove = true;
                }
                if (movesCategory[i][0] === 'egg_marill') {
                    learnsetEggMove = true;
                }
                if (movesCategory[i][0] === 'special_xd') {
                    learnsetSpecialXDMove = true;
                }
                if (movesCategory[i][0] === 'special') {
                    learnsetSpecialMove = true;
                }
            }
        }

        for (let i in movesCategory) {
            if (movesCategory[i].length === 0) {
                result[i] = false;
                result[`${i}_text`] = "取得不能なわざです";
            } else if (movesCategory[i].includes('empty')) {
                result[i] = true;
                result[`${i}_text`] = "";
            } else if (movesCategory[i].includes('level_rs')) {
                result[i] = true;
                result[`${i}_text`] = "取得可能";
            } else if (movesCategory[i].includes('level_frlg')) {
                result[i] = true;
                result[`${i}_text`] = "取得可能";
            } else if (movesCategory[i].includes('machine')) {
                result[i] = true;
                result[`${i}_text`] = "取得可能";
            } else if (movesCategory[i].includes('tutor_frlg')) {
                result[i] = true;
                result[`${i}_text`] = "取得可能";
            } else if (movesCategory[i].includes('tutor_em')) {
                result[i] = true;
                result[`${i}_text`] = "取得可能";
            } else if (movesCategory[i].includes('tutor_xd')) {
                result[i] = true;
                result[`${i}_text`] = "取得可能";
            } else if (movesCategory[i].includes('over_level_rs')) {
                if (wildEncounter) {
                    result[i] = false;
                    result[`${i}_text`] = "野生で入手したポケモンのため取得不能なわざです";
                } else if (pokemonDetail.dex === 30 || pokemonDetail.dex === 31) {
                    if (evolutionBeforePokemon1 !== null && evolutionBeforePokemon1.evolution_before === null && evolutionBeforePokemonMove1 !== null && evolutionBeforePokemonMove1.level_rs.find((obj: any) => obj.move == moves[i])) {
                        eggMoves[i] = moves[i];
                    } else if (evolutionBeforePokemon2 !== null && evolutionBeforePokemon2.evolution_before === null && evolutionBeforePokemonMove2 !== null && evolutionBeforePokemonMove2.level_rs.find((obj: any) => obj.move == moves[i])) {
                        eggMoves[i] = moves[i];
                    } else {
                        result[i] = false;
                        result[`${i}_text`] = "オーバーレベルのため取得不能なわざです";
                    }
                } else if (pokemonDetail.dex === 32 || pokemonDetail.dex === 33 || pokemonDetail.dex === 34) {
                    let nidoranFe = this.getPokemon(29);
                    let nidoranFeDate = (new Date(nidoranFe.release_date)).getTime();
                    if (startDate <= nidoranFeDate && nidoranFeDate <= endDate) {
                        let nidoranFeMove = this.getPokemonMove(nidoranFe.pokemon);
                        if (nidoranFeMove.level_rs.find((obj: any) => obj.move == moves[i])) {
                            result[i] = true;
                            result[`${i}_text`] = "取得可能";
                        } else if ((startDate <= (new Date('2004-01-29')).getTime()) && ((new Date('2004-01-29')).getTime() <= endDate) && nidoranFeMove.level_frlg.find((obj: any) => obj.move == moves[i])) {
                            result[i] = true;
                            result[`${i}_text`] = "取得可能";
                        } else {
                            result[i] = false;
                            result[`${i}_text`] = "オーバーレベルのため取得不能なわざです";
                        }
                    } else {
                        result[i] = false;
                        result[`${i}_text`] = "オーバーレベルのため取得不能なわざです";
                    }
                } else if (pokemonDetail.dex === 183 || pokemonDetail.dex === 184) {
                    if (learnsetAzurillOnlyMove) {
                        let azurill = this.getPokemon(298);
                        let azurillDate = (new Date(azurill.release_date)).getTime();
                        if (startDate <= azurillDate && azurillDate <= endDate) {
                            let azurillMove = this.getPokemonMove(azurill.pokemon);
                            if (azurillMove.level_rs.find((obj: any) => obj.move == moves[i])) {
                                result[i] = true;
                                result[`${i}_text`] = "取得可能";
                            } else if ((startDate <= (new Date('2004-01-29')).getTime()) && ((new Date('2004-01-29')).getTime() <= endDate) && azurillMove.level_frlg.find((obj: any) => obj.move == moves[i])) {
                                result[i] = true;
                                result[`${i}_text`] = "取得可能";
                            } else {
                                result[i] = false;
                                result[`${i}_text`] = "オーバーレベルのため取得不能なわざです";
                            }
                        } else {
                            result[i] = false;
                            result[`${i}_text`] = "オーバーレベルのため取得不能なわざです";
                        }
                    } else {
                        result[i] = true;
                        result[`${i}_text`] = "取得可能";
                    }
                } else if (pokemonDetail.dex === 292) {
                    let nincada = this.getPokemon(290);
                    let nincadaDate = (new Date(nincada.release_date)).getTime();
                    if (startDate <= nincadaDate && nincadaDate <= endDate) {
                        let nincadaMove = this.getPokemonMove(nincada.pokemon);
                        if (nincadaMove.level_rs.find((obj: any) => obj.move == moves[i])) {
                            result[i] = true;
                            result[`${i}_text`] = "取得可能";
                        } else if ((startDate <= (new Date('2004-01-29')).getTime()) && ((new Date('2004-01-29')).getTime() <= endDate) && nincadaMove.level_frlg.find((obj: any) => obj.move == moves[i])) {
                            result[i] = true;
                            result[`${i}_text`] = "取得可能";
                        } else {
                            result[i] = false;
                            result[`${i}_text`] = "オーバーレベルのため取得不能なわざです";
                        }
                    } else {
                        result[i] = false;
                        result[`${i}_text`] = "オーバーレベルのため取得不能なわざです";
                    }
                } else if (pokemonDetail.dex === 313) {
                    let illumise = this.getPokemon(314);
                    let illumiseDate = (new Date(illumise.release_date)).getTime();
                    if (startDate <= illumiseDate && illumiseDate <= endDate) {
                        let illumiseMove = this.getPokemonMove(illumise.pokemon);
                        if (illumiseMove.level_rs.find((obj: any) => obj.move == moves[i])) {
                            result[i] = true;
                            result[`${i}_text`] = "取得可能";
                        } else if ((startDate <= (new Date('2004-01-29')).getTime()) && ((new Date('2004-01-29')).getTime() <= endDate) && illumiseMove.level_frlg.find((obj: any) => obj.move == moves[i])) {
                            result[i] = true;
                            result[`${i}_text`] = "取得可能";
                        } else {
                            result[i] = false;
                            result[`${i}_text`] = "オーバーレベルのため取得不能なわざです";
                        }
                    } else {
                        result[i] = false;
                        result[`${i}_text`] = "オーバーレベルのため取得不能なわざです";
                    }
                } else if ((pokemonDetail.egg_group_1 === '未発見' || pokemonDetail.egg_group_2 === '未発見') && pokemonDetail.evolution_after === null) {
                    result[i] = false;
                    result[`${i}_text`] = "オーバーレベルのため取得不能なわざです";
                } else if (pokemonDetail.female === 0) {
                    result[i] = false;
                    result[`${i}_text`] = "オーバーレベルのため取得不能なわざです";
                } else if (pokemonDetail.male !== 0 && pokemonDetail.female !== 0) {
                    if (learnsetSpecialXDMove) {
                        result[i] = false;
                        result[`${i}_text`] = "リライブわざと同時に取得不能なわざです";
                    } else if (learnsetSpecialMove) {
                        result[i] = false;
                        result[`${i}_text`] = "特別なわざと同時に取得不能なわざです";
                    } else if (pokemonDetail.evolution_before === null && pokemonMove.level_rs.find((obj: any) => obj.move == moves[i])) {
                        result[i] = true;
                        result[`${i}_text`] = "取得可能";
                    } else if (evolutionBeforePokemon1 !== null && evolutionBeforePokemon1.evolution_before === null && evolutionBeforePokemonMove1 !== null && evolutionBeforePokemonMove1.level_rs.find((obj: any) => obj.move == moves[i])) {
                        result[i] = true;
                        result[`${i}_text`] = "取得可能";
                    } else if (evolutionBeforePokemon2 !== null && evolutionBeforePokemon2.evolution_before === null && evolutionBeforePokemonMove2 !== null && evolutionBeforePokemonMove2.level_rs.find((obj: any) => obj.move == moves[i])) {
                        result[i] = true;
                        result[`${i}_text`] = "取得可能";
                    } else {
                        result[i] = false;
                        result[`${i}_text`] = "オーバーレベルのため取得不能なわざです";
                    }
                } else {
                    eggMoves[i] = moves[i];
                }
            } else if (movesCategory[i].includes('over_level_frlg')) {
                if (wildEncounter) {
                    result[i] = false;
                    result[`${i}_text`] = "野生で入手したポケモンのため取得不能なわざです";
                } else if (pokemonDetail.dex === 30 || pokemonDetail.dex === 31) {
                    if (evolutionBeforePokemon1 !== null && evolutionBeforePokemon1.evolution_before === null && evolutionBeforePokemonMove1 !== null && evolutionBeforePokemonMove1.level_rs.find((obj: any) => obj.move == moves[i])) {
                        eggMoves[i] = moves[i];
                    } else if (evolutionBeforePokemon2 !== null && evolutionBeforePokemon2.evolution_before === null && evolutionBeforePokemonMove2 !== null && evolutionBeforePokemonMove2.level_rs.find((obj: any) => obj.move == moves[i])) {
                        eggMoves[i] = moves[i];
                    } else {
                        result[i] = false;
                        result[`${i}_text`] = "オーバーレベルのため取得不能なわざです";
                    }
                } else if (pokemonDetail.dex === 32 || pokemonDetail.dex === 33 || pokemonDetail.dex === 34) {
                    let nidoranFe = this.getPokemon(29);
                    let nidoranFeDate = (new Date(nidoranFe.release_date)).getTime();
                    if (startDate <= nidoranFeDate && nidoranFeDate <= endDate) {
                        let nidoranFeMove = this.getPokemonMove(nidoranFe.pokemon);
                        if (nidoranFeMove.level_rs.find((obj: any) => obj.move == moves[i])) {
                            result[i] = true;
                            result[`${i}_text`] = "取得可能";
                        } else if ((startDate <= (new Date('2004-01-29')).getTime()) && ((new Date('2004-01-29')).getTime() <= endDate) && nidoranFeMove.level_frlg.find((obj: any) => obj.move == moves[i])) {
                            result[i] = true;
                            result[`${i}_text`] = "取得可能";
                        } else {
                            result[i] = false;
                            result[`${i}_text`] = "オーバーレベルのため取得不能なわざです";
                        }
                    } else {
                        result[i] = false;
                        result[`${i}_text`] = "オーバーレベルのため取得不能なわざです";
                    }
                } else if (pokemonDetail.dex === 183 || pokemonDetail.dex === 184) {
                    if (learnsetAzurillOnlyMove) {
                        let azurill = this.getPokemon(298);
                        let azurillDate = (new Date(azurill.release_date)).getTime();
                        if (startDate <= azurillDate && azurillDate <= endDate) {
                            let azurillMove = this.getPokemonMove(azurill.pokemon);
                            if (azurillMove.level_rs.find((obj: any) => obj.move == moves[i])) {
                                result[i] = true;
                                result[`${i}_text`] = "取得可能";
                            } else if ((startDate <= (new Date('2004-01-29')).getTime()) && ((new Date('2004-01-29')).getTime() <= endDate) && azurillMove.level_frlg.find((obj: any) => obj.move == moves[i])) {
                                result[i] = true;
                                result[`${i}_text`] = "取得可能";
                            } else {
                                result[i] = false;
                                result[`${i}_text`] = "オーバーレベルのため取得不能なわざです";
                            }
                        } else {
                            result[i] = false;
                            result[`${i}_text`] = "オーバーレベルのため取得不能なわざです";
                        }
                    } else {
                        result[i] = true;
                        result[`${i}_text`] = "取得可能";
                    }
                } else if (pokemonDetail.dex === 292) {
                    let nincada = this.getPokemon(290);
                    let nincadaDate = (new Date(nincada.release_date)).getTime();
                    if (startDate <= nincadaDate && nincadaDate <= endDate) {
                        let nincadaMove = this.getPokemonMove(nincada.pokemon);
                        if (nincadaMove.level_rs.find((obj: any) => obj.move == moves[i])) {
                            result[i] = true;
                            result[`${i}_text`] = "取得可能";
                        } else if ((startDate <= (new Date('2004-01-29')).getTime()) && ((new Date('2004-01-29')).getTime() <= endDate) && nincadaMove.level_frlg.find((obj: any) => obj.move == moves[i])) {
                            result[i] = true;
                            result[`${i}_text`] = "取得可能";
                        } else {
                            result[i] = false;
                            result[`${i}_text`] = "オーバーレベルのため取得不能なわざです";
                        }
                    } else {
                        result[i] = false;
                        result[`${i}_text`] = "オーバーレベルのため取得不能なわざです";
                    }
                } else if (pokemonDetail.dex === 313) {
                    let illumise = this.getPokemon(314);
                    let illumiseDate = (new Date(illumise.release_date)).getTime();
                    if (startDate <= illumiseDate && illumiseDate <= endDate) {
                        let illumiseMove = this.getPokemonMove(illumise.pokemon);
                        if (illumiseMove.level_rs.find((obj: any) => obj.move == moves[i])) {
                            result[i] = true;
                            result[`${i}_text`] = "取得可能";
                        } else if ((startDate <= (new Date('2004-01-29')).getTime()) && ((new Date('2004-01-29')).getTime() <= endDate) && illumiseMove.level_frlg.find((obj: any) => obj.move == moves[i])) {
                            result[i] = true;
                            result[`${i}_text`] = "取得可能";
                        } else {
                            result[i] = false;
                            result[`${i}_text`] = "オーバーレベルのため取得不能なわざです";
                        }
                    } else {
                        result[i] = false;
                        result[`${i}_text`] = "オーバーレベルのため取得不能なわざです";
                    }
                } else if ((pokemonDetail.egg_group_1 === '未発見' || pokemonDetail.egg_group_2 === '未発見') && pokemonDetail.evolution_after === null) {
                    result[i] = false;
                    result[`${i}_text`] = "オーバーレベルのため取得不能なわざです";
                } else if (pokemonDetail.female === 0) {
                    result[i] = false;
                    result[`${i}_text`] = "オーバーレベルのため取得不能なわざです";
                } else if (pokemonDetail.male !== 0 && pokemonDetail.female !== 0) {
                    if (learnsetSpecialXDMove) {
                        result[i] = false;
                        result[`${i}_text`] = "リライブわざと同時に取得不能なわざです";
                    } else if (learnsetSpecialMove) {
                        result[i] = false;
                        result[`${i}_text`] = "特別なわざと同時に取得不能なわざです";
                    } else if (pokemonDetail.evolution_before === null && pokemonMove.level_frlg.find((obj: any) => obj.move == moves[i])) {
                        result[i] = true;
                        result[`${i}_text`] = "取得可能";
                    } else if (evolutionBeforePokemon1 !== null && evolutionBeforePokemon1.evolution_before === null && evolutionBeforePokemonMove1 !== null && evolutionBeforePokemonMove1.level_frlg.find((obj: any) => obj.move == moves[i])) {
                        result[i] = true;
                        result[`${i}_text`] = "取得可能";
                    } else if (evolutionBeforePokemon2 !== null && evolutionBeforePokemon2.evolution_before === null && evolutionBeforePokemonMove2 !== null && evolutionBeforePokemonMove2.level_frlg.find((obj: any) => obj.move == moves[i])) {
                        result[i] = true;
                        result[`${i}_text`] = "取得可能";
                    } else {
                        result[i] = false;
                        result[`${i}_text`] = "オーバーレベルのため取得不能なわざです";
                    }
                } else {
                    eggMoves[i] = moves[i];
                }
            } else if (movesCategory[i].includes('egg')) {
                if (wildEncounter) {
                    result[i] = false;
                    result[`${i}_text`] = "野生で入手したポケモンのため取得不能なわざです";
                } else if (learnsetSpecialXDMove) {
                    result[i] = false;
                    result[`${i}_text`] = "リライブわざと同時に取得不能なわざです";
                } else if (learnsetSpecialMove) {
                    result[i] = false;
                    result[`${i}_text`] = "特別なわざと同時に取得不能なわざです";
                } else {
                    eggMoves[i] = moves[i];
                }
            } else if (movesCategory[i].includes('egg_em')) {
                if (wildEncounter) {
                    result[i] = false;
                    result[`${i}_text`] = "野生で入手したポケモンのため取得不能なわざです";
                } else if (learnsetSpecialXDMove) {
                    result[i] = false;
                    result[`${i}_text`] = "リライブわざと同時に取得不能なわざです";
                } else if (learnsetSpecialMove) {
                    result[i] = false;
                    result[`${i}_text`] = "特別なわざと同時に取得不能なわざです";
                } else {
                    result[i] = true;
                    result[`${i}_text`] = "取得可能";
                }
            } else if (movesCategory[i].includes('egg_marill')) {
                if (wildEncounter) {
                    result[i] = false;
                    result[`${i}_text`] = "野生で入手したポケモンのため取得不能なわざです";
                } else if (learnsetAzurillOnlyMove) {
                    result[i] = false;
                    result[`${i}_text`] = "ルリリでしか取得できないわざと同時に取得不能なわざです";
                } else if (learnsetSpecialXDMove) {
                    result[i] = false;
                    result[`${i}_text`] = "リライブわざと同時に取得不能なわざです";
                } else if (learnsetSpecialMove) {
                    result[i] = false;
                    result[`${i}_text`] = "特別なわざと同時に取得不能なわざです";
                } else {
                    result[i] = true;
                    result[`${i}_text`] = "取得可能";
                }
            } else if (movesCategory[i].includes('special_xd')) {
                if (wildEncounter) {
                    result[i] = false;
                    result[`${i}_text`] = "野生で入手したポケモンのため取得不能なわざです";
                } else if (learnsetEggMove) {
                    result[i] = false;
                    result[`${i}_text`] = "タマゴわざと同時に取得不能なわざです";
                } else if (learnsetSpecialMove) {
                    result[i] = false;
                    result[`${i}_text`] = "リライブわざと同時に取得不能なわざです";
                } else {
                    result[i] = true;
                    result[`${i}_text`] = "取得可能";
                }
            } else if (movesCategory[i].includes('special')) {
                if (wildEncounter) {
                    result[i] = false;
                    result[`${i}_text`] = "野生で入手したポケモンのため取得不能なわざです";
                } else if (learnsetEggMove) {
                    result[i] = false;
                    result[`${i}_text`] = "タマゴわざと同時に取得不能なわざです";
                } else if (learnsetSpecialXDMove) {
                    result[i] = false;
                    result[`${i}_text`] = "リライブわざと同時に取得不能なわざです";
                } else if (Array.from(new Set(specialMoveIds)).length !== 1) {
                    result[i] = false;
                    result[`${i}_text`] = "他の特別なわざと同時に取得不能なわざです";
                } else {
                    result[i] = true;
                    result[`${i}_text`] = "取得可能";
                }
            } else if (movesCategory[i].includes('evolution')) {
                if (Array.from(new Set(evolutionMoveLevels)).length !== 1) {
                    result[i] = false;
                    result[`${i}_text`] = "他の進化わざと同時に取得不能なわざです";
                } else {
                    result[i] = true;
                    result[`${i}_text`] = "取得可能";
                }
            } else if (movesCategory[i].includes('sketch')) {
                if (this.checkSketchLegal(moves[i], startDate, endDate)) {
                    result[i] = true;
                    result[`${i}_text`] = "取得可能";
                } else {
                    result[i] = false;
                    result[`${i}_text`] = "取得不能なわざです";
                }
            } else {
            }
        }

        // タマゴわざの同時遺伝チェック
        let checkEggMoves = false;
        for (let i in eggMoves) {
            if ((eggMoves[i] !== null)) {
                checkEggMoves = true;
            }
        }

        if (checkEggMoves) {
            let smeargle = this.getPokemon(235);
            let smeargleDate = (new Date(smeargle.release_date)).getTime();
            if (((startDate <= smeargleDate) && (smeargleDate <= endDate)) && (pokemonDetail.egg_group_1 === '陸上' || pokemonDetail.egg_group_2 === '陸上' || pokemonDetail.dex === 30 || pokemonDetail.dex === 31) && (pokemonDetail.female !== 0 || pokemonDetail.dex === 32 || pokemonDetail.dex === 33 || pokemonDetail.dex === 34)) {
                for (let i in eggMoves) {
                    if ((eggMoves[i] === null)) {
                        continue;
                    }
                    if (this.checkSketchLegal(eggMoves[i], startDate, endDate)) {
                        result[i] = true;
                        result[`${i}_text`] = "取得可能";
                    } else {
                        result[i] = false;
                        result[`${i}_text`] = "遺伝経路のない取得不能なわざです";
                    }
                }
            } else {
                if (this.searchEggMoves(pokemonDetail, eggMoves, startDate, endDate, [pokemonDetail.evolution_base])) {
                    for (let i in eggMoves) {
                        if ((eggMoves[i] === null)) {
                            continue;
                        }
                        result[i] = true;
                        result[`${i}_text`] = "取得可能";
                    }
                } else {
                    for (let i in eggMoves) {
                        if ((eggMoves[i] === null)) {
                            continue;
                        }
                        result[i] = false;
                        result[`${i}_text`] = "遺伝経路のない取得不能なわざです";
                    }
                }
            }
        }

        return result;
    }

    checkSketchLegal(move: string, startDate: any, endDate: any) {
        let pokemon = this.pokemon.filter((obj: any) => ((obj.id <= 386) && startDate <= (new Date(obj.release_date)).getTime()) && ((new Date(obj.release_date)).getTime() <= endDate));
        for (let i in pokemon) {
            let pokemonMove = this.getPokemonMove(pokemon[i].pokemon);
            if (pokemonMove.level_rs.find((obj: any) => obj.move == move)) {
                return true;
            }
            if (pokemonMove.machine.find((obj: any) => obj.move == move)) {
                return true;
            }
            if ((startDate <= (new Date('2004-01-29')).getTime()) && ((new Date('2004-01-29')).getTime() <= endDate)) {
                if (pokemon[i].dex === 386) {
                    if (pokemonMove.level_fr.find((obj: any) => obj.move == move)) {
                        return true;
                    }
                    if (pokemonMove.level_lg.find((obj: any) => obj.move == move)) {
                        return true;
                    }
                } else {
                    if (pokemonMove.level_frlg.find((obj: any) => obj.move == move)) {
                        return true;
                    }
                }
                if (pokemonMove.tutor_frlg.find((obj: any) => obj.move == move)) {
                    return true;
                }
            }
            if ((startDate <= (new Date('2004-09-16')).getTime()) && ((new Date('2004-09-16')).getTime() <= endDate)) {
                if (pokemon[i].dex === 386) {
                    if (pokemonMove.level_em.find((obj: any) => obj.move == move)) {
                        return true;
                    }
                }
                if (pokemon[i].dex === 172) {
                    if (pokemonMove.egg_em.find((obj: any) => obj.move == move)) {
                        return true;
                    }
                }
                if (pokemonMove.tutor_em.find((obj: any) => obj.move == move)) {
                    return true;
                }
            }
            if ((startDate <= (new Date('2005-08-04')).getTime()) && ((new Date('2005-08-04')).getTime() <= endDate)) {
                if (pokemonMove.tutor_xd.find((obj: any) => obj.move == move)) {
                    return true;
                }
                if (pokemonMove.special_xd.find((obj: any) => obj.move == move)) {
                    return true;
                }
            }
            if (pokemonMove.special.find((obj: any) => (obj.move == move) && (startDate <= (new Date(obj.release_date)).getTime()) && ((new Date(obj.release_date)).getTime() <= endDate))) {
                return true;
            }
        }
        return false;
    }

    searchEggMoves(pokemonDetail: any, eggMoves: any, startDate: any, endDate: any, evolutionBase: any) {
        if (pokemonDetail.dex === 30 || pokemonDetail.dex === 31) {
            pokemonDetail.egg_group_1 = '怪獣';
            pokemonDetail.egg_group_2 = '陸上';
        }
        if (pokemonDetail.dex === 292) {
            pokemonDetail.egg_group_1 = '虫';
            pokemonDetail.egg_group_2 = '虫';
        }
        if ((pokemonDetail.egg_group_1 === '未発見' || pokemonDetail.egg_group_2 === '未発見') && pokemonDetail.evolution_after !== null) {
            let evolutionAfterPokemon: any;
            if (Array.isArray(pokemonDetail.evolution_after)) {
                evolutionAfterPokemon = this.getPokemonForName(pokemonDetail.evolution_after[0]);
            } else {
                evolutionAfterPokemon = this.getPokemonForName(pokemonDetail.evolution_after);
            }
            pokemonDetail.egg_group_1 = evolutionAfterPokemon.egg_group_1;
            pokemonDetail.egg_group_2 = evolutionAfterPokemon.egg_group_2;
        }
        let pokemonSearchList = this.pokemon.filter((obj: any) => (
            (obj.id <= 386) &&
            (startDate <= (new Date(obj.release_date)).getTime()) && ((new Date(obj.release_date)).getTime() <= endDate) &&
            (obj.egg_group_1 === pokemonDetail.egg_group_1 || obj.egg_group_1 === pokemonDetail.egg_group_2 || obj.egg_group_2 === pokemonDetail.egg_group_1 || obj.egg_group_2 === pokemonDetail.egg_group_2) &&
            (obj.male !== 0)
        ));
        for (let i in pokemonSearchList) {
            let eggMoveSearchList = this.getPokemonMove(pokemonSearchList[i].pokemon);
            let evolutionBeforeSearchPokemon1 = null;
            let evolutionBeforeSearchPokemonMove1 = null;
            let evolutionBeforeSearchPokemon2 = null;
            let evolutionBeforeSearchPokemonMove2 = null;
            if (pokemonSearchList[i].evolution_before !== null) {
                evolutionBeforeSearchPokemon1 = this.getPokemonForName(pokemonSearchList[i].evolution_before);
                if ((startDate <= (new Date(evolutionBeforeSearchPokemon1.release_date)).getTime()) && ((new Date(evolutionBeforeSearchPokemon1.release_date)).getTime() <= endDate)) {
                    evolutionBeforeSearchPokemonMove1 = this.getPokemonMove(pokemonSearchList[i].evolution_before);
                }
            }
            if (evolutionBeforeSearchPokemon1 !== null && evolutionBeforeSearchPokemon1.evolution_before !== null) {
                evolutionBeforeSearchPokemon2 = this.getPokemonForName(evolutionBeforeSearchPokemon1.evolution_before);
                if ((startDate <= (new Date(evolutionBeforeSearchPokemon2.release_date)).getTime()) && ((new Date(evolutionBeforeSearchPokemon2.release_date)).getTime() <= endDate)) {
                    evolutionBeforeSearchPokemonMove2 = this.getPokemonMove(evolutionBeforeSearchPokemon1.evolution_before);
                }
            }
            let legal = false;
            for (let j in eggMoves) {
                if (eggMoves[j] === null) {
                    continue;
                }
                if (eggMoveSearchList.level_rs.find((obj: any) => obj.move == eggMoves[j])) {
                    legal = true;
                    continue;
                }
                if (evolutionBeforeSearchPokemonMove1 !== null && evolutionBeforeSearchPokemonMove1.level_rs.find((obj: any) => obj.move == eggMoves[j])) {
                    legal = true;
                    continue;
                }
                if (evolutionBeforeSearchPokemonMove2 !== null && evolutionBeforeSearchPokemonMove2.level_rs.find((obj: any) => obj.move == eggMoves[j])) {
                    legal = true;
                    continue;
                }
                if (eggMoveSearchList.machine.find((obj: any) => obj.move == eggMoves[j])) {
                    legal = true;
                    continue;
                }
                if (evolutionBeforeSearchPokemonMove1 !== null && evolutionBeforeSearchPokemonMove1.machine.find((obj: any) => obj.move == eggMoves[j])) {
                    legal = true;
                    continue;
                }
                if (evolutionBeforeSearchPokemonMove2 !== null && evolutionBeforeSearchPokemonMove2.machine.find((obj: any) => obj.move == eggMoves[j])) {
                    legal = true;
                    continue;
                }
                if ((startDate <= (new Date('2004-01-29')).getTime()) && ((new Date('2004-01-29')).getTime() <= endDate)) {
                    if (eggMoveSearchList.level_frlg.find((obj: any) => obj.move == eggMoves[j])) {
                        legal = true;
                        continue;
                    }
                    if (evolutionBeforeSearchPokemonMove1 !== null && evolutionBeforeSearchPokemonMove1.level_frlg.find((obj: any) => obj.move == eggMoves[j])) {
                        legal = true;
                        continue;
                    }
                    if (evolutionBeforeSearchPokemonMove2 !== null && evolutionBeforeSearchPokemonMove2.level_frlg.find((obj: any) => obj.move == eggMoves[j])) {
                        legal = true;
                        continue;
                    }
                    if (eggMoveSearchList.tutor_frlg.find((obj: any) => obj.move == eggMoves[j])) {
                        legal = true;
                        continue;
                    }
                    if (evolutionBeforeSearchPokemonMove1 !== null && evolutionBeforeSearchPokemonMove1.tutor_frlg.find((obj: any) => obj.move == eggMoves[j])) {
                        legal = true;
                        continue;
                    }
                    if (evolutionBeforeSearchPokemonMove2 !== null && evolutionBeforeSearchPokemonMove2.tutor_frlg.find((obj: any) => obj.move == eggMoves[j])) {
                        legal = true;
                        continue;
                    }
                }
                if ((startDate <= (new Date('2004-09-16')).getTime()) && ((new Date('2004-09-16')).getTime() <= endDate)) {
                    if (eggMoveSearchList.tutor_em.find((obj: any) => obj.move == eggMoves[j])) {
                        legal = true;
                        continue;
                    }
                    if (evolutionBeforeSearchPokemonMove1 !== null && evolutionBeforeSearchPokemonMove1.tutor_em.find((obj: any) => obj.move == eggMoves[j])) {
                        legal = true;
                        continue;
                    }
                    if (evolutionBeforeSearchPokemonMove2 !== null && evolutionBeforeSearchPokemonMove2.tutor_em.find((obj: any) => obj.move == eggMoves[j])) {
                        legal = true;
                        continue;
                    }
                }
                if ((startDate <= (new Date('2005-08-04')).getTime()) && ((new Date('2005-08-04')).getTime() <= endDate)) {
                    if (eggMoveSearchList.tutor_xd.find((obj: any) => obj.move == eggMoves[j])) {
                        legal = true;
                        continue;
                    }
                    if (evolutionBeforeSearchPokemonMove1 !== null && evolutionBeforeSearchPokemonMove1.tutor_xd.find((obj: any) => obj.move == eggMoves[j])) {
                        legal = true;
                        continue;
                    }
                    if (evolutionBeforeSearchPokemonMove2 !== null && evolutionBeforeSearchPokemonMove2.tutor_xd.find((obj: any) => obj.move == eggMoves[j])) {
                        legal = true;
                        continue;
                    }
                    if (eggMoveSearchList.special_xd.find((obj: any) => obj.move == eggMoves[j])) {
                        legal = true;
                        continue;
                    }
                    if (evolutionBeforeSearchPokemonMove1 !== null && evolutionBeforeSearchPokemonMove1.special_xd.find((obj: any) => obj.move == eggMoves[j])) {
                        legal = true;
                        continue;
                    }
                    if (evolutionBeforeSearchPokemonMove2 !== null && evolutionBeforeSearchPokemonMove2.special_xd.find((obj: any) => obj.move == eggMoves[j])) {
                        legal = true;
                        continue;
                    }
                }
                if (eggMoveSearchList.special.find((obj: any) => (obj.move == eggMoves[j]) && (startDate <= (new Date(obj.release_date)).getTime()) && ((new Date(obj.release_date)).getTime() <= endDate))) {
                    legal = true;
                    continue;
                }
                if (evolutionBeforeSearchPokemonMove1 !== null && evolutionBeforeSearchPokemonMove1.special.find((obj: any) => (obj.move == eggMoves[j]) && (startDate <= (new Date(obj.release_date)).getTime()) && ((new Date(obj.release_date)).getTime() <= endDate))) {
                    legal = true;
                    continue;
                }
                if (evolutionBeforeSearchPokemonMove2 !== null && evolutionBeforeSearchPokemonMove2.special.find((obj: any) => (obj.move == eggMoves[j]) && (startDate <= (new Date(obj.release_date)).getTime()) && ((new Date(obj.release_date)).getTime() <= endDate))) {
                    legal = true;
                    continue;
                }
                if (!(evolutionBase.find((obj: any) => obj === pokemonSearchList[i].evolution_base)) &&
                    eggMoveSearchList.egg.find((obj: any) => obj.move == eggMoves[j])
                ) {
                    evolutionBase.push(pokemonSearchList[i].evolution_base);
                    if (this.searchEggMoves(pokemonSearchList[i], [eggMoves[j]], startDate, endDate, evolutionBase)) {
                        legal = true;
                        continue;
                    }
                }
                if ((evolutionBeforeSearchPokemon1 !== null && !(evolutionBase.find((obj: any) => obj === evolutionBeforeSearchPokemon1.evolution_base))) &&
                    evolutionBeforeSearchPokemonMove1 !== null && evolutionBeforeSearchPokemonMove1.egg.find((obj: any) => obj.move == eggMoves[j])
                ) {
                    evolutionBase.push(evolutionBeforeSearchPokemon1.evolution_base);
                    if (this.searchEggMoves(evolutionBeforeSearchPokemon1, [eggMoves[j]], startDate, endDate, evolutionBase)) {
                        legal = true;
                        continue;
                    }
                }
                if ((evolutionBeforeSearchPokemon2 !== null && !(evolutionBase.find((obj: any) => obj === evolutionBeforeSearchPokemon2.evolution_base))) &&
                    evolutionBeforeSearchPokemonMove2 !== null && evolutionBeforeSearchPokemonMove2.egg.find((obj: any) => obj.move == eggMoves[j])
                ) {
                    evolutionBase.push(evolutionBeforeSearchPokemon2.evolution_base);
                    if (this.searchEggMoves(evolutionBeforeSearchPokemon2, [eggMoves[j]], startDate, endDate, evolutionBase)) {
                        legal = true;
                        continue;
                    }
                }

                legal = false;
                break;
            }
            if (legal) {
                return true;
            }
        }

        return false;
    }
}