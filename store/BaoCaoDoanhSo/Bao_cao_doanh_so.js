import uniqid from 'uniqid'
import Cookies from 'js-cookie'
// import APIs from '../assets/configurations/API_Config.js'
export const state = () => {
  return {
    report_sales: {
      url: 'cms/report/sales',
      method: 'GET',
    },
    partner_list: {
      url: 'cms/partner/list',
      method: 'GET',
    },
    pos_list: {
      url: 'cms/pos/get_list',
      method: 'GET',
    },
    user_pos_list: {
      url: 'cms/user_pos/list',
      method: 'GET',
    },
    // xskt
    report_sales_xskt: {
      url: 'cms/report/sales_xskt',
      method: 'GET',
    },
    // vé tồn xskt
    report_instock_xskt: {
      url: 'cms/report/instock_xskt',
      method: 'GET',
    },
    // vé hoàn xskt 
    report_return_xskt:{
      url: 'cms/report/return_xskt',
      method: 'GET'
    }
  }
}
export const mutations = {
}
export const actions = {
  // danh sách trả thưởng
  async report_sales(vueContext, data) {
    let channel = 'CMS'
    let transid = uniqid()
    const response = await this.$axios({
      url: vueContext.state.report_sales.url,
      method: vueContext.state.report_sales.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      params: {
        channel,
        transid,
        ...data,
      },
    })
    return response
  },

  async report_instock_xskt(vueContext, data) {
    let channel = 'CMS'
    let transid = uniqid()
    const response = await this.$axios({
      url: vueContext.state.report_instock_xskt.url,
      method: vueContext.state.report_instock_xskt.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      params: {
        channel,
        transid,
        ...data,
      },
    })
    return response
  },
  async report_return_xskt(vueContext, data) {
    let channel = 'CMS'
    let transid = uniqid()
    const response = await this.$axios({
      url: vueContext.state.report_return_xskt.url,
      method: vueContext.state.report_return_xskt.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      params: {
        channel,
        transid,
        ...data,
      },
    })
    return response
  },
  async report_sales_xskt(vueContext, data) {
    let channel = 'CMS'
    let transid = uniqid()
    const response = await this.$axios({
      url: vueContext.state.report_sales_xskt.url,
      method: vueContext.state.report_sales_xskt.method,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      params: {
        channel,
        transid,
        ...data,
      },
    })
    return response
  },
  async partner_list(vueContext, data) {
    let channel = 'CMS'
    let transid = uniqid()
    const response = await this.$axios({
      ...vueContext.state.partner_list,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      params: {
        channel,
        transid,
        user_id: Cookies.get('userId'),
        ...data,
      },
    })
    return response
  },
  async pos_list(vueContext, data) {
    let channel = 'CMS'
    let transid = uniqid()
    const response = await this.$axios({
      ...vueContext.state.pos_list,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      params: {
        channel,
        transid,
        user_id: Cookies.get('userId'),
        ...data,
      },
    })
    return response
  },
  async user_pos_list(vueContext, data) {
    let channel = 'CMS'
    let transid = uniqid()
    const response = await this.$axios({
      ...vueContext.state.user_pos_list,
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      },
      params: {
        channel,
        transid,
        user_id: Cookies.get('userId'),
        ...data,
      },
    })
    return response
  },
}
