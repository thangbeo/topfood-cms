<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-card-text class>
          <v-row class="mt-0" justify="center">
            <!-- <v-img :src="logo" contain max-width="250" max-height="250"/> -->
          </v-row>
          <v-divider class="mb-8 mt-6" />
          <form @submit.prevent="submit">
            <v-text-field
              outlined
              v-model="username"
              :error-messages="$store.state.login.username.errors"
              label="Tên đăng nhập *"
            />

            <v-text-field
              id="password"
              label="Mật khẩu *"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              name="password"
              v-model="password"
              :type="showPass ? 'text' : 'password'"
              :error-messages="$store.state.login.password.errors"
              outlined
              @click:append="showPass = !showPass"
            />
            <div class="d-flex justify-center">
              <v-btn color="primary" type="submit" class="text--none" block>
                Đăng nhập
              </v-btn>
            </div>
            <!-- <div class="pt-5 pb-2">
              <span class="color fs-14">Bạn chưa có tài khoản?</span>
              <span
                style="text-decoration: none"
                class="error--text font-weight-700 fs-13"
                @click="logup"
              >
                <v-btn text class="text-none error--text px-0">
                  Đăng ký ngay
                </v-btn>
              </span>
            </div> -->
            <div class="color" @click="forgot_password">
              <v-btn class="error--text text-none px-0" text>
                Quên mật khẩu?
              </v-btn>
            </div>
          </form>
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
    showPass: false
  }),

  methods: {
    submit() {
      this.$wait.start('logging')
      setTimeout(() => {
        this.$store.dispatch('login/Submit', this.$store.state.app.ip)
      }, 1000)
    },
    // quên mật khẩu
    forgot_password() {
      this.$router.push('/forgot')
    },
    logup() {
      this.$router.push('/logup')
    }
  },

  computed: {
    username: {
      get() {
        return this.$store.state.login.username.value
      },
      set(value) {
        this.$store.dispatch('login/setUsername', value)
      }
    },
    password: {
      get() {
        return this.$store.state.login.password.value
      },
      set(value) {
        this.$store.dispatch('login/setPassword', value)
      }
    }
  }
}
</script>
