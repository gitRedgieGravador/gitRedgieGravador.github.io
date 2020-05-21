<template>
  <div>
    <center>
      <v-card outlined class="text-center pt-12 pl-5 pr-5 pb-3" width="350" height="250">
        <h5>Input the confirmation code sent to your phone.</h5>
        <br>
        <v-form @submit.prevent="submitConfirmation" autocomplete="off" v-model="isConfirmed">
          <v-text-field
            autocomplete="off"
            label="Confirmation Code"
            dense
            hide-details
            prepend-inner-icon="mdi-key"
            v-model="confirmationCode"
            :rules="[rules.required]"
            required
            height="35"
            class="bold"
            maxlength="6"
            ref="field"
          ></v-text-field>
          <div>
            <br>
            <h6 @click="resend">Resend confirmation code.</h6>
            <v-spacer></v-spacer>
          </div>
          <br>
          <v-btn
            type="submit"
            :disabled="!isConfirmed"
            block
            color="red darken-2"
            class="white"
            tile
          >
            <span>VERIFY</span>
            <v-icon>mdi-telegram</v-icon>
          </v-btn>
        </v-form>
      </v-card>
    </center>
    <div v-if="showM">
      <AlertModal :onError="onErrorM" :message="message" @btnConfirm="handleConfirm"/>
    </div>
  </div>
</template>
<style scoped>
h6 {
  color: blue;
  position: relative;
  left: -25%;
  text-decoration: underline;
  cursor: pointer;
}
.hid {
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;
  margin: 0 !important;
}

/* .v-card {
  margin-top: calc(100% - 80%) !important;
} */
</style>

<script>
import AlertModal from "./alertModal.vue";
export default {
  name: "verify",
  components: {
    AlertModal
  },
  data() {
    return {
      userid: null,
      isConfirmed: false,
      confirmationCode: "",
      rules: {
        required: value => !!value || "Required."
      },
      message: "Message here.",
      showM: false,
      onErrorM: false,
      confirmSuccess: false
    };
  },
  watch: {
    confirmationCode: function() {
      this.confirmationCode = this.confirmationCode.toUpperCase();
    }
  },
  mounted() {
    this.userid = this.$route.params.insertId;
  },
  methods: {
    resend() {
      this.showM = true;
      this.onErrorM = false;
      this.message = "Confirmation code was sent.";
    },
    handleConfirm() {
      this.confirmationCode = "";
      this.showM = false;
      this.onErrorM = false;
      this.$refs.field.reset();
      if (this.confirmSuccess) {
        this.$router.push({ name: "admin" });
      }
    },
    submitConfirmation() {
      //alert(this.confirmationCode);
      var body = {
        userid: this.userid,
        confirmationCode: this.confirmationCode
      };
      this.$store
        .dispatch("confirm", body)
        .then(result => {
          if (result.error) {
            this.showM = true;
            this.onErrorM = true;
            this.message = result.message;
          } else {
            this.showM = true;
            this.onErrorM = false;
            this.message = result.message;
            this.confirmSuccess = true;
          }
        })
        .catch(err => {
          this.showM = true;
          this.onErrorM = true;
          this.message = err.message;
        });
    }
  }
};
</script>
