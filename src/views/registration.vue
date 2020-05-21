<template>
  <div>
    <center>
      <v-card outlined class="card pl-5 pr-5 pt-2" width="500">
        <v-form ref="form" v-model="valid">
          <v-label>Sign up</v-label>
          <div>
            <v-row>
              <!-- <v-col> -->
              <v-text-field
                v-model="firstname"
                :rules="[rules.required]"
                label="First Name"
                outlined
                dense
                required
                class="pl-3 pr-3"
              ></v-text-field>
              <!-- </v-col> -->
              <!-- <v-col cols="6"> -->
              <v-text-field
                v-model="lastname"
                :rules="[rules.required]"
                label="Last Name"
                outlined
                dense
                required
                class="pl-3 pr-3"
              ></v-text-field>
              <!-- </v-col> -->
            </v-row>
          </div>
          <v-text-field
            prepend-inner-icon="mdi-phone"
            v-model="mobileno"
            :rules="[rules.required]"
            label="Mobile Number"
            type="number"
            outlined
            dense
            required
          ></v-text-field>

          <v-text-field
            prepend-inner-icon="mdi-map-marker-radius"
            v-model="address"
            :rules="[rules.required]"
            label="Address"
            dense
            outlined
            required
          ></v-text-field>

          <v-select
            v-model="gender"
            :items="items"
            :rules="[rules.required]"
            label="Gender"
            dense
            outlined
          ></v-select>
          <!-- ROLE -->
          <v-select
            v-if="getUser.role == 'admin'"
            v-model="gender"
            :items="roleOption"
            :rules="[rules.required]"
            label="Role"
            dense
            outlined
          ></v-select>
          <v-text-field
            prepend-inner-icon="mdi-account"
            v-model="username"
            :rules="isExists ? [rules.required, rules.UsernameMin, rules.isExists]:[rules.required, rules.UsernameMin]"
            label="Username"
            dense
            outlined
            required
          ></v-text-field>
          <v-text-field
            prepend-inner-icon="mdi-account-key"
            v-model="password"
            :rules="[rules.required, rules.PassMin, rules.ValidPass,rules.PassMatch]"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show1 = !show1"
            :type="show1 ? 'text' : 'password'"
            label="Password"
            outlined
            dense
            required
          ></v-text-field>
          <v-text-field
            prepend-inner-icon="mdi-account-key"
            v-model="conpassword"
            :rules="[rules.PassMatch]"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show = !show"
            :type="show ? 'text' : 'password'"
            label="Confirm Password"
            outlined
            dense
            required
          ></v-text-field>
        </v-form>
        <v-btn :disabled="!valid" color="success" @click="signup" block tile>Sign Up</v-btn>
        <p>
          Already have an account?
          <router-link to="/login">Login now.</router-link>
        </p>
      </v-card>
    </center>
    <div v-if="showM">
      <AlertModal :onError="onErrorM" :message="message" @btnConfirm="handleConfirm"/>
    </div>
  </div>
</template>

<style>
@media only screen and (max-width: 600px) {
  .theme--light.v-card.v-card--outlined {
    border: thin solid transparent !important;
  }
}
body {
  margin: 0px !important;
}
.card {
  margin-top: -3%;
}
</style>


<script>
/* eslint-disabled */
import helper from "../services/auth";
import AlertModal from "../components/redgie/alertModal";
export default {
  name: "registration",
  components: {
    AlertModal
  },
  data() {
    return {
      roleOption: ["admin", "cashier", "customer"],
      message: "Message here.",
      showM: false,
      onErrorM: false,
      valid: false,
      firstname: "",
      lastname: "",
      gender: "",
      password: "",
      conpassword: "",
      address: "",
      username: "",
      mobileno: "",
      image: "default.png",
      role: "customer",
      show: false,
      show1: false,
      isExists: false,
      isAdminLogged: false,
      rules: {
        required: value => !!value || "Required.",
        email: v => /.+@.+\..+/.test(v) || "E-mail must be valid",
        PassMin: v => v.length >= 8 || "Password atleast 8 characters",
        UsernameMin: v => v.length >= 5 || "Username atleast 5 characters",
        PassMatch: v =>
          (!!v && v) === this.password || "Password do not match or not valid.",
        ValidPass: value => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
          return (
            pattern.test(value) ||
            "Must have at least one capital letter, a number and a special character."
          );
        },
        isExists: v => v == null || "Username Already exists."
      },
      select: null,
      items: ["Male", "Female"],
      checkbox: false,
      registerSuccess: false,
      insertId: null
    };
  },
  watch: {
    password: function() {
      this.$refs.form.validate();
    },
    username: function() {
      if (this.username.length >= 5) {
        helper.isExists(this.username).then(result => {
          if (result.error) {
            this.isExists = true;
          } else {
            this.isExists = false;
          }
        });
      }
    }
  },
  methods: {
    handleUsername() {
      helper.isExists(this.username).then(result => {
        if (result.error) {
          //
        }
      });
    },
    handleConfirm() {
      this.message = "Message here.";
      this.showM = false;
      this.onErrorM = false;
      this.$refs.form.reset();
      if (this.registerSuccess) {
        this.$router.push({ path: `/verify/${this.insertId}` });
      }
    },
    signup() {
      var user = {
        username: this.username,
        role: this.role,
        firstname: this.firstname,
        lastname: this.lastname,
        gender: this.gender,
        password: this.password,
        mobileno: this.mobileno,
        address: this.address,
        image: this.image,
        isdefaultpass: false
      };
      helper
        .register(user)
        .then(result => {
          if (result.error) {
            this.showM = true;
            this.onErrorM = true;
            this.message = result.message;
          } else {
            this.showM = true;
            this.onErrorM = false;
            this.message = result.message;
            this.registerSuccess = true;
            this.insertId = result.body.insertId;
          }
        })
        .catch(err => {
          this.showM = true;
          this.onErrorM = true;
          this.message = err.message;
        });
      //this.$refs.form.signup();
    },
    isUserAdmin() {
      if (this.getUser() == "admin") {
        this.isAdminLogged = true;
      } else {
        this.isAdminLogged = false;
      }
    }
  },
  computed: {
    getUser() {
      return this.$store.getters.user;
    }
  },
  // beforemounted() {
  //   this.isUserAdmin();
  // }
};
</script>
