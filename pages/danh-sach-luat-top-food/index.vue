<template>
  <div v-if="role === 'ROLE_ADMIN'">
    <client-only>
      <v-data-table
        :headers="headers"
        :items="items"
        hide-default-footer
        :items-per-page="pageSize"
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
              v-model="title"
              label="Tiêu đề"
              class="pr-2"
              style="max-width: 250px"
              dense
              outlined
              hide-details
              clearable
              @keydown.enter="get_list"
            />

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
        </template>
      </v-data-table>
    </client-only>

    <!-- <pagination
      class="mt-1"
      ref="pagination"
      :pageCount="pageCount"
      :page="page"
      :pageSize="pageSize"
      @changePage="changePage"
      @changePageSize="changePagesize"
      depressed="true"
    ></pagination> -->
    <!-- thêm mới -->
    <add @Success="get_list" :open="openAdd" @toggle="openAdd = !openAdd"></add>

    <!-- cập nhật -->
    <update
      :open="openUpdated"
      :data="dataDetail"
      @toggle="openUpdated = !openUpdated"
      @success="get_list"
    ></update>
    <!-- Bộ lọc -->
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import add from '~/components/nhom-quyen/add.vue'
import update from '~/components/nhom-quyen/update.vue'
export default {
  transition: 'slide-x-transition',
  components: { add, update },
  data: () => ({
    headers: [
      { text: 'STT', sortable: false, value: 'stt', width: '5%' },

      { text: 'Tiêu đề ', sortable: false, value: 'title', width: 100 },
      { text: 'Mô tả', sortable: false, value: 'description', width: 200 },

      {
        text: 'Chức năng',
        value: 'action',
        sortable: false,
        align: 'center',
        width: 80
      }
    ],
    pageCount: 0,
    page: 0,
    pageSize: 500,
    openAdd: false,
    openUpdate: false,
    user_detail: '',

    openDelete: false,

    openUpdated: false,
    allowAccess: true,
    items: [],
    role: null,
    title: '',

    dataDetail: {}
  }),
  mounted() {
    this.get_list()
  },
  created() {
    this.role = Cookies.get('userGroup')
  },
  methods: {
    OpenUpdate(value) {
      this.dataDetail = value
      this.openUpdated = true
    },
    getItemIndex(item) {
      // return (this.page - 1) * this.pageSize + this.items.indexOf(item) + 1
      return this.items.indexOf(item) + 1
    },
    // changePage(value) {
    //   this.page = value
    // },
    // changePagesize(value) {
    //   this.pageSize = value
    //   this.$refs.pagination.reset()
    // },
    // changePageSize(pageSizes) {
    //   if (pageSizes !== this.pageSize) {
    //     this.pageSize = pageSizes
    //     this.page = 0
    //     this.$refs.pagination.reset()
    //     this.get_list()
    //   }
    // },
    // changePage(value) {
    //   this.page = value
    //   this.$refs.pagination.reset()
    //   this.get_list()
    // },
    get_list() {
      this.$store
        .dispatch('rule/getListRule', {
          pageSize: this.pageSize,
          page: this.page,
          title: this.title
        })
        .then(response => {
          if (response.response.status === 200) {
            this.items = response.response.data.data
          } else {
            this.$router.app.$notify({
              group: 'main',
              type: 'warning',
              text: 'Lỗi hệ thống'
            })
          }
        })
    },

    // reset password

    toggleFilter() {
      this.openFilter = !this.openFilter
    }
  }
}
</script>
