<template>
  <div >
    <!-- <v-navigation-drawer v-model="open" absolute :temporary="getUser.role == 'cashier' ? false:true" width="300" permanent> -->
      <v-navigation-drawer v-model="open" absolute temporary width="300"> 
      <br>
      <br>
      <v-row>
        <v-btn
          @click="btnClose"
          class="mt-10"
          x-small
          absolute
          dark
          fab
          top
          right
          color="red darken-2"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-row>
      <br>
      <center>
        <img :src="'http://localhost:3232/static/' + getUser.image" id="sbpp">
        <h5>{{getUser.firstname}} {{getUser.lastname}}</h5>
      </center>
      <v-row class="pa-2">
        <v-col>
          <v-btn color="blue darken-1" tile block>
            <v-icon>mdi-eye</v-icon>profile
          </v-btn>
        </v-col>
        <v-col>
          <v-btn @click="logout" color="red darken-1" tile block>
            logout
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-list nav dense>
        <hr>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-hover class="mb-1 mt-1" v-slot:default="{ hover }" close-delay="10">
            <v-card
              :color="hover ? '#d9b3ff': 'white'"
              tile
              :elevation="hover ? 16 : 0  "
              :height="hover ? 70 : 40"
              @click="navto('admin')"
            >
              <v-list-item class="hund">
                <v-list-item-title>
                  <v-icon>mdi-view-dashboard</v-icon>DASHBOARD
                </v-list-item-title>
              </v-list-item>
            </v-card>
          </v-hover>

          <v-hover v-if="getUser.role == 'admin'" class="mb-1 mt-1" v-slot:default="{ hover }" close-delay="10">
            <v-card
              :color="hover ? '#d9b3ff': 'white'"
              tile
              :elevation="hover ? 16 : 0  "
              :height="hover ? 70 : 40"
              @click="navto('productTable')"
            >
              <v-list-item class="hund">
                <v-list-item-title>
                  <v-icon>mdi-dropbox</v-icon>PRODUCTS
                </v-list-item-title>
              </v-list-item>
            </v-card>
          </v-hover>

          <v-hover v-if="getUser.role == 'admin'" class="mb-1 mt-1" v-slot:default="{ hover }" close-delay="10">
            <v-card
              :color="hover ? '#d9b3ff': 'white'"
              tile
              :elevation="hover ? 16 : 0  "
              :height="hover ? 70 : 40"
              @click="navto('usertable')"
            >
              <v-list-item class="hund">
                <v-list-item-title>
                  <v-icon>mdi-account-multiple</v-icon>USERS
                </v-list-item-title>
              </v-list-item>
            </v-card>
          </v-hover>

          <v-hover class="mb-1 mt-1" v-slot:default="{ hover }" close-delay="10">
            <v-card
              :color="hover ? '#d9b3ff': 'white'"
              tile
              :elevation="hover ? 16 : 0  "
              :height="hover ? 70 : 40"
            >
              <v-list-item class="hund">
                <v-list-item-title>
                  <v-icon>mdi-chart-bar</v-icon>REPORTS
                </v-list-item-title>
              </v-list-item>
            </v-card>
          </v-hover>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<style scoped>
.theme--light.v-card.v-card--outlined {
  border: thin solid transparent !important;
}
#sbpp {
  height: 100px;
  width: 100px;
  border: 1px solid black;
}

</style>

<script>
export default {
  name: "sidebar",
  data() {
    return {
      open: false
    };
  },
  watch: {
    openSB: function() {
      this.open = this.openSB;
    },
    open: function() {
      if (!this.open) {
        this.$store.dispatch("setSB", false);
      }
    },
    getUser: function() {
    }
  },
  computed: {
    getUser() {
      return this.$store.getters.user;
    },

    openSB: {
      get: function() {
        return this.$store.getters.showSB;
      },
      set: function() {
      }
    }
  },
  mounted() {
    this.openSB = this.open;
  },
  methods: {
    btnClose() {
      this.$store.dispatch("setSB", false);
    },
    navto(rname) {
      if (this.$route.name != rname) {
        this.$router.push({ name: rname });
      }
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

/* 
get: function() {
return this.$store.getters.showSB;
},
set: function() {
}
*/
</script>

