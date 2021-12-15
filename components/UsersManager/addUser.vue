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
        >Thêm mới tài khoản</v-card-title
      >
      <v-container class="pt-5 pb-0" fluid>
        <v-row>
          <v-col cols="12" sm="6" md="6" class="pb-0">
            <v-text-field
              v-model="user_name"
              :error-messages="user_nameErrors"
              label="Tên đăng nhập *"
              outlined
              dense
              light
              clearable
              @input="user_nameErrors = []"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6" class="pb-0">
            <v-text-field
              v-model="password"
              :error-messages="passwordErrors"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              label="Mật khẩu *"
              outlined
              dense
              light
              clearable
              @click:append="showPassword = !showPassword"
              @input="validatePass($event, 'passwordErrors')"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6" class="py-0">
            <v-text-field
              v-model="full_name"
              :error-messages="full_nameErrors"
              label="Họ tên *"
              outlined
              dense
              light
              clearable
              @input="full_nameErrors = []"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6" class="py-0">
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
                  v-model="dateOfBirth"
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
                @change="save_date"
                v-model="menu_date"
                locale="vi"
                @input="menu = false"
              >
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="6" class="py-0">
            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              @input="validateEmail($event, 'emailErrors')"
              label="Email *"
              outlined
              dense
              light
              clearable
            />
          </v-col>
          <v-col cols="12" sm="6" md="6" class="pt-0">
            <v-text-field
              v-model="phone"
              type="text"
              :error-messages="phoneErrors"
              label="Số điện thoại *"
              outlined
              dense
              light
              clearable
              @input="validatePhone($event, 'phoneErrors')"
            />
          </v-col>
        </v-row>
      </v-container>
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
          <div class="text-none">Thêm</div>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Cookies from 'js-cookie'
import moment from 'moment'
export default {
  props: ['open'],
  data: () => ({
    logging: false,
    menu: false,
    menu_date: moment().format('YYYY-MM-DD'),
    showPassword: false,
    openDateDialog: false,
    user_name: null,
    user_nameErrors: [],
    password: null,
    passwordErrors: [],
    full_name: null,
    full_nameErrors: [],
    email: null,
    emailErrors: [],
    phone: null,
    phoneErrors: [],
    // address: null,
    // addressErrors: [],
    partner: null,
    partnerErrors: [],
    groups: 'ROLE_USER',

    status: 1,
    disabled_partner: false,
    listPartner: [],
    listGroupUsers: [],
    activePicker: null,
    dateOfBirth: null,
    city: null,
    listCity: [],
    cityErrors: []
  }),
  watch: {
    open(value) {
      if (value) {
        this.getListCity()
      } else {
        this.reset()
      }
    }
  },
  methods: {
    getListCity() {
      this.$store.dispatch('users/getlistCity').then(response => {
        this.listCity = response.data
      })
    },
    // danh sách quyền
    // get_list() {
    //   this.$store
    //     .dispatch('rule/getListRule', {
    //       pageSize: 10000000,
    //       page: 0,
    //       title: ''
    //     })
    //     .then(response => {
    //       if (response.status === 200) {
    //         this.listGroupUsers = response.data.data
    //       } else {
    //         this.$router.app.$notify({
    //           group: 'main',
    //           type: 'warning',
    //           text: 'Lỗi hệ thống'
    //         })
    //       }
    //     })
    // },
    allowedDates(value) {
      const today = moment(new Date()).format('YYYY-MM-DD')

      if (today >= value) {
        return true
      } else {
        return false
      }
    },
    save_date(date) {
      this.dateOfBirth = moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    },
    toggle() {
      this.$emit('toggle')
      this.reset()
    },

    reset() {
      this.showPassword = false
      this.user_name = null
      this.user_nameErrors = []
      this.password = null
      this.passwordErrors = []
      this.full_name = null
      this.full_nameErrors = []
      this.email = null
      this.emailErrors = []
      this.phone = null
      this.phoneErrors = []

      this.groups = null
      this.groupsErrors = []
      this.dateOfBirth = null
      this.status = 1
      this.city = null
      this.cityErrors = []

      this.menu_date = moment().format('YYYY-MM-DD')
    },

    // validate

    validatePass(value, error) {
      if (this.$isNullOrEmpty(value)) {
        this[error] = ['Không được để trống']
      } else {
        this[error] = []
      }
    },
    validatePhone(value, error) {
      const isPhoneRegex = /\D/g
      if (this.$isNullOrEmpty(value)) {
        this[error] = ['Không được để trống']
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
    validateEmail(value, error) {
      if (this.$isNullOrEmpty(value)) {
        this[error] = ['Không được để trống']
      } else if (!this.$isEmail(value.trim())) {
        this[error] = ['Email không hợp lệ']
      } else {
        this[error] = []
      }
    },
    validateNumber(value, field) {
      if (this.$isNullOrEmpty(value)) {
        this[field + 'Errors'] = ['Không được để trống']
      } else if (isNaN(Number(value))) {
        this[field + 'Errors'] = ['Giá trị không hợp lệ']
      } else if (value < 0) {
        this[field + 'Errors'] = ['Giá trị không hợp lệ']
      } else {
        this[field + 'Errors'] = []
      }
    },
    checkValidate() {
      let hasErrors = false

      if (this.$isNullOrEmpty(this.user_name)) {
        hasErrors = true
        this.user_nameErrors = ['Không được để trống']
      } else if (this.user_name.trim() == '') {
        hasErrors = true
        this.user_nameErrors = ['Không được để trống']
      } else if (this.user_name.length > 1000) {
        hasErrors = true
        this.user_nameErrors = ['Không được vượt quá 1000 ký tự']
      }

      if (this.$isNullOrEmpty(this.password)) {
        hasErrors = true
        this.passwordErrors = ['Không được để trống']
      } else if (this.password.trim() == '') {
        hasErrors = true
        this.passwordErrors = ['Không được để trống']
      }

      if (this.$isNullOrEmpty(this.full_name)) {
        hasErrors = true
        this.full_nameErrors = ['Không được để trống']
      } else if (this.full_name.trim() == '') {
        hasErrors = true
        this.full_nameErrors = ['Không được để trống']
      } else if (this.full_name.length > 1000) {
        hasErrors = true
        this.full_nameErrors = ['Không được vượt quá 1000 ký tự']
      }

      if (this.$isNullOrEmpty(this.email)) {
        hasErrors = true
        this.emailErrors = ['Không được để trống']
      } else if (!this.$isEmail(this.email.trim())) {
        hasErrors = true
        this.emailErrors = ['Email không hợp lệ']
      }

      const isPhoneRegex = /\D/g
      if (this.$isNullOrEmpty(this.phone)) {
        hasErrors = true
        this.phoneErrors = ['Không được để trống']
      } else if (
        (this.phone || '').trim().length !== 10 &&
        (this.phone || '').trim().length !== 11
      ) {
        hasErrors = true
        this.phoneErrors = 'Số điện thoại không hợp lệ'
      } else if (isPhoneRegex.test((this.phone || '').trim())) {
        hasErrors = true
        this.phoneErrors = 'Số điện thoại không hợp lệ'
      }

      // if (this.$isNullOrEmpty(this.groups)) {
      //   hasErrors = true
      //   this.groupsErrors = ['Không được để trống']
      // } else {
      //   if (this.groups === 'ROLE_STORE') {
      //     if (this.$isNullOrEmpty(this.city)) {
      //       this.cityErrors = ['Không được để trống']
      //       hasErrors = true
      //     }
      //   }
      // }

      if (!hasErrors) {
        this.add()
      }
    },
    add() {
      this.$wait.start('logging')
      let data = {
        username: this.user_name.trim(),
        phoneNumber: this.phone.trim(),
        password: this.password.trim(),
        name: this.full_name.trim(),
        email: this.email.trim(),
        city: this.city,
        birthday: this.$isNullOrEmpty(this.dateOfBirth)
          ? ''
          : moment(this.dateOfBirth).format(),
        role: this.groups
      }
      this.$store
        .dispatch('users/addAccount', data)
        .then(response => {
          if (response.status === 200) {
            this.$router.app.$notify({
              group: 'main',
              type: 'success',
              text: 'Thêm tài khoản thành công'
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
