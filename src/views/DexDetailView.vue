<script setup>
import Error from "@/components/Error.vue";
import {ref} from "vue";
import {useRoute} from "vue-router";
import pokemon from "@/classes/pokemon.js"

const route = useRoute();
const pkClass = new pokemon();

let param = route.params;

let pokemonDetail = pkClass.getPokemon(Number(param.id));
let pokemonDetailPre = pkClass.getPokemon(Number(param.id) - 1);
let pokemonDetailNext = pkClass.getPokemon(Number(param.id) + 1);
let pokemonMove = pkClass.getPokemonMove(pokemonDetail.pokemon);

const getImage = (dex) => {
  return '/image/pokemon/icon/' + String(dex).padStart(3, '0') + '.png'
}
const getLowKickPower = (weight) => {
  return pkClass.getLowKickPower(weight);
}
</script>

<template>
  <div class="content-area" v-if="pokemonDetail">
    <v-card class="mb-4" title="ポケモン図鑑">
      <v-card-text>
        <div class="dex-pager-area">
          <div class="pre-dex">
            <div class="image-area" v-if="pokemonDetail.dex > 1">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#26a69a">
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
              </svg>
              <img v-bind:src="getImage(pokemonDetailPre.dex)" width="32px" height="32px">
            </div>
            <router-link v-if="pokemonDetail.dex > 1" v-bind:to="'/dex-detail/' + pokemonDetailPre.dex">{{ pokemonDetailPre.pokemon }}</router-link>
            <div class="image-area" v-if="pokemonDetail.dex === 1">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#26a69a">
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
              </svg>
              <img v-bind:src="getImage(386)" width="32px" height="32px">
            </div>
            <router-link v-if="pokemonDetail.dex === 1" v-bind:to="'/dex-detail/386'">デオキシス</router-link>
          </div>
          <div class="next-dex">
            <div class="image-area" v-if="pokemonDetail.dex < 386">
              <img v-bind:src="getImage(pokemonDetailNext.dex)" width="32px" height="32px">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#26a69a">
                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
              </svg>
            </div>
            <router-link v-if="pokemonDetail.dex < 386" v-bind:to="'/dex-detail/' + pokemonDetailNext.dex">{{ pokemonDetailNext.pokemon }}</router-link>
            <div class="image-area" v-if="pokemonDetail.dex === 386">
              <img v-bind:src="getImage(1)" width="32px" height="32px">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#26a69a">
                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
              </svg>
            </div>
            <router-link v-if="pokemonDetail.dex === 386" v-bind:to="'/dex-detail/1'">フシギダネ</router-link>
          </div>
        </div>
        <div class="dex-detail-area">
          <div class="left-dex-detail-area">
            <div class="base-data-area">
              <table>
                <thead>
                <tr>
                  <th class="text-center"><span class="text-no-wrap">#{{ String(pokemonDetail.dex).padStart(3, '0') }}</span><span class="text-no-wrap ml-4">{{ pokemonDetail.pokemon }}</span></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td class="text-center"><img v-bind:src="getImage(pokemonDetail.dex)" v-bind:alt="pokemonDetail.pokemon" width="64px" height="64px"></td>
                </tr>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">タイプ</span></th>
                </tr>
                <tr>
                  <td class="text-start"><span class="text-no-wrap">{{ pokemonDetail.type_1 }}</span><span class="text-no-wrap" v-if="pokemonDetail.type_1 !== pokemonDetail.type_2"> / {{ pokemonDetail.type_2 }}</span></td>
                </tr>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">とくせい</span></th>
                </tr>
                <tr>
                  <td class="text-start"><span class="text-no-wrap">{{ pokemonDetail.ability_1 }}</span><span class="text-no-wrap" v-if="pokemonDetail.ability_1 !== pokemonDetail.ability_2"> / {{ pokemonDetail.ability_2 }}</span></td>
                </tr>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">タマゴグループ</span></th>
                </tr>
                <tr>
                  <td class="text-start"><span class="text-no-wrap">{{ pokemonDetail.egg_group_1 }}</span><span class="text-no-wrap" v-if="pokemonDetail.egg_group_1 !== pokemonDetail.egg_group_2"> / {{ pokemonDetail.egg_group_2 }}</span></td>
                </tr>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">性別比率</span></th>
                </tr>
                <tr>
                  <td class="text-start"><span class="text-no-wrap">♂{{ pokemonDetail.male }} : ♀{{ pokemonDetail.female }}</span></td>
                </tr>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">けたぐり被威力</span></th>
                </tr>
                <tr>
                  <td class="text-start"><span class="text-no-wrap">{{ getLowKickPower(pokemonDetail.weight) }}</span></td>
                </tr>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">解禁日</span></th>
                </tr>
                <tr>
                  <td class="text-start"><span class="text-no-wrap">{{ pokemonDetail.release_date }}</span></td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="base-status-area">
              <table>
                <thead>
                <tr>
                  <th colspan="2"><span class="text-no-wrap">種族値</span></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">ＨＰ</span></th>
                  <td class="text-start"><span class="text-no-wrap">{{ pokemonDetail.hp }}</span></td>
                </tr>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">こうげき</span></th>
                  <td class="text-start"><span class="text-no-wrap">{{ pokemonDetail.attack }}</span></td>
                </tr>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">ぼうぎょ</span></th>
                  <td class="text-start"><span class="text-no-wrap">{{ pokemonDetail.defense }}</span></td>
                </tr>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">とくこう</span></th>
                  <td class="text-start"><span class="text-no-wrap">{{ pokemonDetail.sp_attack }}</span></td>
                </tr>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">とくぼう</span></th>
                  <td class="text-start"><span class="text-no-wrap">{{ pokemonDetail.sp_defense }}</span></td>
                </tr>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">すばやさ</span></th>
                  <td class="text-start"><span class="text-no-wrap">{{ pokemonDetail.speed }}</span></td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="base-status-area" v-if="pokemonDetail.dex === 386">
              <table>
                <thead>
                <tr>
                  <th colspan="2"><span class="text-no-wrap">種族値（アタックフォルム）</span></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">ＨＰ</span></th>
                  <td class="text-start"><span class="text-no-wrap">50</span></td>
                </tr>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">こうげき</span></th>
                  <td class="text-start"><span class="text-no-wrap">180</span></td>
                </tr>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">ぼうぎょ</span></th>
                  <td class="text-start"><span class="text-no-wrap">20</span></td>
                </tr>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">とくこう</span></th>
                  <td class="text-start"><span class="text-no-wrap">180</span></td>
                </tr>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">とくぼう</span></th>
                  <td class="text-start"><span class="text-no-wrap">20</span></td>
                </tr>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">すばやさ</span></th>
                  <td class="text-start"><span class="text-no-wrap">150</span></td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="base-status-area" v-if="pokemonDetail.dex === 386">
              <table>
                <thead>
                <tr>
                  <th colspan="2"><span class="text-no-wrap">種族値（ディフェンスフォルム）</span></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">ＨＰ</span></th>
                  <td class="text-start"><span class="text-no-wrap">50</span></td>
                </tr>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">こうげき</span></th>
                  <td class="text-start"><span class="text-no-wrap">70</span></td>
                </tr>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">ぼうぎょ</span></th>
                  <td class="text-start"><span class="text-no-wrap">160</span></td>
                </tr>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">とくこう</span></th>
                  <td class="text-start"><span class="text-no-wrap">70</span></td>
                </tr>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">とくぼう</span></th>
                  <td class="text-start"><span class="text-no-wrap">160</span></td>
                </tr>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">すばやさ</span></th>
                  <td class="text-start"><span class="text-no-wrap">90</span></td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="base-status-area" v-if="pokemonDetail.dex === 386">
              <table>
                <thead>
                <tr>
                  <th colspan="2"><span class="text-no-wrap">種族値（スピードフォルム）</span></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">ＨＰ</span></th>
                  <td class="text-start"><span class="text-no-wrap">50</span></td>
                </tr>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">こうげき</span></th>
                  <td class="text-start"><span class="text-no-wrap">95</span></td>
                </tr>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">ぼうぎょ</span></th>
                  <td class="text-start"><span class="text-no-wrap">90</span></td>
                </tr>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">とくこう</span></th>
                  <td class="text-start"><span class="text-no-wrap">95</span></td>
                </tr>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">とくぼう</span></th>
                  <td class="text-start"><span class="text-no-wrap">90</span></td>
                </tr>
                <tr>
                  <th class="text-start"><span class="text-no-wrap">すばやさ</span></th>
                  <td class="text-start"><span class="text-no-wrap">180</span></td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="evolution_area" v-if="pokemonDetail.evolution_before !== null || pokemonDetail.evolution_after !== null">
              <table>
                <thead>
                <tr>
                  <th colspan="2"><span class="text-no-wrap">進化チャート</span></th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="pokemonDetail.evolution_before !== null">
                  <th class="text-start"><span class="text-no-wrap">進化前</span></th>
                  <td class="text-start">
                    <div class="evolution-before">
                      <img v-bind:src="getImage(pkClass.getPokemonForName(pokemonDetail.evolution_before).dex)" v-bind:alt="pkClass.getPokemonForName(pokemonDetail.evolution_before).pokemon" width="32px" height="32px">
                      <router-link v-bind:to="'/dex-detail/' + pkClass.getPokemonForName(pokemonDetail.evolution_before).dex">{{ pkClass.getPokemonForName(pokemonDetail.evolution_before).pokemon }}</router-link>
                    </div>
                  </td>
                </tr>
                <tr v-if="pokemonDetail.evolution_after !== null">
                  <th class="text-start"><span class="text-no-wrap">進化後</span></th>
                  <td class="text-start">
                    <div class="evolution-before" v-if="!Array.isArray(pokemonDetail.evolution_after)">
                      <img v-bind:src="getImage(pkClass.getPokemonForName(pokemonDetail.evolution_after).dex)" v-bind:alt="pkClass.getPokemonForName(pokemonDetail.evolution_after).pokemon" width="32px" height="32px">
                      <router-link v-bind:to="'/dex-detail/' + pkClass.getPokemonForName(pokemonDetail.evolution_after).dex">{{ pkClass.getPokemonForName(pokemonDetail.evolution_after).pokemon }}</router-link>
                    </div>
                    <div class="evolution-before" v-if="Array.isArray(pokemonDetail.evolution_after)" v-for="evolution in pokemonDetail.evolution_after">
                      <img v-bind:src="getImage(pkClass.getPokemonForName(evolution).dex)" v-bind:alt="pkClass.getPokemonForName(evolution).pokemon" width="32px" height="32px">
                      <router-link v-bind:to="'/dex-detail/' + pkClass.getPokemonForName(evolution).dex">{{ pkClass.getPokemonForName(evolution).pokemon }}</router-link>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="right-dex-detail-area">
            <div class="move-area">
              <table class="level-rs">
                <thead>
                <tr>
                  <th class="head-level text-start"><span class="text-no-wrap">Lv.</span></th>
                  <th class="head-move text-start"><span class="text-no-wrap" v-if="pokemonDetail.dex !== 386">レベルわざ (RSE)</span><span class="text-no-wrap" v-if="pokemonDetail.dex === 386">レベルわざ (RS)</span></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="rs in pokemonMove.level_rs" :key="rs.move">
                  <td class="text-end"><span class="text-no-wrap">{{ rs.level }}</span></td>
                  <td class="text-start"><span class="text-no-wrap">{{ rs.move }}</span></td>
                </tr>
                </tbody>
              </table>
              <table class="level-frlg" v-if="pokemonDetail.dex !== 386">
                <thead>
                <tr>
                  <th class="head-level text-start"><span class="text-no-wrap">Lv.</span></th>
                  <th class="head-move text-start"><span class="text-no-wrap">レベルわざ (FRLG)</span></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="frlg in pokemonMove.level_frlg" :key="frlg.move">
                  <td class="text-end"><span class="text-no-wrap">{{ frlg.level }}</span></td>
                  <td class="text-start"><span class="text-no-wrap">{{ frlg.move }}</span></td>
                </tr>
                </tbody>
              </table>
              <table class="level-fr" v-if="pokemonDetail.dex === 386">
                <thead>
                <tr>
                  <th class="head-level text-start"><span class="text-no-wrap">Lv.</span></th>
                  <th class="head-move text-start"><span class="text-no-wrap">レベルわざ (FR)</span></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="fr in pokemonMove.level_fr" :key="fr.move">
                  <td class="text-end"><span class="text-no-wrap">{{ fr.level }}</span></td>
                  <td class="text-start"><span class="text-no-wrap">{{ fr.move }}</span></td>
                </tr>
                </tbody>
              </table>
              <table class="level-lg" v-if="pokemonDetail.dex === 386">
                <thead>
                <tr>
                  <th class="head-level text-start"><span class="text-no-wrap">Lv.</span></th>
                  <th class="head-move text-start"><span class="text-no-wrap">レベルわざ (LG)</span></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="lg in pokemonMove.level_lg" :key="lg.move">
                  <td class="text-end"><span class="text-no-wrap">{{ lg.level }}</span></td>
                  <td class="text-start"><span class="text-no-wrap">{{ lg.move }}</span></td>
                </tr>
                </tbody>
              </table>
              <table class="level-em" v-if="pokemonDetail.dex === 386">
                <thead>
                <tr>
                  <th class="head-level text-start"><span class="text-no-wrap">Lv.</span></th>
                  <th class="head-move text-start"><span class="text-no-wrap">レベルわざ (E)</span></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="em in pokemonMove.level_em" :key="em.move">
                  <td class="text-end"><span class="text-no-wrap">{{ em.level }}</span></td>
                  <td class="text-start"><span class="text-no-wrap">{{ em.move }}</span></td>
                </tr>
                </tbody>
              </table>
              <table class="machine">
                <thead>
                <tr>
                  <th class="head-machine text-start"><span class="text-no-wrap">No.</span></th>
                  <th class="head-move text-start"><span class="text-no-wrap">わざマシン</span></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="machine in pokemonMove.machine" :key="machine.move">
                  <td class="text-end"><span class="text-no-wrap">{{ machine.id }}</span></td>
                  <td class="text-start"><span class="text-no-wrap">{{ machine.move }}</span></td>
                </tr>
                <tr v-if="pokemonMove.machine.length === 0">
                  <td class="text-end"><span class="text-no-wrap"></span></td>
                  <td class="text-start"><span class="text-no-wrap">取得なし</span></td>
                </tr>
                </tbody>
              </table>
              <table class="egg">
                <thead>
                <tr>
                  <th class="head-move text-start"><span class="text-no-wrap">タマゴわざ</span></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="egg in pokemonMove.egg" :key="egg.move">
                  <td class="text-start"><span class="text-no-wrap">{{ egg.move }}</span></td>
                </tr>
                <tr v-if="pokemonDetail.dex === 172" v-for="egg_em in pokemonMove.egg_em" :key="egg_em.move">
                  <td class="text-start"><span class="text-no-wrap">{{ egg_em.move }}</span></td>
                </tr>
                <tr v-if="pokemonMove.egg.length === 0">
                  <td class="text-start"><span class="text-no-wrap">取得なし</span></td>
                </tr>
                </tbody>
              </table>
              <table class="tutor-frlg">
                <thead>
                <tr>
                  <th class="head-move text-start"><span class="text-no-wrap">教えわざ (FRLG)</span></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="tutor_frlg in pokemonMove.tutor_frlg" :key="tutor_frlg.move">
                  <td class="text-start"><span class="text-no-wrap">{{ tutor_frlg.move }}</span></td>
                </tr>
                <tr v-if="pokemonMove.tutor_frlg.length === 0">
                  <td class="text-start"><span class="text-no-wrap">取得なし</span></td>
                </tr>
                </tbody>
              </table>
              <table class="tutor-em">
                <thead>
                <tr>
                  <th class="head-move text-start"><span class="text-no-wrap">教えわざ (E)</span></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="tutor_em in pokemonMove.tutor_em" :key="tutor_em.move">
                  <td class="text-start"><span class="text-no-wrap">{{ tutor_em.move }}</span></td>
                </tr>
                <tr v-if="pokemonMove.tutor_em.length === 0">
                  <td class="text-start"><span class="text-no-wrap">取得なし</span></td>
                </tr>
                </tbody>
              </table>
              <table class="tutor-xd">
                <thead>
                <tr>
                  <th class="head-move text-start"><span class="text-no-wrap">教えわざ (XD)</span></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="tutor_xd in pokemonMove.tutor_xd" :key="tutor_xd.move">
                  <td class="text-start"><span class="text-no-wrap">{{ tutor_xd.move }}</span></td>
                </tr>
                <tr v-if="pokemonMove.tutor_xd.length === 0">
                  <td class="text-start"><span class="text-no-wrap">取得なし</span></td>
                </tr>
                </tbody>
              </table>
              <table class="special-xd">
                <thead>
                <tr>
                  <th class="head-move text-start"><span class="text-no-wrap">リライブわざ</span></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="special_xd in pokemonMove.special_xd" :key="special_xd.move">
                  <td class="text-start"><span class="text-no-wrap">{{ special_xd.move }}</span></td>
                </tr>
                <tr v-if="pokemonMove.special_xd.length === 0">
                  <td class="text-start"><span class="text-no-wrap">取得なし</span></td>
                </tr>
                </tbody>
              </table>
              <table class="special">
                <thead>
                <tr>
                  <th class="head-move text-start"><span class="text-no-wrap">特別なわざ</span></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="special in pokemonMove.special" :key="special.move">
                  <td class="text-start"><span class="text-no-wrap">{{ special.move }}</span></td>
                </tr>
                <tr v-if="pokemonMove.special.length === 0">
                  <td class="text-start"><span class="text-no-wrap">取得なし</span></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="dex-pager-area">
          <div class="pre-dex">
            <div class="image-area" v-if="pokemonDetail.dex > 1">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#26a69a">
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
              </svg>
              <img v-bind:src="getImage(pokemonDetailPre.dex)" width="32px" height="32px">
            </div>
            <router-link v-if="pokemonDetail.dex > 1" v-bind:to="'/dex-detail/' + pokemonDetailPre.dex">{{ pokemonDetailPre.pokemon }}</router-link>
            <div class="image-area" v-if="pokemonDetail.dex === 1">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#26a69a">
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
              </svg>
              <img v-bind:src="getImage(386)" width="32px" height="32px">
            </div>
            <router-link v-if="pokemonDetail.dex === 1" v-bind:to="'/dex-detail/386'">デオキシス</router-link>
          </div>
          <div class="next-dex">
            <div class="image-area" v-if="pokemonDetail.dex < 386">
              <img v-bind:src="getImage(pokemonDetailNext.dex)" width="32px" height="32px">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#26a69a">
                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
              </svg>
            </div>
            <router-link v-if="pokemonDetail.dex < 386" v-bind:to="'/dex-detail/' + pokemonDetailNext.dex">{{ pokemonDetailNext.pokemon }}</router-link>
            <div class="image-area" v-if="pokemonDetail.dex === 386">
              <img v-bind:src="getImage(1)" width="32px" height="32px">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#26a69a">
                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
              </svg>
            </div>
            <router-link v-if="pokemonDetail.dex === 386" v-bind:to="'/dex-detail/1'">フシギダネ</router-link>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
  <div class="content-area" v-else>
    <Error/>
  </div>
</template>
