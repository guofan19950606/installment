// 数据请求接口
let util = require('../../utils/util.js')
let app = getApp();
Page({
  data: {
    organcode: '',
    userNum: '',
    courseNum: '',
    organization_code: '', //机构代码
    organization_name: '', //机构名称
    organization_con: '', //课程内容
    organization_price: '', //课程价格
    organization_plan: '', //课程计划
    selected: false,
    course_select: '请选择',
    contactsMsg_index: 0, //课程内容下标
    contactsMsg_relation: [], //课程内容
    courselabel_width: 0,
    codeHide: true, //机构校验码的隐藏状态
    onshowstu: 0
  },
  contactsMsg_relation(e) { //课程内容
    console.log(e)
    this.setData({
      contactsMsg_index: e.detail.value
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
  //查询课程内容
  getCourse(num, coursenum) {
    var that = this;
    console.log(that.data.organcode)
    console.log(that.data.organcheckcode)
    var eduNum = that.data.organcode + that.data.organcheckcode
    console.log(eduNum)
    //获取机构课程列表
    wx.showLoading({
      title: '加载中...',
    })
    util.rePost('/course/getCourse', {
      eduNum: eduNum
    }, function(res) {
      console.log(res)
      if (res.code == 1) {
        var planArr = [];
        var priceArr = [];
        res.data.records.forEach((item, index) => {
          if (num == 0) {
            that.data.contactsMsg_relation.push(item.courseName)
            that.setData({
              contactsMsg_relation: that.data.contactsMsg_relation
            })
            wx.hideLoading();
          } else {
            planArr.push(item.classHour)
            priceArr.push(item.classPrice)
            that.setData({
              onshowstu: 1,
              courseplan: planArr[coursenum],
              courseprice: priceArr[coursenum]
            })
            wx.hideLoading();
          }
        })
      }
    })
  },
  contactsMsg_relation(e) {
    console.log(e)
    console.log(e.detail.value)
    var that = this;
    that.setData({
      contactsMsg_index: e.detail.value,
    })
    that.getCourse(1, e.detail.value)

  },
  /**点击下拉框*/
  bindShowMsg() {
    this.setData({
      selected: !this.data.selected
    })
  },
  /**下拉框   内容*/
  mySelect(e) {
    var selectedname = e.currentTarget.dataset.selectedname;
    this.setData({
      course_select: selectedname,
      selected: false
    })
  },
  //提交表单
  formSubmit(e) {
    // wx.navigateTo({
    //   url: '/pages/realname/realname',
    // })
    var organcode = e.detail.value.organcode; //机构代码
    var organcheckcode = e.detail.value.organcheckcode; //机构校验码
    var organname = e.detail.value.organname; //机构名称
    var contactsMsg_index = this.data.contactsMsg_index; //课程内容下标
    var contactsMsg_relation = this.data.contactsMsg_relation[contactsMsg_index]; //课程内容
    console.log(contactsMsg_relation)
    var courseplan = e.detail.value.courseplan.split("月"); //课时计划
    var courseprice = e.detail.value.courseprice.split("RMB"); //课程价格
    var mark = e.detail.value.mark; //备注信息
    console.log(courseplan[0])
    console.log(courseprice[0])
    if (organcode == '') {
      wx.showToast({
        title: '请输入机构代码',
        icon: 'none',
        duration: 1500
      })
      return false;
      // } else if (organcheckcode == '') {
      //   wx.showToast({
      //     title: '请输入机构校验码',
      //     icon: 'none',
      //     duration: 1500
      //   })
      //   return false;
    } else if (organname == '') {
      wx.showToast({
        title: '请输入机构名称',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (contactsMsg_relation == '请选择') {
      wx.showToast({
        title: '请选择课程内容',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (courseplan == '') {
      wx.showToast({
        title: '请输入课时计划',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (courseprice == '') {
      wx.showToast({
        title: '请输入课程价格',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (mark == null || mark == '') {
      wx.showToast({
        title: '请输入备注信息',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else {
      util.rePost('/userCourse/saveCurriculum', {
        updateType: 1, //修改传1，添加传0
        phoneNo: '', //手 机 号
        userNum: this.data.userNum, //用 户 号
        courseNum: this.data.courseNum, //课程编号
        insCode: organcode, //机构代码
        eduCheckCode: organcheckcode, //机构校验码
        insName: organname, //机构名称
        curContent: contactsMsg_relation, //课程内容
        curPlan: courseplan[0], //课程计划
        curPrice: courseprice[0], //课程金额
        remarks: mark //备注信息

      }, function(res) {
        console.log(res)
        if (res.code == 1) {
          wx.navigateBack({
            detail: 1
          })
          wx.showToast({
            title: "修改成功",
            icon: 'success'
          })
        } else {
          wx.showToast({
            title: "修改失败",
            icon: 'none'
          })
        }
      })
    }
  },
  // 课程查询
  checkCourse() {
    var that = this;
    util.reGet('/userCourse/queryCurriculum', {
      userNum: that.data.userNum, //用户编号
      courseNum: that.data.courseNum
    }, function(res) {
      console.log(res)
      if (res.code == 1) {
        that.setData({
          organcode: res.data.insCode, //机构代码
          organcheckcode: res.data.eduCheckCode, //机构校验码 
          organname: res.data.insName, //机构名称
          curContent: res.data.curContent, //课程内容
          courseplan: res.data.curPlan, //课程计划
          courseprice: res.data.curPrice, //课程价格
          mark: res.data.remarks, //备注
        })
      }
    })
  },
  onShow: function() {
    var that = this;
    that.checkCourse()
    setTimeout(function() {
      that.getCourse(that.data.contactsMsg_index)
    }, 1000)
  },
  onLoad: function(options) {
    var that = this;
    that.data.courseNum = options.courseNum
    that.data.userNum = options.userNum
    console.log(that.data.userNum)
    console.log(that.data.courseNum)
    var id = options.id;
    var codeHide = that.data.codeHide;
  }
})