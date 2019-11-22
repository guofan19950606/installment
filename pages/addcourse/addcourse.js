let util = require('../../utils/util.js')
Page({
  data: {
    cnum: '',
    roginlist: [],
    items: [],
    eduNum: '',
    eduName: '',
    checkbox: [],
    courseName: '',
    inputValue: null,
    inputLength: '',
    size: 10,
    pages: null, //获取页面页数
    pageNumber: 1, //默认第一页
    updatecourseName: '',
    classDay: '',
    updateclassDay: '',
    classHour: '',
    updateclassHour: '',
    classPrice: '',
    updateclassPrice: '',
    courseNum: '', //课程编号 修改时传入
    mechanismNum: '', //机构编号
    eduName: '', //机构名称
  },
  //添加
  courseName(e) { //1
    this.setData({
      courseName: e.detail.value
    })
  },
  updatecourseName(e) { //1
    this.setData({
      updatecourseName: e.detail.value
    })
  },
  classDay(e) { //1
    this.setData({
      classDay: e.detail.value
    })
  },
  updateclassDay(e) { //1
    this.setData({
      updateclassDay: e.detail.value
    })
  },
  classHour(e) { //1
    this.setData({
      classHour: e.detail.value
    })
  },
  updateclassHour(e) { //1
    this.setData({
      updateclassHour: e.detail.value
    })
  },
  updateclassPrice(e) { //1
    this.setData({
      updateclassPrice: e.detail.value
    })
  },
  classPrice(e) { //1
    this.setData({
      classPrice: e.detail.value
    })
  },
  //监听用户输入搜索框内容
  EnterInput: function(event) {
    let num = event.detail.value.length
    console.log(event.detail.value)
    console.log(num)
    this.setData({
      inputLength: num,
      inputValue: event.detail.value
    })
    this.checkList()
  },
  //清除搜索框内容
  clearInputEvent: function(e) {
    this.setData({
      inputValue: '',
      inputLength: 0,
      pageNumber: 1,
    });
    this.checkList()
  },
  handlerGobackClick(delta) {
    const pages = getCurrentPages();
    if (pages.length >= 2) {
      wx.navigateBack({
        delta: delta
      });
    } else {
      wx.navigateTo({
        url: '/pages/course/course'
      });
    }
  },
  //添加
  powerDrawer(e) {
    console.log(e)
    this.setData({
      showModalStatus: true,
    });
  },
  //修改 
  updatepower(e) {
    this.setData({
      showModalStatusupdate: true,
      cnum: e.currentTarget.dataset.cnum
    });
    this.checkcourse()
  },
  powerDrawerupdatemark() {
    this.setData({
      showModalStatusupdate: false,
    });
  },
  //单条课程查询
  checkcourse() {
    var that = this;
    util.rePost('/course/getCourse', {
      courseNum: this.data.cnum
    }, function(res) {
      if (res.code == 1) {
        console.log(res.data)
        wx.hideLoading();
        that.setData({
          updatecourseName: res.data.records[0].courseName,
          updateclassDay: res.data.records[0].classDay,
          updateclassHour: res.data.records[0].classHour,
          updateclassPrice: res.data.records[0].classPrice,
          updatecourseNum: res.data.records[0].courseNum
        })
      } else {
        wx.hideLoading();
        wx.showToast({
          title: '暂无数据',
        })
      }
    })
  },
  //查询课程
  checkList() {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this;
    util.rePost('/course/getCourse', {
      eduNum: that.data.eduNum,
      current: that.data.pageNumber,
      size: that.data.size,
      courseName: that.data.inputValue
    }, function(res) {
      if (res.code == 1) {
        var roginlist = res.data.records
        console.log(res.data)
        wx.hideLoading();
        that.setData({
          roginlist: roginlist,
          pages: res.data.pages
        })
      } else {
        that.setData({
          roginlist: "",
        })
        wx.showToast({
          title: res.message,
          icon: 'none',
        })
      }
    })
  },
  //删除
  orgindelet(e) {
    console.log(e)
    var courseNum = e.currentTarget.dataset.delet
    console.log(courseNum)
    var that = this
    wx.showModal({
      title: '删除课程',
      content: '确定要删除该课程？',
      showCancel: true, //是否显示取消按钮
      cancelText: "否", //默认是“取消”
      cancelColor: '#4462fe', //取消文字的颜色
      confirmText: "是", //默认是“确定”
      confirmColor: '#4462fe', //确定文字的颜色
      success: function(res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          util.rePost('/course/deleteCourseByCourseNum', {
            //删除参数
            courseNum: courseNum
          }, function(res) {
            console.log(JSON.stringify(res))
            if (res.code == 1) {
              wx.showToast({
                title: res.message,
                icon: 'success',
              })
              that.checkList();
            }
          })
        }
      },
      fail: function(res) {}, //接口调用失败的回调函数
      complete: function(res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },
  powerDrawermark() {
    this.setData({
      showModalStatus: false,
      courseName: '',
      classDay: '',
      classHour: '',
      classPrice: '',
    })
  },
  //添加课程
  powerDrawerClose(e) {
    var that = this;
    console.log(e)
    var courseNum = e.currentTarget.dataset.coursenum;
    console.log(courseNum)
    var eduName = this.data.eduName; //机构名称
    var eduNum = this.data.eduNum //机构编号
    var courseName = this.data.courseName; //课程名
    var classDay = this.data.classDay; //课节
    var classHour = this.data.classHour; //课时
    var classPrice = this.data.classPrice; //价格
    if (courseName == "") {
      wx.showToast({
        title: '请输入课程',
        icon: 'none'
      })
      return false
    } else if (classDay == "") {
      wx.showToast({
        title: '请输入课节',
        icon: 'none'
      })
      return false
    } else if (classHour == "") {
      wx.showToast({
        title: '请输入课时',
        icon: 'none'
      })
      return false
    } else if (classPrice == "") {
      wx.showToast({
        title: '请输入价格',
        icon: 'none'
      })
      return false
    } else {
      util.rePost('/course/courseAddOrModify', {
        courseNum: courseNum,
        courseName: courseName,
        classDay: classDay,
        classHour: classHour,
        classPrice: classPrice,
        eduName: eduName,
        eduNum: eduNum,
        size: 100
      }, function(res) {
        console.log(JSON.stringify(res))
        that.setData({
          showModalStatus: false,
          courseName: '',
          classDay: '',
          classHour: '',
          classPrice: '',
        });
        if (res.code == 1) {
          that.checkList();
          wx.showToast({
            title: res.message,
            icon: 'success',
          })
        }
      })
    }
  },
  //修改课程
  updatepowerDrawerClose(e) {
    var that = this;
    console.log(e)
    var eduName = this.data.eduName; //机构名称
    var eduNum = this.data.eduNum
    var courseNum = e.currentTarget.dataset.coursenum;
    console.log(courseNum)
    var courseName = this.data.updatecourseName;
    var classDay = this.data.updateclassDay; //课节
    var classHour = this.data.updateclassHour; //课时
    var classPrice = this.data.updateclassPrice; //价格
    if (courseName == "") {
      wx.showToast({
        title: '请输入课程',
        icon: 'none'
      })
      return false
    } else if (classDay == "") {
      wx.showToast({
        title: '请输入课时',
        icon: 'none'
      })
      return false
    } else if (classHour == "") {
      wx.showToast({
        title: '请输入课节',
        icon: 'none'
      })
      return false
    } else if (classPrice == "") {
      wx.showToast({
        title: '请输入价格',
        icon: 'none'
      })
      return false
    } else {
      util.rePost('/course/courseAddOrModify', {
        courseNum: courseNum,
        courseName: courseName,
        classDay: classDay,
        classHour: classHour,
        classPrice: classPrice,
        eduName: eduName,
        eduNum: eduNum,
        size: 100
      }, function(res) {
        console.log(JSON.stringify(res))
        that.setData({
          showModalStatusupdate: false
        });
        if (res.code == 1) {
          that.checkList();
          wx.showToast({
            title: res.message,
            icon: 'success',
          })
        }
      })
    }
  },
  lower: function() {
    if (this.data.pageNumber < this.data.pages) {
      console.log("jiazai")
      var that = this;
      // 当前页+1
      var pageNumber = that.data.pageNumber + 1;
      that.setData({
        pageNumber: pageNumber,
      })
      wx.showLoading({
        title: '加载中',
      })
      console.log(this.data.pageNumber, "33333")
      util.rePost('/course/getCourse', {
          current: that.data.pageNumber,
          size: that.data.size,
        },
        function(res) {
          var roginlist = res.data.records
          if (res.code == 1) {
            wx.hideLoading()
            that.setData({
              roginlist: that.data.roginlist.concat(res.data.records)
            })
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none',
            })
          }
        })
    } else {
      wx.showToast({
        title: '亲，已经是最后一页了',
        icon: 'none',
        duration: 2000
      })
    }
  },
  onShow: function() {
    this.setData({
      pageNumber: 1
    })
    this.checkList()
  },
  onLoad: function(options) {
    console.log(options)
    this.data.eduNum = options.eduNum;
    this.data.eduName = options.eduName;
  }
})