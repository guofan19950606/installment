// 数据请求接口
let util = require('../../utils/util.js')
let app = getApp();
Page({
  data: {
    userNum: '',
    currentId: 0,
    jobType: '',
    fourTitles: [{
      name: '学生',
      typeId: '0'
    }, {
      name: '公司职员',
      typeId: '1'
    }, {
      name: '企业主',
      typeId: '2'
    }, {
      name: '待业',
      typeId: '3'
    }],
    radioCheck: false,
    realname: '', //真实姓名
    // 学生
    students_schoolName: '', //学校名称
    students_schoolAddress: '', //学校地址
    students_phone: '', //手机号
    students_qq: '', //qq
    students_wechat: '', //微信
    students_email: '', //电子邮箱
    students_nowAddress: '', //现居地址
    students_mark: '', //备注信息
    students_rnaId: '', //id
    // 公司职员
    employee_comName: '', //公司名称
    employee_address: '', //公司地址
    employee_position: '', //公司职位
    employee_money: '', //月收入
    employee_phone: '', //手机号
    employee_qq: '', //QQ
    employee_wechat: '', //微信
    employee_email: '', //电子邮箱
    employee_nowAddress: '', //现居地址
    employee_mark: '', //备注信息
    employee_rnaId: '', //id
    // 企业主
    company_name: '', //企业名称
    company_address: '', //企业地址
    company_code: '', //社会统一信用代码
    company_phone: '', //手机号
    company_qq: '', //QQ
    company_wechat: '', //微信
    company_email: '', //电子邮箱
    company_nowAddress: '', //现居地址
    company_mark: '', //备注信息
    company_rnaId: '', //id
    // 待业
    jobwaiting_name: '', //共借人名称
    jobwaiting_phone: '', //共借人联系电话
    jobwaiting_address: '', //共借人地址
    jobwaiting_mobile: '', //借款人手机号
    jobwaiting_qq: '', //借款人QQ
    jobwaiting_wechat: '', //借款人微信
    jobwaiting_email: '', //借款人电子邮箱
    jobwaiting_nowAddress: '', //借款人现居地址
    jobwaiting_mark: '', //备注信息
    jobwaiting_rnaId: '' //id
  },
  handlerGobackClick(delta) {
    const pages = getCurrentPages();
    if (pages.length >= 2) {
      wx.navigateBack({
        delta: delta
      });
    } else {
      wx.navigateTo({
        url: '/pages/userDetail/userDetail'
      });
    }
  },
  //职业类型切换
  activeBtn: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    this.setData({
      currentId: index
    })
  },
  // 是否同意协议
  radioClick: function (event) {
    var radioCheck = this.data.radioCheck;
    this.setData({
      "radioCheck": !radioCheck
    });
  },
  realname(e) {
    this.setData({
      realname: e.detail.value
    })
  },
  // 学生
  students_schoolName(e) { //学校名称
    this.setData({
      students_schoolName: e.detail.value
    })
  },
  students_schoolAddress(e) { //学校地址
    this.setData({
      students_schoolAddress: e.detail.value
    })
  },
  students_phone(e) { //手机号
    this.setData({
      students_phone: e.detail.value
    })
  },
  students_qq(e) { //qq
    this.setData({
      students_qq: e.detail.value
    })
  },
  students_wechat(e) { //微信
    this.setData({
      students_wechat: e.detail.value
    })
  },
  students_email(e) { //电子邮箱
    this.setData({
      students_email: e.detail.value
    })
  },
  students_nowAddress(e) { //现居地址
    this.setData({
      students_nowAddress: e.detail.value
    })
  },
  students_mark(e) { //备注信息
    this.setData({
      students_mark: e.detail.value
    })
  },
  // 公司职员
  employee_comName(e) { //公司名称
    this.setData({
      employee_comName: e.detail.value
    })
  },
  employee_address(e) { //公司地址
    this.setData({
      employee_address: e.detail.value
    })
  },
  employee_position(e) { //公司职位
    this.setData({
      employee_position: e.detail.value
    })
  },
  employee_money(e) { //月收入
    this.setData({
      employee_money: e.detail.value
    })
  },
  employee_phone(e) { //手机号
    this.setData({
      employee_phone: e.detail.value
    })
  },
  employee_qq(e) { //QQ
    this.setData({
      employee_qq: e.detail.value
    })
  },
  employee_wechat(e) { //微信
    this.setData({
      employee_wechat: e.detail.value
    })
  },
  employee_email(e) { //电子邮箱
    this.setData({
      employee_email: e.detail.value
    })
  },
  employee_nowAddress(e) { //现居地址
    this.setData({
      employee_nowAddress: e.detail.value
    })
  },
  employee_mark(e) { //备注信息
    this.setData({
      employee_mark: e.detail.value
    })
  },
  // 企业主
  company_name(e) { //企业名称
    this.setData({
      company_name: e.detail.value
    })
  },
  company_address(e) { //企业地址
    this.setData({
      company_address: e.detail.value
    })
  },
  company_code(e) { //社会统一信用代码
    this.setData({
      company_code: e.detail.value
    })
  },
  company_phone(e) { //手机号
    this.setData({
      company_phone: e.detail.value
    })
  },
  company_qq(e) { //QQ
    this.setData({
      company_qq: e.detail.value
    })
  },
  company_wechat(e) { //微信
    this.setData({
      company_wechat: e.detail.value
    })
  },
  company_email(e) { //电子邮箱
    this.setData({
      company_email: e.detail.value
    })
  },
  company_nowAddress(e) { //现居地址
    this.setData({
      company_nowAddress: e.detail.value
    })
  },
  company_mark(e) { //备注信息
    this.setData({
      company_mark: e.detail.value
    })
  },
  // 待业
  jobwaiting_name(e) { //共借人名称
    this.setData({
      jobwaiting_name: e.detail.value
    })
  },
  jobwaiting_phone(e) { //共借人联系电话
    this.setData({
      jobwaiting_phone: e.detail.value
    })
  },
  jobwaiting_address(e) { //共借人地址
    this.setData({
      jobwaiting_address: e.detail.value
    })
  },
  jobwaiting_mobile(e) { //借款人手机号
    this.setData({
      jobwaiting_mobile: e.detail.value
    })
  },
  jobwaiting_qq(e) { //借款人QQ
    this.setData({
      jobwaiting_qq: e.detail.value
    })
  },
  jobwaiting_wechat(e) { //借款人微信
    this.setData({
      jobwaiting_wechat: e.detail.value
    })
  },
  jobwaiting_email(e) { //借款人电子邮箱
    this.setData({
      jobwaiting_email: e.detail.value
    })
  },
  jobwaiting_nowAddress(e) { //借款人现居地址
    this.setData({
      jobwaiting_nowAddress: e.detail.value
    })
  },
  jobwaiting_mark(e) { //备注信息
    this.setData({
      jobwaiting_mark: e.detail.value
    })
  },
  // 学生按钮
  students_nextBtn(e) {
    // 校验
    if (this.data.realname == '' || this.data.students_schoolName == '' || this.data.students_schoolAddress == '' || this.data.students_phone == '' || this.data.students_qq == '' || this.data.students_wechat == '' || this.data.students_email == '' || this.data.students_nowAddress == '' || this.data.students_mark == null || this.data.students_mark == '') {
      wx.showToast({
        title: '请完善您的信息',
        icon: 'none'
      })
    } else if (this.data.students_phone.length != 11) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
      })
      return false
    } else if (!(/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/).test(this.data.students_email)) {
      wx.showToast({
        title: '邮箱格式不正确',
        icon: 'none',
      })
      return false
    } else {
      // 请求
      util.rePost('/realName/realNameAddOrModify', {
        userNum: this.data.userNum, //用户唯一编号
        phoneNo: '', //用户手机号
        realName: this.data.realname, //真实姓名
        jobType: this.data.jobType, //职业类型(1-学生,2-公司职员,3-企业主,4-无业)
        schoolName: this.data.students_schoolName, //学校名称(学生)
        schoolAddress: this.data.students_schoolAddress, //学校地址(学生)
        rnaPhone: this.data.students_phone, //手机号(非必填)
        qqNum: this.data.students_qq, //QQ号
        weChat: this.data.students_wechat, //微信号
        email: this.data.students_email, //电子邮箱
        currentAddress: this.data.students_nowAddress, //现居地址
        remarks: this.data.students_mark,
        rnaId: this.data.students_rnaId
      }, function (res) {
        if (res.code == 1) {
          wx.navigateBack({
            detail: 1
          })
          wx.showToast({
            title: res.message,
            icon: 'success',
          })
        } else {
          wx.showToast({
            title: '添加失败',
            icon: 'none',
          })
        }
      })

    }

  },
  // 公司职员按钮
  employee_nextBtn(e) {
    // 校验
    if (this.data.realname == '' || this.data.employee_comName == '' || this.data.employee_address == '' || this.data.employee_position == '' || this.data.employee_money == '' || this.data.employee_phone == '' || this.data.employee_qq == '' || this.data.employee_wechat == '' || this.data.employee_email == '' || this.data.employee_nowAddress == '' || this.data.employee_mark == null || this.data.employee_mark == "") {
      wx.showToast({
        title: '请完善您的信息',
        icon: 'none'
      })
    } else if (this.data.employee_phone.length != 11) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
      })
      return false
    } else if (!(/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/).test(this.data.employee_email)) {
      wx.showToast({
        title: '邮箱格式不正确',
        icon: 'none',
      })
      return false
    } else {
      // 请求
      util.rePost('/realName/realNameAddOrModify', {
        userNum: this.data.userNum, //用户唯一编号
        phoneNo: '', //用户手机号
        realName: this.data.realname, //真实姓名
        jobType: this.data.jobType, //职业类型(1-学生,2-公司职员,3-企业主,4-无业)
        corporateName: this.data.employee_comName, //公司名称(公司职员)
        corporateAddress: this.data.employee_address, //公司地址(公司职员)
        corporatePosition: this.data.employee_position, //公司职位(公司职员)
        position: this.data.employee_money, //月收入(公司职员)
        rnaPhone: this.data.employee_phone, //手机号(非必填)
        qqNum: this.data.employee_qq, //QQ号
        weChat: this.data.employee_wechat, //微信号
        email: this.data.employee_email, //电子邮箱
        currentAddress: this.data.employee_nowAddress, //现居地址
        remarks: this.data.employee_mark,
        rnaId: this.data.employee_rnaId
      }, function (res) {
        if (res.code == 1) {
          wx.navigateBack({
            detail: 1
          })
          wx.showToast({
            title: res.message,
            icon: 'success',
          })
        } else {
          wx.showToast({
            title: '添加失败',
            icon: 'none',
          })
        }
      })
    }
  },
  // 企业主按钮
  company_nextBtn(e) {
    // 校验
    console.log(this.data.company_mark)
    if (this.data.realname == '' || this.data.company_name == '' || this.data.company_address == '' || this.data.company_code == '' || this.data.company_phone == '' || this.data.company_qq == '' || this.data.company_wechat == '' || this.data.company_email == '' || this.data.company_nowAddress == '' || this.data.company_mark == null || this.data.company_mark == "") {
      wx.showToast({
        title: '请完善您的信息',
        icon: 'none'
      })
    } else if (this.data.company_phone.length != 11) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
      })
      return false
    } else if (!(/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/).test(this.data.company_email)) {
      wx.showToast({
        title: '邮箱格式不正确',
        icon: 'none',
      })
      return false
    } else {
      // 请求
      util.rePost('/realName/realNameAddOrModify', {
        userNum: this.data.userNum, //用户唯一编号
        phoneNo: '', //用户手机号
        realName: this.data.realname, //真实姓名
        jobType: this.data.jobType, //职业类型(1-学生,2-公司职员,3-企业主,4-无业)
        enterpriseName: this.data.company_name, //企业名称(企业主)
        enterpriseAddress: this.data.company_address, //企业地址(企业主)
        creditCode: this.data.company_code, //社会统一信用代码(企业主)
        rnaPhone: this.data.company_phone, //手机号(非必填)
        qqNum: this.data.company_qq, //QQ号
        weChat: this.data.company_wechat, //微信号
        email: this.data.company_email, //电子邮箱
        currentAddress: this.data.company_nowAddress, //现居地址
        remarks: this.data.company_mark,
        rnaId: this.data.company_rnaId
      }, function (res) {
        if (res.code == 1) {
          wx.navigateBack({
            detail: 1
          })
          wx.showToast({
            title: res.message,
            icon: 'success',
          })
        } else {
          wx.showToast({
            title: '添加失败',
            icon: 'none',
          })
        }
      })
    }
  },
  // 待业按钮
  jobwaiting_nextBtn(e) {
    // 校验
    if (this.data.realname == '' || this.data.jobwaiting_name == '' || this.data.jobwaiting_phone == '' || this.data.jobwaiting_address == '' || this.data.jobwaiting_mobile == '' || this.data.jobwaiting_qq == '' || this.data.jobwaiting_wechat == '' || this.data.jobwaiting_email == '' || this.data.jobwaiting_nowAddress == '' || this.data.jobwaiting_mark == null || this.data.jobwaiting_mark == "") {
      wx.showToast({
        title: '请完善您的信息',
        icon: 'none'
      })
      // } else if (this.data.jobwaiting_phone.length != 11) {
      //   wx.showToast({
      //     title: '共借人手机号错误',
      //     icon: 'none',
      //   })
      //   return false
    } else if (!(/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/).test(this.data.jobwaiting_email)) {
      wx.showToast({
        title: '邮箱格式不正确',
        icon: 'none',
      })
      return false
    } else {
      //请求
      util.rePost('/realName/realNameAddOrModify', {
        userNum: this.data.userNum, //用户编号
        phoneNo: '18116261149', //用户手机
        rnaId: 16,
        realName: this.data.realname,
        jobType: this.data.jobType,
        commonName: this.data.jobwaiting_name,
        commonPhone: this.data.jobwaiting_phone,
        commonAddress: this.data.jobwaiting_address,
        rnaPhone: this.data.jobwaiting_mobile, //手机号(非必填)
        qqNum: this.data.jobwaiting_qq, //QQ号
        weChat: this.data.jobwaiting_wechat, //微信号
        email: this.data.jobwaiting_email, //电子邮箱
        currentAddress: this.data.jobwaiting_nowAddress, //现居地址
        remarks: this.data.jobwaiting_mark,
        rnaId: this.data.jobwaiting_rnaId
      }, function (res) {
        if (res.code == 1) {
          // wx.navigateTo({
          //   url: '/pages/customer/customer',
          // })
          wx.navigateBack({
            detail: 1
          })
          wx.showToast({
            title: res.message,
            icon: 'success',
          })
        } else {
          wx.showToast({
            title: '添加失败',
            icon: 'none',
          })
        }
      })
    }

  },
  //查询接口
  checkform() {
    var that = this;
    util.rePost('/realName/getRealName', {
      userNum: this.data.userNum
    }, function (res) {
      console.log(res)
      that.setData({
        jobType: res.data.records[0].jobType,
        currentId: res.data.records[0].jobType - 1,
      })
      if (that.data.jobType == 1) {
        that.setData({
          realname: res.data.records[0].realName,
          students_schoolName: res.data.records[0].schoolName, //学校名称
          students_schoolAddress: res.data.records[0].schoolAddress, //学校地址
          students_phone: res.data.records[0].rnaPhone, //手机号
          students_qq: res.data.records[0].qqNum, //qq
          students_wechat: res.data.records[0].weChat, //微信
          students_email: res.data.records[0].email, //电子邮箱
          students_nowAddress: res.data.records[0].currentAddress, //现居地址
          students_mark: res.data.records[0].remarks, //现居地址
          students_rnaId: res.data.records[0].rnaId
        })
      } else if (that.data.jobType == 2) {
        that.setData({
          realname: res.data.records[0].realName,
          employee_comName: res.data.records[0].corporateName, //公司名称
          employee_address: res.data.records[0].corporateAddress, //公司地址
          employee_position: res.data.records[0].corporatePosition, //公司职位
          employee_money: res.data.records[0].position, //月收入
          employee_phone: res.data.records[0].rnaPhone, //手机号
          employee_qq: res.data.records[0].qqNum, //QQ
          employee_wechat: res.data.records[0].weChat, //微信
          employee_email: res.data.records[0].email, //电子邮箱
          employee_nowAddress: res.data.records[0].currentAddress, //现居地址
          employee_mark: res.data.records[0].remarks, //现居地址
          employee_rnaId: res.data.records[0].rnaId
        })
      } else if (that.data.jobType == 3) {
        that.setData({
          realname: res.data.records[0].realName,
          company_name: res.data.records[0].enterpriseName, //企业名称
          company_address: res.data.records[0].enterpriseAddress, //企业地址
          company_code: res.data.records[0].creditCode, //社会统一信用代码
          company_phone: res.data.records[0].rnaPhone, //手机号
          company_qq: res.data.records[0].qqNum, //QQ
          company_wechat: res.data.records[0].weChat, //微信
          company_email: res.data.records[0].email, //电子邮箱
          company_nowAddress: res.data.records[0].currentAddress, //现居地址
          company_mark: res.data.records[0].remarks, //现居地址
          company_rnaId: res.data.records[0].rnaId
        })
      } else if (that.data.jobType == 4) {
        that.setData({
          realname: res.data.records[0].realName,
          jobwaiting_name: res.data.records[0].commonName, //共借人名称
          jobwaiting_phone: res.data.records[0].commonPhone, //共借人联系电话
          jobwaiting_address: res.data.records[0].commonAddress, //共借人地址
          jobwaiting_mobile: res.data.records[0].rnaPhone, //借款人手机号
          jobwaiting_qq: res.data.records[0].qqNum, //借款人QQ
          jobwaiting_wechat: res.data.records[0].weChat, //借款人微信
          jobwaiting_email: res.data.records[0].email, //借款人电子邮箱
          jobwaiting_nowAddress: res.data.records[0].currentAddress, //借款人现居地址
          jobwaiting_mark: res.data.records[0].remarks, //现居地址
          jobwaiting_rnaId: res.data.records[0].rnaId
        })
      }
    })
  },
  onShow: function () {
    this.checkform()
  },
  onLoad: function (options) {
    console.log(options)
    this.data.userNum = options.userNum
  }
})