const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
    password:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  //手机号验证
  phone:function(e){
    this.setData({
      phone: e.detail.value
    })
  },
  // 密码验证
  password:function(e){
    var that = this;
    var password = e.detail.value;
    var strkong = /^[0-9a-zA-Z]{5,25}$/g;
    if (strkong.test(password) && password!="") {
      that.setData({
        password: password
      })
    } else {
     
    }
  },
  //提交验证
  submit:function(e){
    var phone = this.data.phone;
    var password = this.data.password;
    console.log(password)
    //判断密码  和 手机号是否正确
    if (phone != "" && password != "") {
      //加载loading
      wx.showLoading({
        title: '加载中...'
      });
      wx.request({
        url: app.globalData.url + "/kq/login",
        data: { personNo: phone, pwd: password },
        success: function (res) {
          //消失loading
          wx.hideLoading();
          if (res.data.success == false) {
            wx.showModal({
              content: '请检查登录名和密码是否正确',
              showCancel:false
            })
          } else {
            //登录人员编码
            wx.setStorage({
              key: 'personId',
              data: res.data.data.personId,
            })
            //登录人电话
            wx.setStorage({
              key: 'addTel',
              data: phone,
            })
            //登录人姓名
            wx.setStorage({
              key: 'personName',
              data: res.data.data.personName,
            })
            //登录人头像
            wx.setStorage({
              key: 'photo',
              data: res.data.data.photo,
            })
            //登录人设置权限
            wx.setStorage({
              key: 'remark',
              data: res.data.data.remark,
            })
            //登录人操作权限
            wx.setStorage({
              key: 'isController',
              data: res.data.data.isController,
            })
            //公告时间
            wx.setStorage({
              key: 'gmt_create',
              data: res.data.data.notice.gmt_create,
            })
            //公告标题
            wx.setStorage({
              key: 'title',
              data: res.data.data.notice.title,
            })
            //密码
            wx.setStorage({
              key: 'pwd',
              data: res.data.data.pwd,
            })
            wx.redirectTo({
              url: '../index/index'
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
        title: '请输入完整信息',
        image: "../images/icon.png",
        duration: 1000,
      })
      return false
    }
  },
})