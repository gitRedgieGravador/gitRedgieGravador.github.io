<template>
  <v-card>
    <v-card-title>
      <!-- {{tableName[index]}} -->
      <v-tooltip right>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            @click="$router.push({name:'registration'})"
            color="cyan accent-2"
            fab
            small
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Add {{tableName[index]}}</span>
      </v-tooltip>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <div v-if="filtered">
      <v-data-table
        :headers="headers"
        :items="userInfo"
        :hide-default-footer="true"
        :search="search"
      >
        <template v-slot:item="row">
          <tr class="text-center">
            <td>{{row.item.firstname}}</td>
            <td>{{row.item.lastname}}</td>
            <td>{{row.item.username}}</td>
            <td>{{row.item.gender}}</td>
            <td>{{row.item.role}}</td>
            <td>{{row.item.mobileno}}</td>
            <td>{{row.item.isActive}}</td>

            <td>
              <v-row dense class="ma-0 text-center">
                <v-col dense class="ma-0" cols="6">
                  <v-tooltip left>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-on="on"
                        class="ma-0"
                        text
                        type="icon"
                        small
                        fab
                        color="red darken-2"
                        @click="deletebyID(row.item.productid)"
                      >
                        <v-icon dark>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                    <span>Delete {{tableName[index]}}</span>
                  </v-tooltip>
                </v-col>
                <v-col dense class="ma-0" cols="6">
                  <v-tooltip right>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-on="on"
                        class="ma-0 mr-12"
                        text
                        type="icon"
                        small
                        fab
                        color="green darken-2"
                        @click="editProduct(row.item)"
                      >
                        <v-icon dark>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span class="pl-0">Edit {{tableName[index]}}</span>
                  </v-tooltip>
                </v-col>
              </v-row>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
  </v-card>
</template>


<script>
import service from "@/services/users";
// import _ from "underscore";
export default {
  props: {
    index: Number
    // isLogged:
  },
  data() {
    return {
      search: "",
      filtered: false,
      headers: [
        { text: "First Name", value: "firstname", align: "center" },
        { text: "Last Name", value: "lastname", align: "center" },
        { text: "Username", value: "username", align: "center" },
        { text: "Gender", value: "gender", align: "center" },
        { text: "Role", value: "role", align: "center" },
        { text: "Mobile Number", value: "mobileno", align: "center" },
        { text: "Active Status", value: "isActive", align: "center" },
        { text: "Action", value: "action", align: "center" }
      ],
      userInfo: [],
      tableName: ["customer", "cashier", "admin"]
      // Name=tableName[index],
    };
  },
  methods: {
    retrieveUsers() {
      service
        .getUsers()
        .then(result => {
          if (result.error) {
            this.userInfo = [];
            this.showM = true;
            this.onErrorM = true;
            this.message = result.message;
          } else {
            this.userInfo = result.body;
            this.filterUser();
          }
        })
        .catch(err => {
          this.userInfo = [];
          this.showM = true;
          this.onErrorM = true;
          this.message = err.message;
        });
    },
    filterUser() {
      var tempArray = [];
      this.userInfo.forEach(user => {
        if (user.role == this.tableName[this.index]) {
          tempArray.push(user);
        }
      });
      this.userInfo = tempArray;
      this.filtered = true;
    }
  },
  mounted() {
    this.filtered = false;
    this.retrieveUsers();
  }
};
</script>

