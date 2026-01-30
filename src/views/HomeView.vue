<script setup>
</script>

<template>
  <div class="content-area">
    <v-card class="mb-4" title="コンテンツ">
      <v-card-text>
        <v-row>
          <v-col cols="auto">
            <v-tooltip text="ポケモンの情報を確認できます。">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" size="x-large" width="320" prepend-icon="mdi-book-open-page-variant" variant="outlined" stacked to="/dex-list">
                  ポケモン図鑑
                </v-btn>
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="auto">
            <v-tooltip text="指定したレギュレーションで使用できるポケモンかを確認できます。">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" size="x-large" width="320" prepend-icon="mdi-checkbox-multiple-marked" variant="outlined" stacked to="/regulation-checker">
                  レギュチェッカー
                </v-btn>
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mb-4" title="外部リンク">
      <v-card-text>
        <v-row>
          <v-col cols="auto">
            <v-tooltip text="入力されたポケモンの情報を画像、表として出力するブログ向け支援ツールです。">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" size="x-large" width="320" variant="outlined" stacked href="https://easmois2332.github.io/pk-party-detail/#/" target="_blank">
                  <template v-slot:prepend>
                    <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#000000"><path d="M200-120q-33 0-56.5-23.5T120-200v-400q0-33 23.5-56.5T200-680h160v80H200v400h560v-400H600v-80h160q33 0 56.5 23.5T840-600v400q0 33-23.5 56.5T760-120H200Zm280-200L320-480l56-56 64 63v-487h80v487l64-63 56 56-160 160Z"/></svg>
                  </template>
                  構築詳細アウトプット
                </v-btn>
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
<!--    <v-card class="mb-4" title="インフォメーション">-->
<!--    </v-card>-->
  </div>
  <div class="content-area">
    <span>使用している画像の著作権は権利者様へ帰属します。また、権利者様側からの画像等の削除の依頼、警告には速やかに対処いたします。</span>
  </div>
</template>
