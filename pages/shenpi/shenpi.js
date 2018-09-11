// <!--8.1审批列表  -->
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addTel:"",
    items: [],
    personId:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 获取登录人的电话号码
    wx.getStorage({
      key: 'addTel',
      success: function (res) {
        that.setData({
          addTel: res.data
        })
      },
    })
    // 获取登录人的编号
    wx.getStorage({
      key: 'personId',
      success: function (res) {
        that.setData({
          personId: res.data
        })
      },
    })
  },

  /*生命周期函数--监听页面初次渲染完成*/
  onReady: function () {
    //初始化发送请求获取个人审批列表
    var that =this;
    var phoneNo = this.data.addTel//登录人电话号码
    var personId = this.data.personId//登录人编号
    //加载loading
    wx.showLoading({
      title: '加载中...'
    });
    wx.request({
      url: app.globalData.url + "/kq/getSpnrList",
      data: { phoneNo: "", personId: personId},
      header: {},
      success: function(res) {
        //消失loading
        wx.hideLoading();
        if (res.data.success==true){
          that.setData({
            items: res.data.data,
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

  /*生命周期函数--监听页面显示*/
  onShow: function () {
    
  },

  /* 生命周期函数--监听页面隐藏*/
  onHide: function () {
    
  },

  /*生命周期函数--监听页面卸载*/
  onUnload: function () {
    
  },

  /* 页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {
    
  },

  /*页面上拉触底事件的处理函数*/
  onReachBottom: function () {
    
  },

  /*用户点击右上角分享*/
  onShareAppMessage: function () {
    
  },
  //跳转请假审批
  qingjiashenpi:function(e){
    var arr = this.data.items;
    var id = e.currentTarget.dataset.id;//取得类型值  编码信息
    var isController = e.currentTarget.dataset.iscontroller;//取得类型值isController
    var types = e.currentTarget.dataset.type;//取得申请类型
    wx.navigateTo({
      url: '../qingjiashenpi/qingjiashenpi?id=' + id + '&isController=' + isController + '&types=' + types,//携带参数跳转
    })
  }
})