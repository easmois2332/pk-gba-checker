<script setup>
import router from "@/router/index.js";

const backToHome = () => {
  router.push('/');
}
</script>

<template>
  <v-empty-state
      title="404 Not Found"
      text="ページが見つかりませんでした。URLが正しいか確認してください。"
      image="https://easmois2332.github.io/pk-assets/image/Pokemon/Normal/0201_027_uk_n_000.png"
      action-text="トップに戻る"
      @click:action="backToHome"
  >
  </v-empty-state>
</template>
