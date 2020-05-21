<template>
  <div>
          <!-- <center><br>
            <v-row>
              <v-col>
                <v-card elevation="10" headline color="red darken-1" height="100" width="100">
                  <br>
                  <h1>15</h1>
                  <v-icon color="red darken-1" class="d-arrow">mdi-send</v-icon>
                  <h6 color="white">Orders</h6>
                </v-card>
              </v-col>
              <v-col>
                <v-card elevation="10" headline color="blue darken-1" height="100" width="100">
                  <br>
                  <h1>15</h1>
                  <v-icon color="blue darken-1" class="d-arrow">mdi-send</v-icon>
                  <h6>Products</h6>
                </v-card>
              </v-col>
              <v-col>
                <v-card elevation="10" headline color="orange" height="100" width="100">
                  <br>
                  <h1>15</h1>
                  <v-icon color="orange" class="d-arrow">mdi-send</v-icon>
                  <h6>Suppliers</h6>
                </v-card>
              </v-col>
              <v-col>
                <v-card elevation="10" headline color="#3939ac" height="100" width="100">
                  <br>
                  <h1>15</h1>
                  <v-icon color="#3939ac" class="d-arrow">mdi-send</v-icon>
                  <h6>Customers</h6>
                </v-card>
              </v-col>
            </v-row> -->
            <!-- up ward arrow -->
            <!-- <br>
            <v-row>
              <v-col>
                <v-icon color="black">mdi-checkbox-blank-circle</v-icon>
              </v-col>
              <v-col>
                <v-icon color="black">mdi-checkbox-blank-circle</v-icon>
              </v-col>
              <v-col>
                <v-icon color="black">mdi-checkbox-blank-circle</v-icon>
              </v-col>
              <v-col>
                <v-icon color="black">mdi-checkbox-blank-circle</v-icon>
              </v-col>
            </v-row>
            <hr color="black" class="line"> -->
            <!-- <br> -->
            <!-- <v-row>
              <v-col>
                <h6>Customers</h6>
                <v-icon color="green darken-1" class="u-arrow">mdi-send</v-icon>
                <v-card class="up-card" headline color="green darken-1" height="100" width="100">
                  <br>
                  <h1>15</h1>
                </v-card>
              </v-col>
              <v-col>
                <h6>Cancelled Orders</h6>
                <v-icon color="secondary" class="u-arrow">mdi-send</v-icon>
                <v-card class="up-card" headline color="secondary" height="100" width="100">
                  <br>
                  <h1>15</h1>
                </v-card>
              </v-col>
              <v-col>
                <h6>Customers</h6>
                <v-icon color="#c2d6d6" class="u-arrow">mdi-send</v-icon>
                <v-card class="up-card" headline color="#c2d6d6" height="100" width="100">
                  <br>
                  <h1>15</h1>
                </v-card>
              </v-col>
              <v-col>
                <h6>Customers</h6>
                <v-icon color="#1a8cff" class="u-arrow">mdi-send</v-icon>
                <v-card class="up-card" headline color="#1a8cff" height="100" width="100">
                  <br>
                  <h1>15</h1>
                </v-card>
              </v-col>
            </v-row>
          </center> -->
  </div>
</template>
<script>
import Chart from "primevue/chart";
export default {
  name: "dashboard",
  components: {
    Chart
  },
  data() {
    return {
      message: "Message here.",
      showM: false,
      onErrorM: false,
      monthNames: ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ],
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            type: "line",
            label: "Average",
            borderColor: "orange",
            borderWidth: 2,
            fill: false,
            data: [50, 25, 12, 48, 56, 76, 42]
          },
          {
            type: "bar",
            label: "T-shirt",
            backgroundColor: "#3939ac",
            data: [21, 84, 24, 75, 37, 65, 34],
            borderColor: "white",
            borderWidth: 2
          },
          {
            type: "bar",
            label: "Male Shoes",
            backgroundColor: "#00b300",
            data: [41, 52, 24, 74, 23, 21, 32],
            borderColor: "white",
            borderWidth: 2
          }
        ]
      },
      portfolioData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            type: "line",
            label: "Average",
            borderColor: "black",
            borderWidth: 2,
            fill: false,
            data: [50, 25, 12, 48, 56, 76, 42]
          },
          {
            type: "bar",
            label: "Capital",
            backgroundColor: "#3939ac",
            data: [21, 84, 24, 75, 37, 65, 34],
            borderColor: "white",
            borderWidth: 2
          },
          {
            type: "bar",
            label: "Sales",
            backgroundColor: "red",
            data: [41, 52, 24, 74, 23, 21, 32],
            borderColor: "white",
            borderWidth: 2
          }
        ]
      },
      todayData: {
        labels: [
          "Today"
        ],
        datasets: [
          {
            type: "bar",
            label: "T-shirt",
            backgroundColor: "#3939ac",
            data: [72],
            borderColor: "white",
            borderWidth: 2
          },
          {
            type: "bar",
            label: "Male Shoes",
            backgroundColor: "#1ac6ff",
            data: [64],
            borderColor: "white",
            borderWidth: 2
          },
          {
            type: "bar",
            label: "Female Shoes",
            backgroundColor: "#ff3300",
            data: [62],
            borderColor: "white",
            borderWidth: 2
          },
          {
            type: "bar",
            label: "Safe Guard",
            backgroundColor: "#999900",
            data: [53],
            borderColor: "white",
            borderWidth: 2
          },
          {
            type: "bar",
            label: "Eggs",
            backgroundColor: "#9900ff",
            data: [41],
            borderColor: "white",
            borderWidth: 2
          },
          {
            type: "bar",
            label: "Coca cola",
            backgroundColor: "#669999",
            data: [40],
            borderColor: "white",
            borderWidth: 2
          },
          {
            type: "bar",
            label: "Cantoon",
            backgroundColor: "#0000ff",
            data: [38],
            borderColor: "white",
            borderWidth: 2
          },
          {
            type: "bar",
            label: "Butter coconut",
            backgroundColor: "#00b300",
            data: [38],
            borderColor: "white",
            borderWidth: 2
          }
        ]
      },
      monthData: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
          // {
          //   type: "line",
          //   label: "Average",
          //   borderColor: "orange",
          //   borderWidth: 2,
          //   fill: false,
          //   data: [50, 25, 12, 48]
          // },
          {
            type: "bar",
            label: "T-shirt",
            backgroundColor: "#3939ac",
            data: [21, 84, 24, 75],
            borderColor: "white",
            borderWidth: 2
          },
          {
            type: "bar",
            label: "Male Shoes",
            backgroundColor: "#00b300",
            data: [41, 52, 24, 74],
            borderColor: "white",
            borderWidth: 2
          },
          {
            type: "bar",
            label: "Male Shoes",
            backgroundColor: "#5c00e6",
            data: [45, 59, 30, 60],
            borderColor: "white",
            borderWidth: 2
          }
        ]
      },
      portfolioOpt: {
        responsive: true,
        title: {
          display: true,
          text: `Porfolio Report`
        },
        tooltips: {
          mode: "index",
          intersect: true
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      },
      monthOpt: {
        responsive: true,
        title: {
          display: true,
          text: `Monthly Sales`
        },
        tooltips: {
          mode: "index",
          intersect: true
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      },
      todayOpt: {
        responsive: true,
        title: {
          display: true,
          text: "Daily Top 7 Sales as of " + new Date().toDateString()
        },
        tooltips: {
          mode: "index",
          intersect: true
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      },
      chartOptions: {
        responsive: true,
        title: {
          display: true,
          text: "Sales"
        },
        tooltips: {
          mode: "index",
          intersect: true
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    };
  }
};
</script>

