<template>
  <div id="app">
    <v-app>
      <Navbar />
      <v-main>
        <v-container fluid>
          <h1 id="title">{{ $t("title") }}</h1>
          <router-view />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
};
</script>

<style lang="css">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
}
#title {
  margin: 30px;
}
</style>
