<template>
  <div class="home">
    <center>
      <h1>HOME</h1>
      <v-btn @click="test">test</v-btn>
      <br>
      <v-btn class="file_button" text @click.prevent="$refs.uploader.click()">
        <v-icon>mdi-camera</v-icon>
      </v-btn>
      <form id="myform">
        <input
          ref="uploader"
          class="d-none"
          type="file"
          accept="image/*"
          @change="onUpload($event)"
        >
      </form>
      <v-icon>mdi mdi-verified</v-icon>
      <i class="mdi mdi-square-inc-cash"></i>
      <div v-if="showM">
        <AlertModal
          :isAsking="isAskingM"
          :onError="onErrorM"
          :message="message"
          @btnConfirm="handleConfirm"
        />
      </div>
    </center>
  </div>
</template>


<script>
//import service from "../services/products";
import upload from "../services/upload";
import AlertModal from "../components/redgie/alertModal.vue";
export default {
  name: "Home",
  components: {
    AlertModal
  },
  data() {
    return {
      message: "Adding product, are you sure you want to cancel ?",
      isAskingM: true,
      showM: false,
      onErrorM: false,
      products: [],
      testArr: [
        {
          id: 0,
          name: "Be Angularized",
          category: "Talks@PN",
          speaker: "Juan dela Cruz",
          emcee: "Nanit Katipunan",
          time: "10:00 AM",
          date: "05/02/2020",
          duration: 3,
          venue: {
            address: "Carmelite Compound",
            building: "Basketball court",
            room: ""
          },
          onlineUrl: "",
          participants: [
            {
              fullName: "Jun Rey Ansing",
              position: "Innovative Technology Trainer",
              company: "Passerelles numeriques"
            },
            {
              fullName: "Rene Abdallah",
              position: "IT/Training Manager",
              company: "Passerelles numeriques"
            },
            {
              fullName: "Marine Le Mezo",
              position: "IT Trainer/Volunteer",
              company: "Passerelles numeriques"
            }
          ],
          description: "This is all about opportunities with Angular "
        },
        {
          id: 1,
          name: "Thank You Ate Jade",
          category: "Despidida Event",
          speaker: "",
          emcee: "Aeromel Laure",
          time: "1:00 PM",
          date: "12/21/2019",
          duration: 3,
          venue: {
            address: "Carmelite Compound",
            building: "Basketball court",
            room: ""
          },
          onlineUrl: "",
          participants: [
            {
              fullName: "Marice Jade Chua",
              position: "General Manager",
              company: "Passerelles numeriques"
            },
            {
              fullName: "Rene Abdallah",
              position: "IT/Training Manager",
              company: "Passerelles numeriques"
            },
            {
              fullName: "Marine Le Mezo",
              position: "IT Trainer/Volunteer",
              company: "Passerelles numeriques"
            }
          ],
          description: "This was a despideda for Ms. Jade Chua, PNP-GM"
        },
        {
          id: 2,
          name: "Job Fair 2020",
          category: "Job Fair",
          speaker: "Orville Avila and others",
          emcee: "Thessa Torre",
          time: "8:00 AM",
          date: "02/10/2020",
          duration: 4,
          venue: {
            address: "USC Talamban",
            building: "LRC Building",
            room: "Audio-Visual Room"
          },
          onlineUrl: "",
          participants: [
            {
              fullName: "Marie Maureen Salvaleon",
              position: "Academic Officer",
              company: "Passerelles numeriques"
            },
            {
              fullName: "Kristoff Peralta",
              position: "Communicatons Officer",
              company: "Passerelles numeriques"
            },
            {
              fullName: "Kristine Roxa",
              position: "3rd Year Educator",
              company: "Passerelles numeriques"
            }
          ],
          description: "OJT-Hunting for Class 2020B"
        },
        {
          id: 3,
          name: "Introduction to AWS",
          category: "Online Class",
          speaker: "Rene Abdallah",
          emcee: "",
          time: "8:00 AM",
          date: "05/03/2020",
          duration: 3,
          venue: {
            address: "Carmelites Compound",
            building: "Main Buiding",
            room: "Computer Lab"
          },
          onlineUrl: "https://www.aws.com",
          participants: [
            {
              fullName: "Jun Rey Ansing",
              position: "Innovative Technology Trainer",
              company: "Passerelles numeriques"
            },
            {
              fullName: "Luke Rafael Alcoseba",
              position: "IT Admin",
              company: "Passerelles numeriques"
            },
            {
              fullName: "Marine Le Mezo",
              position: "IT Trainer/Volunteer",
              company: "Passerelles numeriques"
            }
          ],
          description: "Online class for Amazon Web Services"
        }
      ]
    };
  },
  methods: {
    include() {},
    test() {
      // gapi.load("auth2", function() {
      //   console.log("load..")
      // });
    },
    handleConfirm() {
      this.message = "Message here.";
      this.showM = false;
      this.onErrorM = false;
    },
    onUpload(e) {
      this.file = e.target.files[0];
      //var body = this.file;
      var myform = document.getElementById("myform");
      this.imageUrl = URL.createObjectURL(this.file);
      var body = new FormData(myform);
      body.append("img", this.file);

      upload
        .localImage(body)
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
  }
};
</script>
