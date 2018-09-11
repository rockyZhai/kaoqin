// 5.出差
var dateTimePicker = require('../../dateTimePicker/dateTimePicker.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    dateTimeArray1: "",//picker开始时间
    dateTime1: "",//开始时间
    dateTimeArray2: "",//picker结束时间
    dateTime2: "",//结束时间
   
    addTel:"" ,//手机号码
    personId:"",//登录人编号
    personName:"",//登录人
    StartData: "",//开始时间
    EndtData: "",//开始时间
    
    chuChaiaddress:"",//出差地址
    cx_type:"",//出行方式
    cp_jsy: "",//车牌及驾驶员
    name_jtgj:"",//交通工具
    evaContent: "",//出差原因
    arr: [],//审批人数组
    detail:"",
    detail1:"",
    TongXunLuarr:[],//通讯录数组
    currentTab: 0,//选项卡
    isShow: true,//选项卡
   


    // 单选框
    items: [
      { id: '0', value: '单位派车'},
      { id: '1', value: '公共交通'},
    ],
    cx_type:"",//单选框ID
  },

  //点击切换
  clickTab: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var showMode = e.target.dataset.current == 0;
      this.setData({
        currentTab: e.target.dataset.current,
        isShow: showMode
      })
    }
    this.setData({
      cx_type: e.currentTarget.dataset.current
    })
    console.log(e.currentTarget.dataset.current)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    //调用方法获取机型
    var phone = wx.getSystemInfoSync();  
    var detail;
    if (phone.platform == 'ios') {
      this.setData({
        detail : "15rpx",
        detail1: "0rpx"
      })
    } else if (phone.platform == 'android') {
      this.setData({
        detail: "30rpx",
        detail1: "20rpx"
      })
    }

    this.setData({
      dateTimeArray1: obj1.dateTimeArray,//开始时间
      dateTime1: obj1.dateTime,//开始时间
      dateTimeArray2: obj1.dateTimeArray,//结束时间
      dateTime2: obj1.dateTime//结束时间
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  // 获取登录人的电话号码
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'addTel',
      success: function (res) {
        that.setData({
          addTel: res.data
        })
      },
    })
    wx.getStorage({
      key: 'personName',
      success: function (res) {
        that.setData({
          personName: res.data
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

  //开始时间
  changeDateTime1(e) {
    this.setData({
      dateTime1: e.detail.value
    });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[1] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr,

    });
  },

  //结束时间
  changeDateTime2(e) {
    this.setData({
      dateTime2: e.detail.value
    });
  },
  changeDateTimeColumn2(e) {
    var arr = this.data.dateTime2, dateArr = this.data.dateTimeArray2;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray2: dateArr,
      dateTime2: arr,
    });
  },

  //获取单选框id
  radioChange: function (e) {
    this.setData({
      cx_type: e.detail.value
    })
    console.lo9g(e.detail)
  },

  //获取审批人页面的数据
  updateData: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        arr: that.data.arr,
      })
      var array = that.data.arr;
      that.setData({
        arr: that.unique1(array),
      })
    }, 1000) //延迟时间 让loading出现  避免loding一闪而过
    console.log(this.data.arr)
  },

  //数组去重 避免相同的审批人存在
  unique1: function (array) {
    var r = [];
    for (var i = 0, l = array.length; i < l; i++) {
      for (var j = i + 1; j < l; j++)
        if (array[i].personId === array[j].personId) {
          j = ++i;
          wx.showToast({
            title: '审批人已存在',
            image: "../images/icon.png",
            duration: 500
          })
        }
      r.push(array[i]);
    }
    return r;
  },
  


  // 跳转审批人
  shenpiren: function () {
    wx.navigateTo({
      url: '../back_prev/back_prev',
    })
  },
 
  // 删除审批人
  remove: function (e) {
    var that = this;
    var personId = e.currentTarget.dataset.id;
    var arr1 = that.data.arr;

    var newArr = arr1.filter(function (obj) {
      return personId != obj.personId
    })
    console.log(newArr)
    that.setData({
      arr: newArr
    })
  },

   //同行人
  TongXingRen: function () {
    wx.navigateTo({
      url: '../TongXunLu/TongXunLu',
    })
  },
  //获取审批人页面的数据
  TongXunupdateData: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        TongXunLuarr: that.data.TongXunLuarr,
      })
      var arrays = that.data.TongXunLuarr;
      that.setData({
        TongXunLuarr: that.unique(arrays),
      })
    }, 1000) //延迟时间 让loading出现  避免loding一闪而过
    console.log(this.data.TongXunLuarr)
  },

  //数组去重 避免相同的审批人存在
  unique: function (arrays) {
    var r = [];
    for (var i = 0, l = arrays.length; i < l; i++) {
      for (var j = i + 1; j < l; j++)
        if (arrays[i].personId === arrays[j].personId) {
          j = ++i;
          wx.showToast({
            title: '同行人已存在',
            image: "../images/icon.png",
            duration: 500
          })
        }
      r.push(arrays[i]);
    }
    console.log(0)
    return r;
  },
  // 删除同行人
  removeTongXingRen: function (e) {
    var that = this;
    var personId = e.currentTarget.dataset.id;
    var arr1 = that.data.TongXunLuarr;
    var newArr = arr1.filter(function (obj) {
      return personId != obj.personId
    })
    console.log(newArr)
    that.setData({
      TongXunLuarr: newArr
    })
  },
  
  // 出差单位及地址
  chuChaiaddress:function(e){
    this.setData({
      chuChaiaddress: e.detail.value
    })
  },
  //出行方式
  radioChange: function (e) {
    this.setData({
      cx_type: e.detail.value
    })
  },
  //车牌及驾驶员
  cp_jsy : function (e) {
    this.setData({
      cp_jsy : e.detail.value
    });
  },
  //交通工具
  name_jtgj:function(e){
    this.setData({
      name_jtgj: e.detail.value
    });
  },
  //出差事由
  evaContent: function (e) {
    this.setData({
      evaContent: e.detail.value
    });
  },
  //提交请求
  TiJiao: function (e) {
    var phoneNo = this.data.addTel//登录人电话号码
    var personId = this.data.personId//登录人编号
    var StartData = e.currentTarget.dataset.starttime + ":00";//开始时间
    var EndData = e.currentTarget.dataset.endtime + ":00";;//结束时间
    var unit = this.data.chuChaiaddress;//目的地及单位
    var cx_type = this.data.cx_type;//出行方式
    var cp_jsy = this.data.cp_jsy;//车牌及驾驶员
    var name_jtgj = this.data.name_jtgj;//交通工具
    var evaContent = this.data.evaContent;//出差事由
    var arr = this.data.arr;//审批人
    var TongXunLuarr = this.data.TongXunLuarr;//同行人
   
    console.log(cx_type)
    //同行人
    if (TongXunLuarr==""){

    } else {
      var txarr = [];
      for (var i = 0; i < TongXunLuarr.length; i++) {
        var tx = '{' + i  + ':' + TongXunLuarr[i].personId+'}';
        txarr.push(tx)
      }
    }
   
    // 审批人以[{0,13511111111}]格式
    if (arr == "") {

    } else {
      var sfarr = [];
      for (var i = 0; i < arr.length; i++) {
        var sf = '{' + i  + ':' + arr[i].personId + '}';
        sfarr.push(sf)
      }
    }
   
    if (phoneNo != "" && unit != "" && cx_type != "" && evaContent != "" && TongXunLuarr != "" && arr != "" && cp_jsy != "" || name_jtgj !== "") {

    } else {
      wx.showToast({
        title: '请完善信息',
        image: "../images/icon.png",
        duration: 2000,
      })
      return false;
    }
    //判断开始时间不能和结束时间相同
    if (EndData <= StartData) {
      wx.showModal({
        content: '开始时间不能大于结束时间',
      })
      return false
    }
    //加载loading
    wx.showLoading({
      title: '提交中...'
    });

    wx.request({
      url: app.globalData.url + "/kq/addBizTrip",
      header: {},
      data: {
        phoneNo: "",
        personId: personId,
        tx_personId: txarr,
        gmt_kssj: StartData,
        gmt_jssj: EndData,
        unit: unit,
        cx_type: cx_type,
        cp_jsy: cp_jsy,
        name_jtgj: name_jtgj,
        yy: evaContent,
        spr: sfarr
      },
      success: function (res) {
        //消失loading
        wx.hideLoading();

        if (res.data.success == false) {
          wx.showToast({
            title: '提交失败请重试',
            icon: 'success',
            duration: 2000,
          })
        } else {
          wx.redirectTo({
            url: '../myShenQing/myShenQing?personId=' + personId
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
})