let util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentId: '1',
    inputLength: '0',
    size: 10, //默认一页10条数据
    pageNumber: 1, //默认第一页
    pages: "", //获取页面最大页数
    section: [{
      name: '已添加课程机构',
      typeId: '1'
    }, {
      name: '未添加课程机构',
      typeId: '2'
    }],
    src: "/images/line.png",
    scrDefault: "/images/linewhite.jpg",
    showMore: false,
    inputValue: '',
    isSearch: true, //判断是输入框搜索还是taber搜索 默认为baber搜索
    orginList: [],
    orgined: [], //有课程列表
    willorgin: [], //未有课程列表
    iditem: '',
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
      this.checkList(this.data.currentId, this.data.isSearch)
    } else {
      wx.showToast({
        title: '亲，已经是最后一页了',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //taber切换
  handleTap: function (e) {
    let id = e.currentTarget.id;
    console.log(id)
    if (id) {
      this.setData({
        currentId: id,
        pageNumber: 1,
        isSearch: true,
        inputValue: '',
        willorgin: [],
        orgined: []
      })
    }
    this.checkList(id, this.data.isSearch)
  },
  //查询机构课程列表
  checkList(id, isSearch) {
    var that = this;
    if (this.data.isSearch == true) {
      if (id == 1) {
        wx.showLoading({
          title: '加载中',
        })
        util.rePost('/education/findPageEduAndCourse', {
          pageSize: that.data.size,
          pageNumber: that.data.pageNumber,
          eduCourseStatus: "1"
        },
          function (res) {
            wx.hideLoading()
            if (res.code == 1) {
              console.log(res.data)
              that.setData({
                orgined: that.data.orgined.concat(res.data.records),
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
        util.rePost('/education/findPageEduAndCourse', {
          pageSize: that.data.size,
          pageNumber: that.data.pageNumber,
          eduCourseStatus: "0"
        },
          function (res) {
            wx.hideLoading()
            if (res.code == 1) {
              that.setData({
                willorgin: that.data.willorgin.concat(res.data.records),
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
      if (id == 1) {
        wx.showLoading({
          title: '加载中',
        })
        util.rePost('/education/findPageEduAndCourse', {
          pageSize: that.data.size,
          pageNumber: that.data.pageNumber,
          eduCourseStatus: "1",
          eduName: this.data.inputValue
        },
          function (res) {
            wx.hideLoading()
            if (res.code == 1) {
              console.log(res.data)
              that.setData({
                orgined: that.data.orgined.concat(res.data.records),
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
        util.rePost('/education/findPageEduAndCourse', {
          pageSize: that.data.size,
          pageNumber: that.data.pageNumber,
          eduCourseStatus: "0",
          eduName: this.data.inputValue
        },
          function (res) {
            wx.hideLoading()
            if (res.code == 1) {
              that.setData({
                willorgin: that.data.willorgin.concat(res.data.records),
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
  checkcourse(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/addcourse/addcourse?eduNum=' + e.currentTarget.dataset.edunum + "&eduName=" + e.currentTarget.dataset.eduname,
    })
  },
  listToggle: function (e) {
    console.log(e)
    this.setData({
      showMore: !this.data.showMore,
      iditem: e.currentTarget.dataset.iditem
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
        url: '/pages/addcourse/addcourse'
      });
    }
  },
  handlerGohomeClick() {
    wx.navigateTo({
      url: '/pages/addcourse/addcourse'
    });
  },
  //监听用户输入搜索框内容
  watchKeyWord: function (event) {
    console.log(event.detail.value.length);
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
      willorgin: [],
      orgined: []
    })
    this.checkList(this.data.currentId, this.data.isSearch)
  },
  //清除搜索框内容
  clearInputEvent: function (e) {
    console.log("gfgfgffg")
    this.setData({
      'inputValue': '',
      inputLength: 0,
      isSearch: true,
      pageNumber: 1,
      orgined: [],
      willorgin: []
    });
    this.checkList(this.data.currentId, this.data.isSearch)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      currentId: 1,
      pageNumber: 1,
      orgined: [],
      willorgin: []
    })
    console.log(this.data.currentId)
    // this.checkList(this.data.currentId)
    this.checkList(this.data.currentId, this.data.isSearch)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})