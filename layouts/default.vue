<template>
  <v-app>
    <client-only>
      <notifications
        group="main"
        :duration="7000"
        position="top right"
        :max="5"
      />
    </client-only>

    <div :style="`min-height: ${windowHeight}px`" @click="clicked">
      <v-navigation-drawer
        v-model="drawer"
        :clipped="clipped"
        fixed
        width="300px"
        app
        light
        style="padding-bottom: 54px"
        class="denser-nav"
      >
        <template>
          <v-list nav dense expand class="disabled-active">
            <template v-if="role === 'ROLE_ADMIN'">
              <template v-for="(item, index) in topmenuAdmin">
                <v-list-group
                  v-if="(item.child || []).length !== 0"
                  :key="index"
                  no-action
                >
                  <template v-slot:activator>
                    <template>
                      <v-list-item-icon>
                        <v-icon v-text="item.page_icon" />
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>{{
                          item.page_name
                        }}</v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </template>

                  <v-list-item
                    v-for="i in item.child"
                    :to="i.page_url"
                    :key="i.id"
                    router
                  >
                    <v-list-item-icon>
                      <v-icon v-text="i.page_icon" />
                    </v-list-item-icon>
                    <v-list-item-title class="pt-1" v-text="i.page_name" />
                  </v-list-item>
                </v-list-group>
                <v-list-item
                  v-else
                  :key="index"
                  :to="item.page_url"
                  router
                  active-class="primary--text"
                >
                  <v-list-item-icon>
                    <v-icon v-text="item.page_icon" />
                  </v-list-item-icon>
                  <v-list-item-title v-text="item.page_name" />
                </v-list-item>
              </template>
            </template>
            <template v-if="role === 'ROLE_STORE'">
              <template v-for="(item, index) in topmenuStore">
                <v-list-group
                  v-if="(item.child || []).length !== 0"
                  :key="index"
                  no-action
                >
                  <template v-slot:activator>
                    <template>
                      <v-list-item-icon>
                        <v-icon v-text="item.page_icon" />
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>{{
                          item.page_name
                        }}</v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </template>

                  <v-list-item
                    v-for="i in item.child"
                    :to="i.page_url"
                    :key="i.id"
                    router
                  >
                    <v-list-item-icon>
                      <v-icon v-text="i.page_icon" />
                    </v-list-item-icon>
                    <v-list-item-title class="pt-1" v-text="i.page_name" />
                  </v-list-item>
                </v-list-group>
                <v-list-item
                  v-else
                  :key="index"
                  :to="item.page_url"
                  router
                  active-class="primary--text"
                >
                  <v-list-item-icon>
                    <v-icon v-text="item.page_icon" />
                  </v-list-item-icon>
                  <v-list-item-title v-text="item.page_name" />
                </v-list-item>
              </template>
            </template>
          </v-list>
        </template>
        <div
          style="background-color: #f5f5f5; position: fixed; bottom: 0; margin-left: auto; margin-right: auto;"
          class="w-100"
          align="center"
        >
          <p class="fs-11 mb-2 mt-2">
            © {{ moment(new Date()).format('YYYY') }}
            <!--          Xtel Copyright. All Rights Reserved.-->
          </p>
        </div>
      </v-navigation-drawer>

      <v-app-bar :clipped-left="clipped" fixed app light class="border-bot-mbf">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title class="align-center d-flex">
          <!-- <img src="/logo/logo.png" class="py-2" width="180" height="65"/> -->
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon @click.stop="rightDrawer = !rightDrawer">
          <v-icon color="primary" size="40">mdi-account-circle</v-icon>
        </v-btn>
      </v-app-bar>

      <v-main>
        <v-container fluid>
          <nuxt />
        </v-container>
      </v-main>

      <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
        <template v-slot:prepend>
          <v-list-item two-line>
            <v-list-item-avatar>
              <v-icon color="primary" size="40">mdi-account-circle</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ username }}</v-list-item-title>
              <v-list-item-subtitle>Đã đăng nhập</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-divider />

        <v-list dense nav>
          <v-list-item
            v-for="accountMenuItem in accountMenuItems"
            :key="accountMenuItem.title"
            router
            :to="accountMenuItem.to"
            color="primary"
          >
            <v-list-item-icon>
              <v-icon>{{ accountMenuItem.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ accountMenuItem.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="toggleChangePass" color="primary">
            <v-list-item-icon>
              <v-icon>mdi-lock</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Đổi mật khẩu</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="logout" color="primary">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Đăng xuất</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>

    <Dialog
      :open="openChangePass"
      :CRUD="allowAccess"
      dialogName="Đổi mật khẩu tài khoản"
      max_width="600px"
      @toggle="toggleChangePass"
      @actionsUser="changePass"
    >
      <v-container fluid class="pb-0">
        <v-col>
          <v-text-field
            :value="selectedItem.password.value"
            @input="change($event, 'password')"
            :error="selectedItem.password.invalid"
            :error-messages="selectedItem.password.invalidMsg"
            dense
            outlined
            class="mt-3"
            ref="password"
            label="Mật khẩu cũ *"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
          <v-text-field
            :value="selectedItem.newPass.value"
            @input="change($event, 'newPass')"
            :error="selectedItem.newPass.invalid"
            :error-messages="selectedItem.newPass.invalidMsg"
            dense
            outlined
            ref="password"
            label="Mật khẩu mới *"
            :type="showNewPassword ? 'text' : 'password'"
            :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showNewPassword = !showNewPassword"
          />
          <v-text-field
            :value="selectedItem.reNewPass.value"
            @input="change($event, 'reNewPass')"
            :error="selectedItem.reNewPass.invalid"
            :error-messages="selectedItem.reNewPass.invalidMsg"
            dense
            outlined
            ref="password"
            label="Nhập lại mật khẩu mới *"
            :type="showReNewPassword ? 'text' : 'password'"
            :append-icon="showReNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showReNewPassword = !showReNewPassword"
          />
        </v-col>
      </v-container>
    </Dialog>
  </v-app>
</template>

<script>
import '~/assets/table.scss'
// import logoPNG from '@/assets/logo/logo.png'
// import watermark from '~/assets/logo/logo_xam.png'
import Cookies from 'js-cookie'
// import moment from 'moment'
// import ULT from '~/plugins/ult'
// import APIs from '~/assets/configurations/API_Config'
import Dialog from '../components/Dialog'

export default {
  middleware: 'auth',

  components: {
    Dialog
  },

  created() {
    this.role = Cookies.get('userGroup')
    // this.$vuetify.theme.dark = false
  },

  mounted() {
    if (!this.$isServer) {
      // if (!this.$store.state.app.getRoles) {
      //   this.$store.dispatch('app/GetRole')
      // }
      this.username = Cookies.get('username')
    }
    this.windowHeight = window.innerHeight
  },

  data() {
    return {
      // logo: logoPNG,
      clipped: true,
      drawer: true,
      fixed: false,
      role: null,
      // watermark,

      accountMenuItems: [],
      topmenuAdmin: [
        {
          page_name: 'Trang chủ',
          page_url: '/',
          child: []
        },
        {
          page_name: 'Phân quyền',
          child: [
            {
              page_url: '/tai-khoan',
              page_icon: '',
              page_name: 'Quản lý tài khoản'
            },
            {
              page_url: '/danh-sach-luat-top-food',
              page_icon: '',
              page_name: 'Danh sách luật TopFood'
            }
          ]
        },
        {
          page_name: 'Món ăn',
          child: [
            {
              page_url: 'danh-muc-mon-an',
              page_icon: '',
              page_name: 'Quản lý danh mục món ăn '
            }
          ]
        }
        // {
        //   page_name: 'Bài viết',
        //   child: [
        //     // {
        //     //   page_url: '',
        //     //   page_icon: '',
        //     //   page_name: 'Quản lý danh mục bài viết'
        //     // },
        //     {
        //       page_url: 'danh-sach-bai-viet',
        //       page_icon: '',
        //       page_name: 'Danh sách bài viết'
        //     }
        //   ]
        // }
      ],
      topmenuStore: [
        {
          page_name: 'Trang chủ',
          page_url: '/',
          child: []
        },
        {
          page_name: 'Món ăn',
          child: [
            {
              page_url: 'danh-muc-mon-an',
              page_icon: '',
              page_name: 'Quản lý danh mục món ăn '
            }
          ]
        },
        {
          page_name: 'Bài viết',
          child: [
            // {
            //   page_url: '',
            //   page_icon: '',
            //   page_name: 'Quản lý danh mục bài viết'
            // },
            {
              page_url: 'danh-sach-bai-viet',
              page_icon: '',
              page_name: 'Danh sách bài viết'
            }
          ]
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'PNE-MBF',
      username: '',
      // data đổi mật khẩu tuan.pham
      openChangePass: false,
      allowAccess: true,
      showPassword: false,
      showNewPassword: false,
      showReNewPassword: false,
      selectedItem: {
        password: {
          value: '',
          invalid: false,
          invalidMsg: ''
        },
        newPass: {
          value: '',
          invalid: false,
          invalidMsg: ''
        },
        reNewPass: {
          value: '',
          invalid: false,
          invalidMsg: ''
        }
      },
      windowHeight: 0
    }
  },
  watch: {},

  methods: {
    logout() {
      Object.keys(Cookies.get()).forEach(function(cookieName) {
        var neededAttributes = {
          // Here you pass the same attributes that were used when the cookie was created
          // and are required when removing the cookie
        }
        Cookies.remove(cookieName, neededAttributes)
      })
      this.$router.push('/login')
    },
    getMenuByParent(parent_id) {
      console.log(parent_id)
      // if (!this.$isServer) {
      //   let lstAccessMenu = []
      //   let pages = this.$store.state.app.roles
      //   Array.from(pages).forEach(m => {
      //     if (m.parent_id === parent_id) lstAccessMenu.push(m)
      //   })
      //   //console.log(parent_id, pages, lstAccessMenu)
      //   return lstAccessMenu
      //   //console.log(parent_id, lstAccessMenu)
      // }
    },
    // đổi mật khẩu tuan.pham
    // toggle dialog change pass
    toggleChangePass() {
      this.selectedItem = {
        password: {
          value: '',
          invalid: false,
          invalidMsg: ''
        },
        newPass: {
          value: '',
          invalid: false,
          invalidMsg: ''
        },
        reNewPass: {
          value: '',
          invalid: false,
          invalidMsg: ''
        }
      }
      this.openChangePass = !this.openChangePass
      this.rightDrawer = false
      this.showPassword = false
      this.showNewPassword = false
      this.showReNewPassword = false
    },
    // hàm validate input
    setInvalid(payload) {
      this.selectedItem[payload.field] = {
        ...this.selectedItem[payload.field],
        invalid: true,
        invalidMsg: payload.message
      }
    },
    // hàm đổi pass
    async changePass() {
      let error = false
      if (this.selectedItem.password.value === '') {
        error = true
        this.setInvalid({
          field: 'password',
          message: 'Không được để trống'
        })
      }
      if (this.selectedItem.newPass.value === '') {
        error = true
        this.setInvalid({
          field: 'newPass',
          message: 'Không được để trống'
        })
      }
      if (this.selectedItem.reNewPass.value === '') {
        error = true
        this.setInvalid({
          field: 'reNewPass',
          message: 'Không được để trống'
        })
      } else if (
        this.selectedItem.reNewPass.value !== this.selectedItem.newPass.value
      ) {
        error = true
        this.setInvalid({
          field: 'reNewPass',
          message: 'Mật khẩu không khớp'
        })
      } else if (
        this.selectedItem.reNewPass.value === this.selectedItem.password.value
      ) {
        error = true
        this.setInvalid({
          field: 'newPass',
          message: 'Mật khẩu mới không được trùng với mật khẩu cũ'
        })
      }
      if (!error) {
        const DATA = {
          oldPassword: this.selectedItem.password.value,
          newPassword: this.selectedItem.newPass.value
        }

        this.$store.dispatch('app/changePass', DATA).then(response => {
          console.log(response.response)
          if (response.response.status === 200) {
            this.toggleChangePass()
            this.$router.app.$notify({
              group: 'main',
              type: 'success',
              text: response.response.data.message
            })
          } else {
            this.$router.app.$notify({
              group: 'main',
              type: 'warn',
              text: response.response.data.message
            })
          }
        })
      }
    },
    //event input change
    change(value, field) {
      this.selectedItem[field] = {
        ...this.selectedItem[field],
        value,
        invalid: false,
        invalidMsg: ''
      }
    },
    clicked() {
      // this.$log.debug('clicked !')
      // this.$store.commit('ticket_inventory/change_value_clicked')
    }
  }
}
</script>

<style lang="scss">
.v-list-item__icon {
  margin-right: 4px !important;
}

.v-application--is-ltr
  .v-list--dense.v-list--nav
  .v-list-group--no-action
  > .v-list-group__items
  > .v-list-item {
  padding-left: 44px !important;
}

.v-application--is-ltr
  .v-list--dense
  .v-list-group--sub-group
  .v-list-group__header {
  padding-left: 6px;
}

.border-bot-mbf .v-toolbar__content {
  border-bottom: solid 3px #2b8c8f;
}

.v-list-item--active {
  background-color: white;
}
</style>
