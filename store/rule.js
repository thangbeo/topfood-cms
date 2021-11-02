import APIs from '~/assets/configurations/API_Config'
import Cookies from 'js-cookie'
import uniqid from 'uniqid'

const state = () => ({
  getListRule: {
    url: '/api/rule',
    method: 'GET'
  },
  addRule: {
    url: '/api/rule',
    method: 'POST'
  },
  updateRule: {
    url: '/api/rule',
    method: 'PUT'
  }
})

const getters = {}

const mutations = {}

const actions = {
  async addRule(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.addRule.url,
      method: vueContext.state.addRule.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      data: {
        ...payload
      }
    })
    return response
  },

  async updateRule(vueContext, payload) {
    const response = await this.$axios({
      url: `${vueContext.state.updateRule.url}/${payload.id}`,
      method: vueContext.state.updateRule.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      data: {
        ...payload
      }
    })
    return response
  },
  async getListRule(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.getListRule.url,
      method: vueContext.state.getListRule.method,
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
