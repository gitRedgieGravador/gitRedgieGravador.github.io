<template>
  <div id="app">
    <v-app>
      <v-app-bar app color="primary darken-1" dark v-if="isLogin && $route.name != 'login' && $route.name != 'registration' && $route.name != 'notfound' && $route.name != 'forbidden-page'">
        <div class="ml-3 cursor">
          <v-icon @click="ShowSB" type="button">mdi-menu</v-icon>
        </div>

        <div class="ml-3 cursor">
          <v-icon @click="$router.push({name:'home'})" type="button">mdi-home</v-icon>
        </div>

        <!-- <v-icon class="cursor pl-5" @click="$router.push({name:'home'})">mdi-home</v-icon> -->

        <v-spacer></v-spacer>
        <v-btn text @click="$router.push({name:'admin'})">
          <span class="mr-2">Profile</span>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-app-bar>
      <br>
      <br>
      <br>
      <div class="pl-5 pr-5 dashboard">
        <router-view></router-view>
      </div>
      <div>
        <Sidebar/>
      </div>
    </v-app>
  </div>
</template>
<style scoped>

</style>

<script>
import Sidebar from "./components/redgie/sidebar.vue";
export default {
  name: "App",
  components: { Sidebar },
  data() {
    return {
      ShowNav: false
    };
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
    user() {
      return this.$store.getters.user;
    }
  },
  watch: {
    $route: function() {
      console.log("Route: ",this.$route.name)
      this.ShowNav =
        this.isLogin || (
        this.$route.name != "login" &&
        this.$route.name != "registration" &&
        this.$route.name != "notfound" &&
        this.$route.name != "forbidden-page");
    }
  },
  methods: {
    ShowSB() {
      this.$store.dispatch("setSB", true);
    },
    logout() {
      this.$store.dispatch("logout").then(resp => {
        if (resp) {
          this.$router.push({ name: "login" });
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "./CSS/global.css";
</style>
