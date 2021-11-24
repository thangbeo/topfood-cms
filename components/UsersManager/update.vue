<template>
  <v-dialog
    :value="open"
    @keydown="$event.key === 'Escape' && toggle()"
    max-width="900px"
    scrollable
    persistent
  >
    <v-card>
      <v-card-title class="border-title-dialog py-3">
        Cập nhật tài khoản:
        {{ !$isNullOrEmpty(data) ? data.item.user_name : '' }}
      </v-card-title>
      <v-container class="pt-5 pb-0" fluid>
        <v-row>
          <v-col cols="12" sm="6" md="6" class="pb-0">
            <v-text-field
              v-model="full_name"
              :error-messages="full_nameErrors"
              label="Họ tên *"
              outlined
              dense
              light
              clearable
              @input="validateInput($event, 'full_nameErrors')"
            />
          </v-col>

          <v-col cols="12" sm="6" md="6" class="pb-0">
            <v-text-field
              v-model="phone"
              type="number"
              :error-messages="phoneErrors"
              label="Số điện thoại *"
              outlined
              dense
              light
              clearable
              @input="validatePhone($event, 'phoneErrors')"
            />
          </v-col>

          <v-col cols="12" sm="6" md="6" class="py-0">
            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              label="Email *"
              outlined
              dense
              light
              clearable
              @input="validateEmail($event, 'emailErrors')"
            />
          </v-col>

          <v-col cols="12" sm="6" md="6" class="py-0">
            <v-autocomplete
              v-model="data_access_limit"
              :error-messages="data_access_limitErrors"
              :items="list_data_access_limit"
              label="Giới hạn dữ liệu *"
              no-data-text="Không có dữ liệu"
              dense
              light
              outlined
              @input="inputData($event, 'data_access_limit')"
            />
          </v-col>

          <v-col cols="12" sm="6" md="6" class="py-0">
            <v-autocomplete
              v-model="groups"
              :items="listGroupUsers"
              :error-messages="groupsErrors"
              item-value="group_id"
              item-text="group_name"
              label="Thuộc nhóm *"
              no-data-text="Không có dữ liệu"
              outlined
              dense
              light
              multiple
              chips
              deletable-chips
              small-chips
              @input="groupsErrors = []"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text height="30px" class="primary" @click="checkValidate">
          <div class="text-none">Lưu</div>
        </v-btn>
        <v-btn text height="30px" class="secondary" @click="toggle">
          <div class="text-none">Đóng</div>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import SingeDatePicker from '../SingeDatePicker'
import Cookies from 'js-cookie'

export default {
  name: 'update',
  components: {
    SingeDatePicker
  },
  props: ['open', 'data'],
  data: () => ({
    openDateDialog: false,
    full_name: null,
    full_nameErrors: [],
    email: null,
    emailErrors: [],
    phone: null,
    phoneErrors: [],
    partner: null,
    partnerErrors: [],
    groups: [],
    groupsErrors: [],
    data_access_limit: null,
    data_access_limitErrors: [],
    list_data_access_limit: [
      { value: '1', text: 'Hệ thống' },
      { value: 1, text: 'Tất cả điểm bán' },
      { value: 0, text: 'Giới hạn theo điểm bán' }
    ],
    status: 1,
    user_id: -1,
    disabled_partner: false,
    listPartner: [],
    listGroupUsers: []
  }),
  watch: {
    open: function() {
      if (this.open) {
        this.$store
          .dispatch('users/list_partner', Cookies.get('userId'))
          .then(res => {
            if (!res.error) {
              this.listPartner = res.data.data.items
            }
          })
        this.$store.dispatch('users/list_group').then(res => {
          if (!res.error) {
            this.listGroupUsers = res.data.data.items
          }
        })
        // console.log(this.data)
        if (this.data.item.partner_id === 0) {
          this.data_access_limit = '1'
          this.disabled_partner = true
        } else {
          this.data_access_limit = this.data.item.data_access_limit
          this.disabled_partner = false
        }
        this.user_id = this.data.item.user_id
        this.full_name = this.data.item.full_name
        this.email = this.data.item.email
        this.phone = this.data.item.phone
        this.partner = this.data.item.partner_id
        let arr = []
        if ((this.data.group_info || []).length !== 0) {
          for (let i = 0; i < this.data.group_info.length; i++) {
            arr.push(this.data.group_info[i].group_id)
          }
          this.groups = arr
        }
        this.status = this.data.item.active_status
      }
    }
  },
  methods: {
    toggle() {
      this.$emit('toggle')
      this.reset()
    },
    reset() {
      this.full_name = null
      this.full_nameErrors = []
      this.email = null
      this.emailErrors = []
      this.phone = null
      this.phoneErrors = []
      this.partner = null
      this.partnerErrors = []
      this.groups = null
      this.groupsErrors = []
      this.data_access_limit = null
      this.data_access_limitErrors = []
      this.status = 1
      this.user_id = -1
      this.disabled_partner = false
    },
    inputData(value, field) {
      // this.$log.debug(value)
      if (value === '1') {
        this.partner = 0
        this.partnerErrors = []
        this.disabled_partner = true
      } else {
        if (this.partner === 0) {
          this.partner = null
        }
        this.disabled_partner = false
        this.partnerErrors = []
      }
      this[field] = value
      this[field + 'Errors'] = []
    },
    // validate
    validateInput(value, error) {
      if (this.$isNullOrEmpty(value)) {
        this[error] = ['Không được để trống']
      } else if (value.length > 1000) {
        this[error] = ['Không được vượt quá 1000 ký tự']
      } else {
        this[error] = []
      }
    },
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
      }
      // else if (!this.$isMobilePhone(value.trim())) {
      //   this[error] = ['Số điện thoại không hợp lệ']
      // }
      else {
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

      if (this.data_access_limit !== '1' && this.$isNullOrEmpty(this.partner)) {
        hasErrors = true
        this.partnerErrors = ['Không được để trống']
      }

      if (this.$isNullOrEmpty(this.groups)) {
        hasErrors = true
        this.groupsErrors = ['Không được để trống']
      }

      if (this.$isNullOrEmpty(this.data_access_limit)) {
        hasErrors = true
        this.data_access_limitErrors = ['Không được để trống']
      }

      if (!hasErrors) {
        this.edit()
      }
    },
    edit() {
      let data = {
        user_id: this.user_id,
        user_name: this.data.item.user_name,
        full_name: this.full_name.trim(),
        phone: this.phone.trim(),
        email: this.email.trim(),
        active_status: this.status,
        list_group: this.groups.join() + ',',
        data_access_limit: Number(this.data_access_limit),
        partner_id: this.partner
      }
      this.$store
        .dispatch('users/edit', data)
        .then(response => {
          if (!response.error) {
            this.$showSuccess(this, 'Cập nhật tài khoản thành công')
            this.$emit('Success')
            this.toggle()
          }
        })
        .catch(e => {
          this.$log.debug(e)
        })
        .finally(() => {})
    }
  }
}
</script>
