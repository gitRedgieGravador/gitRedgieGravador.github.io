<template>
  <v-card class="container">
    <v-card-title>
      <v-tooltip right>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            @click="$router.push({name:'addproduct'})"
            color="cyan accent-2"
            fab
            small
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Add Product</span>
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
    <v-data-table
      :headers="headers"
      :items="productItems"
      :search="search"
      :hide-default-footer="true"
    >
      <template v-slot:item="row">
        <tr class="text-center">
          <td>{{row.item.productname}}</td>
          <td>{{row.item.price}}</td>
          <td>{{row.item.description}}</td>
          <td>{{row.item.stocks}}</td>
          <td>{{row.item.category}}</td>
          <td class="text-center">
            <img class="image mt-2" :src="`http://localhost:3232/static/${row.item.img}`">
            <br>
            {{row.item.img}}
          </td>
          <td>{{row.item.minstock}}</td>
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
                  <span>Delete Product</span>
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
                      @click="editProduct(row.item.productid)"
                    >
                      <v-icon dark>mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                  <span class="pl-0">Edit Product</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </td>
        </tr>
      </template>
    </v-data-table>
    <div v-if="showM">
      <AlertModal
        @btnConfirm="handleConfirm"
        @btnNO="handleNO"
        :isAsking="isAskingM"
        :onError="onErrorM"
        :message="message"
      />
    </div>
  </v-card>
</template>

<style scoped>
.image {
  height: 50px;
  width: 50px;
}
</style>

<script>
import service from "@/services/products";
import AlertModal from "@/components/redgie/alertModal.vue";
export default {
  name: "admin",
  components: {
    AlertModal
  },
  data() {
    return {
      search: "",
      message: "Message here.",
      showM: false,
      isAskingM: false,
      isAsking: false,
      onErrorM: false,
      headers: [
        {
          text: "Product Name",
          align: "center",
          sortable: false,
          value: "productname"
        },
        { text: "Price", value: "productprice", align: "center" },
        { text: "Description", value: "description", align: "center" },
        { text: "Stock", value: "productstock", align: "center" },
        { text: "Categories", value: "category", align: "center" },
        { text: "Image", value: "img", align: "center" },
        { text: "MinStock", value: "minstock", align: "center" },
        { text: "Action", value: "action", align: "center" }
      ],
      productItems: [],
      deleteID: null,
      b4Delete: true
    };
  },
  beforeMount() {
    this.retrieveProducts();
  },
  methods: {
    retrieveProducts() {
      service
        .getProducts()
        .then(result => {
          if (result.error) {
            this.showM = true;
            this.onErrorM = true;
            this.message = result.message;
          } else {
            this.productItems = result.body;
          }
        })
        .catch(err => {
          this.showM = true;
          this.onErrorM = true;
          this.message = err.message;
        });
    },
    handleConfirm() {
      this.message = "Message here.";
      this.showM = false;
      this.onErrorM = false;
      if (this.b4Delete) this.deleteProduct(this.deleteID);
      this.b4Delete = true;
    },
    handleNO() {
      this.isAskingM = false;
      this.showM = false;
      this.onErrorM = false;
    },
    deletebyID(id) {
      this.deleteID = id;
      this.isAskingM = true;
      this.showM = true;
      this.onErrorM = false;
      this.message = "Are you sure you want to delete this product?";
    },
    deleteProduct(productid) {
      service
        .deleteProduct(productid)
        .then(result => {
          if (result.error) {
            this.showM = true;
            this.onErrorM = true;
            this.message = result.message;
          } else {
            this.b4Delete = false;
            this.isAskingM = false;
            this.showM = true;
            this.onErrorM = false;
            this.message = result.message;
            this.retrieveProducts();
          }
        })
        .catch(err => {
          this.showM = true;
          this.onErrorM = true;
          this.message = err.message;
        });
    },
    editProduct(id) {
      this.$store.dispatch("SET_ID", id).then(res => {
        if (res) {
          this.$router.push({ name: "editProduct" });
        }
      });
    }
  }
};
</script>
