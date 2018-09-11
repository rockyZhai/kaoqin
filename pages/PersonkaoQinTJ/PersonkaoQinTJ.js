//<!--3.1 考勤记录_本月记录-- >
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:"",
    addTel: "",//登录人电话号码
    personId:"",//登录人编号
    personName: "",//登录人姓名
    photo: "",//登录人头像
    gmt_day: "",//当月日期
    items:[],//考勤列表
    loginPhoneNo: "",//items列表登录人电话号码
   
  },
  //点击picker获取某月个人考勤记录
  bindDateChange: function (e) {
    console.log(1)
    var that = this;
    var phoneNo = this.data.addTel;//登录人号码
    var personId = this.data.personId;//登录人编号
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
          console.log(res.data.data)
          that.setData({
            items: res.data.data//统计列表
          })
        }else{
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

  /*生命周期函数--监听页面加载*/
  onLoad: function (options) {
    
  },

  /*生命周期函数--监听页面初次渲染完成*/
  //获取当月个人考勤记录
  onReady: function () {
    var that = this;
    var date = this.data.date;
    date = new Date().format("yyyy-MM");//获取当前年月日期
    this.setData({ date: date });
    var phoneNo = this.data.addTel;
    var personId = this.data.personId;

    //加载loading
    wx.showLoading({
      title: '加载中...'
    });

    wx.request({
      url: app.globalData.url + "/kq/getSignRecordsByphoneNo",
      data: { gmt_day: date, phoneNo: phoneNo, personId: personId},
      success: function (res) {
        //消失loading
        wx.hideLoading();

        if (res.data.success == true) {
          that.setData({
            items: res.data.data,//统计列表
            loginPhoneNo: res.data.data.phoneNo,
            photo: res.data.data.photo,
            personId: res.data.data.personId
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

  /**
   * 生命周期函数--监听页面显示
   */
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
    //登录人编号
    wx.getStorage({
      key: 'personId',
      success: function (res) {
        that.setData({
          personId: res.data
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
  RiLi:function(){
    wx.navigateTo({
      url: '../kaoQinRiLi/kaoQinRiLi?personId=' + this.data.personId
    })
    console.log(this.data.personId)
  }
})

