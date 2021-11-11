<template>
  <v-dialog
    :value="open"
    @keydown="$event.key === 'Escape' && toggle()"
    max-width="70rem"
    scrollable
    persistent
  >
    <!-- style="min-height: calc(100vh - 11rem); overflow-x: hidden" -->
    <v-card>
      <v-card-title class="border-title-dialog py-3"
        >Thêm bài viết</v-card-title
      >
      <v-card-text
        class="pb-0"
        style="max-height: calc(100vh - 13rem); overflow-x: hidden"
      >
        <v-container class="pt-8 pb-2" fluid>
          <v-row>
            <div class="ml-10 mt-2">
              <v-row>
                <v-col cols="10" class="py-0 pl-2 pr-2">
                  <v-card
                    outlined
                    height="140"
                    width="75rem"
                    style="
                    overflow-y: auto;
                    background-color: #f5f7fe;
                    border: none;
                  "
                    class="d-flex align-center"
                  >
                    <div
                      v-if="images.length < maxrequied"
                      class="d-flex justify-center"
                    >
                      <!-- <icon-select-file></icon-select-file> -->
                      <div
                        class="ml-4"
                        style="
                          border: 2px dashed rgb(152, 157, 235);
                          border-radius: 10px;
                          cursor: pointer;
                          height: 120px; width: 120px;
                        "
                        @click="select_file"
                      >
                        <v-row
                          class="ma-0"
                          justify="center"
                          align="center"
                          style="height:120px; width: 120px;"
                        >
                          <v-col cols="12" class="d-flex justify-center">
                            <div>
                              <v-icon size="50" color="primary">
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
                    </div>

                    <div
                      v-for="(image, idx) in slider_id"
                      :key="`${idx} + ${image}`"
                    >
                      <v-img
                        :src="`${BASE.URL}${image.path}`"
                        class="ml-2 "
                        height="120"
                        width="120"
                        style="border-radius: 10px;"
                      />

                      <v-icon
                        style="
                            cursor: pointer;
                            position: absolute;
                            top: 10px;
                            margin-left: 108px;
                          "
                        size="20"
                        color="error"
                        @click="delete_img_slider(idx)"
                      >
                        mdi-close-circle
                      </v-icon>
                    </div>
                  </v-card>
                  <div
                    class="v-messages theme--light error--text mt-2 mb-5 ml-2"
                    role="alert"
                  >
                    <div class="v-messages__wrapper">
                      <div class="v-messages__message">
                        {{ error_msg_slider }}
                      </div>
                    </div>
                  </div>
                  <v-file-input
                    id="input_file"
                    accept="image/png, image/jpeg"
                    class="d-none"
                    @change="inputFile"
                  ></v-file-input>
                </v-col>
              </v-row>
            </div>
          </v-row>
          <v-row>
            <v-col cols="12" class="pt-0">
              <v-autocomplete
                light
                deletable-chips
                chips
                label="Danh mục món ăn"
                small-chips
                no-data-text="Không có dữ liệu"
                clearable
                class="fs-14"
                item-text="tagName"
                item-value="id"
                outlined
                :menu-props="{ zIndex: '203' }"
                multiple
                hide-details
                :items="listTag"
                v-model="tag"
              >
              </v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
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
import Vue from 'vue'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'

Vue.use(Viewer)
import BASE from '~/assets/configurations/BASE_URL'
import IconSelectFile from '~/components/icon/SelectFile'
import Draggable from 'vuedraggable'
export default {
  components: {
    IconSelectFile,
    Draggable
  },
  props: ['open'],
  data: () => ({
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
    },
    BASE,
    maxrequied: 6,
    title: null,
    avatar: null,
    content: null,
    img: null,
    file: null,
    titleErrors: [],
    hidden: false,
    reset_file: null,
    img: '',
    error_msg_slider: '',
    images: [],
    limited_msg: '',
    is_list_slider_id: [],
    list_slider_id: [],
    img_slider: [],
    slider_id: [],
    is_slider_id: [],

    required_img: false,
    tag: [],
    listTag: []
  }),
  watch: {
    open() {
      this.get_list()
    }
  },
  methods: {
    remove(item) {
      const index = this.tag.indexOf(item.id)
      if (index >= 0) this.tag.splice(index, 1)
    },
    get_list() {
      this.$store
        .dispatch('tag/getListTag', {
          page: 0,
          pageSize: 10000,
          enable: false,
          tagName: ''
        })
        .then(response => {
          if (response.status === 200) {
            this.listTag = response.data.data
          } else {
            this.$router.app.$notify({
              group: 'main',
              type: 'warning',
              text: 'Lỗi hệ thống'
            })
          }
        })
    },

    delete_img_slider(index) {
      this.slider_id.splice(index, 1)
      this.reset_file = []
    },
    select_file() {
      return window.document.getElementById('input_file').click()
    },

    inputFile(files) {
      let hasErrors = false
      if ((files || []).length !== 0) {
        if (files.size > 3145728) {
          hasErrors = true
          this.error_msg_slider = 'File được chọn không được vượt quá 3MB'
        }
      }
      if (!hasErrors) {
        this.error_msg_slider = ''
        const formData = new FormData()

        formData.append('file', files)

        const data = { formData }
        this.$store
          .dispatch('app/filesUpload', data)
          .then(response => {
            if (response.response.status === 200) {
              this.slider_id.unshift(response.response.data.data)
            }
          })
          .catch(e => {
            this.$log.debug(e)
          })
      }
    },
    toggle() {
      this.$emit('toggle')
      this.reset()
    },

    reset() {
      this.content = null

      this.slider_id = []
      this.tag = null
    },

    checkValidate() {
      let hasErrors = false
      if (!hasErrors) {
        this.add()
      }
    },
    add() {
      let files = []

      for (let i = 0; i < this.slider_id.length; i++) {
        files.push(this.slider_id[i].path)
      }
      let data = {
        content: this.content,
        files,
        id: null,
        tagIds: this.tag
      }
      this.$store.dispatch('post/addPost', data).then(response => {
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
            text: 'Lỗi hệ thống'
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 6px !important;
  height: 6px !important;
}
::-webkit-scrollbar-thumb {
  background: #c4c4c4 !important;
  border-radius: 10px !important;
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
  z-index: 1;
}
</style>
