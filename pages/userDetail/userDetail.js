//index.js
//获取应用实例
let util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    activeIsShow: false, //控制企业，学校等地址显示隐藏
    siteIsshow: false,//控制现居地址显示还是隐藏
    array: ['未通过', '已通过','待审核'],//审核状态数据
    index: 0,//下标默认为0
    userNum:"",//用户编码
    userDetailInfo:[],//获取用户详情信息
    textareaValue:'',//获取文本域输入信息
    ddNoPositive:"",//身份证正面照片  
    ddNoBack:"",//身份证反面照片
    ddOther:[],//其他照片
    disable:false
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
        url: '/pages/userDetail/userDetail'
      });
    }
  },
  //页面第一次渲染执行函数
  onLoad: function (options){
      //接收参数并赋值
      this.setData({
        userNum: JSON.parse(options.data)
      })
    this.getDetailInfo()
   
  },
  //监听value变化
  watchValue(e){
    console.log(e.detail.value)
    this.setData({
      textareaValue: e.detail.value
    })
  },
  //获取详细信息
  getDetailInfo(){
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    util.reGet('/userCourse/queryDetails', {
      userNum: that.data.userNum
    },
      function (res) {
        wx.hideLoading()
        if (res.code == 1) {
          var ddNoPositive = app.globalData.fileIp + "" + res.data.documentMap.ddNoPositive;
          var ddNoBack = app.globalData.fileIp + "" + res.data.documentMap.ddNoBack;
          var ddOther = res.data.documentMap.ddOther.split(",");
          for (var i = 0; i < ddOther.length;i++){
            ddOther[i] = app.globalData.fileIp + ddOther[i]
          }
          that.setData({
            userDetailInfo:res.data,
            index: Number(res.data.userMap.toExamineState)-1,
            textareaValue:res.data.userMap.uRemarks,
            ddNoPositive: ddNoPositive,
            ddNoBack: ddNoBack,
            ddOther: ddOther
          })
          console.log(that.data.index)
          if (that.data.index==2){
            that.setData({
              disable:false
            })
          }else{
            that.setData({
              disable: true
            })
          }
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none',
          })
        }
      })
  },
  //选择事件
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
    })
  },
  //控制企业，学校等地址显示隐藏
  activeIsShow:function(){
    this.setData({
      activeIsShow:!this.data.activeIsShow
    })
  },
  //控制现居地址显示还是隐藏
  siteIsshow:function(){
    this.setData({
      siteIsshow:!this.data.siteIsshow
    })
  },
  // 点击保存按钮
  saveInfo(){
    var that = this;
    console.log(that.data.textareaValue.length,"123")
    if (that.data.textareaValue==null || that.data.textareaValue==""){
      wx:wx.showToast({
        title: '请填写备注',
        icon:"none",
        duration: 1500,
      })
      return false
    }
   
    wx.showLoading({
      title: '加载中',
    })
    util.rePost('/audit/postAudit', {
      userNum: that.data.userNum,
      toExamineState: Number(that.data.index)+1,
      uRemarks: that.data.textareaValue,
    },
      function (res) {
        wx.hideLoading()
        if (res.code == 1) {
          wx.showToast({
            title: res.message,
            icon: 'none',
          })
          wx:wx.navigateBack({
            delta: 1,
          })
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none',
          })
        }
      })
  }
})
