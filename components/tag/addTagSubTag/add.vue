<template>
  <v-dialog
    :value="open"
    @keydown="$event.key === 'Escape' && toggle()"
    max-width="900px"
    scrollable
    persistent
  >
    <v-card>
      <v-card-title class="border-title-dialog py-3">Thêm món ăn</v-card-title>
      <v-container class="pt-5 pb-0" fluid>
        <v-row>
          <v-col cols="12" class="pb-0">
            <v-text-field
              v-model="title"
              :error-messages="titleErrors"
              label="Tên món *"
              outlined
              dense
              light
              clearable
              @input="titleErrors = []"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        
        <v-btn text height="30px" class="secondary" @click="toggle">
          <div class="text-none">Đóng</div>
        </v-btn>
        <v-btn text height="30px" class="primary" @click="checkValidate">
          <div class="text-none">Thêm</div>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  props: ['open', 'data'],
  data: () => ({
    title: null,
    titleErrors: []
  }),
  watch: {
    open(value) {}
  },
  methods: {
    toggle() {
      this.$emit('toggle')
      this.reset()
    },
    reset() {
      this.title = null
      this.titleErrors = []
    },

    checkValidate() {
      let hasErrors = false

      if (this.$isNullOrEmpty(this.title)) {
        hasErrors = true
        this.titleErrors = ['Vui lòng nhập nội dung']
      }

      if (!hasErrors) {
        this.add()
      }
    },
    add() {
      let data = {
        tagName: this.title,
        id: this.data.id
      }
      this.$store.dispatch('tag/addsubtag', data).then(response => {
        if (response.response.data.code === 200) {
          this.$router.app.$notify({
            group: 'main',
            type: 'success',
            text: response.response.data.message
          })
          this.$emit('Success')
          this.toggle()
        } else {
          this.$router.app.$notify({
            group: 'main',
            type: 'warning',
            text: response.response.data.message
          })
        }
      })
    }
  }
}
</script>
