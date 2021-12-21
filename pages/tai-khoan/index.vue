<template>
  <div v-if="role === 'ROLE_ADMIN'">
    <client-only>
      <v-tabs
        v-model="tab"
        color="primary"
        grow
        active-class="elevation-12 radius-top "
      >
        <v-tab
          :class="
            (tab !== 0 && 'black--text') +
            ' text-capitalize letter-spacing-normal'
          "
          @click="clicked_tab(0)"
        >
          <v-toolbar-title class="text-none" style="width: 268px"
            >T.Khoản chờ duyệt
          </v-toolbar-title>
        </v-tab>
        <v-tab
          :class="
            (tab !== 1 && 'black--text') +
            ' text-capitalize letter-spacing-normal'
          "
          @click="clicked_tab(1)"
        >
          <v-toolbar-title class="text-none" style="width: 268px"
            >T.Khoản người dùng
          </v-toolbar-title>
        </v-tab>
        <v-tab
          :class="
            (tab !== 2 && 'black--text') +
            ' text-capitalize letter-spacing-normal'
          "
          @click="clicked_tab(2)"
        >
          <v-toolbar-title class="text-none" style="width: 268px"
            >T.Khoản cửa hàng
          </v-toolbar-title>
        </v-tab>
        <v-tabs-items v-model="tab" class="default-bg-color">
          <v-tab-item eager>
            <Pending ref="choDuyet"></Pending>
          </v-tab-item>

          <v-tab-item eager>
            <AccountUser ref="TKUser"></AccountUser>
          </v-tab-item>
          <v-tab-item eager>
            <AccountStore ref="TKStore"></AccountStore>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </client-only>
  </div>
</template>
<script>
import Pending from '~/components/UsersManager/tab/Pending.vue'
import AccountStore from '~/components/UsersManager/tab/Store.vue'
import AccountUser from '~/components/UsersManager/tab/User.vue'
import Cookies from 'js-cookie'
export default {
  transition: 'slide-x-transition',

  components: {
    Pending,
    AccountStore,
    AccountUser,
  },

  data: () => ({
    role: null,
    tab: 0,
  }),

  created() {
    this.role = Cookies.get('userGroup')
  },
  methods: {
    clicked_tab(value) {
      if (value === 0) {
        this.$refs.choDuyet.get_list()
      } else if (value === 1) {
        this.$refs.TKUser.get_list()
      } else if (value === 2) {
        this.$refs.TKStore.get_list()
      }
    },
  },
}
</script>
