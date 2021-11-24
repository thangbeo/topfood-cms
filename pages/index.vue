<template>
  <v-layout column justify-center align-center>
    <div class="chart-container">
      <client-only> </client-only>
    </div>
  </v-layout>
</template>

<script>
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
  components: {},
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
