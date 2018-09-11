// 发布通知
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleValue:"",//标题值
    textareaValue:"",//内容值
    bumenValue:"",//部门值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  //标题值
  titleValue:function(e){
    this.setData({
      titleValue: e.detail.value
    })
  },
  //内容值
  textareaValue: function (e) {
    this.setData({
      textareaValue: e.detail.value
    })
  },
  //部门值
  bumenValue: function (e) {
    this.setData({
      bumenValue: e.detail.value
    })
  },
  fabu:function(){
    var that =this;
    var title = that.data.titleValue;
    var content = that.data.textareaValue;
    var dept = that.data.bumenValue;
    if (title != "" && content != "" && dept != "") {
      //加载loading
      wx.showLoading({
        title: '提交中...'
      });
      wx.request({
        url: app.globalData.url + "/kq/addNotice",
        data: { title: title, content: content, dept: dept },
        success: function (res) {
          //消失loading
          wx.hideLoading();
          if (res.data.success == true) {
            wx.redirectTo({
              url: '../TZlist/TZlist',
            })
          }else {
            wx.showToast({
              title: '发布失败请重试',
              image: "../images/faile.png",
              icon: 'success',
              duration: 2000
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
    } else {
      wx.showToast({
        title: '请完善信息',
        image: "../images/icon.png",
        duration: 1000,
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 1000)
    }
  }
})