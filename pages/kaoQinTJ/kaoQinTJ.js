//<!--3.1 考勤记录_本月记录-- >
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:"",
    addTel: "",//登录人电话号码
    personName: "",//登录人姓名
    personId:"",//登录人编号
    photo: "",//登录人头像
    gmt_day: "",//当月日期
    items:[],//考勤列表
    name:"",
  },
  
  /*生命周期函数--监听页面加载*/
  onLoad: function (options) {
    var that = this;
    var date = this.data.date;
    date = new Date().format("yyyy-MM");//获取当前年月日期
    this.setData({ date: date });
    var phoneNo = options.phoneNo;
    var personName = options.name;
    var personId = options.personId;
    this.setData({
      name: options.name,
      personId: options.personId
    })
    //加载loading
    wx.showLoading({
      title: '加载中...'
    });
    wx.request({
      url: app.globalData.url + "/kq/getSignRecordsByphoneNo",
      data: { gmt_day: date, phoneNo: phoneNo, personId: personId },
      success: function (res) {
        //消失loading
        wx.hideLoading();

        if (res.data.success == true) {
          that.setData({
            items: res.data.data,//统计列表
            photo: res.data.data.photo
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
  },

  /*生命周期函数--监听页面初次渲染完成*/
  onReady: function () {
    
  },

  /* 生命周期函数--监听页面显示*/
  onShow: function () {
    var that = this;
    //登录人电话
    wx.getStorage({
      key: 'addTel',
      success: function (res) {
        that.setData({
          addTel: res.data
        })
      },
    })
    //登录人姓名
    wx.getStorage({
      key: 'personName',
      success: function (res) {
        that.setData({
          personName: res.data
        })
      },
    })
  },

  /* 生命周期函数--监听页面隐藏*/
  onHide: function () {
    
  },

  /*生命周期函数--监听页面卸载*/
  onUnload: function () {
    
  },

  /*页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {
    
  },

  /* 页面上拉触底事件的处理函数*/
  onReachBottom: function () {
    
  },

  /* 用户点击右上角分享*/
  onShareAppMessage: function () {
    
  },

  //点击picker获取某月个人考勤记录
  bindDateChange: function (e) {
    console.log(1);
    var that = this;
    var phoneNo = this.data.addTel;//登录人号码
    var personId = this.data.personId;//人员编号
    this.setData({
      date: e.detail.value
    })
    //加载loading
    wx.showLoading({
      title: '加载中...'
    });
    wx.request({
      url: app.globalData.url + "/kq/getSignRecordsByphoneNo",
      data: { gmt_day: e.detail.value, phoneNo: phoneNo, personId: personId},
      success: function (res) {
        //消失loading
        wx.hideLoading();

        if (res.data.success == true) {
          that.setData({
            items: res.data.data,//统计列表
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
  },

  RiLi:function(e){
    wx.navigateTo({
      url: '../kaoQinRiLi/kaoQinRiLi?personId=' + this.data.personId
    })
    console.log(this.data.personId)
  } 
})
