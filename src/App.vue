<script setup>
import {ref, watch} from "vue"
import {useRoute} from "vue-router";

const route = useRoute();
const navDrawer = ref(false);
const routeParams = ref(route.params);

watch(() => route.params, (to, from) => {
  routeParams.value = to;
});
</script>

<template>
  <v-app>
    <v-app-bar :elevation="0" color="teal-lighten-1">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="navDrawer = !navDrawer"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title><router-link class="app-header-link" to="/">GBAチェッカー</router-link></v-app-bar-title>
      <template v-slot:append>
        <v-btn icon="mdi-magnify" to="/dex-search"></v-btn>
      </template>
    </v-app-bar>
    <v-navigation-drawer v-model="navDrawer">
      <v-list-item link prepend-icon="mdi-home" title="トップ" to="/"></v-list-item>
      <v-list-item link prepend-icon="mdi-book-open-page-variant" title="ポケモン図鑑" to="/dex-list"></v-list-item>
      <v-list-item link prepend-icon="mdi-checkbox-multiple-marked" title="レギュチェッカー" to="/regulation-checker"></v-list-item>
      <v-list-item link prepend-icon="mdi-help-circle" title="ヘルプ" to="/help"></v-list-item>
    </v-navigation-drawer>
    <v-main>
      <router-view :key="routeParams"/>
    </v-main>
  </v-app>
</template>
