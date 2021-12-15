import APIs from '~/assets/configurations/API_Config'
import Cookies from 'js-cookie'
import uniqid from 'uniqid'

const state = () => ({
  getListTag: {
    url: '/api/tag',
    method: 'GET'
  },
  addTag: {
    url: '/api/tag',
    method: 'POST'
  },
  updateTag: {
    url: '/api/tag',
    method: 'PUT'
  },
  // detailTag: {
  //   url: '/api/tag',
  //   method: 'GET'
  // },
  detailTag: {
    url: '/api/tag/store',
    method: 'GET'
  },

  deleteTag: {
    url: '/api/tag',
    method: 'DELETE'
  },
  //
  listFood: {
    url: '/store-profile/list-food',
    method: 'GET'
  },
  // add sug tab
  addsubtag: {
    url: '/store-profile/food/create',
    method: 'POST'
  },
  deleteSubTag: {
    url: '/store-profile/food/delete',
    method: 'DELETE'
  },
  updateSubTab: {
    url: '/store-profile/food/update',
    method: 'PUT'
  },
  detailSubTag: {
    url: '/store-profile/food',
    method: 'GET'
  },
  // thay đổi trạng thái
  tagEnable: {
    url: '/api/tag/enable',
    method: 'PUT'
  }
})

const getters = {}

const mutations = {}

const actions = {
  async listFood(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.listFood.url,
      method: vueContext.state.listFood.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      params: {
        ...payload
      }
    })
    return response
  },
  async detailSubTag(vueContext, foodId) {
    const response = await this.$axios({
      url: `${vueContext.state.detailSubTag.url}/${foodId}`,
      method: vueContext.state.detailSubTag.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    })
    return response
  },
  async addsubtag(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.addsubtag.url,
      method: vueContext.state.addsubtag.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      data: {
        ...payload
      }
    })
    return response
  },

  async tagEnable(vueContext, payload) {
    const response = await this.$axios({
      url: `${vueContext.state.tagEnable.url}/${payload.id}`,
      method: vueContext.state.tagEnable.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    })
    return response
  },
  async updateSubTab(vueContext, payload) {
    const response = await this.$axios({
      url: `${vueContext.state.updateSubTab.url}`,
      method: vueContext.state.updateSubTab.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      data: {
        ...payload
      }
    })
    return response
  },
  async detailTag(vueContext, id) {
    const response = await this.$axios({
      url: `${vueContext.state.detailTag.url}/${id}`,
      method: vueContext.state.detailTag.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    })
    return response
  },
  async addTag(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.addTag.url,
      method: vueContext.state.addTag.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      data: {
        ...payload
      }
    })
    return response
  },

  async deleteTag(vueContext, payload) {
    const response = await this.$axios({
      url: `${vueContext.state.deleteTag.url}/${payload.id}`,
      method: vueContext.state.deleteTag.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    })

    return response
  },
  async deleteSubTag(vueContext, payload) {
    const response = await this.$axios({
      url: `${vueContext.state.deleteSubTag.url}/${payload.foodId}`,
      method: vueContext.state.deleteSubTag.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    })

    return response
  },
  async updateTag(vueContext, payload) {
    const response = await this.$axios({
      url: `${vueContext.state.updateTag.url}/${payload.id}`,
      method: vueContext.state.updateTag.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      data: {
        ...payload
      }
    })
    return response
  },
  async getListTag(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.getListTag.url,
      method: vueContext.state.getListTag.method,
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
