// pages/back_prev/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    selectArry:[],
    id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('back_prev.onload')
    var pages = getCurrentPages();
    var prePage = pages[pages.length - 2]; //上一个页面
    var prevPage = this.getPrePage();  //上一个页面
    var that=this;
    //加载loading
    wx.showLoading({
      title: '加载中...'
    });
    wx.request({
      url: app.globalData.url + "/kq/getSprList",
      success:function(res){
        //消失loading
        wx.hideLoading();
        if (res.data.success == true) {
          that.setData({
            items: res.data.data,
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
    }); 
  },
  /*生命周期函数--监听页面初次渲染完成*/
  onReady: function () {
  
  },

  /* 生命周期函数--监听页面显示 */
  onShow: function () {
  
  },

  /* 生命周期函数--监听页面隐藏*/
  onHide: function () {
  
  },

  /*生命周期函数--监听页面卸载*/
  onUnload: function () {

    console.log('back_prev.onUnload')
  },

  /*页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {
  
  },

  /* 页面上拉触底事件的处理函数*/
  onReachBottom: function () {
  
  },

  /* 用户点击右上角分享*/
  onShareAppMessage: function () {
  
  } ,
  //单选
  checkboxChange: function(e) {
    var that=this;
    var items= this.data.items , selectArry = [] , value = e.detail.value ;
    console.log(value)
    for(var i = 0 ; i < items.length ; i++){
      if (items[i].personId == value){
        selectArry.push(items[i]);
        break;
      }
      // for(var j = 0 ; j < value.length ; j++){
      //   if(items[i].personId == value[j]){
      //     console.log(items[i].personId)
      //     console.log(value)
      
      //     selectArry.push(items[i]) ;
      //     break;
      //   } 
      // }
    }
   
    this.setData({selectArry : selectArry})
    console.log(selectArry)
  },
  
  // 获取上一个页面对象
  getPrePage : function(){
    var pages = getCurrentPages();
    var prePage = pages[pages.length -2]; //上一个页面
    return prePage;
  } , 

  // 确定选中项
  sureSelect : function(e){
    var items = this.data.items , selectArry = this.data.selectArry , id = this.data.id ;
    var prevPage = this.getPrePage();  //上一个页面
  
    prevPage.data.arr = prevPage.data.arr.concat(selectArry);//合并数组
    prevPage.updateData();
    
    wx.navigateBack();//返回相对应的页面
  }, 
})