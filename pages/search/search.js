const _ = require('underscore')
Page({
  data: {
    keyword: '',
    list: []
  },

  // handleInput:_.throttle((e)=>{
  //   console.log(this)
  //   // this.setData({
  //   //   keyword: e.detail.value
  //   // })
  // },300),
  handleInput(e){
    this.setData({
      keyword: e.detail.value
    })
  },

  handleClick() {
    wx.request({
      url: 'https://ik9hkddr.qcloud.la/index.php/trade/get_search_list',
      method: 'POST',
      data: {
        keyword: this.data.keyword
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: (result) => {
        console.log(result)
        this.setData({
          list: result.data.data
        })
      }
    })
  }
})