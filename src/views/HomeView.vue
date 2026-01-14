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
                <v-btn v-bind="props" size="x-large" width="256" prepend-icon="mdi-book-open-page-variant" variant="outlined" stacked to="/dex-list">
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
                <v-btn v-bind="props" size="x-large" width="256" prepend-icon="mdi-checkbox-multiple-marked" variant="outlined" stacked to="/regulation-checker">
                  レギュチェッカー
                </v-btn>
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mb-4" title="インフォメーション">
    </v-card>
  </div>
  <div class="content-area">
    <span>使用している画像の著作権は権利者様へ帰属します。また、権利者様側からの画像等の削除の依頼、警告には速やかに対処いたします。</span>
  </div>
</template>
