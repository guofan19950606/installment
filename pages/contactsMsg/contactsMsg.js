// 数据请求接口
let util = require('../../utils/util.js')
let app = getApp();
Page({
  data: {
    contactsMsg_person: '', //联系人1
    contactsMsg_phone: '', //手机号1
    contactsMsg_index: 0, //关系1
    contactsMsg_relation: ['请选择', '亲属', '朋友', '配偶'],
    contactsMsg_person2: '', //联系人2
    contactsMsg_phone2: '', //手机号2
    contactsMsg_index2: 0, //关系2
    contactsMsg_relation2: ['请选择', '亲属', '朋友', '配偶'],
    contactsMsg_person3: '', //联系人3
    contactsMsg_phone3: '', //手机号3
    contactsMsg_index3: 0, //关系3
    contactsMsg_relation3: ['请选择', '亲属', '朋友', '配偶'],
    userNum: '',
    remarks: ''
  },
  //联系人查看
  checkcontant() {
    var contactsMsg_person = this.data.contactsMsg_person;
    var contactsMsg_phone = this.data.contactsMsg_phone;
    var contactsMsg_index = this.data.contactsMsg_index;
    var contactsMsg_person2 = this.data.contactsMsg_person2;
    var contactsMsg_phone2 = this.data.contactsMsg_phone2;
    var contactsMsg_index2 = this.data.contactsMsg_index2;
    var contactsMsg_person3 = this.data.contactsMsg_person3;
    var contactsMsg_phone3 = this.data.contactsMsg_phone3;
    var contactsMsg_index3 = this.data.contactsMsg_index3;
    var that = this;
    util.reGet('/contact/queryContact', {
      // userNum: '123456'
      userNum: this.data.userNum
    }, function(res) {
      console.log(res)
      that.setData({
        contactsMsg_person: res.data.ciContact1,
        contactsMsg_phone: res.data.ciPhone1,
        contactsMsg_index: res.data.ciRelationship1,
        contactsMsg_person2: res.data.ciContact2,
        contactsMsg_phone2: res.data.ciPhone2,
        contactsMsg_index2: res.data.ciRelationship2,
        contactsMsg_person3: res.data.ciContact3,
        contactsMsg_phone3: res.data.ciPhone3,
        contactsMsg_index3: res.data.ciRelationship3,
        remarks: res.data.remarks
      })
      console.log(contactsMsg_person)
    })
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
  handlerGohomeClick() {
    wx.navigateTo({
      url: '/pages/userDetail/userDetail'
    });
  },
  contactsMsg_person(e) { //联系人1
    this.setData({
      contactsMsg_person: e.detail.value
    })
  },
  contactsMsg_phone(e) { //手机号1
    this.setData({
      contactsMsg_phone: e.detail.value
    })
  },
  contactsMsg_relation(e) { //关系1
    this.setData({
      contactsMsg_index: e.detail.value
    })
  },
  contactsMsg_person2(e) { //联系人2
    this.setData({
      contactsMsg_person2: e.detail.value
    })
  },
  contactsMsg_phone2(e) { //手机号2
    this.setData({
      contactsMsg_phone2: e.detail.value
    })
  },
  contactsMsg_relation2(e) { //关系2
    this.setData({
      contactsMsg_index2: e.detail.value
    })
  },
  contactsMsg_person3(e) { //联系人3
    this.setData({
      contactsMsg_person3: e.detail.value
    })
  },
  contactsMsg_phone3(e) { //手机号3
    this.setData({
      contactsMsg_phone3: e.detail.value
    })
  },
  contactsMsg_relation3(e) { //关系3
    this.setData({
      contactsMsg_index3: e.detail.value
    })
  },
  remarks(e) { //关系3
    this.setData({
      remarks: e.detail.value
    })
  },
  // 联系人保存按钮
  contactsMsgBtn(e) {
    var contactsMsg_person = this.data.contactsMsg_person;
    var contactsMsg_phone = this.data.contactsMsg_phone;
    var contactsMsg_index = this.data.contactsMsg_index;
    var contactsMsg_person2 = this.data.contactsMsg_person2;
    var contactsMsg_phone2 = this.data.contactsMsg_phone2;
    var contactsMsg_index2 = this.data.contactsMsg_index2;
    var contactsMsg_person3 = this.data.contactsMsg_person3;
    var contactsMsg_phone3 = this.data.contactsMsg_phone3;
    var contactsMsg_index3 = this.data.contactsMsg_index3;
    var remarks = this.data.remarks;
    if (this.data.contactsMsg_person == '' || this.data.contactsMsg_person2 == '' || this.data.contactsMsg_person3 == '') {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return false
    } else if (this.data.contactsMsg_phone == '' || this.data.contactsMsg_phone2 == '' || this.data.contactsMsg_phone3 == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return false
    } else if (this.data.contactsMsg_phone.length != 11 || !(/^1[3456789]\d{9}$/.test(this.data.contactsMsg_phone))) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
      })
      return false
    } else if (this.data.contactsMsg_phone2.length != 11 || !(/^1[3456789]\d{9}$/.test(this.data.contactsMsg_phone2))) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
      })
      return false
    } else if (this.data.contactsMsg_phone3.length != 11 || !(/^1[3456789]\d{9}$/.test(this.data.contactsMsg_phone3))) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
      })
      return false
    } else if (this.data.contactsMsg_phone == this.data.contactsMsg_phone2 || this.data.contactsMsg_phone == this.data.contactsMsg_phone3 || this.data.contactsMsg_phone3 == this.data.contactsMsg_phone2) {
      wx.showToast({
        title: '手机号不能重复',
        icon: 'none'
      })
      return false
    } else if (remarks == "") {
      wx.showToast({
        title: '备注信息不能为空',
        icon: 'none'
      })
      return false
    } else {
      util.rePost('/contact/saveContact', {
        updateType: 1,
        phoneNo: '17629006597', //手机号
        // userNum: '123456', //用户号
        userNum: this.data.userNum,
        ciContact1: contactsMsg_person,
        ciPhone1: contactsMsg_phone,
        ciRelationship1: contactsMsg_index,
        ciContact2: contactsMsg_person2,
        ciPhone2: contactsMsg_phone2,
        ciRelationship2: contactsMsg_index2,
        ciContact3: contactsMsg_person3,
        ciPhone3: contactsMsg_phone3,
        ciRelationship3: contactsMsg_index3,
        remarks: remarks
      }, function(res) {
        console.log(res)
        if (res.code == 1) {
          wx.showToast({
            title: "修改成功",
            icon: 'success',
            duration: 1500
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
        } else {
          wx.showToast({
            title: "请确认信息是否有误",
            icon: 'none',
            duration: 1500
          })
        }
      })
    }
  },

  onShow: function() {
    // this.checkcontant()
  },
  onLoad: function(options) {
    this.data.userNum = options.userNum
    this.checkcontant()
  }

})