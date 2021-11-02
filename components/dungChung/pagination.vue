<template>
  <v-col
    :class="(depressed && 'depressed-pagination') + ' pt-0 pb-0'"
    cols="12"
  >
    <v-row no-gutters class="justify-start py-1">
      <!-- <v-col class="d-flex align-center justify-end col-auto">
        <div style="width: 150px" class="mt-1"> -->
      <!-- Nhập trang cần đến -->
      <!-- <v-text-field
            type="number"
            v-model="customPage"
            v-on:keyup.enter="checkPage($event)"
            label="Trang"
            placeholder=" "
            outlined
            dense
            hide-details
          >
            <template v-slot:append-outer>
         
              <v-btn
                color="primary"
                style="margin-top: -6px"
                @click="changePage"
                depressed
                >Đi</v-btn
              >
            </template>
          </v-text-field> -->
      <!-- </div>
      </v-col> -->
      <v-col class="col-auto" :key="pageCount" style="min-width: 10%">
        <div class="ml-2">
          <!-- Phân trang theo nút -->
          <v-pagination
            :value="page"
            :length="pageCount"
            @input="changePageButton($event)"
            total-visible="10"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  props: ['pageCount', 'page', 'depressed'],
  data() {
    return {
      rerender: Math.random(),
    }
  },

  methods: {
    changePageButton(value) {
      this.customPage = parseInt(value)
      this.$emit('changePage', parseInt(this.customPage))
    },
    reset() {
      this.customPage = 1
    },
  },
  watch: {
    page(value) {
      this.rerender = Math.random()
    },
  },
}
</script>

<style lang="scss">
.depressed-pagination {
  .v-pagination__item {
    box-shadow: none !important;
    border: thin solid rgba(0, 0, 0, 0.12);
    height: 36px;
    width: 36px;
  }
  .v-pagination__item:hover {
    background-color: rgba(0, 0, 0, 0.12) !important;
  }

  .v-pagination__navigation {
    box-shadow: none !important;
    border: thin solid rgba(0, 0, 0, 0.12);
    height: 36px;
    width: 36px;
  }

  .v-pagination__navigation:hover {
    background-color: rgba(0, 0, 0, 0.12) !important;
  }

  .v-pagination__item--active:hover {
    background-color: #00754a !important;
    border-color: #00754a !important;
  }
  //   .button.v-pagination__item.v-pagination__item--active.primary {
  //     background: rgb(51, 122, 183) !important;
  //   }
}
</style>
