<template>
  <div v-if="role !== 'ROLE_USER'">
    <client-only>
      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="pageSize"
        hide-default-footer
        :loading="$wait.is('loadingUser')"
        loading-text="Xin chờ..."
        sort-by="stt"
        no-results-text="Không có kết quả phù hợp"
        no-data-text="Không có dữ liệu"
        class="elevation-0 custom_header_table"
        fixed-header
        light
      >
        <template v-slot:top>
          <v-app-bar flat color="white">
            <!--            <v-toolbar-title>Quản lý tài khoản</v-toolbar-title>-->

            <div class="flex-grow-1"></div>

            <v-text-field
              v-model="tagName"
              label="Tên danh mục"
              class="pr-2 fs-14"
              style="max-width: 250px"
              dense
              outlined
              hide-details
              clearable
              @keydown.enter="get_list"
            />
            <v-select
              v-model="status"
              :items="listStatus"
              label="Hiển thị/Ẩn"
              style="max-width: 250px"
              class="mr-2 fs-14 "
              dense
              outlined
              hide-details
            >
            </v-select>
            <v-btn
              @click="search"
              depressed
              color="primary"
              class="text-none mr-2"
            >
              Tìm kiếm
            </v-btn>
            <v-btn
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
        <template v-slot:[`item.enable`]="{ item }" class="text-center">
          <div style="display: flex;    justify-content: center;">
            <v-select
              v-model="item.enable"
              :items="listStatus"
              solo
              dense
              flat
              background-color="#F9F9F9"
              hide-details
              style="max-width: 120px"
              class=" border-1 fs-14"
              @change="confirm_change_status(item)"
            >
            </v-select>
          </div>
        </template>

        <template v-slot:[`item.image`]="{ item }">
          <div class="my-2">
            <img
              v-if="!$isNullOrEmpty(item.image)"
              width="160"
              height="80px"
              style="object-fit: contain;"
              v-viewer
              :src="`${BASE.URL}${item.image}`"
            />
            <img
              v-else
              width="160"
              height="80px"
              style="object-fit: contain;"
              src="no-image.png"
            />
          </div>
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <v-tooltip bottom>
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
          <v-tooltip bottom>
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
    </client-only>

    <pagination
      class="mt-1"
      ref="Pagination"
      :pageCount="pageCount"
      :page="page"
      :pageSize="pageSize"
      @changePage="changePage"
      @changePageSize="changePageSize"
      depressed="true"
    ></pagination>

    <!-- thêm mới -->
    <add @success="get_list" :open="openAdd" @toggle="openAdd = !openAdd"></add>

    <!-- cập nhật -->
    <update
      :open="openUpdated"
      :data="dataDetail"
      @toggle="openUpdated = !openUpdated"
      @success="get_list"
    ></update>
    <!-- Thay đổi trạng thái -->
    <yes-no-alert
      :open="open_change"
      alert-msg="Bạn có muốn thay đổi trạng thái không?"
      @toggle="toggle_change_status"
      @OK="change_status"
    >
    </yes-no-alert>
    <yes-no-alert
      :open="alertOpenDelete"
      @toggle="alertOpenDelete = !alertOpenDelete"
      :alertMsg="alertdelete"
      @OK="confirmDelete"
    />
  </div>
</template>
<script>
import Vue from 'vue'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Cookies from 'js-cookie'
Vue.use(Viewer)
import add from '~/components/tag/add.vue'
import update from '~/components/tag/update.vue'
import paging from '~/components/dungChung/pagination.vue'
import BASE from '~/assets/configurations/BASE_URL'
export default {
  transition: 'slide-x-transition',
  components: { add, update, paging },
  data: () => ({
    headers: [
      { text: 'STT', sortable: false, value: 'stt', width: '5%' },

      { text: 'Tiêu đề ', sortable: false, value: 'tagName', width: 100 },
      {
        text: 'Hình ảnh ',
        sortable: false,
        value: 'image',
        width: 100,
        align: 'center'
      },
      {
        text: 'Hiển thị/Ẩn',
        sortable: false,
        value: 'enable',
        width: 100,
        align: 'center'
      },
      // { text: 'Tiêu đề ', sortable: false, value: 'tagName', width: 100 },

      {
        text: 'Chức năng',
        value: 'action',
        sortable: false,
        align: 'center',
        width: 80
      }
    ],
    listStatus: [
      {
        text: 'Ẩn',
        value: true
      },
      {
        text: 'Hiển thị',
        value: false
      }
    ],
    BASE,
    page: 0,
    pageCount: 0,
    pageSize: 10,
    total_item: 0,
    openAdd: false,
    openDelete: false,
    openUpdated: false,
    items: [],
    dataDetail: {},
    tagName: '',
    status: false,
    open_change: false,
    alertOpenDelete: false,
    dataItem: {},
    alertdelete: null,
    role: null
  }),
  created() {
    this.role = Cookies.get('userGroup')
  },
  mounted() {
    this.get_list()
  },
  methods: {
    OpenDeleteItem(value) {
      this.dataItem = value
      this.alertOpenDelete = true
      this.alertdelete = `Bạn có chắc chắn muốn xóa danh mục " ${this.dataItem.tagName} " này không?`
    },
    confirmDelete() {
      this.$store
        .dispatch('tag/deleteTag', { id: this.dataItem.id })
        .then(response => {
          if (response.status === 200) {
            this.$router.app.$notify({
              group: 'main',
              type: 'success',
              text: 'Xóa thành công'
            })
            this.get_list()
          } else {
            this.$router.app.$notify({
              group: 'main',
              type: 'warning',
              text: 'Hệ thống lỗi'
            })
          }
        })
    },
    confirm_change_status(item) {
      this.status_data = item
      this.open_change = true
    },
    toggle_change_status() {
      this.open_change = !this.open_change
      this.get_list()
    },
    change_status() {
      this.$store
        .dispatch('tag/tagEnable', { id: this.status_data.id })
        .then(response => {
          if (response.status === 200) {
            this.$router.app.$notify({
              group: 'main',
              type: 'success',
              text: 'Cập nhật trạng thái thành công'
            })
            this.get_list()
          } else {
            this.$router.app.$notify({
              group: 'main',
              type: 'warning',
              text: 'Lỗi hệ thống'
            })
          }
        })
    },
    search() {
      this.page = 0
      this.get_list()
    },
    OpenUpdate(value) {
      this.dataDetail = value
      this.openUpdated = true
    },
    getItemIndex(item) {
      return this.page * this.pageSize + this.items.indexOf(item) + 1
      // return this.items.indexOf(item) + 1
    },
    changePageSize(pageSizes) {
      if (pageSizes !== this.pageSize) {
        this.pageSize = pageSizes
        this.page = 0
        this.$refs.Pagination.reset()
        this.get_list()
      }
    },
    changePage(value) {
      this.page = value
      this.$refs.Pagination.reset()
      this.get_list()
    },
    get_list() {
      this.$store
        .dispatch('tag/getListTag', {
          page: this.page,
          pageSize: this.pageSize,
          tagName: this.tagName,
          enable: this.status
        })
        .then(response => {
          console.log(response)
          if (response.response.status === 200) {
            this.items = response.response.data.data
            this.pageCount = response.response.data.pageTotal
          } else {
            this.$router.app.$notify({
              group: 'main',
              type: 'warning',
              text: 'Lỗi hệ thống'
            })
          }
        })
    }

    // reset password
  }
}
</script>
