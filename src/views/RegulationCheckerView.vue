<script setup>
import {ref} from "vue";
import pokemon from "@/classes/pokemon.js"

const pkClass = new pokemon();

const regulationList = [
  'ポケモンフェスタ2003',
  'ポケモンリーグ2004',
  'ポケモンリーグ2005',
  '前期シングル',
  '後期シングル',
  'カスタム',
];
const releaseList = [
  {value: 1, title: 'ルビー・サファイア発売 ～ ポケモンボックス発売直前'},
  {value: 2, title: 'ルビー・サファイア発売 ～ ポケモンフェスタ2003 最終日'},
  {value: 3, title: 'ルビー・サファイア発売 ～ ポケモンコロシアム発売直前'},
  {value: 4, title: 'ルビー・サファイア発売 ～ ファイアレッド・リーフグリーン発売直前'},
  {value: 5, title: 'ルビー・サファイア発売 ～ ポケモンリーグ2004 決勝戦'},
  {value: 6, title: 'ルビー・サファイア発売 ～ エメラルド発売直前'},
  {value: 7, title: 'ルビー・サファイア発売 ～ ポケモンXD 闇の旋風ダーク・ルギア発売直前'},
  {value: 8, title: 'ルビー・サファイア発売 ～ ポケモンリーグ2005 決勝戦'},
  {value: 0, title: 'カスタム'}
];
const releaseDateList = [
  {value: 1, start: '2002-11-21', end: '2003-05-29'},
  {value: 2, start: '2002-11-21', end: '2003-08-24'},
  {value: 3, start: '2002-11-21', end: '2003-11-20'},
  {value: 4, start: '2002-11-21', end: '2004-01-28'},
  {value: 5, start: '2002-11-21', end: '2004-08-15'},
  {value: 6, start: '2002-11-21', end: '2004-09-15'},
  {value: 7, start: '2002-11-21', end: '2005-08-03'},
  {value: 8, start: '2002-11-21', end: '2005-08-21'},
];
const bannedList = [
  'ソーナノ・ソーナンス',
  'ラティオス・ラティアス',
  '禁止伝説',
  '幻',
];
const pokemonNameList = pkClass.getPokemonNameList();
const moveNameList = pkClass.getMoveNameList();

let regulation = ref('前期シングル');
let release = ref(3);
let releaseDate = ref({
  value: 3,
  start: '2002-11-21',
  end: '2003-11-20'
});
let banned = ref([
  'ラティオス・ラティアス',
  '禁止伝説',
  '幻',
]);
let regulationInput = ref({
  release: false,
  releaseDate: false,
  banned: false,
});
let pokemonInput = ref({
  pokemon: '',
  level: 50,
  move1: '',
  move2: '',
  move3: '',
  move4: '',
});
let result = ref({
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
});
let loading = ref(false);

const changeRegulation = (regulation) => {
  if (regulation === 'ポケモンフェスタ2003') {
    release.value = 2;
    releaseDate.value = releaseDateList.find((obj) => obj.value === 2);
    banned.value = ['ソーナノ・ソーナンス'];
    regulationInput.value.release = false;
    regulationInput.value.releaseDate = false;
    regulationInput.value.banned = false;
  }
  if (regulation === 'ポケモンリーグ2004') {
    release.value = 5;
    releaseDate.value = releaseDateList.find((obj) => obj.value === 5);
    banned.value = ['幻'];
    regulationInput.value.release = false;
    regulationInput.value.releaseDate = false;
    regulationInput.value.banned = false;
  }
  if (regulation === 'ポケモンリーグ2005') {
    release.value = 8;
    releaseDate.value = releaseDateList.find((obj) => obj.value === 8);
    banned.value = ['禁止伝説', '幻'];
    regulationInput.value.release = false;
    regulationInput.value.releaseDate = false;
    regulationInput.value.banned = false;
  }
  if (regulation === '前期シングル') {
    release.value = 3;
    releaseDate.value = releaseDateList.find((obj) => obj.value === 3);
    banned.value = ['ラティオス・ラティアス', '禁止伝説', '幻'];
    regulationInput.value.release = false;
    regulationInput.value.releaseDate = false;
    regulationInput.value.banned = false;
  }
  if (regulation === '後期シングル') {
    release.value = 8;
    releaseDate.value = releaseDateList.find((obj) => obj.value === 8);
    banned.value = ['禁止伝説', '幻'];
    regulationInput.value.release = false;
    regulationInput.value.releaseDate = false;
    regulationInput.value.banned = false;
  }
  if (regulation === 'カスタム') {
    regulationInput.value.release = true;
    regulationInput.value.releaseDate = false;
    regulationInput.value.banned = true;
  }
}
const changeRelease = (release) => {
  if (release === 0) {
    regulationInput.value.releaseDate = true;
  } else {
    releaseDate.value = releaseDateList.find((obj) => obj.value === release);
    regulationInput.value.releaseDate = false;
  }
}
const buttonCheck = async () => {
  loading.value = true;
  result.value = await pkClass.checkRegulation(releaseDate.value.start, releaseDate.value.end, banned.value, pokemonInput.value.pokemon, pokemonInput.value.level, pokemonInput.value.move1, pokemonInput.value.move2, pokemonInput.value.move3, pokemonInput.value.move4);
  loading.value = false;
}
const buttonReset = () => {
  pokemonInput.value = {
    pokemon: '',
    level: 50,
    move1: '',
    move2: '',
    move3: '',
    move4: '',
  };
  result.value = {
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
}
</script>

<template>
  <div class="content-area">
    <v-card class="mb-4" title="レギュチェッカー">
      <v-card-text>
        <v-row>
          <v-col>
            <span>ポケモンと覚えているわざを入力し、指定したレギュレーションで使用することができるかの確認ができます。</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
                label="レギュレーション"
                autocomplete="off"
                :items="regulationList"
                v-model="regulation"
                @update:modelValue="changeRegulation(regulation)"
            >
            </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-expansion-panels class="mb-8">
              <v-expansion-panel>
                <v-expansion-panel-title>レギュレーション内容</v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-row>
                    <v-col>
                      <v-select
                          label="解禁要素"
                          autocomplete="off"
                          :items="releaseList"
                          item-title="title"
                          item-value="value"
                          v-model="release"
                          :disabled="!regulationInput.release"
                          @update:modelValue="changeRelease(release)"
                      >
                      </v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                          v-model="releaseDate.start"
                          label="Start date"
                          type="date"
                          :disabled="true"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                          v-model="releaseDate.end"
                          label="End date"
                          type="date"
                          :disabled="!regulationInput.releaseDate"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-select
                          label="使用禁止ポケモン"
                          :items="bannedList"
                          v-model="banned"
                          multiple
                          :disabled="!regulationInput.banned"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-autocomplete
                label="ポケモン名"
                autocomplete="off"
                :items="pokemonNameList"
                :messages="result.pokemon ? result.pokemon_text : ''"
                :error-messages="result.pokemon ? '' : result.pokemon_text"
                v-model="pokemonInput.pokemon"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-number-input
                :reverse="false"
                controlVariant="stacked"
                label="レベル"
                autocomplete="off"
                :hideInput="false"
                :inset="false"
                :min="1"
                :max="100"
                :messages="result.level ? result.level_text : ''"
                :error-messages="result.level ? '' : result.level_text"
                v-model="pokemonInput.level"
            ></v-number-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-autocomplete
                label="わざ1"
                autocomplete="off"
                :items="moveNameList"
                :messages="result.move1 ? result.move1_text : ''"
                :error-messages="result.move1 ? '' : result.move1_text"
                v-model="pokemonInput.move1"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-autocomplete
                label="わざ2"
                autocomplete="off"
                :items="moveNameList"
                :messages="result.move2 ? result.move2_text : ''"
                :error-messages="result.move2 ? '' : result.move2_text"
                v-model="pokemonInput.move2"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-autocomplete
                label="わざ3"
                autocomplete="off"
                :items="moveNameList"
                :messages="result.move3 ? result.move3_text : ''"
                :error-messages="result.move3 ? '' : result.move3_text"
                v-model="pokemonInput.move3"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-autocomplete
                label="わざ4"
                autocomplete="off"
                :items="moveNameList"
                :messages="result.move4 ? result.move4_text : ''"
                :error-messages="result.move4 ? '' : result.move4_text"
                v-model="pokemonInput.move4"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-center">
            <v-btn class="text-white" color="teal-lighten-1" size="x-large" :disabled="pokemonInput.pokemon === '' || pokemonInput.pokemon === null" :loading="loading" @click="buttonCheck">
              チェック
            </v-btn>
          </v-col>
          <v-col class="text-center">
            <v-btn class="text-white" color="teal-lighten-1" size="x-large" @click="buttonReset">
              リセット
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
