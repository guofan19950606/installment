//index.js
//获取应用实例
let util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    currentId: '0', //默认taber第一项全部
    inputLength: "0", //默认搜索框长度为0
    size: 10, //默认一页10条数据
    pageNumber: 1, //默认第一页
    pages: "", //获取页面最大页数
    section: [{
        name: '全部',
        typeId: '0'
      }, {
        name: '待审核',
        typeId: '3'
      }, {
        name: '已通过',
        typeId: '2'
      },
      {
        name: '未通过',
        typeId: '1'
      }
    ], //taber数据
    src: "/images/line.png", //taber切换底部显示图片路径
    scrDefault: "/images/linewhite.jpg", //taber切换底部显示图片默认路径
    inputValue: "", //输入框内容
    isSearch: true, //判断是输入框搜索还是taber搜索 默认为baber搜索
    userListInfo: [], //获取用户全部信息
    awaitAudit: [], //获取用户待审核信息
    yetPass: [], //获取客户已通过信息
    notPass: [] //获取用户未通过信息
  },
  //监听页面底部事件
  lower() {
    //判断累加页数是否大于最大页数如果小于最大页数则继续加 并且携带参数发送请求
    if (this.data.pageNumber < this.data.pages) {
      var that = this;
      // 当前页+1
      var pageNumber = that.data.pageNumber + 1;
      that.setData({
        pageNumber: pageNumber,
      })
      wx.showLoading({
        title: '加载中',
      })
      this.getUserListInfo(this.data.currentId, this.data.isSearch)
    } else {
      wx.showToast({
        title: '亲，已经是最后一页了',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //onshow调用返回来的时候页面要刷新
  onShow: function() {
    //当页面展示的时候把原本的值置为空并且重新发送请求
    this.setData({
      currentId: 0,
      pageNumber: 1,
      userListInfo: [],
      awaitAudit: [],
      yetPass: [],
      notPass: []
    })
    this.getUserListInfo(this.data.currentId, this.data.isSearch)
  },
  //获取用户列表信息
  getUserListInfo(id, isSearch) {
    //调用添加用户接口
    var that = this;
    //判断用户是taber搜索还是input搜索如果是input搜索传参的时候不需要携带fuzzy这个字段
    if (this.data.isSearch == true) {
      //判断taber是否为第一个 如果是的话不需要携带toExamineState参数，如果是的话需要传参toExamineState并赋值
      if (id == 0) {
        wx.showLoading({
          title: '加载中',
        })
        util.reGet('/userCourse/queryUserList', {
            pageSize: that.data.size,
            pageNumber: that.data.pageNumber,
          },
          function(res) {
            wx.hideLoading()
            if (res.code == 1) {
              for (var i = 0; i < res.data.records.length; i++) {
                res.data.records[i]["registerTime"] = util.tsFormatTime(res.data.records[i]["registerTime"], 'Y-M-D h:m:s')
              }
              that.setData({
                userListInfo: that.data.userListInfo.concat(res.data.records),
                pages: res.data.pages
              })
            } else {
              wx.showToast({
                title: res.message,
                icon: 'none',
              })
            }
          })
      } else if (id == 3) {
        wx.showLoading({
          title: '加载中',
        })
        util.reGet('/userCourse/queryUserList', {
            pageSize: that.data.size,
            pageNumber: that.data.pageNumber,
            toExamineState: id
          },
          function(res) {
            wx.hideLoading()
            if (res.code == 1) {
              for (var i = 0; i < res.data.records.length; i++) {
                res.data.records[i]["registerTime"] = util.tsFormatTime(res.data.records[i]["registerTime"], 'Y-M-D h:m:s')
              }
              that.setData({
                awaitAudit: that.data.awaitAudit.concat(res.data.records),
                pages: res.data.pages
              })
            } else {
              wx.showToast({
                title: res.message,
                icon: 'none',
              })
            }
          })
      } else if (id == 2) {
        wx.showLoading({
          title: '加载中',
        })
        util.reGet('/userCourse/queryUserList', {
            pageSize: that.data.size,
            pageNumber: that.data.pageNumber,
            toExamineState: id
          },
          function(res) {
            wx.hideLoading()
            if (res.code == 1) {
              for (var i = 0; i < res.data.records.length; i++) {
                res.data.records[i]["registerTime"] = util.tsFormatTime(res.data.records[i]["registerTime"], 'Y-M-D h:m:s')
              }
              that.setData({
                yetPass: that.data.yetPass.concat(res.data.records),
                pages: res.data.pages
              })
            } else {
              wx.showToast({
                title: res.message,
                icon: 'none',
              })
            }
          })
      } else if (id == 1) {
        wx.showLoading({
          title: '加载中',
        })
        util.reGet('/userCourse/queryUserList', {
            pageSize: that.data.size,
            pageNumber: that.data.pageNumber,
            toExamineState: id
          },
          function(res) {
            wx.hideLoading()
            if (res.code == 1) {
              for (var i = 0; i < res.data.records.length; i++) {
                res.data.records[i]["registerTime"] = util.tsFormatTime(res.data.records[i]["registerTime"], 'Y-M-D h:m:s')
              }
              that.setData({
                notPass: that.data.notPass.concat(res.data.records),
                pages: res.data.pages
              })
            } else {
              wx.showToast({
                title: res.message,
                icon: 'none',
              })
            }
          })
      }
    } else {
      if (id == 0) {
        wx.showLoading({
          title: '加载中',
        })
        util.reGet('/userCourse/queryUserList', {
            pageSize: that.data.size,
            pageNumber: that.data.pageNumber,
            fuzzy: this.data.inputValue
          },
          function(res) {
            wx.hideLoading()
            if (res.code == 1) {
              for (var i = 0; i < res.data.records.length; i++) {
                res.data.records[i]["registerTime"] = util.tsFormatTime(res.data.records[i]["registerTime"], 'Y-M-D h:m:s')
              }
              that.setData({
                userListInfo: that.data.userListInfo.concat(res.data.records),
                pages: res.data.pages
              })
            } else {
              wx.showToast({
                title: res.message,
                icon: 'none',
              })
            }
          })
      } else if (id == 3) {
        wx.showLoading({
          title: '加载中',
        })
        util.reGet('/userCourse/queryUserList', {
            pageSize: that.data.size,
            pageNumber: that.data.pageNumber,
            toExamineState: id,
            fuzzy: this.data.inputValue
          },
          function(res) {
            wx.hideLoading()
            if (res.code == 1) {
              for (var i = 0; i < res.data.records.length; i++) {
                res.data.records[i]["registerTime"] = util.tsFormatTime(res.data.records[i]["registerTime"], 'Y-M-D h:m:s')
              }
              that.setData({
                awaitAudit: that.data.awaitAudit.concat(res.data.records),
                pages: res.data.pages
              })
            } else {
              wx.showToast({
                title: res.message,
                icon: 'none',
              })
            }
          })
      } else if (id == 2) {
        wx.showLoading({
          title: '加载中',
        })
        util.reGet('/userCourse/queryUserList', {
            pageSize: that.data.size,
            pageNumber: that.data.pageNumber,
            toExamineState: id,
            fuzzy: this.data.inputValue
          },
          function(res) {
            wx.hideLoading()
            if (res.code == 1) {
              for (var i = 0; i < res.data.records.length; i++) {
                res.data.records[i]["registerTime"] = util.tsFormatTime(res.data.records[i]["registerTime"], 'Y-M-D h:m:s')
              }
              that.setData({
                yetPass: that.data.yetPass.concat(res.data.records),
                pages: res.data.pages
              })
            } else {
              wx.showToast({
                title: res.message,
                icon: 'none',
              })
            }
          })
      } else if (id == 1) {
        wx.showLoading({
          title: '加载中',
        })
        util.reGet('/userCourse/queryUserList', {
            pageSize: that.data.size,
            pageNumber: that.data.pageNumber,
            toExamineState: id,
            fuzzy: this.data.inputValue
          },
          function(res) {
            wx.hideLoading()
            if (res.code == 1) {
              for (var i = 0; i < res.data.records.length; i++) {
                res.data.records[i]["registerTime"] = util.tsFormatTime(res.data.records[i]["registerTime"], 'Y-M-D h:m:s')

              }
              that.setData({
                notPass: that.data.notPass.concat(res.data.records),
                pages: res.data.pages
              })
            } else {
              wx.showToast({
                title: res.message,
                icon: 'none',
              })
            }
          })
      }
    }
  },
  //跳转至详情页传参
  updateclick(e) {
    //点击不同的用户跳转至对应的界面并将用户编码携带过去，要跳转的页面根据传过来的用户编码获取用户信息，渲染页面
    var dataDetailInfo = JSON.stringify(e.currentTarget.dataset.text.userNum);
    wx.navigateTo({
      url: '/pages/userDetail/userDetail?data=' + dataDetailInfo,
    })
  },
  //返回上一级页面
  handlerGobackClick(delta) {
    const pages = getCurrentPages();
    if (pages.length >= 2) {
      wx.navigateBack({
        delta: delta
      });
    } else {
      wx.navigateTo({
        url: '/pages/user/user'
      });
    }
  },
  //taber切换
  handleTap: function(e) {
    //切换taber的时候首先要将页数至为第一页，发送请求、将列表信息置为空切换重新赋值给列表渲染，切换的时候并且将搜索框内容置为空，要搜索的话重新输入
    let id = e.currentTarget.id;
    if (id) {
      this.setData({
        currentId: id,
        pageNumber: 1,
        userListInfo: [],
        awaitAudit: [],
        yetPass: [],
        notPass: [],
        isSearch: true,
        inputValue: ''
      })
    }
    this.getUserListInfo(id, this.data.isSearch)
  },
  //监听用户输入搜索框内容
  watchKeyWord: function(event) {
    let num = event.detail.value.length
    this.setData({
      inputLength: num,
      inputValue: event.detail.value
    })
  },
  //回车搜索
  EnterInput() {
    //判断输入框是否为空，不为空的话 将isSearch置为false发送请求的时候则不需要携带fuzzy参数
    if (this.data.inputValue != "") {
      this.setData({
        isSearch: false,
      })
    } else {
      this.setData({
        isSearch: true,
      })
    }
    //输入发送请求的时候首先要将页数置为第一页，然后将之前的数据清空，重新赋值给列表进行渲染
    this.setData({
      pageNumber: 1,
      userListInfo: [],
      awaitAudit: [],
      yetPass: [],
      notPass: []
    })
    this.getUserListInfo(this.data.currentId, this.data.isSearch)
  },
  //清除搜索框内容
  clearInputEvent: function(e) {
    this.setData({
      inputValue: "",
      inputLength: 0,
      isSearch: true,
      pageNumber: 1,
      userListInfo: [],
      awaitAudit: [],
      yetPass: [],
      notPass: []
    });
    this.getUserListInfo(this.data.currentId, this.data.isSearch)
  }
})