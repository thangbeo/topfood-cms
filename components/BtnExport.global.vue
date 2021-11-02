<template>
  <v-btn
      v-if="view"
      class="mt-3 pr-2 pl-0 text-none white--text fs-13 font-weight-regular"
      small
      depressed
      :loading="loading"
      :disabled="(items.length === 0 || loading || check)"
      color="#2b8c8f"
      @click="exportFile"
  >
    <v-icon
        class="mr-2"
        size="19"
        :style="
        items.length === 0 ? 'width: 2.0625rem' :
        'display: inline-block; width: 2.0625rem; line-height: 1.5rem; text-align: center; background-color: rgba(0,0,0,.2); border-bottom-left-radius: .25rem; border-top-left-radius: .25rem' "
    >
      {{ icon }}
    </v-icon>
    {{ textContent }}
    <template v-slot:loader>
      <span>{{ textLoading }}</span>
    </template>
  </v-btn>
</template>

<script>
  export default {
    props: {
      textContent: {
        type: String,
        default: 'Xuất file excel'
      },
      loading: {
        type: Boolean,
        default: false
      },
      items: {
        type: Array,
        default: Array
      },
      textLoading: {
        type: String,
        default: 'Xin chờ...'
      },
      icon: {
        type: String,
        default: 'mdi-file-move-outline'
      },
      view: {
        type: Boolean,
        default: true
      },
      check: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      exportFile() {
        this.$emit('export-file')
      }
    }
  }
</script>
