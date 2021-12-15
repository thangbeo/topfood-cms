<template>
  <v-dialog
    :value="open"
    @keydown="$event.key === 'Escape' && toggle()"
    max-width="900px"
    scrollable
    persistent
  >
    <v-card>
      <v-card-title class="border-title-dialog py-3"
        >Cập nhật hash tag</v-card-title
      >
      <v-card-text style="max-height: calc(100vh - 13rem); overflow-x: hidden">
        <v-container class="pt-8 pb-5" fluid>
          <v-row>
            <v-col cols="4"></v-col>
            <v-col
              cols="4"
              class="pt-0"
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
                  :src="avatar.includes('http://58.84.1.32:8080') ?  `${BASE.URL}${avatar}` : `${avatar}`"
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

          <v-row>
            <v-col cols="12" class="mb-5 px-0">
              <v-data-table
                :headers="headers"
                :items="items"
                hide-default-footer
                :loading="$wait.is('loadingUser')"
                loading-text="Xin chờ..."
                sort-by="stt"
                :search="search"
                no-results-text="Không có kết quả phù hợp"
                no-data-text="Không có dữ liệu"
                class="elevation-0 custom_header_table"
                fixed-header
                light
              >
                <template v-slot:top>
                  <v-app-bar flat color="white">
                    <v-toolbar-title>Món ăn</v-toolbar-title>
                    <div class="flex-grow-1"></div>
                    <v-text-field
                      v-model="search"
                      label="Tên món ăn"
                      class="pr-2"
                      style="max-width: 250px"
                      dense
                      outlined
                      hide-details
                      clearable
                    />

                    <v-btn
                      v-if="role === 'ROLE_STORE'"
                      depressed
                      color="primary"
                      class="text-none"
                      @click="openAdd = true"
                    >
                      Thêm mới
                    </v-btn>
                  </v-app-bar>
                </template>

                <template v-slot:[`item.stt`]="{ item }">
                  <div class="d-flex align-center justify-center">
                    {{ getItemIndex(item) }}
                  </div>
                </template>
                <template v-slot:[`item.price`]="{ item }">
                  <div>{{ $formatMoney({ amount: item.price }) }}</div>
                </template>
                <template v-slot:[`item.files`]="{ item }">
                  <template v-for="i in item.files">
                    <img
                      class="mt-2"
                      :key="i.id"
                      width="160"
                      height="80px"
                      style="object-fit: contain;"
                      v-viewer
                      :src="`${BASE.URL}${i}`"
                    />
                  </template>
                </template>
                <template v-slot:[`item.action`]="{ item }">
                  <v-tooltip v-if="role === 'ROLE_STORE'" bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon
                        color="primary"
                        class="mr-2"
                        @click="OpenUpdate(item)"
                        v-on="on"
                      >
                        mdi-pencil
                      </v-icon>
                    </template>
                    <span>Cập nhật</span>
                  </v-tooltip>
                  <v-tooltip v-if="role === 'ROLE_STORE'" bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        color="primary"
                        v-ripple
                        icon
                        small
                        @click="OpenDeleteItem(item)"
                      >
                        <v-icon v-on="on">mdi-delete</v-icon>
                      </v-btn>
                    </template>
                    <span>Xóa</span>
                  </v-tooltip>
                </template>
              </v-data-table>
            </v-col>
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
          <div class="text-none">Lưu</div>
        </v-btn>
      </v-card-actions>
      <yes-no-alert
        :open="alertOpenDelete"
        @toggle="alertOpenDelete = !alertOpenDelete"
        :alertMsg="alertdelete"
        @OK="confirmDelete"
      />
    </v-card>
    <add
      :open="openAdd"
      :data="data"
      @toggle="openAdd = !openAdd"
      @success="detail"
    ></add>
    <update
      :open="openUpdated"
      :data="dataDetail"
      @toggle="openUpdated = !openUpdated"
      @success="detail"
    ></update>
  </v-dialog>
</template>

<script>
import BASE from '~/assets/configurations/BASE_URL'
import add from '~/components/tag/updateTagSubTag/add.vue'
import update from '~/components/tag/updateTagSubTag/update.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    add,
    update
  },
  props: ['open', 'data'],
  data: () => ({
    BASE,
    logging: false,
    title: null,
    titleErrors: [],
    items: [],
    search: null,
    name: null,
    openAdd: false,
    alertOpenDelete: false,
    alertdelete: null,
    openUpdated: false,
    dataDetail: {},
    avatar: null,
    img: null,
    file: null,
    role: null
  }),
  watch: {
    open(value) {
      if (value) {
        this.role = Cookies.get('userGroup')
        this.avatar = this.data.image
        
        this.detail()
      }
    }
  },
  computed: {
    headers() {
      return [
        { text: 'STT', sortable: false, value: 'stt', width: '5%' },
        {
          text: 'Hình ảnh',
          sortable: false,
          value: 'files',
          width: 100,
          align: 'center'
        },
        { text: 'Tên món ăn', sortable: false, value: 'name', width: 100 },
        {
          text: 'Giá tiền (VNĐ)',
          sortable: false,
          value: 'price',
          width: 100,
          align: 'center'
        },
        {
          text: 'Chức năng',
          value: 'action',
          sortable: false,
          align: 'center',
          width: 80
        }
      ]
    }
  },
  methods: {
    getItemIndex(item) {
      // return (this.page - 1) * this.itemsPerPage + this.items.indexOf(item) + 1
      return this.items.indexOf(item) + 1
    },
    OpenDeleteItem(value) {
      this.dataItem = value
      this.alertOpenDelete = true
      this.alertdelete = `Bạn có chắc chắn muốn xóa món " ${this.dataItem.name} " này không?`
    },
    OpenUpdate(value) {
      this.dataDetail = value
      this.openUpdated = true
    },
    confirmDelete() {
      this.$store
        .dispatch('tag/deleteSubTag', { foodId: this.dataItem.id })
        .then(response => {
          if (response.response.status === 200) {
            this.$router.app.$notify({
              group: 'main',
              type: 'success',
              text: 'Xóa thành công'
            })
            this.detail()
          } else {
            this.$router.app.$notify({
              group: 'main',
              type: 'warning',
              text: 'Hệ thống lỗi'
            })
          }
        })
    },
    changePageSize(value) {
      this.page = 1
      this.itemsPerPage = value
      this.$refs.paginationMA.reset()
      this.detail()
    },
    changePage(value) {
      this.page = value
      this.detail()
    },
    detail() {
      this.$store.dispatch('tag/detailTag', this.data.id).then(response => {
        if (response.status === 200) {
          this.title = response.data.tagName
          this.items = response.data.foods
        } else {
          this.$router.app.$notify({
            group: 'main',
            type: 'warning',
            text: 'Lỗi hệ thống'
          })
        }
      })
    },

    file_selected(file) {
      this.file_img = file.name
      this.required_img = false
      const formData = new FormData()
      formData.append('file', file)
      const data = { formData }
      this.$store
        .dispatch('app/filesUpload', data)
        .then(response => {
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
        id: this.data.id,
        image: this.avatar
      }
      this.$store
        .dispatch('tag/updateTag', data)
        .then(response => {
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
