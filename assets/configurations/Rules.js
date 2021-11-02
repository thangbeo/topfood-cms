const Rules = {
  System: {
    id: 2,
    GroupUser: {
      id: 24,
      actions: {
        view: 55,
        add: 52,
        update: 53,
        delete: 54
      }
    },
    User: {
      id: 25,
      actions: {
        view: 56,
        add: 57,
        edit: 58,
        delete: 59,
        reset_pass: 61
      }
    },
    // Trang chủ
    Home: {
      id: 1,
      actions: {
        daily_chart: 1,
        monthly_chart: 2,
        hourly_chart: 93,
        viewXSKT: 191,
        viewXSDT: 192
      }
    },
    // Quản lý đại lý
    agency: {
      id: 8,
      actions: {
        View: 3,
        add: 5,
        edit: 6,
        delete: 7,
        view_detail_acc: 65,
        add_acc: 66,
        edit_acc: 67,
        delete_acc: 69,
        reset_pass_acc: 68,
        add_bank: 83,
        edit_bank: 85,
        add_pos: 86,
        delete_pos: 87
      }
    },
    // Kết quả kỳ gần nhất
    result_period_near: {
      id: 11,
      actions: {
        view_Lottery: 24,
        view_Lottery_636: 147
      }
    },
    // Quản lý kết quả
    manage_result: {
      id: 12,
      actions: {
        View_XSMB: 28,
        AddXSMB: 25,
        UpdateXSMB: 26,
        DuyetXSMB: 27,
        View_6x36: 136,
        Add6x36: 137,
        Update6x36: 138,
        Duyet6x36: 139
      }
    },
    // Quản lý điểm bán
    point_of_sale_management: {
      id: 9,
      actions: {
        view: 9,
        add: 10,
        edit: 11,
        delete: 12,
        view_acc: 30,
        add_acc: 31,
        edit_acc: 32,
        delete_acc: 33,
        reset_poss_acc: 34,
        add_bank: 80,
        edit_bank: 82,
        delete_bank: 81,
        add_device: 15,
        edit_device: 16,
        delete_device: 17
      }
    },
    // Phân quyền dữ liệu điểm bán
    data_sale_point: {
      id: 27,
      actions: {
        view: 70,
        edit: 71
      }
    },

    // Cấu hình hệ thống
    config_system: {
      id: 19,
      actions: {
        view_TGNĐ: 148,
        update_TGNĐ: 149,
        view_STTT: 150,
        update_STTT: 151,
        view_KTTT: 152,
        add_KTTT: 153,
        update_KTTT: 154,
        view_KQ: 155,
        update_KQ: 156,
        view_CB: 157,
        update_CB: 158,
        view_NT: 159,
        add_NT: 160,
        delete_NT: 161,
        view_LV: 162,
        add_LV: 163,
        delete_LV: 164,
        view_ĐH: 165,
        update_ĐH: 166,
        view_DT: 167,
        update_DT: 168,
        view_TTTD: 195,
        update_TTTD: 196,
        product_hot: {
          view: 227,
          edit: 228,
          delete: 229
        }
      }
    },

    // Thống kê nhóm vé
    BCNhomVe: {
      id: 59,
      actions: {
        view: 172,
        export_excel: 173
      }
    },

    // Thống kê gái trị đơn
    BCGiaTriDon: {
      id: 58,
      actions: {
        view: 170,
        export_excel: 171
      }
    },

    // Thống kê loại hình chơi
    TKLoaiHinhChoi: {
      id: 37,
      actions: {
        view: 193,
        export_excel: 194
      }
    },

    // Giao dịch trực tuyến
    deal_online: {
      id: 14,
      actions: {
        view: 21,
        view_detail: 22,
        excel: 197
      }
    },
    // Lịch sử giao dịch
    transaction_history: {
      id: 13,
      actions: {
        view: 18,
        view_detail: 19,
        change_status: 135,
        excel: 20,
        excel_xskt: 239
      }
    },
    // Lịch sử trả thưởng
    payout_history: {
      id: 54,
      actions: {
        view: 128,
        view_detail: 129,
        excel: 130,
        pay_back: 131,
        edit_phone: 132,
        pay_tktt: 133,
        change_status: 134
      }
    },
    // Báo cáo
    report: {
      id: 16,
      actions: {
        view: 39,
        excel: 40
      }
    },
    // Quản lý xổ số kiến thiết
    QuanLyXoSoKienThiet: {
      id: 61,
      actions: {
        view: 169
      }
    },
    // Lịch sử tính thưởng vé tồn
    LichSuTinhThuongXSKTVeTon: {
      id: 63,
      actions: {
        view: 177,
        detail: 213,
        excel: 183
      }
    },
    // Quản lý vé
    ManagerTicket: {
      id: 61,
      actions: {
        view: 169,
        view_detail: 181,
        excel: 212
      }
    },
    // Hoàn vé
    ReturnTicket: {
      id: 68,
      actions: {
        view: 184,
        return: 185,
        excel: 186
      }
    },
    // Vé tồn
    Inventory: {
      id: 60,
      actions: {
        view: 187,
        close: 189,
        calculation: 190,
        excel: 188
      }
    },
    // Phân quyền theo thao tác vé
    ThaoTacVe: {
      actions: {
        nhap_ve: 1,
        duyet_ve: 2,
        tinh_thuong_ve_ton: 3,
        hoan_ve: 4,
        dong_ky_hoan_ve: 5
      }
    },
    // quản lý kho vé
    TicketStore: {
      id: 62,
      actions: {
        view: 176,
        update_store: 223,
        add_acc: 218,
        update_acc: 219,
        reset_acc: 222,
        delete_acc: 220,
        quyen_acc: 221,
        view_acc: 226
      }
    },
    // Cấu hình banner
    ConfigBanner: {
      id: 65,
      actions: {
        view: 178
      }
    },
    // Báo cáo xổ số kiến thiết
    SalesXskt: {
      id: 69,
      actions: {
        view: 198,
        excel: 224
      }
    },
    // báo cáo vé tồn
    TicketsExist: {
      id: 70,
      actions: {
        view: 199,
        excel: 225
      }
    },
    // giao dịch giữ vé
    TicketHoldTransactions: {
      id: 71,
      actions: {
        view: 200,
        detail: 201,
        statistical: 202,
        cancel: 203,
        update: 204,
        updateImg: 217
      }
    },
    // Vé chờ duyệt
    TicketPending: {
      id: 46,
      actions: {
        view: 206,
        add: 207,
        update: 208,
        delete: 210,
        approve: 209,
        approves: 214,
        excel: 211
      }
    },
    // báo cáo vé hoàn
    bcvehoan: {
      id: 72,
      actions: {
        view: 215,
        excel: 216
      }
    },
    // Vé cặp nguyên chờ duyệt
    VeCapNguyenChoDuyet: {
      id: 74,
      actions: {
        view: 230,
        add: 231,
        update: 232,
        delete: 234,
        approve: 233
      }
    },
    // Quản lý vé cặp nguyên
    QuanLyVeCapNguyen: {
      id: 73,
      actions: {
        view: 235,
        detail: 236,
        excel: 237,
        split: 238
      }
    }
  }
}

export default Rules
