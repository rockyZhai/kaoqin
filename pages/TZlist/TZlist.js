// 通知列表
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    //加载loading
    wx.showLoading({
      title: '加载中...'
    });
    wx.request({
      url: app.globalData.url + "/kq/getNoticeList",
      success:function(res){
        //消失loading
        wx.hideLoading();
        if (res.data.success == true) {
          that.setData({
            list: res.data.data
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
  //跳转 发布通知
  fabuTZ:function(){
    wx.redirectTo({
      url: '../fabuTZ/fabuTZ',
    })
  },
  //跳转 修改通知内容
  TZcontent:function(e){
    var code = e.currentTarget.dataset.code
    console.log(code)
    wx.redirectTo({
      url: '../TZcontent/TZcontent?code='+code,
    })
  }
})