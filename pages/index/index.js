//index.js
//获取应用实例
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addTel: "", //登录人电话号码
    personName: "",//登录人姓名
    photo:"",//登录人头像
    remark:"",//登录人设置权限
    isController: "",//登录人操作权限
    power:"",
    showModalStatus:false,
    gmt_create:"",//公告时间
    title:"",//公告标题
  },
  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //点击头像隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
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
    var that=this;
    //登录人电话号码
    wx.getStorage({
      key: 'addTel',
      success: function(res) {
        that.setData({
          addTel:res.data
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
    //登录人头像
    wx.getStorage({
      key: 'photo',
      success: function (res) {
        that.setData({
          photo: res.data
        })
      },
    })
    //登录人设置权限
    wx.getStorage({
      key: 'remark',
      success: function (res) {
        that.setData({
          remark: res.data
        })
      },
    })
    //登录人操作权限
    wx.getStorage({
      key: 'isController',
      success: function (res) {
        that.setData({
          isController: res.data
        })
      },
    })
    //公告时间
    wx.getStorage({
      key: 'gmt_create',
      success: function (res) {
        that.setData({
          gmt_create: res.data
        })
      },
    })
    //公告标题
    wx.getStorage({
      key: 'title',
      success: function (res) {
        that.setData({
          title: res.data
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
  // 跳转9.1 通知
  announcementList: function () {
    wx.navigateTo({
      url: '../announcementList/announcementList'
    })
  },
  // 跳转2.1 考勤_打卡
  daka: function () {
    if (this.data.isController == "true") {
      wx.navigateTo({
        url: '../daka/daka'
      })
    }else {
      wx.showToast({
        title: "您没有操作权限",
        image: "../images/faile.png",
        duration: 2000,
      })
    }
  },
  //跳转3.1 考勤统计
  kaoQinTJ:function(){
    if (this.data.isController == "true") {
      wx.navigateTo({
        url: '../PersonkaoQinTJ/PersonkaoQinTJ',
      })
    }else {
      wx.showToast({
        title: "您没有操作权限",
        image: "../images/faile.png",
        duration: 2000,
      })
    }
  },
  //跳转4.1统计报表
  TJbaoBiao:function(){
    var isController = this.data.isController;
    console.log(isController)
    if (this.data.remark == 0) {
      wx.showToast({
        title: "您没有操作权限",
        image: "../images/faile.png",
        duration: 2000,
      })
    } else {
      wx.navigateTo({
        url: '../TJbaoBiao/TJbaoBiao',
      })
    }    
  },
  //跳转5.请假
  qingJia:function(){
    if (this.data.isController == "true") {
      wx.navigateTo({
        url: '../qingJia/qingJia?phoneNo = phoneNo',
      })
    } else {
      wx.showToast({
        title: "您没有操作权限",
        image: "../images/faile.png",
        duration: 2000,
      })
    }
  },
  //跳转6.加班
  jiaban: function () {
    if (this.data.isController == "true") {
      wx.navigateTo({
        url: '../jiaban/jiaban',
      })
    } else {
      wx.showToast({
        title: "您没有操作权限",
        image: "../images/faile.png",
        duration: 2000,
      })
    }
  },
  //跳转8.1审批列表
  shenpi: function () {
    if (this.data.isController == "true") {
      wx.navigateTo({
        url: '../shenpi/shenpi',
      })
    } else {
      wx.showToast({
        title: "您没有操作权限",
        image: "../images/faile.png",
        duration: 2000,
      })
    }
  },
  chuChai:function(){
    if (this.data.isController == "true") {
      wx.navigateTo({
        url: '../chuChai/chuChai',
      })
    } else {
      wx.showToast({
        title: "您没有操作权限",
        image: "../images/faile.png",
        duration: 2000,
      })
    }
  },
  //跳转我的申请
  myShengqing:function(){
    var phoneNo = this.data.addTel;
    console.log(phoneNo)
    if (this.data.isController == "true") {
      wx.navigateTo({
        url: '../myShenQing/myShenQing?phoneNo=' + phoneNo,
      })
    } else {
      wx.showToast({
        title: "您没有操作权限",
        image: "../images/faile.png",
        duration: 2000,
      })
    }
  },
  //跳转设置
  set:function(){
    console.log(this.data.remark)
    if(this.data.remark==0){
      wx.showToast({
        title: "您没有设置权限",
        image: "../images/faile.png",
        duration: 2000,
      })
    }else{
      wx.navigateTo({
        url: '../set/set',
      })
    }    
  },
  //跳转通知列表
  TZlist: function () {
    console.log(this.data.remark)
    if (this.data.remark == 0) {
      wx.showToast({
        title: "您没有设置权限",
        image: "../images/faile.png",
        duration: 2000,
      })
    } else {
      wx.navigateTo({
        url: '../TZlist/TZlist',
      })
    }
  },
  showModalStatus:function(){
    this.setData({
      showModalStatus: true
    })
  },
  //修改密码
  ModifyThePassword:function(e){
    var personNo = e.currentTarget.dataset.personno;
    var personName = e.currentTarget.dataset.personname;
    var photo = e.currentTarget.dataset.photo
    console.log(personNo)
    console.log(photo)
    wx.navigateTo({
      url: '../ModifyThePassword/ModifyThePassword?personNo=' + personNo + '&personname=' + personName + '&photo=' + photo,
    })
  },
  //退出登录
  TClogin:function(){
    wx.redirectTo({
      url: '../login/login'
    })
  }
})