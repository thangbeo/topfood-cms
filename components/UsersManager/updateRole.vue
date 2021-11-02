<template>
  <v-dialog
    :value="open"
    @keydown="$event.key === 'Escape' && toggle()"
    max-width="500px"
    scrollable
    persistent
  >
    <v-card>
      <v-card-title class="border-title-dialog py-3"
        >Cập nhật loại tài khoản</v-card-title
      >
      <v-container class="pt-5 pb-0" fluid>
        <v-row>
          <v-col v-if="role === 'ROLE_USER'" cols="12" class="pb-0">
            <v-select
              v-model="account"
              :items="listAccountStore"
              :error-messages="accountErrors"
              label="Loại tài khoản *"
              outlined
              dense
              light
              @input="accountErrors = []"
            />
          </v-col>
          <v-col v-if="role === 'ROLE_STORE'" cols="12" class="pb-0">
            <v-select
              v-model="account"
              :items="listAccountUser"
              :error-messages="accountErrors"
              label="Loại tài khoản *"
              outlined
              dense
              light
              @input="accountErrors = []"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-divider />
      <v-card-actions>
        <v-spacer />

        <v-btn text height="30px" class="primary" @click="add">
          <div class="text-none">Cập nhật</div>
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
import moment from 'moment'
export default {
  props: ['open', 'data'],
  data: () => ({
    account: null,
    accountErrors: [],
    role: null,
    listAccountStore: [
      {
        text: 'Tài khoản Store',
        value: 'ROLE_STORE'
      }
    ],
    listAccountUser: [
      {
        text: 'Tài khoản người dùng',
        value: 'ROLE_USER'
      }
    ]
  }),
  watch: {
    open(value) {
      if (value) {
        this.role = this.data.role
      } else {
        this.reset()
      }
    }
  },
  methods: {
    // danh sách quyền

    toggle() {
      this.$emit('toggle')
      this.reset()
    },

    reset() {},

    // validate

    add() {
      let hasErrors = false
      if (this.$isNullOrEmpty(this.account)) {
        hasErrors = true
        this.accountErrors = ['Vui lòng chọn loại tài khoản']
      }
      if (!hasErrors) {
        let data = {
          role: this.account,
          id: this.data.id
        }
        this.$store
          .dispatch('users/updateRole', data)
          .then(response => {
            if (response.status === 200) {
              this.$router.app.$notify({
                group: 'main',
                type: 'success',
                text: 'Cập nhật loại tài khoản thành công'
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
          .finally(() => {})
      }
    }
  }
}
</script>
