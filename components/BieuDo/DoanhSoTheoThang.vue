<template>
  <div class="chart-container">
    <!-- <client-only> -->
    <v-row :key="chartOptions.xaxis.categories.join()">
      <v-col cols="6">
        <h2 class="color"></h2>
      </v-col>
      <v-col cols="12">
        <apexchart
          type="bar"
          height="350"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </v-col>
    </v-row>
    <!-- </client-only> -->
  </div>
  <!-- </v-card> -->
</template>
<script>
import moment from 'moment'
export default {
  data() {
    return {
      series: [
        {
          name: 'Doanh Số',
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
              return new Intl.NumberFormat('en-US').format(val) + ' VND'
            }
          }
        },
        yaxis: {
          labels: {
            formatter: function(val) {
              return new Intl.NumberFormat('en-US').format(val)
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
    //     time_type: 2,
    //   }
    //   this.$store.dispatch('ChartAPI/revenueByDay', data).then((res) => {
    //     if (res.data.error.code === 0) {
    //       // console.log(res)
    //       let arr = res.data.data.items
    //       let categories = []
    //       for (let i = 0; i < arr.length; i++) {
    //         this.chartOptions.xaxis.categories.push(
    //           'Tháng: ' + arr[i].date_report
    //         )
    //         this.series[0].data.push(arr[i].revenue_online)
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
