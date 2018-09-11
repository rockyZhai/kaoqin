/**9.2公告详情 */
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    code_notice: "",//编码值
    titleValue: "",//标题值
    contentValue: "",//内容值
    deptValue:"",//部门值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var code_notice = options.code;
    //加载loading
    wx.showLoading({
      title: '加载中...'
    });
    wx.request({
      url: app.globalData.url + "/kq/getNoticeDetail",
      data: { code_notice: code_notice },
      success: function (res) {
        //消失loading
        wx.hideLoading();
        if (res.data.success == true) {
          that.setData({
            items: res.data.data,
            titleValue: res.data.data.title,
            contentValue: res.data.data.content,
            deptValue: res.data.data.dept
          })
          console.log(res.data.data.title)
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
    
  }
})