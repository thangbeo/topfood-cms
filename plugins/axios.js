// import Cookies from 'js-cookie'
// import APIs from '~/assets/configurations/API_Config'

// Axios interceptor. Auto log out when token is expired or invalid
export default function(context) {
  context.$axios.onResponse(response => {
    if (response.data.status === true) {
      return {
        error: false,
        response: response
      }
    }
    // else {
    //   if (response.data.message.includes('Hành động bị từ chối.')) {
    //     context.app.$logout(context.app.router)
    //   }
    // }
  })
  context.$axios.onError(error => {
    context.app.router.app.$log.error('Có lỗi/exception: ', {
      error,
      response: error.response
    })

    // context.app.$showError(
    //   context.app.router.app,
    //   'Có lỗi xảy ra khi kết nối đến server'
    // )
    return {
      error: true,
      response: error.response
    }
  })
}
