<script setup>
import {ref} from "vue";
import pokemon from "@/classes/pokemon.js"

const pkClass = new pokemon();
const headers = [
  {title: 'No.', key: 'id', width: ''},
  {title: 'ポケモン', key: 'pokemon', width: ''},
  {title: 'タイプ１', key: 'type_1', width: ''},
  {title: 'タイプ２', key: 'type_2', width: ''},
  {title: 'ＨＰ', key: 'hp', width: ''},
  {title: '攻撃', key: 'attack', width: ''},
  {title: '防御', key: 'defense', width: ''},
  {title: '特攻', key: 'sp_attack', width: ''},
  {title: '特防', key: 'sp_defense', width: ''},
  {title: '素早', key: 'speed', width: ''},
];

let pokemonList = pkClass.getPokemonList();

const getImage = (id) => {
  if (id === 387) {
    return '/image/pokemon/icon/386-attack.png'
  } else if (id === 388) {
    return '/image/pokemon/icon/386-defense.png'
  } else if (id === 389) {
    return '/image/pokemon/icon/386-speed.png'
  } else {
    return '/image/pokemon/icon/' + String(id).padStart(3, '0') + '.png'
  }
}
</script>

<template>
  <div class="content-area">
    <v-card class="mb-4" title="ポケモン図鑑">
      <v-card-text>
        <v-row>
          <v-col>
            <span>ポケモンのステータスや覚えるわざなどの情報を確認できます。</span>
          </v-col>
        </v-row>
        <v-row>
          <v-data-table
              :headers="headers"
              :items="pokemonList"
              item-value="pokemon"
              items-per-page="-1"
              height="800"
              hover
              fixed-header
              hide-default-footer
          >
            <template v-slot:item="{ item }">
              <tr class="text-no-wrap">
                <td>{{ item.dex }}</td>
                <td>
                  <img class="mr-4" v-bind:src="getImage(item.id)" width="32px" height="32px">
                  <router-link v-bind:to="'/dex-detail/' + item.dex">{{ item.pokemon }}</router-link>
                </td>
                <td>{{ item.type_1 }}</td>
                <td>{{ item.type_2 }}</td>
                <td>{{ item.hp }}</td>
                <td>{{ item.attack }}</td>
                <td>{{ item.defense }}</td>
                <td>{{ item.sp_attack }}</td>
                <td>{{ item.sp_defense }}</td>
                <td>{{ item.speed }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
