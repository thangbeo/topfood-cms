<template>
  <v-dialog
    :value="open"
    @keydown="$event.key === 'Escape' && toggle()"
    max-width="900px"
    scrollable
    persistent
  >
    <v-card>
      <v-card-title class="border-title-dialog py-3">
        Cập nhật quyền
      </v-card-title>
      <v-container class="pt-5 pb-0" fluid>
        <v-row>
          <v-col cols="12" sm="6" md="6" class="pb-0">
            <v-text-field
              v-model="title"
              :error-messages="titleErrors"
              label="Tên quyền *"
              outlined
              dense
              light
              clearable
              @input="titleErrors = []"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6" class="pb-0">
            <v-text-field
              v-model="description"
              :error-messages="descriptionErrors"
              label="Mô tả *"
              outlined
              dense
              light
              clearable
              @input="descriptionErrors = []"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>

        
        <v-btn text height="30px" class="secondary" @click="toggle">
          <div class="text-none">Đóng</div>
        </v-btn>
        <v-btn text height="30px" class="primary" @click="checkValidate">
          <div class="text-none">Lưu</div>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  name: 'update',

  props: ['open', 'data'],
  data: () => ({
    titleErrors: [],
    title: null,
    description: null,
    descriptionErrors: []
  }),
  watch: {
    open(value) {
      if (value) {
        this.title = this.data.title
        this.description = this.data.description
      }
    }
  },
  methods: {
    toggle() {
      this.$emit('toggle')
      this.reset()
    },
    reset() {
      this.titleErrors = []
      this.title = null
      this.description = null
      this.descriptionErrors = []
    },

    // validate

    checkValidate() {
      let hasErrors = false

      if (this.$isNullOrEmpty(this.title)) {
        hasErrors = true
        this.titleErrors = ['Vui lòng nhập nội dung']
      }

      if (this.$isNullOrEmpty(this.description)) {
        hasErrors = true
        this.descriptionErrors = ['Vui lòng nhập nội dung']
      }

      if (!hasErrors) {
        let data = {
          description: this.description,
          title: this.title,
          id: this.data.id
        }
        this.$store.dispatch('rule/updateRule', data).then(response => {
          console.log(response)
          if (response.status === 200) {
            this.$router.app.$notify({
              group: 'main',
              type: 'success',
              text: 'Cập nhật thành công'
            })
            this.$emit('success')
            this.toggle()
          } else {
            this.$router.app.$notify({
              group: 'main',
              type: 'warning',
              text: response.message
            })
          }
        })
      }
    }
  }
}
</script>
