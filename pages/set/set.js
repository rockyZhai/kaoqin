// 5.设置
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeStar1:"",//早上上班时间
    timeStar2: "",//早上下班时间
    timeStar3: "",//下午上班时间
    timeStar4: "",//下午下班时间
    scopeTime:"",//允许范围时间
    addTel:"" ,//手机号码
    items:[],
    id:""
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('qingjia.onload')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    //加载loading
    wx.showLoading({
      title: '加载中...'
    });
    wx.request({
      url: app.globalData.url + "/kq/getQkTime",
      success: function (res) {
        //消失loading
        wx.hideLoading();
        if (res.data.success == true){
          that.setData({
            items: res.data.data,
            timeStar1: res.data.data.gmt_kssjm,//早上设置的上班时间
            timeStar2: res.data.data.gmt_kssjn,//早上设置的下班时间
            timeStar3: res.data.data.gmt_kssja,//下午设置的上班时间
            timeStar4: res.data.data.gmt_kssje,//下午设置的下班时间
            scopeTime: res.data.data.offset,//设置的允许范围时间
            id: res.data.data.id
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
  },

  /**
   * 生命周期函数--监听页面显示
   */
  // 获取登录人的电话号码
  onShow: function () {
    console.log('qingjia.onshow')
    var that = this;
    wx.getStorage({
      key: 'addTel',
      success: function (res) {
        that.setData({
          addTel: res.data
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('qingjia.onhide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('qingjia.onupload')
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
  //上班一   时间1
  bindTimeChangeStar1: function (e) {
    this.setData({
      timeStar1: e.detail.value
    })
  },
  //上班一  时间2
  bindTimeChangeStar2: function (e) {
    this.setData({
      timeStar2: e.detail.value
    })
  },
  //上班二   时间1
  bindTimeChangeStar3: function (e) {
    this.setData({
      timeStar3: e.detail.value
    })
  },
  //上班二  时间2
  bindTimeChangeStar4: function (e) {
    this.setData({
      timeStar4: e.detail.value
    })
  },
  //允许迟到早退范围    验证输入框是否为数字
  scopeTimeInput:function(e){
    var password = e.detail.value;
    var patrn = /^[0-9]*$/; 
    if (!patrn.test(password)) {
      wx.showToast({
        title: '请输入数字',
        image: "../images/faile.png",
        duration: 2000,
      })
    }else{
      this.setData({
        scopeTime:password
      })
    }
    console.log(password)
  },
  //提交设置
  sure:function(){
    var that = this;
    var gmt_kssjm = that.data.timeStar1;//早上上班时间
    var gmt_kssjn = that.data.timeStar2;//早上下班时间
    var gmt_kssja = that.data.timeStar3;//下午上班时间
    var gmt_kssje = that.data.timeStar4;//下午下班时间
    var scopeTime = that.data.scopeTime;//允许范围时间
    console.log(scopeTime)
    var id = that.data.id
    //加载loading
    wx.showLoading({
      title: '加载中...'
    });
    wx.request({
      url: app.globalData.url + "/kq/setQkTime",
      data: { 
        gmt_kssjm: gmt_kssjm,
        gmt_kssjn: gmt_kssjn,
        gmt_kssja: gmt_kssja, 
        gmt_kssje: gmt_kssje, 
        offset: scopeTime,
        id:id
      },
      success: function (res) {
        //消失loading
        wx.hideLoading();
        if (res.data.success == true) {
          wx.redirectTo({
            url: '../login/login',
          })
        }else {
          wx.showToast({
            title: '设置失败请重试',
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