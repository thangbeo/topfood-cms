<template>
  <v-dialog
    :value="open"
    @keydown="$event.key === 'Escape' && toggle()"
    max-width="850px"
    scrollable
    persistent
  >
    <v-card>
      <v-card-title class="border-title-dialog py-3">Thêm món ăn</v-card-title>
      <v-card-text style="max-height: calc(100vh - 13rem); overflow-x: hidden">
        <v-container class="pt-8 pb-5" fluid>
          <v-row>
            <v-col cols="4"></v-col>
            <v-col
              cols="4"
              class="pt-0"
              style="justify-content: center; text-align: -webkit-center;"
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
                id="input_file_add_subtag"
                class="d-none"
              ></v-file-input>

              <v-col
                cols="12"
                v-if="required"
                class="d-block text-center v-messages theme--light error--text mt-1"
                role="alert"
              >
                <div class="v-messages__wrapper">
                  <div class="v-messages__message">Vui lòng chọn ảnh</div>
                </div>
              </v-col>
            </v-col>
            <v-col cols="4"></v-col>
          </v-row>
          <v-row>
            <v-col cols="1"></v-col>
            <v-col cols="5" class="pb-0">
              <v-text-field
                v-model="title"
                :error-messages="titleErrors"
                label="Tên món ăn *"
                outlined
                dense
                light
                clearable
                @input="titleErrors = []"
              />
            </v-col>
            <v-col cols="5" class="pb-0">
              <v-text-field
                v-model="price"
                :error-messages="priceErrors"
                label="Giá tiền *"
                @input="checkValuePrice($event, 'priceErrors')"
                outlined
                dense
                light
                clearable
              />
            </v-col>
            <v-col cols="1"></v-col>
            <v-col cols="12">
              <vue-editor
                :editor-toolbar="customToolbar"
                v-model="content"
                spellcheck="false"
                placeholder="Nội dung"
                id="vue-2-editor-fix-height-3"
              ></vue-editor>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />

        <v-btn text height="30px" class="primary" @click="checkValidate">
          <div class="text-none">Thêm</div>
        </v-btn>
        <v-btn text height="30px" class="secondary" @click="toggle">
          <div class="text-none">Đóng</div>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Cookies from 'js-cookie'
import BASE from '~/assets/configurations/BASE_URL'
export default {
  props: ['open', 'data'],
  data: () => ({
    BASE,
    title: null,
    price: null,
    titleErrors: [],
    priceErrors: [],
    avatar: null,
    required: false,
    content: null,
    type: null,
    file: null,
    customToolbar: [
      // font size
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      // text direction
      [
        {
          size: [
            '6px',
            '8px',
            '10px',
            '12px',
            '14px',
            '16px',
            '18px',
            '20px',
            '24px',
            '30px',
            '32px',
            '36px'
          ]
        }
      ],
      ['bold', 'italic', 'underline', 'strike'],
      // Bold, italic, underline, strikethrough
      ['blockquote', 'code-block'],
      // Reference, code block
      [{ header: 1 }, { header: 2 }],
      // Title, the form of key-value pairs; 1, 2 represents the font size
      [{ list: 'ordered' }, { list: 'bullet' }],
      // list
      [{ script: 'sub' }, { script: 'super' }],
      // superscript and subscript
      [{ indent: '-1' }, { indent: '+1' }],
      // indent
      [{ direction: 'rtl' }],
      // Several levels of title
      [{ color: [] }, { background: [] }],
      // font color, font background color
      [{ font: [] }],
      // font
      [{ align: [] }],
      // alignment
      ['clean']
      // Clear font style
      // ['image', 'video']
      // Upload pictures, upload videos
    ],
    editorSettings: {
      modules: {
        Size: true
      }
    }
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
      this.required = false
      this.avatar = null
      this.content = null
      this.price = null
      this.priceErrors = []
    },

    checkValidate() {
      let hasErrors = false

      if (this.$isNullOrEmpty(this.title)) {
        hasErrors = true
        this.titleErrors = ['Vui lòng nhập nội dung']
      }
      if (this.$isNullOrEmpty(this.price)) {
        hasErrors = true
        this.priceErrors = ['Vui lòng nhập giá tiền']
      } else if (isNaN(this.price.replace(/,/g, ''))) {
        hasErrors = true
        this.priceErrors = ['Vui lòng nhập đúng định dạng']
      }
      if (this.$isNullOrEmpty(this.avatar)) {
        hasErrors = true
        this.required = true
      }
      if (!hasErrors) {
        this.add()
      }
    },
    add() {
      let data = {
        content: this.content,
        files: [this.avatar],
        id: null,
        name: this.title,
        price: this.price.replace(/,/g, ''),
        tagId: this.data.id
      }
      this.$store.dispatch('tag/addsubtag', data).then(response => {
        if (response.response.status === 200) {
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
            text: 'Hệ thống lỗi'
          })
        }
      })
    },
    // format tiền

    checkValuePrice(e, error) {
      const value = String(e)

      if ((value || []).length !== 0) {
        const numberFormat = value.replace(/,/g, '')

        if (isNaN(numberFormat)) {
          this[error] = ['Vui lòng nhập đúng định dạng']
        } else {
          this[error] = []
          this.price = this.formatNumber({ amount: numberFormat })
        }
      } else {
        this[error] = []
      }
    },

    formatNumber(payload) {
      try {
        const decimalCount = 0
        const thousands = ','
        const decimal = '.'

        const negativeSign = payload.amount < 0 ? '-' : ''

        const i = parseInt(
          (payload.amount = Math.abs(Number(payload.amount) || 0).toFixed(
            decimalCount
          ))
        ).toString()
        const j = i.length > 3 ? i.length % 3 : 0

        return (
          negativeSign +
          (j ? i.substr(0, j) + thousands : '') +
          i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
          (decimalCount
            ? decimal +
              Math.abs(payload.amount - i)
                .toFixed(decimalCount)
                .slice(2)
            : '')
        )
      } catch (e) {
        console.log(e)
      }
    },

    // upload ảnh
    file_selected(file) {
      this.file_img = file.name
      this.required = false
      const formData = new FormData()
      formData.append('file', file)
      const data = { formData }
      this.$store
        .dispatch('app/filesUpload', data)
        .then(response => {
          if (response.response.status === 200) {
            this.avatar = response.response.data.data.path
            this.type = response.response.data.data.type
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
      return window.document.getElementById('input_file_add_subtag').click()
    },
    inputFile(file) {
      if (!this.$isNullOrEmpty(file)) {
        let hasErrors = false

        if (!hasErrors) {
          if (this.$isNullOrEmpty(file)) {
            this.img = URL.createObjectURL(file)
          }
          this.file_selected(file)
        }
      }
    }
  }
}
</script>
