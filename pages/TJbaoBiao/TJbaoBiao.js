// <!--4.1统计报表  -->
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "",//日期
    items: [],
    gmt_day:"",
    personId:""//人员编码
  },
  //选择picker日期时  查看其余月份的记录
  bindDateChange: function (e) {
    var that=this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
    //加载loading
    wx.showLoading({
      title: '加载中...'
    });
    wx.request({
      url: app.globalData.url + "/kq/getSignRecordsByDayList",
      data: { gmt_day: e.detail.value },
      success: function (res) {
        //消失loading
        wx.hideLoading();
        
        that.setData({
          items: res.data.data,//统计列表
        })
        
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

  /*生命周期函数--监听页面加载*/
  onLoad: function (options) {
    //初始化加载当月日期时  查看当月的记录
    var that = this;
    var date = this.data.date;
    date = new Date().format("yyyy-MM");//获取当前年月日期
    this.setData({ date: date });
    //加载loading
    wx.showLoading({
      title: '加载中...'
    });
   
    wx.request({
      url: app.globalData.url + "/kq/getSignRecordsByDayList",
      data: { gmt_day: date},
      success: function (res) {
        //消失loading
        wx.hideLoading();

        if (res.data.success == true) {
          that.setData({
            items: res.data.data,//统计列表
            personId: res.data.data.personId
          })
        } else {
          wx.showToast({
            title: '加载失败',
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
  onReady: function (e) {

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
  //跳转3.1考勤记录_本月记录
  kaoQinTJ:function(e){
    var date = this.data.date;
    date = new Date().format("yyyy-MM");//获取当前年月日期
    this.setData({ date: date });
    var phoneNo = e.currentTarget.dataset.phone;
    var personId = e.currentTarget.dataset.personid;
    var personName = e.currentTarget.dataset.name;
    //加载loading
    wx.showLoading({
      title: '加载中...'
    });
    
    wx.request({
      url: app.globalData.url + "/kq/getSignRecordsByphoneNo",
      data: { phoneNo: phoneNo, gmt_day: date, personId: personId},
      success: function (res) {
        //消失loading
        wx.hideLoading();
        if (res.data.success==true){
          wx.navigateTo({
            url: '../kaoQinTJ/kaoQinTJ?phoneNo=' + phoneNo + '&name=' + personName + '&personId=' + personId,
          })
        } else {
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
})