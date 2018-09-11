// 审批详情流程中
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[],
    list: [],
    txlist:[],
    types:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var code_xx = options.id;//取url后面的参数
    this.setData({
      types: options.types
    })
   
    if (options.types==5){
      //加载loading
      wx.showLoading({
        title: '加载中...'
      });
      wx.request({
        url: app.globalData.url + "/kq/getCcSqDetail",
        data: { code_xx: code_xx },
        success: function (res) {
          //消失loading
          wx.hideLoading();
          if (res.data.success == true) {
            console.log(res.data)
            that.setData({
              items: res.data.data,
              list: res.data.data.list,
            })
            var personName = [];
            for (var i = 0; i < res.data.data.txlist.length;i++){
              personName.push(res.data.data.txlist[i].personName)
              console.log(res.data.data.txlist[i].personName)
              that.setData({
                txlist: personName
              })
            }
          }else {
            wx.showToast({
              title: '加载失败请重试',
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
    }else{
      //加载loading
      wx.showLoading({
        title: '加载中...'
      });
      wx.request({
        url: app.globalData.url + "/kq/getSqnrDetail",
        data: { code_xx: code_xx },
        success: function (res) {
          //消失loading
          wx.hideLoading();
          if (res.data.success == true) {
            that.setData({
              items: res.data.data,
              list: res.data.data.list
            })
          }else {
            wx.showToast({
              title: '加载失败请重试',
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
    }
  },

  /* 生命周期函数--监听页面初次渲染完成*/
  onReady: function () {
    
  },

  /*生命周期函数--监听页面显示*/
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
  
})