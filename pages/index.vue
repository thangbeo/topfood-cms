<template>
  <v-layout column justify-center align-center>
    <!-- <v-card class="w-100">
      <v-card-text :class="breakPoint === 'mobile' && 'font-size-10px'"> -->
    <div class="chart-container">
      <client-only>
        <div class="mx-2">
          <DoanhSoTheoNgay></DoanhSoTheoNgay>
          <!-- <DoanhSoTheoThang></DoanhSoTheoThang>
          <MuaVeTheoGio></MuaVeTheoGio> -->
        </div>
      </client-only>
    </div>
    <!-- </v-card-text>
    </v-card> -->
  </v-layout>
</template>

<script>
import DoanhSoTheoNgay from '~/components/BieuDo/DoanhSoTheoNgay.vue'
// import DoanhSoTheoThang from '~/components/BieuDo/DoanhSoTheoThang.vue'
// import MuaVeTheoGio from '~/components/BieuDo/MuaVeTheoGio.vue'

import Rules from '~/assets/configurations/Rules.js'
export default {
  transition(to, from) {
    if (!from) {
      return 'slide-x-transition'
    }
    return 'slide-x-reverse-transition'
  },
  data() {
    return {
      Rules,
      tab: 0
    }
  },
  components: {
    DoanhSoTheoNgay
    // DoanhSoTheoThang,
    // MuaVeTheoGio
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

  methods: {}
}
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
}
</style>
