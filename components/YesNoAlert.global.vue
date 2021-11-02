<template>
  <!-- 
  Cách dùng:
  - prop 'open' là giá trị đóng mở dialog (Boolean)
  - prop 'alertMsg' dùng để hiển thị câu hỏi của dialog (Number/String)
  - Event 'toggle' dùng để đóng hoặc mở dialog
  - Khi bấm OK sẽ emit event 'OK' và event 'toggle'
  - Khi bấm 'Hủy' sẽ emit event toggle
  -->
  <div>
    <v-dialog
        :value="open"
        @keydown="($event.key === 'Escape') && toggle()"
        @click:outside="toggle"
        max-width="500"
    >
      <v-card>
        <v-card-title :class="`${btnOkColor} white--text`">
          {{ title }}
          <div class="flex-grow-1"></div>
          <v-icon dark class="cp" @click="toggle">mdi-close</v-icon>
        </v-card-title>
        <v-card-text class="pt-6 text-center black--text fs-15">{{alertMsg}}</v-card-text>
        <v-divider/>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="secondary" class="text-none" depressed @click="toggle">Hủy</v-btn>
          <v-btn :color="btnOkColor" class="text-none" depressed @click="OK">Xác nhận</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    props: {
      open: {
        type: Boolean,
        required: true
      },
      title: {
        type: String,
        default: 'Xác nhận'
      },
      alertMsg: {
        type: String,
        default: String
      },
      btnOkColor: {
        type: String,
        default: 'primary'
      }
    },
    methods: {
      toggle() {
        this.$emit('toggle')
      },
      OK() {
        this.$emit('toggle')
        this.$emit('OK')
      }
    }
  }
</script>
