<template>
  <v-dialog
    :value="open"
    :hide-overlay="false"
    fullscreen
    persistent
    scrollable
    no-click-animation
    :transition="false"
    @keydown="$event.key === 'Escape' && toggle()"
  >
    <v-overlay :value="open"></v-overlay>
    <v-card
      class="dialog-right-content-height"
      tile
      flat
      :style="`position: fixed; right: 0; min-width: ${width} !important; width: ${width} !important; z-index: inherit`"
    >
      <v-card-title>
        <div class="fs-17 font-weight-bold">{{ title }}</div>
        <div class="flex-grow-1"></div>
        <div v-if="crud">
          <v-btn min-width="90px" depressed color="primary">Lưu</v-btn>
          <v-btn min-width="90px" depressed color="secondary" @click="toggle">
            Đóng
          </v-btn>
        </div>
        <div v-else>
          <v-btn depressed icon @click="toggle">
            <v-icon size="26" color="black">mdi-close</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions> </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'No Title',
    },
    open: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '700px',
    },
    right: {
      type: Boolean,
      default: true,
    },
    crud: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggle() {
      this.$emit('toggle')
    },
  },
}
</script>

<style lang="scss">
.dialog-right-content-height {
  .v-data-table--fixed-header .v-data-table__wrapper {
    max-height: calc(100vh - 300px) !important;
  }
}
</style>
