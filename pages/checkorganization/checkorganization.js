// pages/checkorganization/checkorganization.js
let util = require('../../utils/util.js')
var QR = require("../../utils/qcorde.js");
var app = getApp()
Page({
  data: {
    eduQrCodeUrlone: '',
    eduCode: '',
    eduCheckCode: '',
    canvasHidden: false,
    imagePath: '',
    eduName: '', //机构名称
    eduLegalPerson: '', //机构法人
    eduContacts: '', //机构联系人
    eduAddress: '', //机构地址
    eduConPhone: '', //机构联系人电话
    eduConEmail: '', //机构联系人邮箱
    eduBankName: '', //机构开户行名称
    eduBankNum: '', //机构开户行账号
    eduNum: '', //机构编号
    eduQrCodeUrl: '' //图片路径
  },
  org_eduName(e) {
    this.setData({
      eduName: e.detail.value
    })
  },
  org_eduLegalPerson(e) {
    this.setData({
      eduLegalPerson: e.detail.value
    })
  },
  org_eduContacts(e) {
    this.setData({
      eduContacts: e.detail.value
    })
  },
  org_eduAddress(e) {
    this.setData({
      eduAddress: e.detail.value
    })
  },
  org_eduConPhone(e) {
    this.setData({
      eduConPhone: e.detail.value
    })
  },
  org_eduConEmail(e) {
    this.setData({
      eduConEmail: e.detail.value
    })
  },
  org_eduBankName(e) {
    this.setData({
      eduBankName: e.detail.value
    })
  },
  org_eduBankNum(e) {
    this.setData({
      eduBankNum: e.detail.value
    })
  },
  eduCheckCode(e) {
    this.setData({
      eduCheckCode: e.detail.value
    })
  },
  eduCode(e) {
    this.setData({
      eduCode: e.detail.value
    })
  },
  eduQrCodeUrl(e) {
    this.setData({
      eduQrCodeUrl: e.detail.value
    })
  },
  eduQrCodeUrlone(e) {
    this.setData({
      eduQrCodeUrlone: e.detail.value
    })
  },
  //查询接口
  checkorg() {
    var eduName = this.data.eduName;
    var eduLegalPerson = this.data.eduLegalPerson;
    var eduContacts = this.data.eduContacts;
    var eduAddress = this.data.eduAddress;
    var eduConPhone = this.data.eduConPhone;
    var eduConEmail = this.data.eduConEmail;
    var eduBankName = this.data.eduBankName;
    var eduBankNum = this.data.eduBankNum;
    var eduCheckCode = this.data.eduCheckCode;
    var eduCode = this.data.eduCode;
    var eduQrCodeUrl = this.data.eduQrCodeUrl;
    var eduQrCodeUrlone = this.data.eduQrCodeUrlone;
    var that = this;
    util.reGet('/education/findEducationByNum', {
      eduNum: this.data.eduNum
    }, function(res) {
      console.log(res)
      that.setData({
        eduName: res.data.eduName,
        eduLegalPerson: res.data.eduLegalPerson,
        eduContacts: res.data.eduContacts,
        eduAddress: res.data.eduAddress,
        eduConPhone: res.data.eduConPhone,
        eduConEmail: res.data.eduConEmail,
        eduBankName: res.data.eduBankName,
        eduBankNum: res.data.eduBankNum,
        eduCheckCode: res.data.eduCheckCode,
        eduCode: res.data.eduCode,
        eduQrCodeUrl: app.globalData.fileIp + res.data.eduQrCodeUrl,
        eduQrCodeUrlone: res.data.eduQrCodeUrl
      })
    })
  },
  //修改
  contactBtn(e) {
    var eduName = this.data.eduName;
    var eduLegalPerson = this.data.eduLegalPerson;
    var eduContacts = this.data.eduContacts;
    var eduAddress = this.data.eduAddress;
    var eduConPhone = this.data.eduConPhone;
    var eduConEmail = this.data.eduConEmail;
    var eduBankName = this.data.eduBankName;
    var eduBankNum = this.data.eduBankNum;
    // var eduQrCodeUrl = res.data.eduQrCodeUrl;
    var eduQrCodeUrlone = this.data.eduQrCodeUrlone
    if (eduName == '') {
      wx.showToast({
        title: '请输入机构名称',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (eduLegalPerson == "") {
      wx.showToast({
        title: '请输入机构法人',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (eduContacts == "") {
      wx.showToast({
        title: '请输入机构联系人',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (eduAddress == "") {
      wx.showToast({
        title: '请输入机构地址',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (eduConPhone == "") {
      wx.showToast({
        title: '请输入机构联系电话',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (eduConEmail == "") {
      wx.showToast({
        title: '请输入机构联系电话',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (eduBankName == "") {
      wx.showToast({
        title: '请输入机构开户行名称',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (eduBankNum == "") {
      wx.showToast({
        title: '请输入机构银行账户',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else {
      util.rePost('/education/updateEdu', {
        eduNum: this.data.eduNum, //必须传
        eduName: eduName,
        eduLegalPerson: eduLegalPerson,
        eduContacts: eduContacts,
        eduAddress: eduAddress,
        eduConPhone: eduConPhone,
        eduConEmail: eduConEmail,
        eduBankName: eduBankName,
        eduBankNum: eduBankNum,
        eduQrCodeUrl: eduQrCodeUrlone
        // delInd: '', //删除标志
      }, function(res) {
        console.log(res)
        if (res.code == 1) {
          wx.showToast({
            title: res.message,
            icon: 'success',
          })

        }
      })
    }
  },
  textPasteone() {
    var that = this;
    wx.showToast({
      title: '复制成功',
    })
    wx.setClipboardData({
      data: that.data.eduCode,
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  textPastetwo() {
    var that = this;
    wx.showToast({
      title: '复制成功',
    })
    wx.setClipboardData({
      data: that.data.eduCheckCode,
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            console.log(res.data) // data
          }
        })
      }
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
  //下载图片
  downloadImg: function(e) {
    console.log(e)
    wx.downloadFile({
      url: e.currentTarget.dataset.imgurl,
      //需要下载的图片url
      success: function(res) {　　　　　　　　　　　　 //成功后的回调函数
        wx.saveImageToPhotosAlbum({　　　　　　　　　 //保存到本地
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function(err) {
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              wx.openSetting({
                success(settingdata) {
                  console.log(settingdata)
                  if (settingdata.authSetting['scope.writePhotosAlbum']) {
                    console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                  } else {
                    console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                  }
                }
              })
            }
          }
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.data.eduNum = options.eduNum
    that.checkorg();
  },
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})