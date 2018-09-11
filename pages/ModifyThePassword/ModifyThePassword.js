const app = getApp()
// 修改密码
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pwd:"",//原密码
    loginpwd:"",//登录密码
    newPwd:"",//新密码
    personNo:"",//登录人
    personName:"",//登录人姓名
    photo:"",//登录人头像
    confirm:"",//确认密码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.personNo)
    this.setData({
      personNo: options.personNo,
      personName: options.personname,
      photo: options.photo
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
    var that=this;
    //登录人电话
    wx.getStorage({
      key: 'pwd',
      success: function (res) {
        that.setData({
          loginpwd: res.data
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
  //原密码
  pwd:function(e){
    console.log(this.data.loginpwd)
    var that = this;
    var pwd = e.detail.value;
    var rex = /[\u4E00-\u9FA5]/i;
    // if (!rex.test(pwd) && pwd != "") {
    //   that.setData({
    //     pwd: pwd
    //   })
    //   console.log(pwd)
    //   return false;
    // }else{
    //   wx.showToast({
    //     title: '格式不正确',
    //     image: "../images/faile.png",
    //     duration: 2000,
    //   })
    // }
    if (pwd == this.data.loginpwd) {
      that.setData({
        pwd: pwd
      })
    }else{
      wx.showToast({
        title: '原密码不正确',
        image: "../images/faile.png",
        duration: 2000,
      })
      return false;
    }
  },
  //新密码
  newPwd:function(e){
    var that = this;
    var newPwd = e.detail.value;
    // /^[a-zA-Z0-9.]+${8,12}/g
    var rexs = /^(?!([a-zA-Z.]+|\d+)$)[a-zA-Z\d.]{6,18}$/;
    if (rexs.test(newPwd) && newPwd != "") {
      that.setData({
        newPwd: newPwd
      })
    } else {
      wx.showToast({
        title:"6~18位数字英文",
        image: "../images/icon.png",
        duration: 2000,
      })
      return false;
    }
  },
  //确认密码
  confirm:function(e){
    var confirm = e.detail.value;
    console.log(confirm)
    if (confirm != this.data.newPwd){
      wx.showToast({
        title: "密码不一致",
        image: "../images/faile.png",
        duration: 2000,
      })
      return false
    }else{
      this.setData({
        confirm: e.detail.value
      })
    }
    console.log(this.data.confirm)
  },
  //提交
  formSubmit:function(e){
    var pwd = this.data.pwd;
    var newPwd = this.data.newPwd;
    var personNo = this.data.personNo;
    var confirm = this.data.confirm;

     //判断输入框不能为空
    if (pwd != "" && newPwd != "" && confirm != "") {
     
    } else {
      wx.showToast({
        title: '请填写正确信息',
        image: "../images/faile.png",
        duration: 2000,
      })
      return false
    }
   
    
    //加载loading
    wx.showLoading({
      title: '加载中...'
    });
    wx.request({
      url: app.globalData.url + "/kq/updatePwd",
      data: { personNo: personNo, pwd: pwd, newPwd: newPwd},
      success:function(res){
        //消失loading
        wx.hideLoading();

        if(res.data.success==true){
          wx.redirectTo({
            url: '../login/login',
          })
        }else{
          wx.showToast({
            title: '修改密码失败',
            image: "../images/faile.png",
            duration: 1000,
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