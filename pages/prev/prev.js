// pages/prev/index.js
var dateTimePicker = require('../../dateTimePicker/dateTimePicker.js');

Page({
  data: {
    dateTimeArray1: "",//picker开始时间
    dateTime1: "",//开始时间
    dateTimeArray2: "",//picker结束时间
    dateTime2: "",//结束时间
    startTime:"",
    endTime:""
  },
  onLoad() {
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
  },
//开始时间
  changeDateTime1(e) {
    console.log(e.currentTarget.dataset.times)
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
      startTime: dateArr[0][arr[0]] + "-" + dateArr[1][arr[1]] + "-" + dateArr[2][arr[2]] + " " + dateArr[3][arr[3]] + ":" + dateArr[4][arr[4]]
    });
  },


//结束时间
  changeDateTime2(e) {
    console.log(e.currentTarget.dataset.time)
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
      endTime: dateArr[0][arr[0]] + "-" + dateArr[1][arr[1]] + "-" + dateArr[2][arr[2]] + " " + dateArr[3][arr[3]] + ":" + dateArr[4][arr[4]]
    });
  }
})
















// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     list : [] ,
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
  
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {
  
//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {
  
//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {
  
//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {
  
//   } ,
//   //跳转
//   navigateTo : function(e){
//     var selfThis = this , url = e.currentTarget.dataset.url ;
//     console.log(e)
//     wx.navigateTo({
//       url: url ,
//     })
//   }
// })