Page({
  data:{
    address:'点击选择，要勾选哦~',
    isSubmit: false,
    isSucc: false
  },
  onReady(){
    this.staticData = {
      type: 'buy'
    }
  },
  chooseLocation(){
    wx.chooseLocation({
      success: (res) =>{
        let { address, longitude, latitude } = res
        this.setData({
          address
        })
        this.staticData.longitude = longitude
        this.staticData.latitude = latitude
      },
    })
  },

  radioChange(e){
    this.staticData.type = e.detail.value
  },
  handleMessageInput(e){
    this.staticData.message = e.detail.value
  },
  handleContactInput(e) {
    this.staticData.contact = e.detail.value
  },

  showToast(title) {
    wx.showToast({
      title,
      icon: 'none',
      duration: 2000
    })
  },
  handleSubmit() {
    let data = {
      address: this.data.address,
      ...this.staticData
    }

    if (this.data.address === '点击选择，要勾选哦~') {
      this.showToast('请选择地址')
      return
    }
    if (!this.staticData.message) {
      this.showToast('请填写说明')
      return
    }
    if (!this.staticData.contact) {
      this.showToast('请填写联系方式')
      return
    }

    wx.request({
      url: 'https://ik9hkddr.qcloud.la/index.php/trade/add_item', //仅为示例，并非真实的接口地址
      data,
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        this.setData({
          isSubmit: true,
          isSucc: res.data.ret
        })
      }
    })
  },
  handleBack() {
    if (this.data.isSucc) {
      wx.reLaunch({
        url: '/pages/index/index',
      })
    } else {
      this.setData({
        isSubmit: false
      })
    }
  }
})