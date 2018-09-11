// 5.加班
const app = getApp();
var dateTimePicker = require('../../dateTimePicker/dateTimePicker.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateTimeArray1: "",//picker开始时间
    dateTime1: "",//开始时间
    dateTimeArray2: "",//picker结束时间
    dateTime2: "",//结束时间

    addTel: "",//手机号码
    personId:"",//人员编号
    StartData: "",//开始时间
    EndtData: "",//开始时间
    evaContent: "",//请假事由
    arr: [],
    
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
    this.setData({
      dateTimeArray1: obj1.dateTimeArray,//开始时间
      dateTime1: obj1.dateTime,//开始时间
      dateTimeArray2: obj1.dateTimeArray,//结束时间
      dateTime2: obj1.dateTime//结束时间
    });

    //调用方法获取机型
    var phone = wx.getSystemInfoSync();
    var detail;
    if (phone.platform == 'ios') {
      this.setData({
        detail: "15rpx",
        detail1: "0rpx"
      })
    } else if (phone.platform == 'android') {
      this.setData({
        detail: "30rpx",
        detail1: "20rpx"
      })
    }
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


  //获取审批人页面的数据
  updateData: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        arr: that.data.arr,
      })
      var array = that.data.arr;
      console.log(array)

      that.setData({
        arr: that.unique1(array),
      })
    }, 1000) //延迟时间 这里是1秒
  },
  //数组去重
  unique1: function (array){
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
  // 请假事由
  charChange: function (e) {
    var evaContent = e.detail.value
    this.setData({
      evaContent: e.detail.value
    });
  },
  TiJiao: function (e) {
    var phoneNo = this.data.addTel//登录人电话号码
    var personId = this.data.personId//登录人编号
    var dateStar = this.data.dateStar;
    var StartData = e.currentTarget.dataset.starttime + ":00";//开始时间
    var EndData = e.currentTarget.dataset.endtime + ":00";;//结束时间
    var evaContent = this.data.evaContent;//加班事由
    var arr= this.data.arr;
    console.log(phoneNo)
    console.log(EndData)
    // 审批人
    if (arr==""){

    }else{
      var sfarr=[];
      for (var i = 0; i < arr.length; i++) {
        var sf = '{' + i + ':' + arr[i].personId+'}';
        console.log(sf)
        sfarr.push(sf) 
      }
      console.log(sfarr)
    }
    if (arr != "" && evaContent != "" && StartData != "" && EndData != "") {

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
      url: app.globalData.url + "/kq/addWork",
      header: {},
      data: {
        phoneNo: "",
        personId: personId,
        gmt_kssj: StartData,
        gmt_jssj: EndData,
        yy : evaContent,
        spr: sfarr
      },
      success: function (res) {
        //消失loading
        wx.hideLoading();

        if (res.data.success == false) {
          wx.showToast({
            title: '提交失败请重试',
            image: "../images/faile.png",
            icon: 'success',
            duration: 2000
          })
        }else {
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
  // 跳转审批人
  shenpiren:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../back_prev/back_prev',
    })
  },
  // 删除审批人
  remove:function(e){
    var that=this;
    var personId = e.currentTarget.dataset.id;
    var arr1= that.data.arr;
  
    var newArr = arr1.filter(function(obj){
      return personId != obj.personId
    })
    console.log(newArr)
    that.setData({
      arr: newArr 
    })
  }
})