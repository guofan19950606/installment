const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 时间戳转换
function tsFormatTime(timestamp, format) {
  const formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  let returnArr = [];
  let date = new Date(timestamp);
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  returnArr.push(year, month, day, hour, minute, second);
  returnArr = returnArr.map(formatNumber);
  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}
let rootDocment = "http://192.168.0.108:9089"
// let rootDocment = "http://192.168.1.31:9089"
// let rootDocment = "http://192.168.0.14:9089"


function rePost(url, data, cb, noAuth) { // post
  var getToken = wx.getStorageSync('userinfo').token;
  let obj
  if (getToken && !noAuth) { //有token noAuth无值
    obj = {
      'content-Type': 'application/json',
      'Authorization': "Bearer " + getToken
    }
  } else {
    obj = {
      'content-Type': 'application/json'
    }
  }
  var phoneNo = wx.getStorageSync('userinfo').phoneNo
  console.log(phoneNo)
  wx.request({
    url: rootDocment+"/user/isStill",
    data: {
      phoneNo: phoneNo
    },
    method: 'POST',
    dataType: 'json',
    header: {
      'content-Type': 'application/json'
    },
    success: function(res) {
      console.log(res)
      if (res.data.code == 116) {
        wx.request({
          url: rootDocment + url,
          data: data,
          method: 'POST',
          dataType: 'json',
          header: obj,
          success: function(res) {
            console.log(res, "_____guogafafsau")
            if (res.statusCode == 401) { //token失效
              console.log(res, "resData")
              wx.showModal({
                title: '提示',
                content: '登录过期，请重新登陆',
                cancelText: '确定',
                showCancel: false,
                success(res) {
                  if (res.confirm) {
                    // 用户点击了取消属性的按钮
                    wx.reLaunch({
                      url: '/pages/login/login',
                    })
                  }
                }
              })
            } else if (res.statusCode == 403) {
              wx.showModal({
                title: '提示',
                content: '您的账户已在其他设备登录，请重新登录',
                cancelText: '确定',
                showCancel: false,
                success: function(result) {
                  if (result.confirm) {
                    wx.redirectTo({
                      url: '/pages/login/login',
                    })
                  }
                }
              })
            }
            return typeof cb == "function" && cb(res.data)
          },
          fail: function() {
            return typeof cb == "function" && cb(false)
          },
          complete: function() {
            return
          }
        })
      } else {
        wx.showToast({
          title: "账户已被禁用，请重新登录",
          icon: "none",
          duration: 2000
        })
        setTimeout(function(){
          wx.navigateTo({
            url: '/pages/login/login',
          })
        },2000)
      }
    }
  })
  console.log(obj, 'obj')
}

function reGet(url, data, cb, noAuth) { // get
  var getToken = wx.getStorageSync('userinfo').token;
  var phoneNo = wx.getStorageSync('userinfo').phoneNo
  let obj
  if (getToken && !noAuth) { //有token noAuth无值
    obj = {
      'content-Type': 'application/x-www-form-urlencoded',
      'Authorization': "Bearer " + getToken
    }
  } else {
    obj = {
      'content-Type': 'application/x-www-form-urlencoded'
    }
  }
  console.log(obj, 'obj')
  wx.request({
    url: rootDocment + "/user/isStill",
    data: {
      phoneNo: phoneNo
    },
    method: 'POST',
    dataType: 'json',
    header: {
      'content-Type': 'application/json'
    },
    success: function(res) {
      if (res.data.code == 116) {
        wx.request({
          url: rootDocment + url,
          data: data,
          method: 'get',
          header: obj,
          dataType: 'json',
          success: function(res) {
            console.log(res, "_____guogafafsau")
            if (res.statusCode == 401) { //token失效
              wx.showModal({
                title: '提示',
                content: '登录过期，请重新登陆',
                cancelText: '确定',
                showCancel: false,
                success(res) {
                  console.log(res, "res.data")
                  if (res.confirm) {
                    // 用户点击了取消属性的按钮
                    wx.reLaunch({
                      url: '/pages/login/login',
                    })
                  }
                }
              })
            } else if (res.statusCode == 403) {
              wx.showModal({
                title: '提示',
                content: '您的账户已在其他设备登录，请重新登录',
                cancelText: '确定',
                showCancel: false,
                success: function(result) {
                  if (result.confirm) {
                    wx.redirectTo({
                      url: '/pages/login/login',
                    })
                  }
                }
              })
            }
            return typeof cb == "function" && cb(res.data)
          },
          fail: function() {
            return typeof cb == "function" && cb(false)
          }
        })
      } else {
        wx.showToast({
          title: "账户已被禁用，请重新登录",
          icon: "none",
          duration:2000
        })
        setTimeout(function () {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }, 2000)
      }
    }
  })
}
module.exports = {
  formatTime: formatTime,
  reGet,
  rePost,
  tsFormatTime: tsFormatTime,
  rootDocment
}