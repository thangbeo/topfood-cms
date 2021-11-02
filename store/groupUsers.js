import APIs from '~/assets/configurations/API_Config'
import Cookies from 'js-cookie'

const state = () => ({
  items: [],
  selectedIndex: -1,
  selectedItem: {
    group_id: 0,
    group_name: {
      value: '',
      invalid: false,
      invalidMsg: ''
    },
    description: {
      value: '',
      invalid: false,
      invalidMsg: ''
    },
    status: 1,
    groupPages: []
  },
  lstPages: [],
  lstUser: [],
  lstRoles: []
})

const getters = {}

const mutations = {
  changeStateValue(state, payload) {
    state[payload.field] = payload.value
  },
  changeComplexStateSeletedValue(state, payload) {
    state.selectedItem[payload.field] = {
      ...state.selectedItem[payload.field],
      value: payload.value,
      invalid: false,
      invalidMsg: ''
    }
  },
  changeSimpleStateSeletedValue(state, payload) {
    state.selectedItem[payload.field] = payload.value
  },

  //set items by array object
  setListItems(state, payload) {
    state.items = payload
  },
  //action to set selectedItem by itemdb
  setSelectedItem(state, item) {
    state.selectedItem.group_id = item.group_id
    state.selectedItem.group_name.value = item.group_name
    state.selectedItem.description.value = item.description
    state.selectedItem.status = item.status
    state.selectedIndex = state.items.indexOf(item)
  },
  resetValid(state) {
    state.selectedItem.group_name.invalidMsg = ''
    state.selectedItem.group_name.invalid = false
    state.selectedItem.description.invalidMsg = ''
    state.selectedItem.description.invalid = false
  },
  //create new item - reset all property of item
  setNewItem(state) {
    state.selectedItem = {
      group_id: 0,
      group_name: {
        value: '',
        invalid: false,
        invalidMsg: ''
      },
      description: {
        value: '',
        invalid: false,
        invalidMsg: ''
      },
      status: 1,
      textGroupPage: '',
      groupPages: []
    }
    state.selectedIndex = -1
  },
  setGroupPage(state, pages) {
    state.selectedItem.groupPages = []
    pages.forEach(p => {
      state.selectedItem.groupPages.push(p)
    })
  },
  updateItem(state, payload) {
    let save_item = payload
    Object.assign(state.items[state.selectedIndex], save_item)
  },
  deleteItem(state) {
    state.items.splice(state.selectedIndex, 1)
  },

  unsetItem(state) {
    state.selectedItem = {
      group_id: 0,
      group_name: {
        value: '',
        invalid: false,
        invalidMsg: ''
      },
      description: {
        value: '',
        invalid: false,
        invalidMsg: ''
      },
      status: 1,
      textGroupPage: '',
      groupPages: []
    }
    state.selectedIndex = -1
  },

  setInvalid(state, payload) {
    state.selectedItem[payload.field] = {
      ...state.selectedItem[payload.field],
      invalid: true,
      invalidMsg: payload.message
    }
  },
  setListPages(state, payload) {
    state.lstPages = []
    state.lstRoles = []
    payload.pages.forEach(p => {
      state.lstPages.push({
        page_id: p.id,
        page_name: p.page_name
      })
    })
    payload.roles.forEach(p => {
      state.lstRoles.push({
        role_id: p.role_id,
        page_id: p.page_id,
        role_name: p.role_name
      })
    })
  },
  setGroupUser(state, payload) {
    state.lstUser = []
    state.lstUser = payload
  }
}

const actions = {
  async getListItems(vueContext) {
    try {
      let response = await this.$getListGroupUsers()
      let errorCode = response.data.error.code
      let data = response.data.data
      if (errorCode === APIs.responses.OK.code) {
        vueContext.commit('setListItems', data.items)
        if (vueContext.state.lstPages.length <= 0) {
          vueContext.dispatch('setListPages')
        }
      }
      this.app.wait.end('loadingGroupUser')
      return -1
    } catch (errors) {
      this.app.wait.end('loadingGroupUser')
      return -1
    }
  },

  async getGroupUser(vueContext, payload) {
    //
    try {
      let response = await this.$getGroupUser(payload.group_id)
      let errorCode = response.data.error.code
      let data = response.data.data

      if (errorCode === APIs.responses.OK.code) {
        let groupInfo = data.group_infos
        if (groupInfo.length > 0) vueContext.commit('setSelectedItem', payload)
        else return 0

        let groupUsers = data.group_users
        if (groupUsers !== null) {
          vueContext.commit('setGroupUser', groupUsers)
        }

        let groupPage = data.group_page_infos
        vueContext.commit('setGroupPage', groupPage)
        return 1
      }
      return 0
    } catch (errors) {
      return 0
    }
  },

  changeStateValue(vueContext, payload) {
    vueContext.commit('changeStateValue', payload)
  },
  changeComplexStateSeletedValue(vueContext, payload) {
    vueContext.commit('changeComplexStateSeletedValue', payload)
  },
  changeSimpleStateSeletedValue(vueContext, payload) {
    vueContext.commit('changeSimpleStateSeletedValue', payload)
  },
  setSelectedItem(vueContext, payload) {
    vueContext.commit('setSelectedItem', payload)
  },
  unsetItem(vueContext) {
    vueContext.commit('unsetItem')
  },
  resetValid(vueContext) {
    vueContext.commit('resetValid')
  },
  deleteItem(vueContext, payload) {
    this.$deleteGroupUser(vueContext.state.selectedItem.group_id)
      .then(response => {
        let errorCode = response.data.error.code
        if (errorCode === APIs.responses.OK.code) {
          vueContext.commit('deleteItem')
          vueContext.commit('unsetItem')
          vueContext.dispatch('getListItems')
          this.$showSuccess(this.$router.app, 'Xóa nhóm người dùng thành công.')
        }
        this.app.wait.end('loadingGroupUser')
        return parseInt(errorCode)
      })
      .catch(errors => {
        // Exceptions
        this.app.wait.end('loadingGroupUser')
        this.$showErrorNotify(
          this.$router.app,
          errors,
          'Không thể kết nối đến server'
        )
      })
  },
  setNewItem(vueContext) {
    vueContext.commit('setNewItem')
  },
  // async resetAccessCurrentPage(vueContext, group_id) {
  //   // let list_page = []
  //   // localStorage.setItem('list_page', JSON.stringify(list_page))
  //   vueContext.dispatch('app/GetRole', undefined, { root: true })
  //   Object.keys(Cookies.get()).forEach(function(cookieName) {
  //     var neededAttributes = {}
  //     Cookies.remove(cookieName, neededAttributes)
  //   })
  //   this.$router.push('/login')
  // },
  async saveItem(vueContext, payload) {
    let error = false
    try {
      if (vueContext.state.selectedItem.group_name.value.trim() === '') {
        error = true
        vueContext.commit('setInvalid', {
          field: 'group_name',
          message: 'Không được để trống'
        })
      } else if (
        vueContext.state.selectedItem.group_name.value.trim().length > 30
      ) {
        error = true
        vueContext.commit('setInvalid', {
          field: 'group_name',
          message: 'Không được dài quá 30 ký tự'
        })
      }
      if (vueContext.state.selectedItem.description.value.trim() === '') {
        error = true
        vueContext.commit('setInvalid', {
          field: 'description',
          message: 'Không được để trống'
        })
      } else if (vueContext.state.selectedItem.description.value.length > 100) {
        error = true
        vueContext.commit('setInvalid', {
          field: 'description',
          message: 'Không được dài quá 100 ký tự'
        })
      }

      if (
        vueContext.state.selectedIndex !== -1 &&
        (payload == undefined || payload.length <= 0)
      ) {
        error = true
        this.$showError(
          this.$router.app,
          'Bạn phải chọn ít nhất một quyền cho 1 trang.'
        )
      }
      if (error) return 0
      let newItem = {
        group_id: vueContext.state.selectedItem.group_id,
        group_name: vueContext.state.selectedItem.group_name.value.trim(),
        description: vueContext.state.selectedItem.description.value.trim(),
        status: vueContext.state.selectedItem.status,
        group_page: payload
      }

      if (!error && vueContext.state.selectedIndex === -1) {
        let response = await this.$addGroupUser(newItem)
        let errorCode = response.data.error.code
        if (errorCode === APIs.responses.OK.code) {
          vueContext.commit('unsetItem')
          vueContext.dispatch('getListItems')
          this.$showSuccess(
            this.$router.app,
            'Thêm nhóm người dùng thành công.'
          )
          // this.app.wait.start('loadingGroupUser')
          return 1
        }
        return 0
      } else if (!error && vueContext.state.selectedIndex !== -1) {
        let response = await this.$updateGroupUser(newItem)
        let errorCode = response.data.error.code

        if (errorCode === APIs.responses.OK.code) {
          vueContext.commit('updateItem', newItem)

          this.$showSuccess(
            this.$router.app,
            'Cập nhật nhóm người dùng thành công.'
          )

          // let currentGroup = Cookies.get('group')
          // if (newItem.group_id == parseInt(currentGroup)) {
          //   vueContext.dispatch('resetAccessCurrentPage', parseInt(currentGroup))
          // }
          return 1
        }
        return 0
      }
    } catch (errors) {
      return 0
    }
  },
  setListPages(vueContext) {
    this.$getListPages()
      .then(response => {
        let errorCode = response.data.error.code
        let data = response.data.data
        if (errorCode === APIs.responses.OK.code) {
          vueContext.commit('setListPages', {
            pages: data.pages,
            roles: data.page_roles
          })
        }
        this.app.wait.end('loadingGroupUser')
      })
      .catch(errors => {
        // Exceptions
        this.app.wait.end('loadingGroupUser')
      })
  },
  changeValue(vueContext, payload) {
    vueContext.commit('changeComplexStateSeletedValue', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
