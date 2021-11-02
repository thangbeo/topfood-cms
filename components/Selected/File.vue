<template>
  <div>
    <div class="d-flex align-center">
      <div
        v-if="(img || []).length === 0"
        style="cursor: pointer; width: fit-content"
        @click="select_file"
      >
        <SelectFile class="rounded" />
      </div>
      <div v-else>
        <v-img
          class="rounded"
          style="cursor: pointer"
          :src="img"
          width="120"
          height="120"
          @click="select_file"
        />
      </div>
      <v-btn
        v-if="(img || []).length !== 0"
        class="text-none text-body-2 rounded ml-4"
        color="white"
        height="32"
        style="color: #47bbff"
        depressed
        @click="select_file"
      >
        Chỉnh sửa
      </v-btn>
    </div>
    <div
      v-if="required"
      class="v-messages theme--light error--text mt-1"
      role="alert"
    >
      <div class="v-messages__wrapper">
        <div class="v-messages__message">Không được để trống</div>
      </div>
    </div>
    <div
      v-if="limited_msg.length !== 0"
      class="v-messages theme--light error--text mt-1"
      role="alert"
    >
      <div class="v-messages__wrapper">
        <div class="v-messages__message">{{ limited_msg }}</div>
      </div>
    </div>
    <v-file-input
      :id="id"
      accept="image/png, image/jpeg, image/gif"
      class="d-none"
      :value="reset_file"
      @change="inputFile($event)"
    />
  </div>
</template>

<script>
import SelectFile from '~/components/icon/SelectFile'

export default {
  components: {
    SelectFile,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
    fixed: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    reset_file: null,
    img: '',
    limited_msg: '',
  }),
  methods: {
    select_file() {
      if (this.fixed) {
        return window.document.getElementById(this.id).click()
      } else {
        return false
      }
    },
    inputFile(file) {
      if (!this.$isNullOrEmpty(file)) {
        let hasErrors = false

        if ((file.size || 0) > 3145728) {
          hasErrors = true
          this.limited_msg = 'File được chọn không được vượt quá 3MB'
        }

        if (!hasErrors) {
          this.limited_msg = ''
          this.reset_file = file

          if ((file || []).length !== 0) {
            this.img = URL.createObjectURL(file)
          }

          this.$emit('set_file', file)
        }
      }
    },
    delete_img() {
      this.reset_file = null
      this.img = ''
      this.$emit('set_file', '')
    },
    reset() {
      this.reset_file = null
      this.img = ''
    },
    set_img(value) {
      this.img = value
    },
  },
}
</script>
