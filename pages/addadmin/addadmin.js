// pages/editAdmin/editAdmin.js
let util = require('../../utils/util.js')
Page({
  data: {
    telphone: '', //获取手机号 
    daminName: '', //获取管理员名称
    emailValue: '', //获取邮箱号
    passwordNum: '', //获取密码
    passwordNumAgain: '', //获取再次输入密码值
    manage_index: 0, //默认picker选中第一项
    isStart: 1, //默认发送后台的为第一项
    id: [], //选中角色权限id
    name: [], //选中角色权限名称
    // 状态管理值
    bindPicker_manage: ['启用', '禁用'], //下拉框状态
    list: [{
      id: "2",
      name: "机构入驻管理"
    },
    {
      id: "3",
      name: "机构课程管理"
    },
    {
      id: "4",
      name: "客户资料管理"
    },
    {
      id: "5",
      name: "客户资料审核"
    }
    ] //角色权限列表
  },
  // 复选框
  checkboxChange: function (e) {
    var item = e.detail.value //选中的数组
    var id = []; //选中的ID
    var name = []; //选中的NAME
    //循环选中的数组，取出对应的数据进行数组拼接
    for (var i = 0; i < item.length; i++) {
      var row = item[i].split(",") //将数组进行分割
      id = id.concat(row[0]) //数组下表的第一个为id
      name = name.concat(row[1]) //数组下表的第二个为name
    }
    this.setData({
      id: id,
      name: name
    })
    console.log(this.data.name)
  },
  //动态获取手机号
  telphone(e) {
    this.setData({
      telphone: e.detail.value
    })
  },
  //动态获取名称
  daminName(e) {
    this.setData({
      daminName: e.detail.value
    })
    console.log(this.data.daminName)
  },
  //动态获取邮箱名
  emailValue(e) {
    this.setData({
      emailValue: e.detail.value
    })
  },
  //动态获取密码值
  passwordNum(e) {
    this.setData({
      passwordNum: e.detail.value
    })
  },
  //动态获取再次输入密码值
  passwordNumAgain(e) {
    this.setData({
      passwordNumAgain: e.detail.value
    })
  },
  // 下来框函数事件
  bindPicker_manage(e) {
    var isStart = Number(e.detail.value) + 1
    console.log(isStart, "xialai")
    this.setData({
      manage_index: e.detail.value,
      isStart: isStart
    })
  },
  //返回上一 级页面
  handlerGobackClick(delta) {
    const pages = getCurrentPages();
    if (pages.length >= 2) {
      wx.navigateBack({
        delta: delta
      });
    } else {
      wx.navigateTo({
        url: '/pages/person/person'
      });
    }
  },
  //自定义导航点击跳转至添加管理员页面
  handlerGohomeClick() {
    wx.navigateTo({
      url: '/pages/addadmin/addadmin'
    });
  },
  updateclick() {
    wx.navigateTo({
      url: '/pages/person/person',
    })
  },
  //点击确认按钮
  sureBtn: function (e) {
    //首先判断手机号不能为空
    if (this.data.telphone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    //正则验证手机号格式是否符合
    if (!(/^1[3456789]\d{9}$/.test(this.data.telphone))) {
      wx.showToast({
        title: '手机号格式不对',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    //判断姓名是不是为空
    if (this.data.daminName == "") {
      console.log(this.data.daminName)
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    //判断邮箱是不是为空
    if (this.data.emailValue == "") {
      console.log(this.data.daminName)
      wx.showToast({
        title: '邮箱不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    //判断邮箱格式是不是符合要求
    if (!(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.data.emailValue))) {
      wx.showToast({
        title: '邮箱格式不对',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    //判断密码是不是为空
    if (this.data.passwordNum == "") {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    //判断密码是不是符合要求
    if (!(/^[\w_-]{6,14}$/.test(this.data.passwordNum))) {
      wx.showToast({
        title: '密码格式不对',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    //判断两次输入密码是否一致
    if (this.data.passwordNumAgain != this.data.passwordNum) {
      wx.showToast({
        title: '两次输入密码不一致，请重新输入',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (this.data.name.length == 0) {
      wx.showToast({
        title: '请选择角色权限',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    //调用添加用户接口
    util.rePost('/manager/insertManager', {
      phoneNo: this.data.telphone, //用户手机号
      userName: this.data.daminName, //用户名称
      email: this.data.emailValue, //用户邮箱
      password: this.data.passwordNum, //用户密码
      roles: this.data.id.join(","), //用户角色
    },
      function (res) {
        if (res.code == 1) {
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000
          })
          wx.navigateBack({
            delta: 1,
          })
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000
          })
        }
      })
  }
})