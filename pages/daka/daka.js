// 2.1 考勤打卡

var app =getApp();
// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js') ;
// 定义经纬度
var lati = null
var longi = null
Page({
  /**
   * 页面的初始数据
   */
  data: {
    addTel: "",//登录人电话号码
    personName:"",//登录人姓名
    personId:"",//登录人编号
    photo:"",//登录人头像
    today:new Date().format("hh:mm:ss") ,
    address : '' ,//打卡地址
    day: new Date().format("yyyy.MM.dd"),//获取当天日期
    lat:"",//纬度
    lng:"",//经度
    items:[],
    list: [],//打卡列表
    gmt_kssj:"",//开始时间
    name_dk:"",//打卡名称
    disabled: false,
    bukaData:"",//补卡日期
    arr:[],
    btnColor: "#3399ff",
    boxShadow:"0px 0px 20px #a2cdfe",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.reduceTime();//调用定时器函数
  
    //定位
    var selfThis = this, address = this.data.address;// 获取当前的地理位置
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        lati = res.latitude
        longi = res.longitude
         // 实例化API核心类
        var demo = new QQMapWX({
          key: 'B2ABZ-SIDKS-WD2O3-6CJ2U-CDZOT-U3FKF' // 申请的key
        })
         // 调用接口
        demo.reverseGeocoder({
          location: {
            latitude: lati,
            longitude: longi
          },
          success: function (res) {
            console.log(res);
            //console.log(res.result.address_component.city) ;
            var city = res.result.address_component.city;
            var district = res.result.address_component.district;
            //address = city + district ;
            address = res.result.address;
            var lat = res.result.location.lat;//纬度
            var lng = res.result.location.lng;//经度
            selfThis.setData({
               address: address,
               lat: lat,
               lng: lng,
            })
            selfThis.ready();//调用初始化数据
          },
          fail: function (res) {
            console.log(res);
          }
        })
      }
    }) 
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    this.mapCtx = wx.createMapContext('myMap');
  },
  //初始化数据
  ready:function(){
    var that = this;
    var phoneNo = this.data.addTel;//登录人号码
    var personId = this.data.personId;//登录人编号
    var lat = this.data.lat, lng = this.data.lng
    var personName = this.data.personName;//登录人姓名
    //加载loading
    wx.showLoading({
      title: '加载中...'
    });
    wx.request({
      url: app.globalData.url + "/kq/getSignListByphoneNo",
      data: { phoneNo: phoneNo, lat: lat, lng: lng, personId: personId },
      success:function(res){
        // if (res.data.data.isOut=="true"){
        //   that.setData({
        //     btnColor: "#ff3333",
        //     boxShadow:"0px 0px 20px #ff3333"
        //   })
        // }

        //消失loading
        wx.hideLoading();

        if (res.data.success == true) {
          var arr = [];
          for (var i = 0; i < res.data.data.list.length; i++) {
            arr.push(res.data.data.list[i].gmt_kssj)
            that.setData({
              arr: arr//获取打卡时间标准格式
            })
    
            res.data.data.list[i].gmt_kssj = res.data.data.list[i].gmt_kssj.substr(10, 10);//上班打卡时间
            if (res.data.data.list[i].gmt_last_update == null) {
              res.data.data.list[i].gmt_last_update = ""
            }
            res.data.data.list[i].gmt_last_update = res.data.data.list[i].gmt_last_update.substr(10, 10);//打卡时间
          }
          that.setData({
            items: res.data.data,
            list: res.data.data.list//打卡列表
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
      key: 'personId',
      success: function (res) {
        that.setData({
          personId: res.data
        })
      },
    })
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
    //登录人头像
    wx.getStorage({
      key: 'photo',
      success: function (res) {
        that.setData({
          photo: res.data
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
   //获取当前时间 加定时器制作成钟表
  reduceTime:function(){
    var today =this.data.today;
    var selfThis=this;
    var t=setInterval(function(){
      today = new Date().format("hh:mm:ss");
        selfThis.setData({ today: today, })
    },1000)
  },

  // 地图定位
  map: function () {
   
    //调取小程序新版授权页面
    
  },

  //跳转补卡
  buka:function(e){
    var that =this;
    var code_kqxx = e.currentTarget.dataset.id;
    var gmt_kssj = e.currentTarget.dataset.code;
    var bukaData = e.currentTarget.dataset.time;
    var index = e.currentTarget.dataset.index;
    console.log(gmt_kssj)
   
    wx.redirectTo({
      url: '../buka/buka?id=' + code_kqxx + '&code=' + gmt_kssj + '&time=' + bukaData,
    })
  },
  
  //最后一次打卡跳转到  2.2考勤_本日考勤记录
  // daykaoqin:function(){
  //   wx.navigateTo({
  //     url: '../dayDakaJiLu/dayDakaJiLu'
  //   })
  // },
 
  dakaTime:function(){
    var that = this;
    var phoneNo = this.data.addTel;//登录人电话
    var personId = this.data.personId;//登录人编号
    var address_cs = this.data.address;//打卡地址
    var lat = this.data.lat;//纬度
    var lng = this.data.lng;//经度
    var name_dk = this.data.items.name;//打卡名称
    
    wx.request({
      url: app.globalData.url + "/kq/signIn",
      data: { address_cs: address_cs, lng: lng, lat: lat, phoneNo: phoneNo, name_dk: name_dk, personId: personId},
      success:function(res){
        that.ready();//刷新当前页面数据
        console.log(res.data.data.isDk)
        //判断 为false 就禁止点击打卡按钮
        if (res.data.data.isDk == "fasle"){
          wx.showToast({
            title: '您已打卡',
            image: "../images/icon.png",
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

