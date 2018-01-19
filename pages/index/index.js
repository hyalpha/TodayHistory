//index.js
Page({
  data: {
    scrollViewHeight:200,
    dateOfToday:'',
    items:[]
  },  
  onLoad: function () {
    var that = this;

    //显示加载动画
    wx.showLoading({
      title: '正在加载',
    });

    //获取屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight);
        that.setData({
          scrollViewHeight: res.windowHeight - 100
        });
      }
    });

    //获取当前日期
    var myDate = new Date();
    var dateStr = myDate.getFullYear() + '年' + (myDate.getMonth()+1) + '月' + myDate.getDate() + '日';
    this.setData({
      dateOfToday: dateStr
    });

    //发送请求
    wx.request({
      url: "https://www.ipip5.com/today/api.php?type=json",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        console.log("success:" + res);
        try {
          that.setData({
            items:res.data.result,
            dateOfToday: res.data.today
          });
        } catch (e) {

        }
        wx.hideLoading();
      },
      fail: function (err) {
        console.log("error:" + err);
        wx.hideLoading();
      }
    });
    
  },
  viewDetail: function (e) {
    var title = e.currentTarget.dataset.title;
    var year = e.currentTarget.dataset.year;
    var url = '../detail/detail?title=' + title + '&year=' + year + '&date=' + this.data.dateOfToday;

    wx.navigateTo({
      url: url
    })
  },
})
