import Cookies from 'js-cookie'
import APIs from '~/assets/configurations/API_Config'

export const state = () => ({
  username: {
    errors: [],
    value: ''
  },
  password: {
    errors: [],
    value: ''
  },
  getLogup: {
    url: '/auth/register',
    method: 'POST'
  },
  getOpt: {
    url: '/auth/get-otp',
    method: 'GET'
  },
  forgotPassword: {
    url: '/auth/forgot-password',
    method: 'POST'
  }
})

export const mutations = {
  setUsername(state, payload) {
    state.username = {
      ...state.username,
      value: payload,
      errors: []
    }
  },
  unsetItem(state) {
    state.username.value = ''
    state.password.value = ''
  },
  setPassword(state, payload) {
    state.password = {
      ...state.password,
      value: payload,
      errors: []
    }
  },
  usernameHasErrors(state, payload) {
    state.username = {
      ...state.username,
      errors: [payload]
    }
  },
  passwordHasErrors(state, payload) {
    state.password = {
      ...state.password,
      errors: [payload]
    }
  },
  clearErrors(state, payload) {
    state.username = {
      ...state.username,
      errors: []
    }
    state.password = {
      ...state.password,
      errors: []
    }
  }
}

export const actions = {
  async forgotPassword(vueContext, data) {
    const respone = await this.$axios({
      url: vueContext.state.forgotPassword.url,
      method: vueContext.state.forgotPassword.method,
      headers: {},
      data: {
        ...data
      }
    })
    return respone
  },
  async getOpt(vueContext, data) {
    const respone = await this.$axios({
      url: vueContext.state.getOpt.url,
      method: vueContext.state.getOpt.method,
      headers: {},
      params: {
        ...data
      }
    })

    return respone
  },

  getLogup(vueContext, data) {
    const respone = this.$axios({
      url: vueContext.state.getLogup.url,
      method: vueContext.state.getLogup.method,
      headers: {},
      data: {
        ...data
      }
    })

    return respone
  },
  isAuthenticated(vueContext, req) {
    if (req) {
      let token
      try {
        token = req.headers.cookie
          .split(';')
          .find(c => c.trim().startsWith('token='))
          .split('=')[1]
      } catch (e) {
        token = ''
      }
      return token
    } else {
      const token =
        Cookies.get('token') !== undefined ? Cookies.get('token') : ''
      return token
    }
  },

  setUsername(vueContext, payload) {
    vueContext.commit('setUsername', payload)
  },

  setPassword(vueContext, payload) {
    vueContext.commit('setPassword', payload)
  },
  // async getAccessPages(vueContext, group_id) {
  //   let res_group_info = await this.$getGroupUser(group_id)
  //   let group_error_code = res_group_info.data.error.code
  //   if (group_error_code === APIs.responses.OK.code) {
  //     //chua tat cac trang o day
  //     let data_group = res_group_info.data.data.group_page_infos
  //     let list_page = []
  //     let count = 0
  //     data_group.forEach(p => {
  //       count += 1
  //       if (1) {
  //         let temp = list_page.find(i => i.page_id === p.page_id)
  //         if (temp == undefined) {
  //           //ko tim thay page thi moi them vao
  //           list_page.push({
  //             ...p
  //           })
  //         } else {
  //           let index = list_page.indexOf(temp)
  //           list_page[index].role_id = temp.role_id + ',' + p.role_id
  //         }
  //       } else {
  //         //console.log(p)
  //       }
  //     })
  //     vueContext.dispatch('app/GetRole')
  //     //luu cac page nay +role kem voi vao session page
  //     //page se co url va role cua tung page do

  //     // Cookies.set('list_page', list_page)
  //     //localStorage.setItem('list_page', JSON.stringify(list_page))
  //     // console.log(Cookies.get('list_page'), list_page, count, 'GET COOKIE')
  //   }
  // },
  Submit(vueContext, payload) {
    const username = vueContext.state.username.value
    const password = vueContext.state.password.value

    if (username.indexOf(' ') >= 0) {
      vueContext.commit('usernameHasErrors', 'T??n ng?????i d??ng kh??ng h???p l???.')
      // this.app.wait.end('logging')
      return
    }
    vueContext.commit('clearErrors')
    // Start calling API
    this.$login({
      username,
      password
    }).then(response => {
      if (response.response.status !== 200) {
        console.log('X???y ra l???i khi ????ng nh???p: ', response)
        this.$router.app.$notify({
          group: 'login',
          type: 'warn',
          text: response.response.data.message
        })
        // Wrong credentials
        vueContext.commit(
          'usernameHasErrors',
          'T??i kho???n ng?????i d??ng ho???c m???t kh???u kh??ng h???p l???'
        )
        vueContext.commit(
          'passwordHasErrors',
          'T??i kho???n ng?????i d??ng ho???c m???t kh???u kh??ng h???p l???'
        )
      } else {
        if (response.response.data.data.account.role !== 'ROLE_USER') {
          // Succeed
          this.$router.app.$notify({
            group: 'login',
            type: 'success',
            text: '????ng nh???p th??nh c??ng'
          })
          Cookies.set('token', response.response.data.data.token)
          Cookies.set('username', response.response.data.data.account.username)
          Cookies.set('userId', response.response.data.data.account.id)
          Cookies.set('userGroup', response.response.data.data.account.role)
          this.$router.push('/')
        } else {
          this.$router.app.$notify({
            group: 'login',
            type: 'warn',
            text: 'T??i kho???n kh??ng h???p l???'
          })
        }
      }

      // this.app.wait.end('logging')
    })
  }
}

export const getters = {
  // getUsername(state) {
  //   return state.username
  // },
  // getPassword(state) {
  //   return state.password
  // }
}
