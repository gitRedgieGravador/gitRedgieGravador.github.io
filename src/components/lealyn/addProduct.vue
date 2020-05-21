<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">Add Product</span>
      </v-card-title>
      <v-container class="pl-5 pr-5">
        <v-form v-model="isValid" @submit.prevent="add">
          <v-row>
            <v-col cols="12" sm="6">
              <center>
                <p>click to upload photo</p>
                <v-card raised class="pa-2" id="card_image" height="300" width="300">
                  <form id="myform">
                    <input
                      ref="uploader"
                      class="d-none"
                      type="file"
                      accept="image/*"
                      @change="onUpload($event)"
                    >
                  </form>
                  <img
                    :src="this.imageUrl"
                    class="img-up-src cursor"
                    @click.prevent="$refs.uploader.click()"
                  >
                </v-card>
              </center>
            </v-col>
            <v-col cols="12" sm="6">
              <p>Product Details</p>
              <v-text-field
                v-model="productName"
                :rules="[rules.required]"
                label="Product Name"
                outlined
                dense
                required
              ></v-text-field>
              <v-text-field
                v-model="productPrice"
                :rules="[rules.required]"
                label="Price"
                type="number"
                outlined
                dense
                required
              ></v-text-field>
              <v-text-field
                v-model="description"
                :rules="[rules.required]"
                label="Description"
                type="text"
                outlined
                dense
                required
              ></v-text-field>
              <v-text-field
                v-model="productStock"
                :rules="[rules.required]"
                type="number"
                label="Stock"
                outlined
                dense
                required
              ></v-text-field>
              <v-row class="pl-3 pr-3">
                <v-autocomplete
                  v-model="productCategory"
                  :rules="[rules.required]"
                  :items="categories"
                  label="Categories"
                  placeholder="Select..."
                  outlined
                  dense
                  required
                ></v-autocomplete>
                <span class="pl-2">
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn v-on="on" @click="addCategory" color="cyan accent-2" fab small>
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </template>
                    <span>Add new category</span>
                  </v-tooltip>
                </span>
              </v-row>
              <v-text-field
                v-model="productQwarning"
                :rules="[rules.required]"
                label="Warning Quantity"
                type="number"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <div class="x-hidden">
            <v-row class="pl-5 pr-5">
              <v-col>
                <v-btn tile color="red darken-2" block @click="handleCancel">
                  <v-icon>mdi-close-box</v-icon>CANCEL
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  tile
                  :disabled="!isValid || img == null"
                  color="success darken-2"
                  @click="save"
                  block
                  type="submit"
                  v-if="$route.name !== 'editProduct'"
                >
                  <v-icon>mdi-database</v-icon>SAVE
                </v-btn>
                <v-btn @click="update" v-else color="green darken-2" tile block>
                  <v-icon>mdi-database</v-icon>update
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-form>
      </v-container>

      <v-dialog v-model="dialog" persistent max-width="300">
        <v-card class="newCatModal text-center">
          <v-form v-model="isValid" @submit.prevent="save">
            <h3>Add new category</h3>
            <v-text-field
              class="pt-2"
              v-model="newcategory"
              label="New Category"
              persistent-hint
              required
              outlined
              :rules="[rules.required]"
            ></v-text-field>
            <v-row>
              <v-col>
                <v-btn color="red darken-2" tile block @click="cancelCategory">
                  <v-icon>mdi-close-box</v-icon>cancel
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  :disabled="!isValid"
                  @click="addnewCategory"
                  color="green darken-2"
                  tile
                  block
                >
                  <v-icon>mdi-database</v-icon>save
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-dialog>

      <br>
      <v-icon>mdi mdi-verified</v-icon>
      <i class="mdi mdi-square-inc-cash"></i>
      <div v-if="showM">
        <AlertModal
          :isAsking="isAskingM"
          :onError="onErrorM"
          :message="message"
          @btnConfirm="handleConfirm"
          @btnNO="handleNO"
        />
      </div>
    </v-card>
  </div>
</template>
<style scoped>
.img-up-src {
  height: 280px;
  width: 280px;
}
.buttons {
  width: auto;
}
#card_image {
  height: 370px;
}
.file_button {
  margin-top: 30%;
  margin-left: 45%;
}
.newCatModal {
  padding: 20px;
}
</style>

<script>
import upload from "@/services/upload";
import service from "@/services/products";
import AlertModal from "@/components/redgie/alertModal.vue";
export default {
  components: {
    AlertModal
  },
  data() {
    return {
      message: "Message here.",
      showM: false,
      isAskingM: false,
      onErrorM: false,
      dialog: false,
      file: "",
      imageUrl: require("@/assets/default.png"),
      isValid: false,
      productName: "",
      productPrice: "",
      description: "",
      productStock: "",
      productCategory: "",
      productQwarning: "",
      img: null,
      newcategory: "",
      rules: {
        required: value => !!value || "Required."
      },
      categories: [],
      isAdding: false
    };
  },
  beforeMount() {
    this.getCategories();
  },
  methods: {
    //this is the function of getting/retreiving categories from DB
    getCategories() {
      service.getCategories().then(result => {
        if (result.error) {
          this.showM = true;
          this.onErrorM = true;
          this.message = result.message;
        } else {
          result.body.forEach(element => {
            this.categories.push(element.category);
          });
        }
      });
    },
    addnewCategory() {
      var cat = {
        category: this.newcategory
      };
      service
        .addCategory(cat)
        .then(result => {
          if (result.error) {
            this.showM = true;
            this.onErrorM = true;
            this.message = result.message;
          } else {
            this.showM = true;
            this.onErrorM = false;
            this.message = result.message;
          }
        })
        .catch(err => {
          this.products = [];
          this.showM = true;
          this.onErrorM = true;
          this.message = err.message;
        });
    },
    cancelCategory() {
      this.dialog = false;
      this.isAdding = false;
    },
    onUpload(e) {
      this.file = e.target.files[0];
      var myform = document.getElementById("myform");
      this.imageUrl = URL.createObjectURL(this.file);
      var body = new FormData(myform);
      body.append("img", this.file);

      upload.localImage(body).then(result => {
        if (result.error) {
          this.showM = true;
          this.onErrorM = true;
          this.message = result.message;
          this.img = null;
        } else {
          this.img = result.body.image;
        }
      });
    },
    handleCancel() {
      this.isAskingM = true;
      this.showM = true;
      this.onErrorM = true;
      this.message = "Adding product, are you sure you want to cancel?";
    },
    save() {
      this.message = "Product added successfully.";
      this.showM = false;
      this.onErrorM = false;
    },
    handleNO() {
      this.isAskingM = false;
      this.showM = false;
      this.onErrorM = false;
    },
    handleConfirm() {
      if (!this.isAdding) {
        this.$router.push({ name: "productTable" });
        this.isAdding = false;
      }
      this.getCategories();
      this.newcategory = "";
      this.handleNO();
      this.dialog = false;
    },
    add() {
      var products = {
        productname: this.productName,
        price: this.productPrice,
        img: this.img,
        description: this.description,
        stocks: this.productStock,
        category: this.productCategory,
        minstock: this.productQwarning
      };
      service
        .addProduct(products)
        .then(result => {
          if (result.error) {
            this.products = [];
            this.showM = true;
            this.onErrorM = true;
            this.message = result.message;
          } else {
            this.showM = true;
            this.onErrorM = false;
            this.message = result.message;
            this.productItems = result.body;
          }
        })
        .catch(err => {
          this.products = [];
          this.showM = true;
          this.onErrorM = true;
          this.message = err.message;
        });
    },
    addCategory() {
      this.isAdding = true;
      this.dialog = true;
    },
    update() {
      var newproducts = {
        productid: this.getID,
        productname: this.productName,
        price: this.productPrice,
        img: this.img,
        description: this.description,
        stocks: this.productStock,
        category: this.productCategory,
        minstock: this.productQwarning
      };
      service
        .updateProduct(newproducts)
        .then(result => {
          if (result.error) {
            this.showM = true;
            this.onErrorM = true;
            this.message = result.message;
          } else {
            this.showM = true;
            this.onErrorM = false;
            this.message = result.message;
          }
        })
        .catch(err => {
          this.products = [];
          this.showM = true;
          this.onErrorM = true;
          this.message = err.message;
        });
    }
  },
  mounted() {
    if (this.$route.name == "editProduct") {
      service
        .getProductById(this.getID)
        .then(result => {
          this.imageUrl = "http://localhost:3232/static/" + result.body.img;
          this.productName = result.body.productname;
          this.productPrice = result.body.price;
          this.img = result.body.img;
          this.description = result.body.description;
          this.productStock = result.body.stocks;
          this.productCategory = result.body.category;
          this.productQwarning = result.body.minstock;
        })
        .catch(err => {
          this.showM = true;
          this.onErrorM = true;
          this.message = err.message;
        });
    }
  },
  computed: {
    getID() {
      return this.$store.getters.GetId;
    }
  }
};
</script>
