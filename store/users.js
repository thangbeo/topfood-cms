import APIs from '~/assets/configurations/API_Config'
import Cookies from 'js-cookie'
import uniqid from 'uniqid'

const state = () => ({
  list: {
    url: '/account',
    method: 'GET'
  },
  accountEnable: {
    url: '/account/enable',
    method: 'PUT'
  },
  accountAdminActive: {
    url: '/account/admin/active',
    method: 'PUT'
  },
  delete_user: {
    url: '/account/admin',
    method: 'DELETE'
  },
  addAccount: {
    url: '/account/admin',
    method: 'POST'
  },
  edit_user: {
    url: 'cms/account/update',
    method: 'POST'
  },
  detail: {
    url: 'cms/account/detail',
    method: 'GET'
  },

  resetPassword: {
    url: '/account/admin/reset-password',
    method: 'PUT'
  },
  // thay đổi trạng thái đang chờ sang đã duyệt
  updateRole: {
    url: '/account/admin/update-role',
    method: 'PUT'
  }
})

const getters = {}

const mutations = {}

const actions = {
  async get_list(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.list.url,
      method: vueContext.state.list.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      params: {
        ...payload
      }
    })
    return response
  },

  async accountAdminActive(vueContext, id) {
    const response = await this.$axios({
      url: `${vueContext.state.accountAdminActive.url}/${id}`,
      method: vueContext.state.accountAdminActive.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    })
    return response
  },

  async updateRole(vueContext, payload) {
    const response = await this.$axios({
      url: `${vueContext.state.updateRole.url}/${payload.id}`,
      method: vueContext.state.updateRole.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      data: {
        ...payload
      }
    })
    return response
  },
  async resetPassword(vueContext, id) {
    const response = await this.$axios({
      url: `${vueContext.state.resetPassword.url}/${id}`,
      method: vueContext.state.resetPassword.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    })
    return response
  },
  async accountEnable(vueContext, id) {
    const response = await this.$axios({
      url: `${vueContext.state.accountEnable.url}/${id}`,
      method: vueContext.state.accountEnable.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    })
    return response
  },
  async deleted_user(vueContext, payload) {
    let currentUser = Cookies.get('username')
    if (currentUser === payload.user_name) {
      this.$showError(
        this.$router.app,
        'Không cho phép xóa chính tài khoản đang đăng nhập.'
      )
      return
    }

    const response = await this.$axios({
      url: `${vueContext.state.delete_user.url}/${payload.id}`,
      method: vueContext.state.delete_user.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    })
    return response
  },

  async addAccount(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.addAccount.url,
      method: vueContext.state.addAccount.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      data: {
        ...payload
      }
    })
    return response
  },

  async edit(vueContext, payload) {
    const transid = uniqid()
    const response = await this.$axios({
      url: vueContext.state.edit_user.url,
      method: vueContext.state.edit_user.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      data: {
        channel: APIs.channel,
        transid,
        ...payload
      }
    })
    return response
  },

  async list_partner(vueContext) {
    const transid = uniqid()
    const response = await this.$axios({
      url: vueContext.state.utility.partner.url,
      method: vueContext.state.utility.partner.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      params: {
        channel: APIs.channel,
        transid,
        user_id: Cookies.get('userId')
      }
    })
    return response
  },

  async list_group(vueContext) {
    const transid = uniqid()
    const response = await this.$axios({
      url: vueContext.state.utility.group.url,
      method: vueContext.state.utility.group.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      params: {
        channel: APIs.channel,
        transid
      }
    })
    return response
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
