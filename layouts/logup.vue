<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <client-only>
          <notifications
            group="login"
            :duration="10000"
            position="top right"
            :max="5"
          />
        </client-only>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  created() {
    // this.$vuetify.theme.dark = false
  }
}
</script>

<style scoped>
body {
  background: white;
}
</style>
