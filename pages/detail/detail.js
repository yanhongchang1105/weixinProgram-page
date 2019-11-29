// pages/detail/detail.js
Page({

  data: {
    detailInfo:{}
  },
  onLoad(options){
    wx.request({
      url: 'https://ik9hkddr.qcloud.la/index.php/trade/get_item',
      method:'post',
      data:{
        id:options.id
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success:(res)=>{
        if(res.data.data.type=='sell'){
          res.data.data.type='转卖'
        }else{
          res.data.data.type = '收购'
        }
        this.setData({
          detailInfo:res.data.data
        })
      }
    })
  },
  handleBack(){
    wx.navigateBack({
    })
  }

})