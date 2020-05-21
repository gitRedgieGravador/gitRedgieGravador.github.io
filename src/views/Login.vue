<template>
  <div>
    <v-card outlined class="container text-center pt-12">
      <div>
        <v-avatar color="indigo" size="36">
          <span class="white--text headline">logo</span>
        </v-avatar>
      </div>
      <br>
      <h3>LOGIN</h3>
      <br>
      <v-form @submit.prevent="onLogin" autocomplete="off" v-model="isFormValid" ref="form">
        <v-text-field
          :rules="[rules.required]"
          v-model="username"
          label="Username"
          outlined
          dense
          required
          prepend-inner-icon="mdi-account"
        ></v-text-field>
        <v-text-field
          :rules="[rules.required]"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show = !show"
          :type="show ? 'text' : 'password'"
          v-model="password"
          label="Password"
          outlined
          dense
          required
          prepend-inner-icon="mdi-account-key"
        ></v-text-field>
        <v-btn
          type="submit"
          :disabled="!isFormValid || loading"
          block
          @click="onLogin"
          class="primary"
          tile
        >
          <span>LOGIN</span>
          <div v-if="loading">
            <v-progress-circular class="pl-12" :size="15" color="black darken-3" indeterminate></v-progress-circular>
          </div>
        </v-btn>
      </v-form>

      <br>
      <div>
        <p>
          Don't have an account yet?
          <router-link to="/registration">Register now</router-link>
        </p>
      </div>
    </v-card>
    <div v-if="showM">
      <AlertModal :onError="onErrorM" :message="message" @btnConfirm="handleConfirm"/>
    </div>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 600px) {
  .theme--light.v-card.v-card--outlined {
    border: thin solid transparent !important;
  }
}
.container {
  width: 380px;
  background-color: transparent !important;
  padding: 30px;
  /* margin-top: calc(100% - 90%) !important; */
}
</style>

<script>
import AlertModal from "../components/redgie/alertModal.vue";
export default {
  name: "Login",
  components: {
    AlertModal
  },
  data() {
    return {
      message: "Message here.",
      showM: false,
      onErrorM: false,
      loading: false,
      username: "",
      password: "",
      show: false,
      isFormValid: false,
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  computed: {
    userRole() {
      return this.$store.getters.user.role;
    }
  },
  watch: {
    userRole: function() {
    }
  },
  methods: {
    handleConfirm() {
      this.username = "redgie";
      this.password = "P@ssw0rd";
      this.showM = false;
      this.onErrorM = false;
      this.$refs.form.reset();
    },
    onLogin() {
      this.loading = true;
      this.$store
        .dispatch("login", {
          username: this.username,
          password: this.password
        })
        .then(result => {
          this.loading = false;
          if (result.error) {
            this.showM = true;
            this.onErrorM = true;
            this.message = result.message;
          }
          this.$router.push({ name: this.userRole });
        })
        .catch(err => {
          this.loading = false;
          this.showM = true;
          this.onErrorM = true;
          this.message = err.message;
        });
    }
  }
};
</script>

