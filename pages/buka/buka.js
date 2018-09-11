// 5.补卡
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addTel:"",//登录人电话
    personId:"",//登录人编码
    id: '',//缺卡编码
    arr: [],
    arr3: [],
    array:[],
    evaContent:"",
    code:"",//补卡时间
    val:"",//补卡标准日期
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,//缺卡编码
      code: options.code,//缺卡时间
      val: options.time,//补卡标准日期
    })
    console.log(options.time)
    //调用方法获取机型
    var phone = wx.getSystemInfoSync();
    var detail;
    if (phone.platform == 'ios') {
      this.setData({
        detail: "15rpx",
        detail1: "0rpx"
      })
    } else if (phone.platform == 'android') {
      this.setData({
        detail: "30rpx",
        detail1: "20rpx"
      })
    }
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
    var that =this;
    wx.getStorage({
      key: 'addTel',
      success: function (res) {
        that.setData({
          addTel: res.data
        })
      },
    })
    wx.getStorage({
      key: 'personId',
      success: function (res) {
        that.setData({
          personId: res.data
        })
      },
    })
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
    
  },
  // 请假事由
  charChange: function (e) {
    var evaContent = e.detail.value
    this.setData({
      evaContent: e.detail.value
    });
    console.log(evaContent)
  },
  //获取审批人页面的数据
  updateData: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        arr: that.data.arr,
      })
      var array = that.data.arr;
      that.setData({
        arr: that.unique1(array),
      })
    }, 500) //延迟时间 让loading出现  避免loding一闪而过
  },
  //数组去重 避免相同的审批人存在
  unique1: function (array) {
    var r = [];
    for (var i = 0, l = array.length; i < l; i++) {
      for (var j = i + 1; j < l; j++)
        if (array[i].personId === array[j].personId) {
          j = ++i;
          wx.showToast({
            title: '审批人已存在',
            image: "../images/icon.png",
            duration: 1000
          })
        }
      r.push(array[i]);
    }
    return r;
  },
  // 跳转审批人
  shenpiren: function () {
    wx.navigateTo({
      url: '../back_prev/back_prev',
    })
  },
  // 删除审批人
  remove: function (e) {
    var that = this;
    var personId = e.currentTarget.dataset.id;
    var arr1 = that.data.arr;
    var newArr = arr1.filter(function (obj) {
      return personId != obj.personId
    })
    console.log(newArr)
    that.setData({
      arr: newArr
    })
  },
  TiJiao:function(){
    var arr = this.data.arr;
    // 审批人
    if (arr == "") {

    } else {
      var sfarr = [];
      for (var i = 0; i < arr.length; i++) {
        var sf = '{' + i + ':' + arr[i].personId + '}';
        sfarr.push(sf)
      }
    }
    var gmt_kssj =this.data.val;//补卡时间
    var personId = this.data.personId;//补卡人编号
    var phoneNo = this.data.addTel;//补卡人电话
    var code_kqxx =this.data.id;//补卡编码
    var evaContent = this.data.evaContent;//补卡事由
    
    //判断所有输入框是否为空
    if (arr != "" && evaContent != "" ) {

    } else {
      wx.showToast({
        title: '请完善信息',
        image: "../images/icon.png",
        duration: 2000,
      })
      return false;
    }
    //加载loading
    wx.showLoading({
      title: '提交中...'
    });
    wx.request({
      url: app.globalData.url + "/kq/editWork",
      data: {
        phoneNo: "",
        personId: personId,
        code_kqxx: code_kqxx,
        yy: evaContent,
        spr: sfarr,
        gmt_kssj: gmt_kssj
      },
      success: function (res) {
        //消失loading
        wx.hideLoading();
        if (res.data.success == false) {
          wx.showToast({
            title: '提交失败请重试',
            image: "../images/faile.png",
            duration: 2000,
          })
        }else{
          wx.redirectTo({
            url: '../myShenQing/myShenQing?personId=' + personId
          })
        }
      },
      fail: function (res) {
        //消失loading
        wx.hideLoading();
        wx.showToast({
          title: '连接超时！',
          image: "../images/faile.png",
          icon: 'success',
          duration: 2000
        })
      }
    })
  }
})