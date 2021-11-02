import uniqid from 'uniqid'
import Cookies from 'js-cookie'
export const state = () => {
    return {
        getlist: {
            url: 'cms/report/rev_ticket_by_type',
            method: 'GET',
        },
        listPartner: {
            url: 'cms/partner/list',
            method: 'GET',
        },
        listPos: {
            url: 'cms/utility/pos_group/list',
            method: 'GET'
        },
        listTicket: {
            url: 'cms/utility/category/list',
            method: 'GET'
        },
        listByGroup: {
            url: 'cms/report/rev_ticket_by_group',
            method: 'GET'
        },
    }
}
export const actions = {
    async getlist(vueContext, payload) {
        let channel = 'CMS'
        let transid = uniqid()
        const response = await this.$axios({
            url: vueContext.state.getlist.url,
            method: vueContext.state.getlist.method,
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            },
            params: {
                channel,
                transid,
                ...payload
            }
        })
        return response
    },

    async listPartner(vueContext, payload) {
        let channel = 'CMS'
        let transid = uniqid()
        const response = await this.$axios({
            url: vueContext.state.listPartner.url,
            method: vueContext.state.listPartner.method,
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            },
            params: {
                channel,
                transid,
                ...payload
            }
        })
        return response
    },

    async listPos(vueContext, payload) {
        let channel = 'CMS'
        let transid = uniqid()
        const response = await this.$axios({
            url: vueContext.state.listPos.url,
            method: vueContext.state.listPos.method,
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            },
            params: {
                channel,
                transid,
                ...payload
            }
        })
        return response
    },

    async listTicket(vueContext, payload) {
        let channel = 'CMS'
        let transid = uniqid()
        const response = await this.$axios({
            url: vueContext.state.listTicket.url,
            method: vueContext.state.listTicket.method,
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            },
            params: {
                channel,
                transid,
                ...payload
            }
        })
        return response
    },

    async listByGroup(vueContext, payload) {
        let channel = 'CMS'
        let transid = uniqid()
        const response = await this.$axios({
            url: vueContext.state.listByGroup.url,
            method: vueContext.state.listByGroup.method,
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            },
            params: {
                channel,
                transid,
                ...payload
            }
        })
        return response
    },
}
