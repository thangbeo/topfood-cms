import APIs from '~/assets/configurations/API_Config'
import Cookies from 'js-cookie'
import uniqid from 'uniqid'

const state = () => ({
  getList: {
    url: '/store-profile/list-post',
    method: 'GET'
  },
  addPost: {
    url: '/store-profile/post/create',
    method: 'POST'
  },
  updateTag: {
    url: '/api/tag',
    method: 'PUT'
  },
  detailTag: {
    url: '/api/tag',
    method: 'GET'
  },
  deletePost: {
    url: '/store-profile/post/delete',
    method: 'DELETE'
  },
  //
  updatePost: {
    url: '/store-profile/post/update',
    method: 'PUST'
  }
})

const getters = {}

const mutations = {}

const actions = {
  async getList(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.getList.url,
      method: vueContext.state.getList.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      params: {
        ...payload
      }
    })
    return response
  },
  async addPost(vueContext, payload) {
    const response = await this.$axios({
      url: vueContext.state.addPost.url,
      method: vueContext.state.addPost.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      data: {
        ...payload
      }
    })
    return response
  },
  async deletePost(vueContext, payload) {
    const response = await this.$axios({
      url: `${vueContext.state.deletePost.url}/${payload.postId}`,
      method: vueContext.state.deletePost.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    })
    return response
  },
  async updatePost(vueContext, payload) {
    const response = await this.$axios({
      url: `${vueContext.state.updatePost.url}/${payload.id}`,
      method: vueContext.state.updatePost.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      data: {
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
