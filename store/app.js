import Cookies from 'js-cookie'
import ULT from '~/plugins/ult'
import APIs from '~/assets/configurations/API_Config'
import uniqid from 'uniqid'

export const state = () => ({
  ip: '',
  roles: [],
  pageSizes: [1, 10, 20, 50, 100, 150, 200, 300],
  getRoles: false,
  // reload_treeview: false,
  change_pass: {
    url: '/account/change-password',
    method: 'PUT'
  },
  filesUpload: {
    url: '/files/upload',
    method: 'POST'
  },
  uploadFiles: {
    url: '/files/uploads',
    method: 'POST'
  }
})

export const mutations = {
  ClientPrivateIP(state, ip) {
    state.ip = ip
  },
  setRole(state, payload) {
    // console.log(payload)
    state.roles = payload
    state.getRoles = true
  }
  // toggle_reaload_treeview(state) {
  //   state.reload_treeview = !state.reload_treeview
  // },
}

export const actions = {
  // async GetRole(vueContext, payload) {
  //   this.$getRoleByUser(payload).then(response => {
  //     // console.log(response.data)
  //     let errorCode = response.data.error.code
  //     if (errorCode === APIs.responses.OK.code) {
  //       vueContext.commit('setRole', response.data.data.lsPageInfos)

  //       let store_name = ''
  //       let userBaseStore = ''
  //       if ((response.data.data.userBaseStore || '').length !== 0) {
  //         // userBaseStore = response.data.data.userBaseStore.base_role_list
  //         store_name = response.data.data.userBaseStore.base_name
  //       }
  //       Cookies.set('storeName', store_name)
  //       // Cookies.set('roleticket', userBaseStore)
  //     } else if (APIs.responses[errorCode] != undefined) {
  //       this.$showError(this.$router.app, APIs.responses[errorCode].message)
  //     } else {
  //       let errorMsg = response.data.error.message
  //       this.$showError(
  //         this.$router.app,
  //         'Đã xảy ra lỗi khi lấy thông tin quyền truy cập. ' + errorMsg
  //       )
  //     }
  //   })
  // },
  async changePass(vueContext, payload) {
    const response = await this.$axios({
      ...vueContext.state.change_pass,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      data: {
        ...payload
      }
    })
    return response
  },
  async filesUpload(vueContext, data) {
    const response = await this.$axios({
      url: `${vueContext.state.filesUpload.url}`,
      method: vueContext.state.filesUpload.method,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      params: {},
      data: data.formData
    })
    return response
  },
  async uploadFiles(vueContext, data) {
    const response = await this.$axios({
      url: `${vueContext.state.uploadFiles.url}`,
      method: vueContext.state.uploadFiles.method,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      params: {},
      data: data.formData
    })
    return response
  },

}

export const getters = {}
