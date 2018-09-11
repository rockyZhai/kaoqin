// 3.2考勤记录_考勤日历
const app =getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,
    todayIndex: 0  ,
    clickDate : '' ,
    addTel: "",//登录人电话号码
    personName: "",//登录人姓名
    photo: "",//登录人头像
    list:[],//列表
    arr:[],
    dayDate: new Date().format("yyyy-MM-dd"),//获取当天日期
    personId:"",//当前人编号
    display:"",
    gmt_kssj:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      personId: options.personId
    })
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    var isToday = '' + year + "-" + month + "-"+ day ;
    
    this.dateInit();
    var dateArr = this.data.dateArr , clickDate = isToday ;
    this.setData({
       year: year,
       month: month,
       isToday: isToday ,
      //  dateArr : dateArr ,
       clickDate : clickDate ,
    });
  },  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    var dayDate = this.data.dayDate;
    var personId = this.data.personId;
    //加载loading
    wx.showLoading({
      title: '加载中...'
    });
    wx.request({
      url: app.globalData.url + "/kq/getSignRecordsByDay",
      data: { gmt_day: dayDate, personId: personId, phoneNo:""},
      success: function (res) {
        //消失loading
        wx.hideLoading();

        if (res.data.success == true) {
          // var arr = [];
          for (var i = 0; i < res.data.data.list.length; i++) {
            // arr.push(res.data.data.list[i].gmt_kssj)
            // that.setData({
            //   arr: arr//获取打卡时间标准格式 
            // })
            res.data.data.list[i].gmt_kssj = res.data.data.list[i].gmt_kssj.substr(10, 10);//上班时间
            if (res.data.data.list[i].gmt_last_update == null) {
              res.data.data.list[i].gmt_last_update = ""
            } else {
              res.data.data.list[i].gmt_last_update = res.data.data.list[i].gmt_last_update.substr(10, 10);//打卡时间
            }
          }
          that.setData({
            list: res.data.data.list,
            personName: res.data.data.personName,
            photo: res.data.data.photo,
            gmt_kssj: res.data.data.gmt_kssj
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
  // 日历
  dateInit: function (setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1  
    let dateArr = []; //需要遍历的日历数组数据  
    let arrLen = 0; //dateArr的数组长度  
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth();//没有+1方便后面计算当月总天数  
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    // console.log(year)
    // console.log(month)
    console.log(year + '-0' + (month + 1) + '-01')
    let startWeek = new Date(year + '-0' + (month + 1) + '-0' + 1).getDay();//目标月1号对应的星期 一定要获取标准时间格式如2010-03-01不然手机上显示不了
    let dayNums = new Date(year, nextMonth, 0).getDate(); //获取目标月有多少天  
    let obj = {};
    let num = 0;
    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    // console.log(startWeek)
    // console.log(dayNums)
    // console.log(arrLen)
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        obj = {
          isToday: '' + year + "-" + (month + 1) + "-" + num,
          dateNum: num,
          weight: 5 ,
          type : 0
        }
      } else {
        obj = {};
      }
      dateArr[i] = obj;
    }
    this.setData({
      dateArr: dateArr
    })
    // console.log(this.data.dateArr)

    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;
    
    if (nowYear == getYear && nowMonth == getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
  },
  lastMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1  
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    this.setData({
      year: year,
      month: month + 1
    })
    console.log(month)
    this.dateInit(year, month);
  },
  nextMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1  
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: month + 1
    })
    this.dateInit(year, month);
  },

  // 选择日期
  selectDate : function(e){
    var that = this;
    var month = that.data.month;
    var dateArr = that.data.dateArr , index = e.currentTarget.dataset.index ;
    var clickDate = that.data.clickDate ;
    for(var i = 0 ; i < dateArr.length ; i++){
      if(dateArr[index].dateNum){
        clickDate = dateArr[index].isToday ;
      }else{
        return ;
      }
    }
    this.setData({
      dateArr: dateArr,
      clickDate: clickDate,//选中谁颜色就变红
    })
    //判断日小于<10就补0
    if (dateArr[index].dateNum < 10) {
      dateArr[index].dateNum = "0" + dateArr[index].dateNum;
    } else {
      dateArr[index].dateNum = dateArr[index].dateNum;;
    }
    //判断月小于<10就补0
    if (month < 10) {
      month = "0" + month
    } else {
      month = month
    }
   
    var gmt_day = that.data.year + "-" + month + "-" + dateArr[index].dateNum;
    var personId = this.data.personId
   
    //加载loading
    wx.showLoading({
      title: '加载中...'
    });

    wx.request({
      url: app.globalData.url + "/kq/getSignRecordsByDay",
      data: { gmt_day: gmt_day, personId: personId },
      success: function (res) {
        //消失loading
        wx.hideLoading();

        if (res.data.success == true) {
          var arr = [];
          for (var i = 0; i < res.data.data.list.length; i++) {
            arr.push(res.data.data.list[i].gmt_kssj)
            that.setData({
              arr: arr//获取打卡时间标准格式 
            })
            res.data.data.list[i].gmt_kssj = res.data.data.list[i].gmt_kssj.substr(10, 10);//上班时间
            if (res.data.data.list[i].gmt_last_update == null) {
              res.data.data.list[i].gmt_last_update = ""
            }else{
              res.data.data.list[i].gmt_last_update = res.data.data.list[i].gmt_last_update.substr(10, 10);//打卡时间
            }
          }
          that.setData({
            display: "block",
            list: res.data.data.list,
            photo: res.data.data.photo,
          })
        }else {
          that.setData({
            display: "none"
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

  //补卡
  buka: function (e) {
    var code_kqxx = e.currentTarget.dataset.id;
    var gmt_kssj = e.currentTarget.dataset.code;
    var bukaData = e.currentTarget.dataset.time;
    var phoneNo = this.data.phoneNo;
    
    wx.navigateTo({
      url: '../buka/buka?id=' + code_kqxx + '&code=' + gmt_kssj + '&time=' + bukaData + '&phoneNo=' + phoneNo,
    })
  },
})