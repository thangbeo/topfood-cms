<template>
  <div>
    <v-card>
      <v-row class="ma-0">
        <v-col cols="12" class="pt-0 px-0">
          <div style="width: 100%">
            <v-data-table
              :headers="headersUser"
              :items="itemsUser"
              :items-per-page="pageSize"
              hide-default-footer
              loading-text="Xin chờ"
              no-results-text="Không có kết quả phù hợp"
              no-data-text="Không có dữ liệu"
              class="elevation-0 custom_header_table pa-2"
              fixed-header
              light
            >
              <template v-slot:top>
                <v-row class="ma-0 pb-3" align="center">
                  <v-col class="col-auto">
                    <div class="primary--text font-weight-bold">
                      THỐNG KÊ BÀI VIẾT
                    </div>
                  </v-col>
                  <v-spacer></v-spacer>

                  <!-- <div class="d-flex">
                    <div>
                      <v-select
                        v-model="planUser"
                        :items="list_plan"
                        label="Kế hoạch theo"
                        no-data-text="Không có dữ liệu"
                        class="fs-14 mr-2"
                        dense
                        outlined
                        style="max-width: 120px"
                        hide-details
                        @keyup.enter="Search"
                      ></v-select>
                    </div>

                    <div v-if="planUser == 'MONTH'">
                      <v-autocomplete
                        class="fs-14 mr-2"
                        label="Tháng"
                        v-model="monthSearchUser"
                        :items="month"
                        item-text="name"
                        item-value="id"
                        no-data-text="Không có dữ liệu"
                        dense
                        style="max-width: 120px"
                        hide-details
                        outlined
                      ></v-autocomplete>
                    </div>
                    <div>
                      <v-select
                        class="fs-14 mr-2"
                        label="Năm"
                        v-model="yearUser"
                        dense
                        style="max-width: 120px"
                        outlined
                        hide-details
                        no-data-text="Không có dữ liệu"
                        :items="ItemsYear"
                      >
                      </v-select>
                    </div>
                    <div>
                      <v-btn
                        depressed
                        color="primary"
                        style="margin: auto"
                        class="text-none mr-2"
                        height="40"
                      >
                        Tìm kiếm
                      </v-btn>
                    </div>
                  </div> -->
                </v-row>
              </template>
            </v-data-table>
            <!-- <pagination
              :page="page"
              :pageCount="pageCount"
              :pageSize="pageSize"
              ref="Pagination"
              depressed="true"
              @changePage="changePage"
              @changePageSize="changePageSize"
            >
            </pagination> -->
          </div>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="mt-5">
      <v-row class="ma-0">
        <v-col cols="12" class="pt-0 px-0">
          <div style="width: 100%">
            <v-data-table
              :headers="headersStore"
              :items="itemsStore"
              :items-per-page="pageSize"
              hide-default-footer
              loading-text="Xin chờ"
              no-results-text="Không có kết quả phù hợp"
              no-data-text="Không có dữ liệu"
              class="elevation-0 custom_header_table pa-2"
              fixed-header
              light
            >
              <template v-slot:top>
                <v-row class="ma-0 pb-3" align="center">
                  <v-col class="col-auto">
                    <div class="primary--text font-weight-bold">
                      THỐNG KÊ MÓN ĂN
                    </div>
                  </v-col>
                  <v-spacer></v-spacer>

                  <!-- <div class="d-flex">
                    <div>
                      <v-select
                        v-model="planStore"
                        :items="list_plan"
                        label="Kế hoạch theo"
                        no-data-text="Không có dữ liệu"
                        class="fs-14 mr-2"
                        dense
                        outlined
                        style="max-width: 120px"
                        hide-details
                      ></v-select>
                    </div>

                    <div v-if="planStore == 'MONTH'">
                      <v-autocomplete
                        class="fs-14 mr-2"
                        label="Tháng"
                        v-model="monthSearchStore"
                        :items="month"
                        item-text="name"
                        item-value="id"
                        no-data-text="Không có dữ liệu"
                        dense
                        style="max-width: 120px"
                        hide-details
                        outlined
                      ></v-autocomplete>
                    </div>
                    <div>
                      <v-select
                        class="fs-14 mr-2"
                        label="Năm"
                        v-model="yearStore"
                        dense
                        style="max-width: 120px"
                        outlined
                        hide-details
                        no-data-text="Không có dữ liệu"
                        :items="ItemsYear"
                      >
                      </v-select>
                    </div>
                    <div>
                      <v-btn
                        depressed
                        color="primary"
                        style="margin: auto"
                        class="text-none mr-2"
                        height="40"
                      >
                        Tìm kiếm
                      </v-btn>
                    </div>
                  </div> -->
                </v-row>
              </template>
            </v-data-table>
            <!-- <pagination
              :page="page"
              :pageCount="pageCount"
              :pageSize="pageSize"
              ref="Pagination"
              depressed="true"
              @changePage="changePage"
              @changePageSize="changePageSize"
            >
            </pagination> -->
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'
import Cookies from 'js-cookie'
export default {
  transition(to, from) {
    if (!from) {
      return 'slide-x-transition'
    }
    return 'slide-x-reverse-transition'
  },
  data() {
    return {
      itemsStore: [],
      itemsUser: [],
      page: 1,
      pageCount: null,
      pageSize: 20,
      ItemsYear: [],
      month: [
        { id: 1, name: 'Tháng 1' },
        { id: 2, name: 'Tháng 2' },
        { id: 3, name: 'Tháng 3' },
        { id: 4, name: 'Tháng 4' },
        { id: 5, name: 'Tháng 5' },
        { id: 6, name: 'Tháng 6' },
        { id: 7, name: 'Tháng 7' },
        { id: 8, name: 'Tháng 8' },
        { id: 9, name: 'Tháng 9' },
        { id: 10, name: 'Tháng 10' },
        { id: 11, name: 'Tháng 11' },
        { id: 12, name: 'Tháng 12' },
      ],
      planUser: 'MONTH',
      planStore: 'MONTH',
      monthSearchStore: Number(moment().format('MM')),
      yearStore: Number(moment().format('YYYY')),
      monthSearchUser: Number(moment().format('MM')),
      yearUser: Number(moment().format('YYYY')),
      list_plan: [
        { value: 'MONTH', text: 'Tháng' },
        // { value: 'YEAR', text: 'Năm' },
        { value: 'YEAR', text: 'Năm' },
      ],
      role: null,
    }
  },

  computed: {
    headersStore() {
      return [
        {
          text: 'STT',
          value: 'stt',
          align: 'center',
          sortable: false,
          width: '3%',
        },
        {
          text: 'Món ăn',
          value: '',
          sortable: false,
          width: 200,
        },

        {
          text: 'Số lượt yêu thích',
          value: '',
          sortable: false,
          width: 200,
        },
        // {
        //   text: 'Số lượt ',
        //   value: '',
        //   sortable: false,
        //   width: 200
        // }
      ]
    },
    headersUser() {
      return [
        {
          text: 'STT',
          value: 'stt',
          align: 'center',
          sortable: false,
          width: '3%',
        },
        {
          text: 'Bài viết',
          value: '',
          sortable: false,
          width: 200,
        },

        {
          text: 'Số lượng Lượt thích',
          value: '',
          sortable: false,
          width: 200,
        },
        {
          text: 'Số lượng bình luận',
          value: '',
          sortable: false,
          width: 200,
        },
        {
          text: 'Số lượng chia sẽ',
          value: '',
          sortable: false,
          width: 200,
        },
      ]
    },
  },
  created() {
    this.role = Cookies.get('userGroup')
  },
  mounted() {
    this.getListYear()
  },
  methods: {
    // accountTotal() {
    //   const data = {
    //     role: this.role,
    //     status: 'ACTIVE'
    //   }
    //   this.$store.dispatch('thongke/accountTotal', data).then(response => {
    //     console.log(response)
    //   })
    // },
    changePage(value) {
      this.page = value
      this.$refs.Pagination.reset()
    },
    changePageSize(pageSizes) {
      if (pageSizes !== this.pageSize) {
        this.pageSize = pageSizes
        this.page = 1
        this.$refs.Pagination.reset()
      }
    },
    getListYear() {
      let year = Number(moment().format('YYYY'))
      for (let i = year + 10; i > year - 10; i--) {
        this.ItemsYear.push(i)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
}
</style>
