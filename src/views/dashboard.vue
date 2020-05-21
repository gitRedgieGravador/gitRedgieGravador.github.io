<template>
  <div id="dashboard">
    <v-row>
      <v-col cols="4">
        <div>
          <v-card elevation="10" height="190" class="mb-5 pa-2" tile>
            <div class="ml-10">
              <br>
              <h4>MONTHLY SALE</h4>
              <hr color="red">
              <v-row>
                <v-col>
                  <h2>1000</h2>
                  <div>
                    <h6>
                      Total monthly income
                      <br>
                      as of {{new Date().toDateString()}}
                    </h6>
                  </div>
                </v-col>
                <v-col class="text-right mr-5">
                  <div>
                    <v-icon color="red" class="dash-icon">mdi-cash-multiple</v-icon>

                  </div>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </div>
        <div>
          <v-card elevation="10" height="190" class="mb-5 pa-2" tile>
            <div class="ml-10">
              <br>
              <h4>ACCUMULATED SALE</h4>
              <hr color="green">
              <v-row>
                <v-col>
                  <h2>1000</h2>
                  <div>
                    <h6>
                      Overall income
                      <br>
                      as of {{new Date().toDateString()}}
                    </h6>
                  </div>
                </v-col>
                
                <v-col class="text-right mr-5">
                  <v-icon color="green" class="dash-icon">mdi-bank</v-icon>
                  
                </v-col>
              </v-row>
            </div>
          </v-card>
        </div>
      </v-col>
      <v-col cols="8">
        <v-card elevation="10" tile height="400">dfbhdf</v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-card elevation="10" tile height="450" color="primary darken-1">
          <v-date-picker full-width color="primary darken-1" v-model="picker"></v-date-picker>
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-card elevation="10" tile height="100%">
          <Chart type="bar" :data="portfolioData" :options="portfolioOpt"/>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<style scoped>
.line {
  position: relative;
  margin-top: -25px;
  width: 78%;
}
.up-card {
  position: relative;
  margin-top: -8%;
}
.d-arrow {
  position: relative;
  transform: rotate(90deg);
  margin-top: 10%;
  font-size: 45px;
}
.u-arrow {
  position: relative;
  transform: rotate(-90deg);
  /* margin-top: -10%; */
  font-size: 45px;
}
.dash-icon {
  font-size: 80px !important;
}
.dol-sign {
  position: relative;
  left: -53px !important;
}
</style>

<script>
import Chart from "primevue/chart";
export default {
  name: "dashboard",
  components: {
    Chart
  },
  data() {
    return {
      picker: new Date().toISOString().substr(0, 10),
      message: "Message here.",
      showM: false,
      onErrorM: false,
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
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
            data: [21, 98, 24, 75, 37, 65, 34],
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
        labels: ["Today"],
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

