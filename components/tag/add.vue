<template>
  <v-dialog
    :value="open"
    @keydown="$event.key === 'Escape' && toggle()"
    max-width="800px"
    scrollable
    persistent
  >
    <!-- style="min-height: calc(100vh - 11rem); overflow-x: hidden" -->
    <v-card>
      <v-card-title class="border-title-dialog py-3"
        >Thêm hash tag</v-card-title
      >
      <v-card-text
        class="pb-0"
        style="max-height: calc(100vh - 13rem); overflow-x: hidden"
      >
        <v-container class="pt-8 " fluid>
          <v-row>
            <v-col cols="4"></v-col>
            <v-col
              cols="4"
              class="py-0"
              style="justify-content: center; display: flex;"
            >
              <div
                v-if="$isNullOrEmpty(avatar)"
                style="
                          border: 2px dashed rgb(152, 157, 235);
                          border-radius: 10px;
                          height:150px; width: 150px;
                        "
                @click="selectFileOpen"
              >
                <v-row
                  class="ma-0"
                  justify="center"
                  align="center"
                  style="height:150px; width: 150px;"
                >
                  <v-col cols="12" class="d-flex justify-center">
                    <div>
                      <v-icon size="65" color="primary">
                        mdi-cloud-upload
                      </v-icon>
                    </div>
                  </v-col>
                  <v-col cols="12" class="d-flex justify-center pt-0">
                    <div class="primary--text text-none">
                      Tải ảnh lên
                    </div>
                  </v-col>
                </v-row>
              </div>
              <div v-else>
                <img
                  v-viewer
                  style=" height:auto; width: 150px;  object-fit: contain;"
                  :src="`${BASE.URL}${avatar}`"
                />

                <v-btn
                  class="text-none white--text"
                  height="32"
                  style="color: #286cae"
                  v-if="!$isNullOrEmpty(avatar)"
                  depressed
                  block
                  color="primary"
                  @click="selectFileOpen"
                >
                  Chỉnh sửa
                </v-btn>
              </div>

              <v-file-input
                :value="file"
                @change="inputFile($event)"
                accept="image/png, image/jpeg, image/gif"
                id="input_customer_information_file"
                class="d-none"
              ></v-file-input>
            </v-col>
            <v-col cols="4"></v-col>
          </v-row>
          <v-row>
            <v-col cols="3"></v-col>
            <v-col cols="6" class="pb-0">
              <v-text-field
                v-model="title"
                :error-messages="titleErrors"
                label="Tên hash tag *"
                outlined
                dense
                light
                clearable
                @input="titleErrors = []"
              />
            </v-col>
            <v-col cols="3"></v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />

        
        <v-btn text height="30px" class="secondary" @click="toggle">
          <div class="text-none">Đóng</div>
        </v-btn>
        <v-btn
          text
          height="30px"
          class="primary"
          :loading="$wait.is('logging')"
          @click="checkValidate"
        >
          <div class="text-none">Thêm</div>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from 'vue'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'

Vue.use(Viewer)
import BASE from '~/assets/configurations/BASE_URL'
export default {
  props: ['open'],
  data: () => ({
    BASE,
    title: null,
    avatar: null,
    img: null,
    file: null,
    titleErrors: [],
    hidden: false,
    reset_file: null,
    img: '',
    limited_msg: '',
    required_img: false,
    logging: false
  }),
  watch: {},
  methods: {
    file_selected(file) {
      this.file_img = file.name
      this.required_img = false
      const formData = new FormData()
      formData.append('file', file)
      const data = { formData }
      this.$store
        .dispatch('app/filesUpload', data)
        .then(response => {
          console.log(response.response.status)
          if (response.response.status === 200) {
            this.avatar = response.response.data.data.path
          } else {
            this.$router.app.$notify({
              group: 'main',
              type: 'warning',
              text: 'Lỗi hệ thống'
            })
          }
        })
        .catch(e => {
          this.$log.debug(e)
        })
    },
    selectFileOpen() {
      return window.document
        .getElementById('input_customer_information_file')
        .click()
    },
    inputFile(file) {
      if (!this.$isNullOrEmpty(file)) {
        this.hidden = false
        let hasErrors = false

        if ((file.size || 0) > 3145728) {
          hasErrors = true
          this.limited_msg = 'File được chọn không được vượt quá 3MB'
        }

        if (!hasErrors) {
          this.limited_msg = ''
          this.reset_file = file

          if (this.$isNullOrEmpty(file)) {
            this.img = URL.createObjectURL(file)
          }
          this.file_selected(file)
        }
      }
    },

    toggle() {
      this.$emit('toggle')
      this.reset()
    },

    reset() {
      this.title = null
      this.titleErrors = []
      this.avatar = null
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
      this.$wait.start('logging')
      let data = {
        tagName: this.title,
        image: this.avatar
      }
      this.$store
        .dispatch('tag/addTag', data)
        .then(response => {
          if (response.status === 200) {
            this.$router.app.$notify({
              group: 'main',
              type: 'success',
              text: 'Thêm thành công'
            })
            this.$emit('success')
            this.toggle()
          } else {
            this.$router.app.$notify({
              group: 'main',
              type: 'warning',
              text: 'Lỗi hệ thống'
            })
          }
        })
        .catch(e => {
          this.$log.debug(e)
        })
        .finally(() => {
          this.$wait.end('logging')
        })
    }
  }
}
</script>
