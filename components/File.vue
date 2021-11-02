<template>
  <div>
    <div class="fs-15 pb-2">Ảnh vé *</div>
    <div class="d-flex align-center">
      <div
          v-if="(img || []).length === 0"
          style="cursor: pointer;width: 400px;height: 175px"
          @click="select_file"
      >
        <SelectFile/>
      </div>
      <div v-else>
        <div v-if="file_error">
          <FileError/>
        </div>
        <v-img
            v-else
            class="rounded"
            style="cursor: pointer"
            :src="img"
            width="400"
            height="175"
            @error="file_error = true"
            @click="select_file"
        />
      </div>
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
  import SelectFile from '../components/icon/SelectFile'
  import FileError from '../components/icon/FileError'

  export default {
    components: {
      SelectFile,
      FileError
    },
    props: {
      id: {
        type: String,
        required: true
      },
      required: {
        type: Boolean,
        default: false
      },
      hidden: {
        type: Boolean,
        default: false
      },
      fixed: {
        type: Boolean,
        default: true
      },
      image: {
        type: String,
        default: ''
      }
    },
    created() {
      if (this.image.length !== 0) {
        this.img = this.image
      }
    },
    data: () => ({
      reset_file: null,
      img: '',
      limited_msg: '',
      file_error: false
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

          if (
            file.type !== 'image/png'
            && file.type !== 'image/jpeg'
            && file.type !== 'image/gif') {
            hasErrors = true
            this.limited_msg = 'Định dạng file không hợp lệ'
          }

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
      }
    }
  }
</script>
