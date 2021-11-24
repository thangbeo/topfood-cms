<template>
  <div v-if="role === 'ROLE_ADMIN'">
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
              v-model="phone"
              label="Số điện thoại"
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
              class="text-none mr-2"
              @click="search"
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

        <template v-slot:item.stt="{ item }">
          <div class="d-flex align-center justify-center">
            {{ getItemIndex(item) }}
          </div>
        </template>

        <template v-slot:[`item.status`]="{ item }">
          <v-chip
            small
            label
            class="fs-10"
            v-if="item.status === 'WAIT_ACTIVE'"
            color="warning"
          >
            Chờ duyệt
          </v-chip>
          <v-chip
            small
            label
            class="fs-10"
            color="success"
            v-if="item.status === 'ACTIVE'"
          >
            Đang hoạt động
          </v-chip>
          <v-chip
            small
            label
            class="fs-10 white--text"
            color="grey"
            v-if="item.status === 'DISABLE'"
          >
            Đã bị khóa
          </v-chip>
        </template>
        <template v-slot:[`item.role`]="{ item }">
          <v-chip label small v-if="item.role === 'ROLE_ADMIN'"
            >Tài khoản quản trị</v-chip
          >
          <v-chip label small v-if="item.role === 'ROLE_STORE'"
            >Tài khoản store</v-chip
          >
          <v-chip label small v-if="item.role === 'ROLE_USER'"
            >Tài khoản người dùng</v-chip
          >
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <!-- <v-tooltip bottom v-if="item.status !== 'DISABLE'">
            <template v-slot:activator="{ on }">
              <v-icon
                color="primary"
                class="mr-2"
                @click="setActionUpdate(item)"
                v-on="on"
              >
                mdi-pencil-box-multiple-outline
              </v-icon>
            </template>
            <span>Cập nhật</span>
          </v-tooltip> -->
          <!-- <v-tooltip
            bottom
            v-if="item.status !== 'DISABLE' && item.role !== 'ROLE_ADMIN'"
          >
            <template v-slot:activator="{ on }">
              <v-icon
                color="primary"
                class="mr-2"
                @click="SetUpdateRole(item)"
                v-on="on"
              >
                mdi-account-switch
              </v-icon>
            </template>
            <span>Cập nhật loại tài khoản</span>
          </v-tooltip> -->
          <v-tooltip bottom v-if="item.status === 'ACTIVE'">
            <template v-slot:activator="{ on }">
              <v-icon
                color="primary"
                class="mr-2"
                @click="setResetUserPass(item)"
                v-on="on"
              >
                mdi-account-convert
              </v-icon>
            </template>
            <span>Reset mật khẩu</span>
          </v-tooltip>
          <template v-if="item.role === 'ROLE_STORE'">
            <v-tooltip bottom v-if="item.status !== 'ACTIVE'">
              <template v-slot:activator="{ on }">
                <v-icon
                  color="primary"
                  class="mr-2"
                  @click="SetAcitveUser(item)"
                  v-on="on"
                >
                  mdi-account-check
                </v-icon>
              </template>
              <span>Kích hoạt lại tài khoản</span>
            </v-tooltip>
          </template>

          <template v-else>
            <v-tooltip
              bottom
              v-if="item.status !== 'DISABLE' && item.status !== 'ACTIVE'"
            >
              <template v-slot:activator="{ on }">
                <v-icon
                  color="primary"
                  class="mr-2"
                  @click="SetAcitveUser(item)"
                  v-on="on"
                >
                  mdi-account-check
                </v-icon>
              </template>
              <span>Kích hoạt tài khoản</span>
            </v-tooltip>
          </template>
          <v-tooltip bottom v-if="item.status !== 'DISABLE'">
            <template v-slot:activator="{ on }">
              <v-icon
                color="primary"
                class="mr-2"
                @click="SetBlockUser(item)"
                v-on="on"
              >
                mdi-account-cancel
              </v-icon>
            </template>
            <span>Khóa tài khoản</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                color="primary"
                class="mr-2"
                @click="askForDeleteItem(item)"
                v-on="on"
              >
                mdi-delete
              </v-icon>
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
    <!--  cập nhật -->
    <update
      :open="openUpdate"
      @toggle="openUpdate = !openUpdate"
      @success="get_list"
    />
    <add :open="openAdd" @toggle="openAdd = !openAdd" @success="get_list" />
    <!--  xóa tài khoản -->
    <yes-no-alert
      :open="openDelete"
      :alert-msg="message_noti"
      @toggle="openDelete = !openDelete"
      @OK="deleteItem"
    />
    <!--  khóa tài khoản -->
    <yes-no-alert
      :open="openBlock"
      :alert-msg="message_noti"
      @toggle="openBlock = !openBlock"
      @OK="blockUser"
    />
    <!-- chuyển trạng thái tài khoản -->
    <yes-no-alert
      :open="openAcivte"
      :alert-msg="message_noti"
      @toggle="openAcivte = !openAcivte"
      @OK="activeUser"
    />
    <!-- reset mật khẩu -->
    <yes-no-alert
      :open="openResetPass"
      :alert-msg="message_noti"
      @toggle="openResetPass = !openResetPass"
      @OK="resetPass"
    />
    <!-- Bộ lọc -->
    <!--  cập nhật quyền -->
    <updateRole
      :open="openUpdateRole"
      @toggle="openUpdateRole = !openUpdateRole"
      :data="user_info"
      @success="get_list"
    ></updateRole>
  </div>
</template>
<script>
import updateRole from '~/components/UsersManager/updateRole.vue'
import add from '~/components/UsersManager/add.vue'
import update from '~/components/UsersManager/update.vue'
import Cookies from 'js-cookie'
export default {
  transition: 'slide-x-transition',
  components: {
    add,
    update,
    updateRole
  },
  data: () => ({
    headers: [
      { text: 'STT', sortable: false, value: 'stt', width: '5%' },
      {
        text: 'Tên đăng nhập',
        sortable: false,
        value: 'username',
        width: 100
      },
      { text: 'Họ tên', sortable: false, value: 'name', width: 120 },
      { text: 'Email', sortable: false, value: 'email', width: 120 },
      { text: 'SĐT', sortable: false, value: 'phoneNumber', width: 100 },
      {
        text: 'Thuộc Tài khoản',
        sortable: false,
        value: 'role',
        align: 'center',
        width: 80
      },

      {
        text: 'Trạng thái',
        sortable: false,
        value: 'status',
        align: 'center',
        width: 80
      },
      {
        text: 'Chức năng',
        value: 'action',
        sortable: false,
        align: 'center',
        width: 150
      }
    ],

    page: 0,
    pageCount: 0,
    pageSize: 20,
    openAdd: false,
    openUpdate: false,
    user_detail: '',
    user_info: null,
    openDelete: false,
    message_noti: '',
    openResetPass: false,
    openBlock: false,
    openAcivte: false,
    allowAccess: true,
    items: [],
    phone: null,
    user_name: '',
    full_name: '',
    email: '',
    phone: '',
    partner_id: null,
    listPartner: [],
    openFilter: false,
    openUpdateRole: false,
    role: null
  }),
  mounted() {
    this.get_list()
  },
  created() {
    this.role = Cookies.get('userGroup')
  },
  methods: {
    SetUpdateRole(value) {
      this.user_info = value
      this.openUpdateRole = true
    },
    search() {
      this.page = 0
      this.get_list()
    },
    getItemIndex(item) {
      // return (this.page - 1) * this.itemsPerPage + this.items.indexOf(item) + 1
      return this.items.indexOf(item) + 1
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
      const DATA = {
        page: this.page,
        pageSize: this.pageSize,
        phoneNumber: (this.phone || '').trim().length !== 0 ? this.phone : ''
      }
      this.$store.dispatch('users/get_list', DATA).then(response => {
        if (response.response.status === 200) {
          this.items = response.response.data.data
          this.pageCount = response.response.data.data.pageTotal
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
    SetBlockUser(item) {
      // this.$log.debug(item)
      this.message_noti = `Bạn có chắc chắn muốn khóa tài khoản "${item.username}" này?`
      this.user_info = item
      this.openBlock = true
    },
    blockUser() {
      this.$store
        .dispatch('users/accountEnable', this.user_info.id)
        .then(response => {
          if (response.status === 200) {
            this.$router.app.$notify({
              group: 'main',
              type: 'success',
              text: 'Khóa tài khoản thành công'
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
    SetAcitveUser(item) {
      this.message_noti = `Bạn có chắc chắn muốn kích hoạt tài khoản "${item.username}" này?`
      this.user_info = item
      this.openAcivte = true
    },
    activeUser() {
      this.$store
        .dispatch('users/accountAdminActive', this.user_info.id)
        .then(response => {
          if (response.status === 200) {
            this.$router.app.$notify({
              group: 'main',
              type: 'success',
              text: 'Kích hoạt tài khoản thành công'
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

    // reset password
    setResetUserPass(item) {
      // this.$log.debug(item)
      this.message_noti = `Bạn có chắc chắn muốn reset mật khẩu tài khoản "${item.username}" ?`
      this.user_info = item
      this.openResetPass = true
    },
    resetPass() {
      this.$store
        .dispatch('users/resetPassword', this.user_info.id)
        .then(response => {
          if (response.status === 200) {
            this.$router.app.$notify({
              group: 'main',
              type: 'success',
              text: 'Reset mật khẩu thành công'
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
    // xóa tài khoản
    askForDeleteItem(item) {
      console.log(item)
      // this.$log.debug(item.id)
      this.user_info = item
      this.message_noti = `Bạn có chắc chắn muốn xóa tài khoản "${item.username}" này không?`
      this.openDelete = true
    },
    deleteItem() {
      this.$store
        .dispatch('users/deleted_user', {
          id: this.user_info.id,
          user_name: this.user_info.username
        })
        .then(response => {
          if (response.status === 200) {
            this.$router.app.$notify({
              group: 'main',
              type: 'success',
              text: 'Xóa tài khoản thành công'
            })
            this.get_list()
          } else {
            this.$router.app.$notify({
              group: 'main',
              type: 'warning',
              text: 'Lỗi hệ thống'
            })
          }
          this.get_list()
        })
    },
    toggleFilter() {
      this.openFilter = !this.openFilter
    }
  }
}
</script>
