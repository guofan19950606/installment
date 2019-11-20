// 数据请求接口
let util = require('../../utils/util.js')
let app = getApp();
Page({
  data: {
    remarks: '',
    userNum: '',
    // 身份证上传
    tempFilePaths1: '/images/renzCard2.png', //上传身份证正面
    tempFilePaths2: '/images/renzCard.png', //上传身份证反面
    tempFilePaths1_half: '', //上传数据库  半路径
    tempFilePaths2_half: '', //上传数据库  半路径
    imgShow1: false, //身份证正面删除判断
    imgShow2: false, //身份证反面删除判断
    ddId: '',
    // 多图上传
    images_house: [], //其他证件数组 
    images_houseHalf: [], //半路径图片存储
    imgLen_max_house: 5, //最多上传imgLen_max张图片的数量统计
    judgment_img_house: false, //最多上传imgLen_max_cls张图片后让其禁止在点击上传
    showjia_house: true, //显示隐藏选择图片的样式
    houseLenArr: [], //婚姻限制图片的长度(原来+新增)
    ddId: '', //修改时传
  },
  remarks(e) {
    this.setData({
      remarks: e.detail.value
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
  // 身份证图片点击上传--------------------------------
  chooseImg_cards1: function (e) {
    var fourindex = e.currentTarget.dataset.fourindex;
    var that = this;
    // 选择图片
    wx.chooseImage({
      sizeType: ["compressed"],
      count: 1,
      success: function (res) {
        console.log(res)
        var tempFiles = res.tempFilePaths;
        console.log(tempFiles)
        wx.showLoading({
          title: '上传中...',
        })
        wx.uploadFile({
          // http://192.168.0.105:5555
          // url: util.rootDocment + '/certificate/uploadAddImg',
          url: 'http://192.168.0.108:9089/certificate/uploadAddImg',
          filePath: tempFiles[0],
          name: 'files',
          formData: {
            files: tempFiles,
            // userNum: '65465765464565476876876'
            userNum: this.data.userNum
          },
          success(res) {
            console.log(res)
            var native_url = JSON.parse(res.data).data.url0; //本地url
            var completion_url = JSON.parse(res.data).data.wholeurl0; //完整url地址
            let ret = JSON.parse(res.data);
            if (ret.code == "1") {
              wx.hideLoading()
              if (fourindex == 1 && that.data.tempFilePaths1 == '/images/renzCard2.png') {
                that.setData({
                  imgShow1: true,
                  tempFilePaths1: completion_url, //图片显示 全路径
                  tempFilePaths1_half: native_url //上传数据库  半路径
                })
              }
              if (fourindex == 2 && that.data.tempFilePaths2 == '/images/renzCard.png') {
                that.setData({
                  imgShow2: true,
                  tempFilePaths2: completion_url, //图片显示 全路径
                  tempFilePaths2_half: native_url //上传数据库  半路径
                })
              }
            }
          }
        })
      }
    })
  },
  // 身份证图片删除
  delete_card1: function (e) {
    var that = this;
    let img = e.currentTarget.dataset.img;
    console.log(img)
    let index = e.currentTarget.dataset.fourindex;
    let data = {
      url: img
    }
    util.rePost('/certificate/deleteImgByUrl', data, res => {
      if (res.code == 1) {
        wx.showToast({
          title: '删除成功',
        })
        if (index == 1) {
          that.setData({
            tempFilePaths1: "/images/renzCard2.png",
            imgShow1: false,
            tempFilePaths1_half: ''
          })
        }
        if (index == 2) {
          that.setData({
            tempFilePaths2: "/images/renzCard.png",
            imgShow2: false,
            tempFilePaths2_half: ''
          })
        }
      } else {
        wx.showToast({
          title: '删除失败',
        })
      }
    })
  },
  // 身份证图片预览
  previewImage_card1: function (e) {
    var that = this
    var current = e.target.dataset.src //获取图片的url地址
    if (that.data.tempFilePaths1 == '/images/renzCard2.png') {
      wx.showToast({
        title: '请上传图片',
      })
    } else {
      wx.previewImage({
        current: current,
        urls: new Array(that.data.tempFilePaths1)
      })
    }
  },
  previewImage_card2: function (e) {
    var that = this
    var current = e.target.dataset.src //获取图片的url地址
    if (that.data.tempFilePaths2 == '/images/renzCard.png') {
      wx.showToast({
        title: '请上传图片',
      })
    } else {
      wx.previewImage({
        current: current,
        urls: new Array(that.data.tempFilePaths2)
      })
    }
  },
  // 其他证件上传选择--------------------------------
  chooseImage_married_house: function () {
    var that = this;
    var houseLenArr = that.data.houseLenArr;
    // 选择图片
    wx.chooseImage({
      count: 5, // 默认9
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        houseLenArr = that.data.images_house.concat(res.tempFilePaths).slice(0, 5)
        that.maritalUpload_house(houseLenArr) //婚姻上传选择
        if (that.data.imgLen_max_house === houseLenArr.length) {
          that.setData({
            showjia_house: false
          })
        }
      }
    })
  },
  // 其他证件选择函数
  maritalUpload_house(images_for) {
    var that = this
    var images_house = that.data.images_house //服务器
    var images_houseHalf = that.data.images_houseHalf;
    var imagesArr = [];
    var imagesArr_half = []; //半路径
    wx.showLoading({
      title: '上传中...',
    })
    for (var i in images_for) {
      var imagePer = images_for[i]
      // 上传图片
      wx.uploadFile({
        url: 'http://192.168.0.108:9089/certificate/uploadAddImg',
        // url: util.rootDocment + '/certificate/uploadAddImg',
        filePath: imagePer,
        name: 'files',
        formData: {
          files: imagePer,
          // userNum: '65465765464565476876876'
          userNum: this.data.userNum
        },
        success(res) {
          if (JSON.parse(res.data).code == 1) {
            wx.hideLoading()
            var native_url = JSON.parse(res.data).data.url0; //本地url
            var completion_url = JSON.parse(res.data).data.wholeurl0; //完整url地址
            imagesArr.push(completion_url)
            imagesArr_half.push(native_url)
            if ('' == images_house && '' == images_houseHalf) {
              that.setData({
                images_house: imagesArr,
                images_houseHalf: imagesArr_half
              })
            } else {
              that.setData({
                images_house: images_house.concat(imagesArr),
                images_houseHalf: images_houseHalf.concat(imagesArr_half), //半路径
              })
            }
          }
        },
      })
    }
  },
  remove: function (array, val) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == val) {
        array.splice(i, 1);
      }
    }
    return array;
  },
  // 其他证件图片的删除
  delete_matrimony_house: function (e) {
    console.log(this.data.images_houseHalf)
    var images_houseHalf = this.data.images_houseHalf; //半路径
    var that = this;
    var index = e.currentTarget.dataset.index; //删除下标
    var images = e.currentTarget.dataset.images; //删除的图片 全路径
    let data = {
      url: images
    }
    var arr = that.data.images_house; //全路径
    let dearr = that.remove(arr, images) //全路径删除图片
    images_houseHalf.splice(index, 1) //相应的删除半路径的图片
    // var arr_half = that.data.images_houseHalf; //半路径
    // let dearr_half = that.remove(arr_half, images)
    util.rePost('/certificate/deleteImgByUrl', data, res => {
      if (res.code == 1) {
        wx.hideLoading();
        that.setData({
          images_house: dearr,
          showjia_house: true
        })
      }
    })
  },
  // 其他证件图片预览
  previewImage_house: function (e) {
    var that = this
    var current = e.target.dataset.src //获取图片的url地址
    wx.previewImage({
      current: current,
      urls: that.data.images_house
    })
  },
  //查询认证资料
  checkInfomation() {
    var tempFilePaths1 = this.data.tempFilePaths1; //上传身份证正面
    var tempFilePaths2 = this.data.tempFilePaths2; //上传身份证反面
    var images_house = this.data.images_house; //其他证件资料
    var that = this;
    wx.showLoading({
      title: '加载中...',
    })
    util.rePost('/certificate/getPapersDateByUserNum', {
      // userNum: '65465765464565476876876', //用户唯一编号
      userNum: this.data.userNum
    }, res => {
      console.log(res)
      if (res.code == 1) {
        wx.hideLoading();
        //其他图片循环
        var imgArr = res.data.ddOther.split(',')
        var imgArrList = [];
        for (var i = 0; i < imgArr.length; i++) {
          imgArrList.push(app.globalData.fileIp + imgArr[i])
        }
        var imgArrList_half = [];
        for (var i = 0; i < imgArr.length; i++) {
          imgArrList_half.push(imgArr[i])
        }
        that.setData({
          tempFilePaths1: app.globalData.fileIp + res.data.ddNoBack,
          tempFilePaths2: app.globalData.fileIp + res.data.ddNoPositive,
          images_house: imgArrList, //其他证件
          tempFilePaths1_half: res.data.ddNoBack,
          tempFilePaths2_half: res.data.ddNoPositive,
          images_houseHalf: imgArrList_half, //其他证件
          ddId: res.data.ddId,
          imgShow1: true,
          imgShow2: true,
          remarks: res.data.remarks
        })
      }
    })
  },
  // 确认按钮
  renzheng_nextBtn() {
    // wx.navigateTo({
    //   url: '/pages/bind_bankcard/bind_bankcard',
    // })
    // 身份证半路径
    var tempFilePaths1_half = this.data.tempFilePaths1_half;
    var tempFilePaths2_half = this.data.tempFilePaths2_half;
    // 其他证件
    var images_houseHalf = this.data.images_houseHalf.toString();
    console.log(this.data.ddId)
    console.log(tempFilePaths1_half)
    if (tempFilePaths1_half == '' || tempFilePaths2_half == '' || images_houseHalf.length == 0) {
      wx.showToast({
        title: '请上传资料',
      })
    } else {
      util.rePost('/certificate/addPapersDateByUserNum', {
        userNum: this.data.userNum,
        // userNum: '65465765464565476876876', //用户唯一编号
        phoneNo: '15600000000', //用户手机号
        ddNoPositive: tempFilePaths1_half, //身份证正面
        ddNoBack: tempFilePaths2_half, //身份证反面
        ddOther: images_houseHalf, //其他证件
        ddId: this.data.ddId,
        remarks: this.data.remarks
      }, res => {
        if (res.code == 1) {
          wx.hideLoading();
          wx.showToast({
            title: res.message,
          })
        } else {
          wx.showToast({
            title: '添加成功',
          })
        }
      })
    }
  },
  onShow: function () {
    // setTimeout(function() {
    //   console.log(util.rootDocment)
    // }, 2000);
  },
  onLoad: function (options) {
    console.log(options)
    this.data.userNum = options.userNum
    this.checkInfomation()
  }
})