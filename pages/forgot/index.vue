<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-card-text>
          <v-row class="mt-1" justify="center">
            <h2 class="black--text">QUÊN MẬT KHẨU</h2>
          </v-row>
          <v-divider class=" my-6" />

          <v-row>
            <v-col cols="12" class="pb-0">
              <v-text-field
                :error-messages="emailErrors"
                label="Email *"
                outlined
                dense
                clearable
                v-model="email"
                @input="validateEmail($event, 'emailErrors')"
              />
            </v-col>
            <v-col cols="8" class="py-0">
              <v-text-field
                outlined
                dense
                v-model="importOpt"
                @input="importOptErrors = []"
                :error-messages="importOptErrors"
                label="Nhập OTP *"
              />
            </v-col>
            <v-col cols="4" class="py-0">
              <v-btn
                depressed
                block
                :disabled="disabled"
                color="primary"
                @click="takeOtp"
                class="text-none"
                height="40"
                :loading="$wait.is('logging')"
                >Lấy OTP</v-btn
              >
            </v-col>
            <v-col cols="12" class="py-0">
              <v-text-field
                @click:append="newShowPass = !newShowPass"
                :type="newShowPass ? 'text' : 'password'"
                :append-icon="newShowPass ? 'mdi-eye' : 'mdi-eye-off'"
                outlined
                dense
                v-model="newPassword"
                :error-messages="newPasswordErrors"
                @input="newPasswordErrors = []"
                label="Nhập mật khẩu mới *"
              />
            </v-col>
            <v-col cols="12" class="py-0">
              <v-text-field
                @click:append="retypeNewShowPass = !retypeNewShowPass"
                :type="retypeNewShowPass ? 'text' : 'password'"
                :append-icon="newShowPass ? 'mdi-eye' : 'mdi-eye-off'"
                outlined
                dense
                v-model="retypePassword"
                :error-messages="retypePassworErrors"
                @input="retypePassworErrors = []"
                label="Nhâp lại mật khẩu  *"
              />
            </v-col>
          </v-row>

          <div class="pt-4">
            <v-btn
              color="primary"
              :loading="$wait.is('loggingConfirm')"
              @click="logup"
              class="text-none"
              block
            >
              Xác nhận
            </v-btn>
          </div>
          <div class="pt-2 text-center">
            <v-btn text class="text-none" @click="close" color="error">
              Quay lại
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Cookie from 'js-cookie'
import APIs from '~/assets/configurations/API_Config'

// import logo from '../../static/logo/logo.png'

export default {
  name: 'index',
  layout: 'login',
  head() {
    return {
      title: 'Đăng nhập'
    }
  },
  transition(to, from) {
    if (!from) {
      return 'slide-x-transition'
    }
    return 'slide-x-reverse-transition'
  },

  data: () => ({
    // logo,
    logging: false,
    loggingConfirm: false,
    showPass: false,
    emailErrors: [],
    password: null,
    passError: [],
    importOpt: null,
    importOptErrors: [],
    email: null,
    disabled: false,
    newPassword: null,
    newShowPass: false,
    newPasswordErrors: [],
    retypePassworErrors: [],
    retypeNewShowPass: false,
    retypePassword: null
  }),

  methods: {
    close() {
      this.$router.push('/login')
    },
    logup() {
      let hasErrors = false

      if (this.$isNullOrEmpty(this.email)) {
        hasErrors = true
        this.emailErrors = ['Vui lòng nhập email']
      } else if (!this.$isEmail(this.email.trim())) {
        hasErrors = true
        this.emailErrors = ['Email không hợp lệ']
      }
      if (this.$isNullOrEmpty(this.newPassword)) {
        hasErrors = true
        this.newPasswordErrors = ['Vui lòng nhập mật khẩu mới']
      }
      if (this.$isNullOrEmpty(this.retypePassword)) {
        hasErrors = true
        this.retypePassworErrors = ['Vui lòng nhập lại mật khẩu mới']
      } else if (this.newPassword !== this.retypePassword) {
        hasErrors = true
        this.retypePassworErrors = ['Nhập lại mật khẩu không khớp']
      }
      if (this.$isNullOrEmpty(this.importOpt)) {
        hasErrors = true
        this.importOptErrors = ['Vui lòng nhập mã OPT']
      }

      if (!hasErrors) {
        this.$wait.start('loggingConfirm')
        let data = {
          email: this.email,
          newPassword: this.newPassword,
          otp: this.importOpt
        }

        this.$store
          .dispatch('login/forgotPassword', data)
          .then(response => {
            if (response.response.status !== 200) {
              this.$router.app.$notify({
                group: 'login',
                type: 'warn',
                text: response.response.data.message
              })
            } else {
              this.$router.app.$notify({
                group: 'login',
                type: 'success',
                text: response.response.data.message
              })
              setTimeout(() => {
                this.$router.push('/login')
                this.reset()
              }, 1000)
            }
          })
          .catch(e => {
            this.$log.debug(e)
          })
          .finally(() => {
            this.$wait.end('loggingConfirm')
          })
      }
    },
    reset() {
      this.showPass = false
      this.emailErrors = []
      this.password = null
      this.passError = []
      this.importOpt = null
      this.importOptErrors = []
      this.email = null
      this.disabled = false
      this.newPassword = null
      this.newShowPass = false
      this.newPasswordErrors = []
      this.retypePassworErrors = []
      this.retypeNewShowPass = false
      this.retypePassword = null
    },
    validateEmail(value, error) {
      if (this.$isNullOrEmpty(value)) {
        this[error] = ['Vui lòng nhập email']
      } else if (!this.$isEmail(value.trim())) {
        this[error] = ['Email không hợp lệ']
      } else {
        this[error] = []
      }
    },
    validateMobilePhoneNumber(value, error) {
      const isPhoneRegex = /\D/g
      if (this.$isNullOrEmpty(value)) {
        this[error] = ['Vui lòng nhập số điện thoại']
      } else if (
        (value || '').trim().length !== 10 &&
        (value || '').trim().length !== 11
      ) {
        this[error] = 'Số điện thoại không hợp lệ'
      } else if (isPhoneRegex.test((value || '').trim())) {
        this[error] = 'Số điện thoại không hợp lệ'
      } else {
        this[error] = []
      }
    },

    takeOtp() {
      let hasErrors = false
      if (this.$isNullOrEmpty(this.email)) {
        hasErrors = true
        this.emailErrors = ['Vui lòng nhập email']
      } else if (!this.$isEmail(this.email.trim())) {
        hasErrors = true
        this.emailErrors = ['Email không hợp lệ']
      }
      if (!hasErrors) {
        this.$wait.start('logging')
        this.$store
          .dispatch('login/getOpt', {
            email: this.email
          })
          .then(response => {
            if (response.response.status === 200) {
              this.$router.app.$notify({
                group: 'login',
                type: 'success',
                text: 'Gửi email thành công'
              })
              setTimeout(() => {
                this.disabled = false
              }, 5000)
            } else {
              this.$router.app.$notify({
                group: 'login',
                type: 'warn',
                text: response.response.data.message
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
}
</script>
