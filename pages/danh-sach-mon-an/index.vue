<template>
  <div>
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
           
            <div class="flex-grow-1"></div>
            <!-- <v-text-field
              v-model="search"
              label="Tên món ăn"
              class="pr-2"
              style="max-width: 250px"
              dense
              outlined
              hide-details
              clearable
            /> -->

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
              :src="`${BASE.URL}${i.path}`"
            />
          </template>
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
    <add :open="openAdd" @toggle="openAdd = !openAdd" @success="get_list"></add>

    <!-- cập nhật -->

    <update
      :open="openUpdated"
      :data="dataDetail"
      @toggle="openUpdated = !openUpdated"
      @success="get_list"
    ></update>
    <!-- Thay đổi trạng thái -->

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

Vue.use(Viewer)
import add from '~/components/tag/updateTagSubTag/add.vue'
import update from '~/components/tag/updateTagSubTag/update.vue'
import BASE from '~/assets/configurations/BASE_URL'
export default {
  transition: 'slide-x-transition',
  components: {
    add,
    update
  },
  data: () => ({
    BASE,
    page: 0,
    pageCount: 0,
    pageSize: 10,
    total_item: 0,

    items: [],

    openAdd: false,
    alertOpenDelete: false,
    alertdelete: null,
    openUpdated: false,
    dataDetail: {}
  }),
  mounted() {
    this.get_list()
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

    search() {
      this.page = 0
      this.get_list()
    },
    OpenUpdate(value) {
      this.dataDetail = value
      this.openUpdated = true
    },
    getItemIndex(item) {
      return (this.page - 1) * this.pageSize + this.items.indexOf(item) + 1
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
        .dispatch('tag/listFood', {
          page: this.page,
          pageSize: this.pageSize
        })
        .then(response => {
          if (response.response.status === 200) {
            this.items = response.response.data.data.data
            this.pageCount = response.response.data.data.pageTotal
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
