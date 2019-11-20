// pages/editAdmin/editAdmin.js
let util = require('../../utils/util.js')
Page({
  data: {
    telphone: '', //获取手机号
    daminName: '', //获取用户名称  
    emailValue: '', //获取邮箱号
    passwordNum: '', //获取用户密码
    passwordNumAgain: '', //获取用户再次输入的密码值
    userNum: '8c2b0f2a-ddf2-40a8-9aa9-1a38d7a21249', //获取用户编码
    manage_index: "", //默认下拉框选中项为下标为0项
    isStart: 1, //默认发送给后台的状态为1
    id: [], //选中的角色列表id
    name: [], //选中的角色列表名称
    bindPicker_manage: ['启用', '禁用'], //下拉框状态
    isStatusShow: false,//如果状态是超管复选和下拉框是否显示
    list: [
      {
        id: "2",
        name: "机构入驻管理",
        checked: false
      },
      {
        id: "3",
        name: "机构课程管理",
        checked: false
      },
      {
        id: "4",
        name: "客户资料管理",
        checked: false
      },
      {
        id: "5",
        name: "客户资料审核",
        checked: false
      }
    ] //角色权限列表
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    var userinfo = wx.getStorageSync('userinfo');
    console.log(userinfo.userNum)
    this.setData({
      userNum: userinfo.userNum
    })
    this.checkInfo();
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
  //根据管理员编号获取管理员信息
  checkInfo() {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    util.reGet('/manager/queryByNum', {
      userNum: this.data.userNum
    },
      function (res) {
        if (res.code == 1) {
          wx.hideLoading()
          that.setData({
            telphone: res.data.phoneNo,
            daminName: res.data.userName,
            emailValue: res.data.email,
            manage_index: Number(res.data.managerState) - 1,
            id: res.data.roles
          })
          that.checkedIsShow();
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000
          })
        }
      })
  },
  //根据后台传值确定复选框选中状态
  checkedIsShow(e) {
    //循环选中的角色列表
    for (var i = 0; i < this.data.id.length; i++) {
      //判断管理员是否是超管如果是则不需要展示权限和状态默认最高权限，默认状态为启动状态
      if (this.data.id[i] != 1) {
        this.setData({
          isStatusShow: true
        })
      } else {
        this.setData({
          isStatusShow: false
        })
      }
      if (this.data.id[i] == 2) {
        var thisIdx = 0;
        var list = "list[" + thisIdx + "].checked";
        this.setData({
          [list]: true
        });
      }
      if (this.data.id[i] == 3) {
        var thisIdx = 1;
        var list = "list[" + thisIdx + "].checked";
        this.setData({
          [list]: true
        });
      }
      if (this.data.id[i] == 4) {
        var thisIdx = 2;
        var list = "list[" + thisIdx + "].checked";
        this.setData({
          [list]: true
        });
      }
      if (this.data.id[i] == 5) {
        var thisIdx = 3;
        var list = "list[" + thisIdx + "].checked";
        this.setData({
          [list]: true
        });
      }
    }
  },
  //点击确认按钮
  sureBtn: function (e) {
    console.log(this.data.id)
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
    //判断两次输入密码是否一致
    if (this.data.passwordNumAgain != this.data.passwordNum) {
      wx.showToast({
        title: '两次输入密码不一致，请重新输入',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    //判断是否选择角色权限
    if (this.data.id.length == 0) {
      wx.showToast({
        title: '请选择角色权限',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    //判断密码是不是符合要求
    if (this.data.passwordNum != "") {
      console.log("12346")
      if (!(/^[\w_-]{6,14}$/.test(this.data.passwordNum))) {
        wx.showToast({
          title: '密码格式不对',
          icon: 'none',
          duration: 2000
        })
        return false;
      }
      util.rePost('/manager/modifyManagerById', {
        phoneNo: this.data.telphone,
        userName: this.data.daminName,
        email: this.data.emailValue,
        password: this.data.passwordNum,
        roles: this.data.id.join(","),
        managerState: this.data.isStart,
        userNum: this.data.userNum
      },
        function (res) {
          if (res.code == 1) {
            wx.showToast({
              title: res.data,
              icon: 'none',
              duration: 2000
            })
            wx.navigateBack({
              delta: 1,
            })
          } else (
            wx.showToast({
              title: res.message,
              icon: 'none',
              duration: 2000
            })
          )
        })
    } else {
      console.log(this.data.passwordNum)
      util.rePost('/manager/modifyManagerById', {
        phoneNo: this.data.telphone,
        userName: this.data.daminName,
        email: this.data.emailValue,
        roles: this.data.id.join(","),
        managerState: this.data.isStart,
        userNum:this.data.userNum
      },
        function (res) {
          if (res.code == 1) {
            wx.showToast({
              title: res.data,
              icon: 'none',
              duration: 2000
            })
            wx.navigateBack({
              delta: 1,
            })

          } else (
            wx.showToast({
              title: res.message,
              icon: 'none',
              duration: 2000
            })
          )
        })
    }
  }
})