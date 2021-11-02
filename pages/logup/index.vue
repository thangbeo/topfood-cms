<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-card-text class="pt-0">
          <v-row class="mt-0" justify="center">
            <!-- <v-img :src="logo" contain max-width="250" max-height="250"/> -->
          </v-row>
          <v-divider class=" my-6" />

          <v-text-field
            outlined
            dense
            v-model="username"
            :error-messages="userNameError"
            @input="userNameError = []"
            label="Tên đăng nhập *"
          />

          <v-text-field
            id="password"
            label="Mật khẩu *"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            name="password"
            dense
            v-model="password"
            :type="showPass ? 'text' : 'password'"
            :error-messages="passError"
            @input="passError = []"
            outlined
            @click:append="showPass = !showPass"
          />
          <v-text-field
            outlined
            v-model="name"
            :error-messages="nameErrors"
            dense
            clearable
            @input="nameErrors = []"
            label="Họ tên *"
          />

          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                label="Ngày sinh"
                v-on="on"
                v-model="birthday"
                prepend-inner-icon="mdi-calendar-range "
                dense
                outlined
                readonly
              >
              </v-text-field>
            </template>
            <v-date-picker
              :active-picker.sync="activePicker"
              :allowed-dates="allowedDates"
              v-model="date"
              locale="vi"
              @change="save_date"
              @input="menu = false"
            >
            </v-date-picker>
          </v-menu>

          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="Email *"
            outlined
            dense
            clearable
            @input="validateEmail($event, 'emailErrors')"
          />
          <v-text-field
            v-model="PhoneNumber"
            :error-messages="phoneErrors"
            label="Số điện thoại *"
            outlined
            dense
            clearable
            @input="validateMobilePhoneNumber($event, 'phoneErrors')"
          />

          <div>
            <v-btn color="primary" class="text-none" @click="logup" block>
              Đăng ký
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
import moment from 'moment'
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
    showPass: false,
    name: null,
    nameErrors: [],
    username: null,
    userNameError: [],
    password: null,
    passError: [],
    email: null,
    emailErrors: [],
    PhoneNumber: null,
    phoneErrors: [],
    menu: false,
    date: moment().format('YYYY-MM-DD'),
    activePicker: null,
    birthday: null
  }),

  methods: {
    allowedDates(value) {
      const today = moment(new Date()).format('YYYY-MM-DD')

      if (today >= value) {
        return true
      } else {
        return false
      }
    },
    save_date(date) {
      this.birthday = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    close() {
      this.$router.push('/login')
    },
    reset() {
      this.showPass = false
      this.name = null
      this.nameErrors = []
      this.username = null
      this.userNameError = []
      this.password = null
      this.passError = []
      this.email = null
      this.emailErrors = []
      this.PhoneNumber = null
      this.phoneErrors = []
    },
    logup() {
      let hasErrors = false
      const isPhoneRegex = /\D/g
      if (this.$isNullOrEmpty(this.PhoneNumber)) {
        hasErrors = true
        this.phoneErrors = ['Vui lòng nhập số điện thoại']
      } else if (
        (this.PhoneNumber || '').trim().length !== 10 &&
        (this.PhoneNumber || '').trim().length !== 11
      ) {
        hasErrors = true
        this.phoneErrors = 'Số điện thoại không hợp lệ'
      } else if (isPhoneRegex.test((this.PhoneNumber || '').trim())) {
        hasErrors = true
        this.phoneErrors = 'Số điện thoại không hợp lệ'
      }
      if (this.$isNullOrEmpty(this.password)) {
        hasErrors = true
        this.passError = ['Vui lòng nhập mật khẩu']
      }
      if (this.$isNullOrEmpty(this.username)) {
        hasErrors = true
        this.userNameError = ['Vui lòng nhập tên đăng nhập']
      }
      if (this.$isNullOrEmpty(this.name)) {
        hasErrors = true
        this.nameErrors = ['Vui lòng nhập họ tên']
      }
      if (this.$isNullOrEmpty(this.email)) {
        hasErrors = true
        this.emailErrors = ['Vui lòng nhập email']
      } else if (!this.$isEmail(this.email.trim())) {
        hasErrors = true
        this.emailErrors = ['Email không hợp lệ']
      }
      if (!hasErrors) {
        let data = {
          email: this.email,
          name: this.name,
          password: this.password,
          phoneNumber: this.PhoneNumber,
          username: this.username,
          birthday: this.$isNullOrEmpty(this.birthday)
            ? ''
            : moment(this.birthday).format()
        }
        this.$store.dispatch('login/getLogup', data).then(response => {
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
            }, 1000)
          }
        })
      }
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
    }

    // quên mật khẩu
    // forgot_password(){
    //    this.$router.push()
    // }
  }
}
</script>
