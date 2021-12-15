import APIs from '~/assets/configurations/API_Config'
import Cookies from 'js-cookie'
import uniqid from 'uniqid'

const state = () => ({
  accountTotalStore: {
    url: '/account/total/store',
    method: 'GET'
  },
  accountTotalUser: {
    url: '/account/total/user',
    method: 'GET'
  }
})

const getters = {}

const mutations = {}

const actions = {
  async accountTotalStore(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.accountTotalStore.url,
      method: vueContext.state.accountTotalStore.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      params: {
        ...payload
      }
    })
    return response
  },
  async accountTotalUser(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.accountTotalUser.url,
      method: vueContext.state.accountTotalUser.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      params: {
        ...payload
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
