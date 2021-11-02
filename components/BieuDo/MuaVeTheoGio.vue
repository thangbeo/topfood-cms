<template>
  <!--  -->

  <div class="chart-container">
    <v-row :key="chartOptions.xaxis.categories.join()">
      <v-col cols="6">
        <h2 class="color"></h2>
      </v-col>
      <v-spacer></v-spacer>
      <!-- <v-col cols="2">
        <v-menu
          v-model="menuDateStart"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="startDate"
              label="Ngày quay"
              readonly
              outlined
              dense
              hide-details
              persistent-hint
              prepend-inner-icon="mdi-calendar-range"
              v-on="on"
            ></v-text-field>
          </template>

          <v-date-picker
            v-model="dateStart"
            @input="menuDateStart = false"
          ></v-date-picker>
        </v-menu>
      </v-col> -->
      <v-col cols="12">
        <apexchart
          type="bar"
          height="350"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data() {
    return {
      menuDateStart: false,
      dateStart: moment().format('YYYY-MM-DD'),
      series: [
        {
          name: 'Số lượng',
          data: []
        }
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: 'bar'
        },
        plotOptions: {
          bar: {
            columnWidth: '80%'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 2
        },
        noData: {
          text: 'Không có dữ liệu'
        },
        tooltip: {
          enabled: true,
          followCursor: true,
          y: {
            formatter: function(val) {
              return new Intl.NumberFormat('en-US').format(val) + ' Vé'
            }
          }
        },
        yaxis: {
          labels: {
            formatter: function(val) {
              let value = parseFloat(val) - parseInt(val)
              if (value === -5) {
                value = 0
                return new Intl.NumberFormat('en-US').format(value)
              } else if (value !== 0) {
                value = ''
              } else {
                return new Intl.NumberFormat('en-US').format(val)
              }
            }
          }
        },
        xaxis: {
          labels: {},
          categories: []
        }
      }
    }
  },
  computed: {
    breakPoint() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 'mobile'
        case 'sm':
          return 'desktop'
        case 'md':
          return 'desktop'
        case 'lg':
          return 'desktop'
        case 'xl':
          return 'desktop'
      }
    },
    startDate() {
      return moment(this.dateStart).format('DD/MM/YYYY')
    }
  },
  mounted() {
    // this.reportMix()
  },
  methods: {
    // reportMix() {
    //   this.chartOptions.xaxis.categories = []
    //   this.series[0].data = []
    //   const data = {
    //     time: moment(this.startDate, 'DD/MM/YYYY').format(
    //       'DD-MM-YYYY_HH:mm:ss'
    //     ),
    //   }
    //   this.$store.dispatch('ChartAPI/TicketByHour', data).then((res) => {
    //     if (res.data.error.code === 0) {
    //       // console.log(res)
    //       let arr = res.data.data.items
    //       let categories = []
    //       for (let i = 0; i < arr.length; i++) {
    //         this.chartOptions.xaxis.categories.push(arr[i].rpt_hour + ' Giờ')
    //         this.series[0].data.push(arr[i].cnt_order)
    //       }
    //     }
    //   })
    // },
  }
}
</script>
<style lang="scss" scoped>
.chart-container {
  width: 100%;
}
.color {
  color: black;
}
</style>
