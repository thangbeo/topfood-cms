<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="12"
        md="12"
        class="pt-1 pb-3"
        align="end"
        justify="end"
      >
        <v-btn
          v-if="checkRole(Rules.System.data_sale_point.actions.edit)"
          :loading="loading"
          :disabled="disabled_saved"
          class="text-none"
          color="primary"
          small
          @click="toggleSave"
        >
          <v-icon class="mr-2">mdi-content-save</v-icon>
          Lưu
        </v-btn>
        <template v-slot:loader>
          <span>Xin chờ...</span>
        </template>
      </v-col>

      <v-col
        cols="4"
        sm="4"
        md="4"
        class="pt-0 pb-0"
        align="center"
        justify="center"
      >
        <v-card raised class="mx-auto" height="100%">
          <v-card-title outlined class="d-flex">
            <span class="v-toolbar__title">Danh sách tài khoản</span>
            <v-spacer />
          </v-card-title>
          <v-container class="pb-0">
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="search"
                  label="Tìm kiếm"
                  placeholder="Tìm kiếm"
                  dense
                  single-line
                  outlined
                  hide-details
                  clearable
                  @keydown.enter="getUserByPos"
                />
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <client-only>
                  <v-data-table
                    :items="items"
                    :headers="headerUsers"
                    :item-per-page="itemPerPage"
                    :loading="$wait.is('loading')"
                    no-data-text="Không có tài khoản nào"
                    no-results-text="Không có kết quả phù hợp"
                    loading-text="Xin chờ..."
                    disable-pagination
                    sort-by="list_user"
                    hide-default-header
                    hide-default-footer
                    class="table-border-space-vertical-1 scroll_table"
                  >
                    <template v-slot:item="{ item }">
                      <tr>
                        <td
                          :class="
                            (item.user_id === selectedId &&
                              'row-active white--text font-weight-bold') +
                              ' text-left border-radius-1 border-1 border-space-vertical-1 text-blue cp'
                          "
                          @click="setSelectedItemUser(item)"
                        >
                          {{ item.user_name }}
                        </td>
                      </tr>
                    </template>
                  </v-data-table>
                </client-only>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>

      <v-col
        cols="4"
        sm="4"
        md="4"
        class="pt-0 pb-0"
        align="center"
        justify="center"
      >
        <v-card
          :disabled="disabled_partner"
          raised
          class="mx-auto"
          height="100%"
        >
          <v-card-title outlined class="d-flex">
            <span class="v-toolbar__title">Danh sách đại lý</span>
            <v-spacer />
          </v-card-title>
          <v-container class="pb-0">
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="searchPartner"
                  label="Tìm kiếm"
                  placeholder="Tìm kiếm"
                  dense
                  single-line
                  outlined
                  hide-details
                  clearable
                />
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <client-only>
                  <v-data-table
                    :items="itemsPartner"
                    :headers="headerPartner"
                    :search="searchPartner"
                    :item-per-page="itemPerPage"
                    :loading="$wait.is('loadingPartner')"
                    no-data-text="Không có đại lý nào"
                    no-results-text="Không có kết quả phù hợp"
                    loading-text="Xin chờ..."
                    disable-pagination
                    sort-by="list_user"
                    hide-default-header
                    hide-default-footer
                    class="table-border-space-vertical-1 scroll_table elevation-0"
                  >
                    <template v-slot:item="{ item }">
                      <tr>
                        <td
                          :class="
                            (item.partner_id === selectedIdPartner &&
                              'row-active white--text font-weight-bold') +
                              ' text-left border-radius-1 border-1 border-space-vertical-1 row-inactive cp'
                          "
                          @click="setSelectedItemPartner(item)"
                        >
                          {{ item.partner_name }}
                        </td>
                      </tr>
                    </template>
                  </v-data-table>
                </client-only>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>

      <v-col
        cols="4"
        sm="4"
        md="4"
        class="pt-0 pb-0"
        align="center"
        justify="center"
      >
        <v-card :disabled="disabled_pos" raised class="mx-auto" height="100%">
          <v-card-title outlined class="d-flex">
            <span class="v-toolbar__title">Danh sách điểm bán</span>
            <v-spacer />
          </v-card-title>
          <v-container class="pb-0">
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="searchPos"
                  label="Tìm kiếm"
                  placeholder="Tìm kiếm"
                  dense
                  single-line
                  outlined
                  hide-details
                  clearable
                />
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12">
                <client-only>
                  <v-data-table
                    :headers="headerPos"
                    :items="itemsPos"
                    :single-select="singleSelect"
                    :search="searchPos"
                    :show-select="true"
                    item-key="pos_id"
                    class="custom_header_table elevation-0"
                    no-data-text="Không có điểm bán nào"
                    no-results-text="Không có kết quả phù hợp"
                    hide-default-header
                    hide-default-footer
                    disable-pagination
                    @click:row=""
                  >
                    <!--                    <template v-slot:[`item.data-table-select`]="{ item }">-->
                    <!--                      <v-checkbox-->
                    <!--                          v-model="item.checked"-->
                    <!--                          class="ma-0"-->
                    <!--                          hide-details-->
                    <!--                          :true-value="1"-->
                    <!--                          :false-value="0"-->
                    <!--                          :ripple="false"-->
                    <!--                      >-->
                    <!--                      </v-checkbox>-->
                    <!--                    </template>-->

                    <template v-slot:item="{ item }">
                      <tr @click="clicked_row(item)">
                        <td style="width: 30px">
                          <v-checkbox
                            :value="item.checked"
                            class="ma-0"
                            hide-details
                            :true-value="1"
                            :false-value="0"
                            :ripple="false"
                          >
                          </v-checkbox>
                        </td>
                        <td class="cp">
                          {{ item.name }}
                        </td>
                      </tr>
                    </template>
                  </v-data-table>
                </client-only>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>

      <yes-no-alert
        :open="confirmSave"
        @toggle="toggleSave"
        alertMsg="Bạn có chắc chắn muốn lưu không?"
        @OK="save"
      />
    </v-row>
  </v-container>
</template>
<script>
import Rules from '~/assets/configurations/Rules'

import Cookies from 'js-cookie'

export default {
  computed: {
    headerUsers() {
      return [
        {
          text: 'Tài khoản',
          value: 'user_name',
          align: 'left',
          sortable: false
        }
      ]
    },
    headerPartner() {
      return [
        {
          text: 'Đại lý',
          align: 'left',
          sortable: false,
          value: 'partner_name'
        }
      ]
    },
    headerPos() {
      return [
        {
          text: 'Chọn tất cả',
          align: 'left',
          sortable: false,
          value: 'name'
        }
      ]
    }
  },
  created() {
    this.getUserByPos()
  },
  data() {
    return {
      Rules,
      items: [],
      itemsPartner: [],
      itemsPos: [],
      search: '',
      searchPartner: '',
      searchPos: '',
      selectedId: -1,
      selectedIdPartner: -1,
      selectedIdPos: -1,
      itemPerPage: 100,
      loading: false,
      confirmSave: false,
      disabled_partner: true,
      disabled_pos: true,
      userInfo: '',
      selectedPos: [],
      singleSelect: false,
      disabled_saved: true,
      page: 1
    }
  },
  methods: {
    checkRole(actionId) {
      let isAllowed = this.$isAccessAction(
        this.$store.state.app.roles,
        Rules.System.data_sale_point.id,
        actionId
      )
      return isAllowed
    },
    getUserByPos() {
      this.$wait.start('loading')

      const DATA = {
        page_index: this.page,
        page_size: 50,
        user_name: (this.search || '').trim().length !== 0 ? this.search : '',
        user_id: Cookies.get('userId')
      }
      this.$store
        .dispatch('users/get_list', DATA)
        .then(res => {
          if (!res.error) {
            let arr = res.data.data.items
            let item = []
            for (let i = 0; i < (arr || []).length; i++) {
              if (arr[i].data_access_limit === 0) {
                item.push(arr[i])
              }
            }
            this.items = item
            // this.$log.debug(this.items)
          }
        })
        .finally(() => {
          this.$wait.end('loading')
        })
    },
    setSelectedItemUser(item) {
      this.selectedId = item.user_id
      this.selectedIdPartner = -1
      this.disabled_pos = true
      this.itemsPartner = []
      this.itemsPos = []

      this.$store.dispatch('users/get_detail', item.user_id).then(response => {
        if (!response.error) {
          // this.$log.debug(response)

          this.userInfo = response.data.data
          this.itemsPartner = [response.data.data.item]
          this.disabled_partner = false
        }
      })
    },
    setSelectedItemPartner(item) {
      this.selectedIdPartner = item.partner_id

      this.$store
        .dispatch('data_access_limit/get_partner_detail', item.partner_id)
        .then(res => {
          if (!res.error) {
            if ((res.data.data.item.pos_infos || []).length !== 0) {
              for (let i = 0; i < res.data.data.item.pos_infos.length; i++) {
                res.data.data.item.pos_infos[i] = {
                  ...res.data.data.item.pos_infos[i],
                  checked: 0
                }
              }
              this.itemsPos = [...res.data.data.item.pos_infos]
              this.disabled_pos = false
              this.disabled_saved = false
            } else {
              this.disabled_pos = true
              this.$showWarnNotify(this, 'Đại lý không tồn tại điểm bán nào')
            }
            // this.$log.debug(res)
          }
        })
        .then(res => {
          // gán dữ liệu user thuộc pos nào
          if ((this.userInfo.pos_account || []).length !== 0) {
            const arr = [...this.itemsPos]
            for (let i = 0; i < arr.length; i++) {
              for (let j = 0; j < this.userInfo.pos_account.length; j++) {
                if (arr[i].id === this.userInfo.pos_account[j].pos_id) {
                  arr[i] = { ...arr[i], checked: 1 }
                }
              }
            }
            this.itemsPos = [...arr]
          }
        })
    },
    clicked_row(item) {
      if (item.checked === 1) {
        item.checked = 0
      } else {
        item.checked = 1
      }
    },
    toggleSave() {
      this.confirmSave = !this.confirmSave
    },
    save() {
      const arr = []
      for (let i = 0; i < this.itemsPos.length; i++) {
        if (this.itemsPos[i].checked === 1) {
          arr.push(this.itemsPos[i].id)
        }
      }

      let hasErrors = false

      if (arr.length === 0) {
        hasErrors = true
        this.$showWarnNotify(this, 'Vui lòng chọn điểm bán')
      }

      if (!hasErrors) {
        const data = {
          user_id: this.userInfo.item.user_id,
          partner_id: this.userInfo.item.partner_id,
          list_pos: arr.join()
        }

        this.$store
          .dispatch('data_access_limit/save_permission_data', data)
          .then(res => {
            if (!res.error) {
              this.$showSuccess(this, 'Cập nhật thành công')
            }
          })
      }
    }
  }
}
</script>

<style lang="scss">
.scroll_table {
  .v-data-table__wrapper {
    max-height: calc(80vh - 130px);
    overflow-y: auto;
  }
}

.row-active {
  background-color: #2b8c8f !important;
}

.row-inactive {
  background-color: rgb(95, 158, 160, 0.3);
}
</style>
