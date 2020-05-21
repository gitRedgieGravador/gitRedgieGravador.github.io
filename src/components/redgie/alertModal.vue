<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="250">
        <v-card class="text-center">
          <v-icon v-if="onError && !isAsking" color="red darken-2" class="error-icon" x-large>mdi-alert</v-icon>
          <v-icon
            v-if="!onError && !isAsking"
            color="green darken-2"
            class="error-icon"
            x-large
          >mdi-checkbox-marked-circle-outline</v-icon>

          <v-icon
            v-if="isAsking"
            color="green darken-2"
            class="error-icon"
            x-large
          >mdi-shield-outline</v-icon>
          <h2 class="myfont" v-if="onError && !isAsking">WARNING</h2>
          <h2 class="myfont" v-if="!onError && !isAsking">SUCCESS</h2>
          <h2 class="myfont" v-if="isAsking">CONFIRMATION</h2>
          <h5 class="justify">{{message}}</h5>
          <br>
          <v-spacer></v-spacer>
          <div class="pl-3 pr-3">
            <div v-if="isAsking">
              <v-row>
                <v-col>
                  <v-btn
                    tile
                    dark
                    height="50"
                    block
                    color="primary darken-2"
                    @click="$emit('btnNO')"
                  >NO</v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    tile
                    dark
                    height="50"
                    block
                    color="red darken-2"
                    @click="$emit('btnConfirm')"
                  >YES</v-btn>
                </v-col>
              </v-row>
            </div>
            <div v-if="!isAsking">
              <v-btn
                tile
                dark
                height="50"
                block
                color="red darken-2"
                @click="$emit('btnConfirm')"
              >Confirm</v-btn>
            </div>
          </div>
          <br>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<style scoped>
.myfont {
  font-family: Verdana;
}
.error-icon {
  font-size: 150px !important;
}
.v-btn {
  font-size: 25px !important;
  font-family: Verdana !important;
}
</style>

<script>
export default {
  name: "alertModal",
  props: {
    onError: Boolean,
    isAsking: Boolean,
    message: String
  },
  data() {
    return {
      dialog: true
    };
  }
};
</script>
