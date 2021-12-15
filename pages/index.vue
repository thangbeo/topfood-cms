<template>
  <div>
    <div v-if="role === 'ROLE_ADMIN'">
      <thongKeAdmin></thongKeAdmin>
    </div>
    <div v-if="role === 'ROLE_STORE'">
      <thongKeStore></thongKeStore>
    </div>
  </div>
</template>

<script>
import thongKeAdmin from '~/components/ThongKe/thongKeAdmin.vue'
import thongKeStore from '~/components/ThongKe/thongKeStore.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    thongKeAdmin,
    thongKeStore
  },
  transition(to, from) {
    if (!from) {
      return 'slide-x-transition'
    }
    return 'slide-x-reverse-transition'
  },
  data() {
    return {
      role: null
    }
  },

  created() {
    this.role = Cookies.get('userGroup')
  }
}
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
}
</style>
